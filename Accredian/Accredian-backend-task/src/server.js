import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import referralRoutes from "./routes/referralRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Fix Routes
app.use("/api/referrals", referralRoutes);

// ✅ Database Connection
connectDB()
  .then(() => {
    console.log("✅ Database connected. Starting server...");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Database connection failed. Server not started.", error);
    process.exit(1);
  });
