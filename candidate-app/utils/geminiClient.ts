import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        console.log("🔹 Sending request to Gemini API for embeddings...");

        
        const model = genAI.getGenerativeModel({ model: "embedding-gecko" });

        // ✅ Use the correct API call
        const result = await model.embedContent(text);

        console.log("✅ Gemini API Response:", result); 

        return result.embedding.values;  
    } catch (error) {
        console.error("🔥 Gemini API Error:", error);
        throw error;
    }
}
