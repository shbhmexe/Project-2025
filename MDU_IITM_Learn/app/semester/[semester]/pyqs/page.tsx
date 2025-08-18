"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const subjectsBySemester: Record<number, { name: string; link: string }[]> = {
  1: [
    { name: "Mathematics - 1", link: "https://drive.google.com/drive/folders/1jPBob5pCBv9Ddh7PcU5iMdPJF1KDu4rE?usp=sharing" },
    { name: "Semiconductor Physics", link: "https://drive.google.com/drive/folders/1PmR4R3zxFnWyUq9IHxgrlsx5PQuQTZVL?usp=drive_link" },
    { name: "English", link: "https://drive.google.com/drive/folders/1DkizK3aTQ5wTLuqhwCtooTtZfzuNLJXj?usp=sharing" },
    { name: "Basic Electrical Engineering", link: "https://drive.google.com/drive/folders/1fpYPmC3qPJH_DqeG9E5kvBzIYu8vETSG?usp=drive_link" },
  ],
  2: [
    { name: "Mathematics-II", link: "https://drive.google.com/drive/folders/1qYA8sZTuhWhr_H-nRE_i_iJawAEHNkm_?usp=drive_link" },
    { name: "Chemistry-I", link: "https://drive.google.com/drive/folders/1eor4OspUxRJt7o4aKm0XTifQZk3ma0KD?usp=sharing" },
    { name: "PPS", link: "https://drive.google.com/drive/folders/1jQYnqrFXjlhLI5zXjsSk3zyz0i92LcWV?usp=drive_link" },
    { name: "Workshop Technology", link: "https://drive.google.com/drive/folders/18EP9O6bcMTv9kgFnszftTOcKgIkHkmc5?usp=sharing" },
  ],
};

export default function PYQSubjectsPage() {
  const params = useParams();
  
  // ✅ Safely extract semester param
  const semesterParam = params?.semester;
  const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
  const semesterNum = Number(semester);

  // ✅ Handle invalid semester
  if (isNaN(semesterNum) || !subjectsBySemester[semesterNum]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">Invalid Semester</h1>
        <p className="text-lg">Please go back and select a valid semester or Not available right now.</p>
      </div>
    );
  }

  const subjects = subjectsBySemester[semesterNum];

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
        📜 Select Subject for PYQs{" "}
        <span className="text-primary">Semester {semesterNum}</span>
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl md:max-w-2xl">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a
              href={subject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 sm:px-6 sm:py-4 text-md sm:text-lg font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center bg-card text-foreground border border-border hover:shadow-md"
            >
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {subject.name}
              </motion.span>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}