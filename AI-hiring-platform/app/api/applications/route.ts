import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { sendEmail, emailTemplates } from '@/app/lib/email';

const prisma = new PrismaClient();

// Validation schema for creating an application
const applicationSchema = z.object({
  jobPostingId: z.string().min(1, "Job posting ID is required"),
  coverLetter: z.string().optional(),
});

// POST - Create a new application
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id as string;
    const body = await req.json();
    
    // Validate request body
    const result = applicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { jobPostingId, coverLetter } = result.data;
    
    // Check if job posting exists
    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id: jobPostingId },
    });
    
    if (!jobPosting) {
      return NextResponse.json({ error: "Job posting not found" }, { status: 404 });
    }
    
    // Check if user has already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobPostingId,
        applicantId: userId,
      },
    });
    
    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 409 }
      );
    }
    
    // Calculate match score
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            skills: true,
          },
        },
      },
    });
    
    const jobSkills = await prisma.jobPostingSkill.findMany({
      where: { jobPostingId },
      include: { skill: true },
    });
    
    const userSkills = user?.profile?.skills.map(s => s.name) || [];
    const requiredSkills = jobSkills.map(js => js.skill.name);
    
    // Simple match score calculation
    const matchedSkills = userSkills.filter(skill => 
      requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
    );
    
    const matchScore = requiredSkills.length > 0 
      ? (matchedSkills.length / requiredSkills.length) * 100 
      : 0;
    
    // Create application
    const application = await prisma.application.create({
      data: {
        jobPostingId,
        applicantId: userId,
        coverLetter,
        matchScore,
      },
    });
    
    // After successful application creation
    if (application) {
      try {
        // Get job posting with details
        const jobPostingWithDetails = await prisma.jobPosting.findUnique({
          where: { id: jobPostingId },
          include: { 
            recruiter: true
          }
        });

        // Get applicant details
        const applicant = await prisma.user.findUnique({
          where: { id: userId }
        });

        if (jobPostingWithDetails?.recruiter?.email && applicant) {
          const jobTitle = jobPostingWithDetails.title;
          const companyName = jobPostingWithDetails.company;

          // Send notification to recruiter
          await sendEmail({
            to: jobPostingWithDetails.recruiter.email,
            subject: `New Application: ${jobTitle}`,
            html: emailTemplates.applicationNotification(jobTitle, applicant.name || 'Candidate', application.id),
          });
          
          // Send confirmation to applicant
          await sendEmail({
            to: applicant.email,
            subject: `Application Submitted: ${jobTitle}`,
            html: emailTemplates.applicationUpdate(
              applicant.name || 'Candidate', 
              jobTitle, 
              companyName, 
              'Submitted', 
              jobPostingWithDetails.id
            ),
          });
        }
      } catch (emailError) {
        console.error("Error sending application emails:", emailError);
        // Continue with the response even if email sending fails
      }
      
      return NextResponse.json({ success: true, application });
    }
    
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

// GET - Get all applications for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id as string;
    const userRole = session.user.role;
    
    // Different queries based on user role
    if (userRole === "RECRUITER") {
      // Recruiters see applications for their job postings
      const applications = await prisma.application.findMany({
        where: {
          jobPosting: {
            recruiterId: userId,
          },
        },
        include: {
          jobPosting: true,
          applicant: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                include: {
                  skills: true,
                  resume: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      
      return NextResponse.json({ applications });
      
    } else {
      // Job seekers see their own applications
      const applications = await prisma.application.findMany({
        where: {
          applicantId: userId,
        },
        include: {
          jobPosting: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      
      return NextResponse.json({ applications });
    }
    
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
} 