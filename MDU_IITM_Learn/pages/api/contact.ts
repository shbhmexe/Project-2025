import { clientPromise } from "@/app/lib/mongodb";  // ✅ Named import
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/app/lib/nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("MDU_ITM_LEARN"); // Apne database ka naam dal
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.collection("contacts").insertOne({ name, email, message });

    // Send confirmation email
    const emailResponse = await sendEmail(email, "Contact Form Submission", "Thank you for reaching out. We will get back to you soon!");
    if (!emailResponse.success) {
      console.error("❌ Email Error:", emailResponse.message);
    }

    return res.status(201).json({ message: "Form submitted successfully", result, emailResponse });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
