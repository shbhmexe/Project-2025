"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UseNowButton() {
  return (
    <Link href="/cgpa">
      <motion.button
        className="relative button-secondary px-6 py-3 rounded-md text-lg font-semibold overflow-hidden"
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{ scale: 0.98 }}
      >
        USE NOW

        {/* Light reflection animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white/10"
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
