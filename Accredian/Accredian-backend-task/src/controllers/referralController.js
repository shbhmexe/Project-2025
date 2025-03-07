import { prisma } from "../config/db.js";
import { sendEmail } from "../utils/emailService.js";

// Function to create a referral
export const createReferral = async (req, res) => {
  const { userName, userEmail, friendName, friendEmail, course } = req.body;

  try {
    const newReferral = await prisma.referral.create({
      data: {
        userName,
        userEmail,
        friendName,
        friendEmail,
        course,
      },
    });

    res.status(201).json({ message: "Referral created successfully", newReferral });
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: "Failed to create referral" });
  }
};

// Fetch referrals
export const getReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    res.status(500).json({ error: "Failed to fetch referrals" });
  }
};

// Send Referral Email
export const sendReferralEmail = async (req, res) => {
  const { email, name } = req.body;
  try {
    await sendEmail(email, "You got a Referral!", `Hello ${name}, you have been referred!`);
    res.status(200).json({ message: "Referral email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};
