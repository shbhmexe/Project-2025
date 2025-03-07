import express from "express";
import { createReferral, getReferrals, sendReferralEmail } from "../controllers/referralController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Referral API is working!" });
});

router.post("/", createReferral); // Fix POST route
router.get("/", getReferrals); // Fix GET route
router.post("/send-referral-email", sendReferralEmail); // Email route

export default router;
