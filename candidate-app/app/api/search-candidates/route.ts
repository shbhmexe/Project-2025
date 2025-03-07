import { NextResponse } from "next/server";
import { pineconeIndex } from "@/utils/pineconeClient";
import { generateEmbedding } from "@/utils/geminiClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        console.log("🔹 API request received for candidate search...");

        // ✅ Parse JSON body safely
        const body = await req.json();
        const { query } = body || {};

        if (!query || typeof query !== "string") {
            console.error("❌ Invalid query input");
            return NextResponse.json({ error: "Query must be a non-empty string" }, { status: 400 });
        }

        console.log("🔹 Generating embedding for search query:", query);

        // ✅ Generate embedding from query text
        const queryEmbedding: number[] = await generateEmbedding(query);

        if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
            console.error("❌ Failed to generate valid query embedding");
            return NextResponse.json({ error: "Failed to generate query embedding" }, { status: 500 });
        }

        console.log("🔹 Query Embedding Generated:", queryEmbedding);

        // ✅ Query Pinecone for best matching candidates
        console.log("🔹 Searching in Pinecone...");
        const queryResult = await pineconeIndex.query({
            vector: queryEmbedding,
            topK: 5, // Fetch top 5 best matches
            includeMetadata: true,
        });

        console.log("🔹 Pinecone Query Result:", queryResult);

        if (!queryResult || !queryResult.matches || queryResult.matches.length === 0) {
            console.log("❌ No matching candidates found in Pinecone.");
            return NextResponse.json({ message: "No relevant candidates found" }, { status: 404 });
        }

        // ✅ Extract candidate IDs safely
        const candidateIds = queryResult.matches
            .map((match) => match.metadata?.id)
            .filter((id) => id !== undefined && id !== null);

        console.log("🔹 Extracted Candidate IDs:", candidateIds);

        if (candidateIds.length === 0) {
            console.error("❌ Candidates found in Pinecone but missing metadata ID");
            return NextResponse.json({ message: "Candidates exist in Pinecone but metadata ID is missing" }, { status: 404 });
        }

        // ✅ Fetch candidate details from PostgreSQL
        console.log("🔹 Fetching candidate details from PostgreSQL...");
        const candidates = await prisma.candidate.findMany({
            where: {
                id: { in: candidateIds },
            },
        });

        if (!candidates || candidates.length === 0) {
            console.log("❌ No matching candidates found in PostgreSQL.");
            return NextResponse.json({ message: "Candidates found in Pinecone but not in PostgreSQL" }, { status: 404 });
        }

        console.log("✅ Successfully fetched candidates:", candidates);
        return NextResponse.json({ candidates });
    } catch (error) {
        console.error("🔥 Error in search API:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}
