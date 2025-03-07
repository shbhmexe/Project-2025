import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseResume } from "@/utils/resumeParser";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto"; // ✅ Secure file naming

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("🔹 Receiving form data...");

    // ✅ Ensure request has FormData
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      console.error("❌ Invalid Content-Type! Expected multipart/form-data.");
      return NextResponse.json({ error: "Invalid request format!" }, { status: 400 });
    }

    const formData = await req.formData();

    if (!formData) {
      console.error("❌ FormData parsing failed!");
      return NextResponse.json({ error: "Failed to parse form data!" }, { status: 400 });
    }

    // ✅ Extract form data fields safely
    const name = formData.get("name")?.toString()?.trim() || "";
    const email = formData.get("email")?.toString()?.trim() || "";
    const linkedin = formData.get("linkedin")?.toString()?.trim() || "";
    const skills = formData.get("skills")
      ?.toString()
      ?.split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0) || [];
    const experience = formData.get("experience")?.toString()?.trim() || "";
    const resumeText = formData.get("resumeText")?.toString()?.trim() || "";
    const resumeFile = formData.get("resumeFile") as File | null;

    console.log("🔹 Extracted Data:", { name, email, linkedin, skills, experience, resumeFile });

    // ✅ Required field validation
    if (!name || !email || !linkedin) {
      console.error("❌ Missing required fields!");
      return NextResponse.json({ error: "Missing required fields!" }, { status: 400 });
    }

    let extractedText = resumeText; // ✅ Default resume text

    // ✅ Handle File Upload Securely
    if (resumeFile) {
      console.log("🔹 Processing resume file:", resumeFile.name);

      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadsDir, { recursive: true }); // ✅ Ensure folder exists

      // 🔥 Generate Secure Filename
      const fileExt = path.extname(resumeFile.name);
      const uniqueName = `${crypto.randomUUID()}${fileExt}`;
      const filePath = path.join(uploadsDir, uniqueName);

      // ✅ Read file buffer safely
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      if (buffer.length === 0) {
        console.error("❌ Resume file is empty!");
        return NextResponse.json({ error: "Uploaded file is empty!" }, { status: 400 });
      }

      await fs.writeFile(filePath, buffer);
      console.log("🔹 File saved successfully:", filePath);

      // ✅ Parse Resume if PDF
      extractedText = await parseResume(filePath);
      console.log("🔹 Extracted Resume Text:", extractedText);
    } else {
      console.warn("⚠️ No resume file uploaded.");
    }

    // ✅ Store in Database
    console.log("🔹 Storing candidate in database...");
    const newCandidate = await prisma.candidate.create({
      data: {
        name,
        email,
        linkedin,
        skills,
        experience,
        resume: extractedText,
      },
    });

    console.log("✅ Candidate stored successfully:", newCandidate);

    return NextResponse.json({ message: "Candidate submitted successfully!", candidate: newCandidate });

  } catch (error) {
    console.error("🔥 Error processing form:", error);
    return NextResponse.json({ 
      error: "Failed to process the form!", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
