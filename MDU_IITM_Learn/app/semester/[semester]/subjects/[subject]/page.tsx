"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const notesLinks: Record<string, string> = {
  "Mathematics-I": "https://drive.google.com/drive/folders/1HZQi4FTLiciTWfu1vfAxZHHLeHFlKxRM?usp=sharing",
  "Semiconductor-Physics": "https://drive.google.com/drive/folders/1L0_rhXxBJydjD19vYv74CGn1GhaVS-Vh?usp=drive_link",
  "English": "https://drive.google.com/drive/folders/1Slhm_7XzByZy-GdMjfyAZsXBhKXydRDB?usp=sharing",
  "Basic-Electrical-Engineering": "https://drive.google.com/drive/folders/1f63yzhipcUgf_b0bbmIRCqQSwYu9F4nz?usp=sharing",
  "BEE-Lab": "https://drive.google.com/file/d/1mHz3-W-liZ4q5nGIdOMVQCTpl_Mn4CAn/view?usp=sharing",
  "EDG-Sheets": "https://drive.google.com/file/d/1c27l7qrD87pTXG1WV_5HaEfn0qcNEqmq/view?usp=sharing",
  "Physics-Lab": "https://drive.google.com/drive/folders/1Ei-umh3fas6wzz52kJZbZsPBVpg2kurI?usp=sharing",
};

export default function SubjectPage() {
  const params = useParams() as Record<string, string>;
  const subject = params?.subject ?? ""; // Handle null case
  const notesLink = notesLinks[subject] || "#";

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black text-gray-900 dark:text-white"
    >
      {/* Heading with Animation */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 text-center flex flex-col items-center"
      >
        <span className="text-cyan-400">📖 Download Notes for</span>
        <span className="text-yellow-400">{subject}</span>
      </motion.h1>

      {/* Animated Download Button */}
      <motion.div
        className="relative w-full max-w-xs md:max-w-md h-[100px] md:h-[120px] rounded-xl p-1"
        whileHover={{ scale: 1.05 }}
      >
        {/* Inner Box */}
        <motion.a
          href={notesLink}
          target="_blank"
          className="flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md overflow-hidden relative text-lg font-bold"
          whileHover={{ scale: 1.05 }}
          style={{
            backgroundColor: "#2563eb", // Blue color for both themes
            color: "white",
          }}
        >
          <span>🔥 Get {subject} Notes</span>
          <span className="text-sm opacity-75">Click to Download</span>

          {/* Light Flow Animation */}
          <motion.div
            className="absolute inset-0 bg-white opacity-10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
