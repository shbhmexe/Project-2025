import pdfParse from "pdf-parse";
import fs from "fs/promises"; // ✅ Use fs/promises for async file handling

export async function parseResume(filePath: string): Promise<string> {
  try {
    // ✅ Ensure file exists before reading
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error("❌ File does not exist:", filePath);
      throw new Error("Resume file not found.");
    }

    const dataBuffer = await fs.readFile(filePath); // ✅ Use async read
    const data = await pdfParse(dataBuffer);

    return data.text || ""; // ✅ Ensure it never returns undefined
  } catch (error) {
    console.error("🔥 Error parsing PDF:", error);
    throw new Error("Failed to parse the resume.");
  }
}
