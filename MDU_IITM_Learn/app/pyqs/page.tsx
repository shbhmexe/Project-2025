"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function PYQsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 transition-all duration-300 bg-background text-foreground"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center"
      >
        📜 Select Your{" "}
        <span className="text-primary">Semester for PYQs</span>
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl md:max-w-2xl">
        {semesters.map((sem, index) => (
          <motion.div
            key={sem}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
              {sem === "1" || sem === "2" ?  (
              <Link
                href={`/semester/${sem}/pyqs`}
                className="px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center bg-card text-foreground border border-border hover:shadow-md"
              >
                <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  Semester {sem}
                </motion.span>
              </Link>
              ) : (
              <div
                  className="px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold text-muted-foreground bg-muted cursor-not-allowed rounded-lg shadow-md flex items-center justify-center"
              >
                🚫 Not Available
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
