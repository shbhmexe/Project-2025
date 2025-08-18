"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const subjectsBySemester: Record<number, string[]> = {
  1: ["Mathematics-I", "Semiconductor-Physics", "English", "Basic-Electrical-Engineering", "EDG-Sheets", "Physics-Lab", "BEE-Lab"],
  2: ["Mathematics-II", "Chemistry-I", "PPS", "Workshop-Technology", "Chemistry-Lab-1", "Programming-in-C-Lab", "Language-Lab", "Manufacturing-lab"],
  // 3: ["DBMS", "OS", "CN"],
  // 4: ["AI", "ML", "Software Engineering"],
  // 5: ["Mathematics", "Physics", "Chemistry"],
  // 6: ["Data Structures", "OOPs", "Discrete Math"],
  // 7: ["DBMS", "OS", "CN"],
  // 8: ["AI", "ML", "Software Engineering"],
};

export default function SemesterPage() {
  const params = useParams();

  // ✅ Proper type assertion for params
  const semesterParam = params?.semester;
  
  // ✅ Handle cases where semester is undefined or an array
  if (!semesterParam || Array.isArray(semesterParam)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-500">
        ❌ Error: Semester not found!
      </div>
    );
  }

  // ✅ Convert string to number safely
  const semesterNum = Number(semesterParam);
  const subjects = subjectsBySemester[semesterNum] || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 transition-all duration-300 bg-background text-foreground"
    >
      {/* Semester Header */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center"
      >
        📚 Select Subject for Semester{" "}
        <span className="text-primary">{semesterNum}</span>
      </motion.h1>

      {/* Grid for Subjects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl md:max-w-2xl">
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <motion.div
              key={subject}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/semester/${semesterNum}/subjects/${subject}`}
                className="px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center bg-card text-foreground border border-border hover:shadow-md"
              >
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  {subject}
                </motion.span>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 sm:col-span-3 text-center text-lg text-muted-foreground">
            ⚠️ No subjects found for this semester.
          </div>
        )}
      </div>
    </motion.div>
  );
}
