import { clientPromise } from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/app/lib/nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required!" });
  }

  try {
    // MongoDB Connection
    const client = await clientPromise;
    const db = client.db("MDU_ITM_LEARN");
    const collection = db.collection("subscribers");

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email is already subscribed!" });
    }

    // Insert subscriber into database
    await collection.insertOne({ name, email, subscribedAt: new Date() });

    // Send confirmation email
    const emailResponse = await sendEmail(
      email,
      "Subscription Confirmation - MDU ITM Learn",
      `Hello ${name},\n\nThank you for subscribing to our newsletter! Stay tuned for future updates.\n\nBest regards,\nMDU ITM Learn`
    );

    if (!emailResponse.success) {
      return res.status(500).json({ error: "Failed to send confirmation email." });
    }

    return res.status(200).json({ message: "Subscribed successfully! Check your email." });
  } catch (error) {
    console.error("Subscription Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
