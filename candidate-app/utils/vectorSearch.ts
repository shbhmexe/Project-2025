import { pineconeIndex } from "./pineconeClient";
import { generateEmbedding } from "./geminiClient";

export async function searchCandidates(queryText: string) {
    try {
        console.log("🔹 Generating embedding for query text...");

        // ✅ Generate embedding from the query text
        const queryEmbedding = await generateEmbedding(queryText);

        // ✅ Ensure the returned value is an array of numbers
        if (!Array.isArray(queryEmbedding) || queryEmbedding.some(isNaN)) {
            throw new Error("❌ Invalid embedding format received");
        }

        console.log("🔹 Query Embedding:", queryEmbedding);

        // ✅ Perform search query in Pinecone
        console.log("🔹 Querying Pinecone for similar candidates...");
        const queryResult = await pineconeIndex.query({
            vector: queryEmbedding, // ✅ Ensure it's a valid vector
            topK: 5,
            includeMetadata: true,
        });

        console.log("✅ Pinecone Query Result:", queryResult.matches);

        return queryResult.matches;
    } catch (error) {
        if (error instanceof Error) {
            console.error("🔥 Error in searchCandidates:", error.message);
        } else {
            console.error("🔥 Unknown error in searchCandidates:", error);
        }
        throw new Error("Failed to search candidates. See logs for details.");
    }
    
}
