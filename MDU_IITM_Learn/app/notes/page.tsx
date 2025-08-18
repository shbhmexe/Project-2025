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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 transition-all duration-300 bg-background text-foreground"
    >
      {/* Branches Header */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-muted-foreground"
      >
        🏫 Branches:{" "}
        <span className="text-primary">CSE & Related</span>
      </motion.h2>

      {/* Semester Header */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center"
      >
        📚 Select Your{" "}
        <span className="text-primary">Semester</span>
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
                className={`px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center ${isEnabled ? "bg-card text-foreground border border-border hover:shadow-md" : "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"}`}
              >
                <motion.span whileHover={isEnabled ? { scale: 1.03 } : {}} whileTap={isEnabled ? { scale: 0.98 } : {}}>
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
