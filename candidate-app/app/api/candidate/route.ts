import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🔹 Function to get embeddings from Gemini API
async function getGeminiEmbeddings(text: string): Promise<number[]> {
  try {
    if (!text || text.trim() === "") {
      console.warn("⚠️ No text provided for embeddings!");
      return [];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(`Convert this text into a numerical embedding array: "${text}"`);

    const embeddingText = await response.response.text();
    const embeddingVector = embeddingText
      .replace(/[^0-9,.-]/g, "")
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    return embeddingVector.length > 0 ? embeddingVector : [];
  } catch (error) {
    console.error("❌ Error generating embeddings:", error);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const linkedin = formData.get("linkedin")?.toString().trim();
    const skills = formData.get("skills")?.toString().split(",").map(s => s.trim()) || [];
    const experience = formData.get("experience")?.toString().trim();
    const resumeText = formData.get("resumeText")?.toString().trim();
    const resumeFile = formData.get("resumeFile") as Blob | null;

    console.log("🔹 Received Form Data:", { name, email, linkedin, skills, experience, resumeText, resumeFile });

    if (!name || !email || !linkedin || !skills.length || !experience) {
      return NextResponse.json({ error: "Missing required fields!" }, { status: 400 });
    }

    // 🔹 Ensure "uploads" folder exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 🔹 Save Resume File if Uploaded
    let resumeFilePath = "";
    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const fileName = `resume-${Date.now()}.pdf`;
      resumeFilePath = `/uploads/${fileName}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
    }

    console.log("✅ Saving Candidate to Database...");

    // 🔹 Store in Database
    const candidate = await prisma.candidate.create({
      data: { name, email, linkedin, skills, experience, resumeText, resumeFilePath },
    });

    console.log("✅ Candidate Saved:", candidate);

    // 🔹 Get Gemini AI Embeddings
    const skillsText = skills.join(", ");
    const embeddingVector = await getGeminiEmbeddings(skillsText);

    if (embeddingVector.length > 0) {
      console.log("🔹 Embeddings:", embeddingVector);

      // 🔹 Send Data to Pinecone
      const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

      await pineconeIndex.upsert([
        {
          id: candidate.id.toString(),
          values: embeddingVector,
          metadata: { name, email, linkedin, experience },
        },
      ]);
      console.log("✅ Data stored in Pinecone successfully!");
    } else {
      console.warn("⚠️ Empty embeddings received, skipping Pinecone upsert.");
    }

    // 🔹 Use Gemini AI for Resume Analysis
    let summary = "No summary available";
    if (resumeText && resumeText.trim() !== "") {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(`Summarize this resume: ${resumeText}`);
      summary = await response.response.text();
    }

    return NextResponse.json({ message: "Candidate submitted successfully!", summary }, { status: 201 });

  } catch (error: any) {
    console.error("🔥 Internal Server Error:", error);

    return NextResponse.json(
      { error: "Something went wrong!", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
