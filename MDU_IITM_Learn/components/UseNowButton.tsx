"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UseNowButton() {
  return (
    <Link href="/cgpa">
      <motion.button
        className="relative bg-gradient-to-r from-[#2563EB] to-[#9333EA] hover:from-[#1E40AF] hover:to-[#7E22CE] text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg overflow-hidden transition-100"
        whileHover={{
          scale: 1.1, // Slight scaling on hover
          boxShadow: "0px 10px 20px rgba(147, 51, 234, 0.5)", // Soft purple-blue glow
        }}
        whileTap={{ scale: 0.95 }} // Slight shrink when clicked
      >
        USE NOW

        {/* Light reflection animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white opacity-10"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.button>
    </Link>

  );
}
