import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { sendEmail, emailTemplates } from '@/app/lib/email';
import { prisma } from '@/app/lib/prisma';

// Function to calculate match score between job and candidate
function calculateMatchScore(
  candidateSkills: string[],
  jobSkills: string[],
  candidateExperience: number,
  jobExperience: number = 0
) {
  // Calculate skill match percentage
  const matchedSkills = candidateSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase() === skill.toLowerCase()
    )
  );
  
  const skillScore = jobSkills.length > 0 
    ? (matchedSkills.length / jobSkills.length) * 100 
    : 0;
  
  // Calculate experience match (simplified)
  const experienceScore = jobExperience > 0 
    ? Math.min(100, (candidateExperience / jobExperience) * 100) 
    : 100;
  
  // Weighted score (70% skills, 30% experience)
  return (skillScore * 0.7) + (experienceScore * 0.3);
}

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id as string;
    
    // Get user profile with skills
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            skills: true,
            experience: true
          }
        }
      }
    });
    
    if (!user || !user.profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }
    
    // Extract user skills
    const userSkills = user.profile.skills.map(skill => skill.name);
    
    // Calculate total years of experience (simplified)
    const totalExperience = user.profile.experience.reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
      const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return total + years;
    }, 0);
    
    // Get all active job postings
    const jobPostings = await prisma.jobPosting.findMany({
      where: { status: "ACTIVE" },
      include: {
        skills: {
          include: {
            skill: true
          }
        }
      }
    });
    
    // Calculate match scores for each job
    const jobMatches = jobPostings.map(job => {
      const jobSkills = job.skills.map(js => js.skill.name);
      
      // Extract required experience from job description (simplified)
      const experienceMatch = job.requirements?.match(/(\d+)(?:\s*-\s*\d+)?\s*years?/i);
      const requiredExperience = experienceMatch ? parseInt(experienceMatch[1]) : 0;
      
      const matchScore = calculateMatchScore(
        userSkills,
        jobSkills,
        totalExperience,
        requiredExperience
      );
      
      return {
        jobId: job.id,
        title: job.title,
        company: job.company,
        matchScore,
        matchedSkills: userSkills.filter(skill => 
          jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
        ),
        missingSkills: jobSkills.filter(skill => 
          !userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
        )
      };
    });
    
    // Sort by match score (highest first)
    jobMatches.sort((a, b) => b.matchScore - a.matchScore);
    
    // Send email notification for top matches (if any match is above 70%)
    const topMatches = jobMatches.filter(match => match.matchScore >= 70);
    if (topMatches.length > 0 && user.email) {
      try {
        // Send at most 3 top matches
        for (const match of topMatches.slice(0, 3)) {
          await sendEmail({
            to: user.email,
            subject: `Job Match: ${match.title}`,
            html: emailTemplates.jobMatch(
              user.name || 'Candidate',
              match.title,
              match.company,
              Math.round(match.matchScore),
              match.jobId
            ),
          });
        }
      } catch (emailError) {
        console.error("Error sending job match emails:", emailError);
        // Continue with the response even if email sending fails
      }
    }
    
    return NextResponse.json({
      matches: jobMatches,
      userSkills,
      totalExperience
    });
    
  } catch (error) {
    console.error("Job matching error:", error);
    return NextResponse.json({ error: "Failed to match jobs" }, { status: 500 });
  }
} 