"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const subjectsBySemester: Record<number, string[]> = {
  1: ["Mathematics-I", "Semiconductor-Physics", "English", "Basic-Electrical-Engineering"],
  2: ["Mathematics-II", "Chemistry", "Programming", "Workshop"],
};

export default function SubjectPage() {
  const params = useParams() as { semester?: string }; // 👈 Explicitly define the expected type
  const router = useRouter();
  
  const semesterNum = Number(params.semester); // 👈 Now `params.semester` is correctly inferred

  if (isNaN(semesterNum) || !subjectsBySemester[semesterNum]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">Invalid Semester</h1>
        <p>Please go back and select a valid semester.</p>
      </div>
    );
  }

  const subjects = subjectsBySemester[semesterNum];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black 
      text-black dark:text-white transition-all duration-300">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Select Your <span className="text-blue-600">Subject :</span>
      </h1>

      {/* Subject Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((subject, index) => (
          <motion.button
            key={subject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center w-44
              bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            onClick={() => router.push(`/youtube-explanation/semester/${semesterNum}/${subject}`)}
          >
            {subject}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
