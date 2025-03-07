"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SemesterPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black 
      text-black dark:text-white transition-all duration-300"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        Select Your <span className="text-blue-600">Semester :</span>
      </motion.h1>

      {/* Semester Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {semesters.map((semester, index) => {
          const isEnabled = semester === 1; // Enable only Semester 1 for now

          return (
            <motion.button
              key={semester}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={isEnabled ? { scale: 1.1 } : {}}
              whileTap={isEnabled ? { scale: 0.95 } : {}}
              onClick={() => isEnabled && router.push(`/youtube-explanation/semester/${semester}`)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center w-36
                ${isEnabled 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer" 
                  : "bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-500 cursor-not-allowed"
                }`}
            >
              Semester {semester} {!isEnabled && "🚫"}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
