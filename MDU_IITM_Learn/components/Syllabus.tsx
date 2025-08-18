"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { syllabusData } from "@/app/Syllabus/syllabusData";

export default function Syllabus() {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const subjectSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSemesterClick = (semester: string) => {
    setSelectedSemester(semester);

    setTimeout(() => {
      subjectSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // Bring subjects to the center
      });
    }, 300);
  };

  return (
    <div className="p-6 text-center mb-12 bg-background text-foreground">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center px-4 mt-32 sm:mt-40 md:mt-52">
        For All Branch
      </h1>
      <br />
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center px-4 mb-4">
        Select a Semester (Syllabus) :
      </h1>

      {/* Semester Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20">
        {Object.keys(syllabusData).map((semester) => {
          const isAvailable = semester === "semester1" || semester === "semester2";

          return (
            <button
              key={semester}
              onClick={() => isAvailable && handleSemesterClick(semester)}
              disabled={!isAvailable}
            >
              <motion.div
                whileHover={isAvailable ? { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 102, 255, 0.3)" } : {}}
                whileTap={isAvailable ? { scale: 0.97 } : {}}
                className={`p-4 rounded-lg transition-all text-lg font-semibold text-center ${
                  isAvailable
                    ? "card border border-border bg-card text-foreground hover:shadow-md"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {semester.replace("semester", "Semester ")}{" "}
                {!isAvailable && "(Not Available)"}
              </motion.div>
            </button>
          );
        })}
      </div>

      {/* Subject Selection */}
      {selectedSemester && (
        <div className="mt-8 pb-20" ref={subjectSectionRef}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Subjects in {selectedSemester.replace("semester", "Semester ")} (Syllabus) :
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {Object.entries(syllabusData[selectedSemester]).map(([subject, link]) => (
              <motion.button
                key={subject}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(128, 0, 128, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="p-4 button-secondary w-full"
                onClick={() => window.open(link, "_blank")}
              >
                {subject}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
