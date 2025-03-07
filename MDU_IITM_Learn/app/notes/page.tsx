"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function NotesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 transition-all duration-300 
      bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black 
      text-black dark:text-white"
    >
      {/* Branches Header */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-gray-700 dark:text-gray-300"
      >
        🏫 Branches:{" "}
        <span className="text-purple-500 dark:text-purple-400">CSE & Related</span>
      </motion.h2>

      {/* Semester Header */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center"
      >
        📚 Select Your{" "}
        <span className="text-blue-500 dark:text-cyan-400">Semester</span>
      </motion.h1>

      {/* Responsive Grid for Semesters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl md:max-w-2xl">
        {semesters.map((sem, index) => {
          const isEnabled = sem === "1" || sem === "2"; // Only enable Sem 1 & 2

          return (
            <motion.div
              key={sem}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={isEnabled ? `/semester/${sem}` : "#"}
                className={`px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                ${isEnabled 
                  ? "text-gray-900 dark:text-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 cursor-pointer" 
                  : "text-gray-400 dark:text-gray-600 bg-gray-300 dark:bg-gray-800 cursor-not-allowed pointer-events-none"
                }`}
              >
                <motion.span whileHover={isEnabled ? { scale: 1.1 } : {}} whileTap={isEnabled ? { scale: 0.9 } : {}}>
                  Semester {sem} {isEnabled ? "" : "🚫"}
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
