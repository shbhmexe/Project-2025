import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const linkedin = formData.get("linkedin") as string;
    
    // ✅ Fix for skills parsing
    const skillsRaw = formData.get("skills") as string;
    const skills = skillsRaw.includes("[") ? JSON.parse(skillsRaw) : skillsRaw.split(",").map(s => s.trim());

    const experience = formData.get("experience") as string;
    const resumeText = formData.get("resumeText") as string | null;
    const resumeFile = formData.get("resumeFile") as File | null;

    let resumeUrl: string | null = null;

    // ✅ Fix for Base64 encoding
    if (resumeFile) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      resumeUrl = "data:application/pdf;base64," + buffer.toString("base64");
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        linkedin,
        skills,
        experience,
        resumeText,
        resumeUrl,
      },
    });

    return NextResponse.json({ message: "Candidate added successfully!", candidate }, { status: 201 });

  } catch (error) {
    console.error("🔥 Error submitting form:", error);
    return NextResponse.json({ 
      error: "Something went wrong!", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
