"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Common/Breadcrumb";


const CgpaCalculator = () => {
  const [numSubjects, setNumSubjects] = useState("");
  const [marks, setMarks] = useState<string[]>([]);
  const [credits, setCredits] = useState<string[]>([]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [grade, setGrade] = useState<string>("");

  // Function to map marks to grades
  const getGrade = (marks: number): { grade: string; points: number } => {
    if (marks >= 90) return { grade: "O", points: 10 };
    if (marks >= 80) return { grade: "A+", points: 9 };
    if (marks >= 70) return { grade: "A", points: 8 };
    if (marks >= 60) return { grade: "B+", points: 7 };
    if (marks >= 50) return { grade: "B", points: 6 };
    if (marks >= 40) return { grade: "C", points: 5 };
    if (marks >= 35) return { grade: "P", points: 4 };
    return { grade: "F", points: 0 };
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const num = parseInt(value, 10);
    if (num > 10) {
      alert("Enter a number between 1 and 10.");
      return;
    }

    setNumSubjects(value);
    setMarks(new Array(num).fill(""));
    setCredits(new Array(num).fill(""));
  };

  const handleMarksChange = (index: number, value: string) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const handleCreditChange = (index: number, value: string) => {
    const newCredits = [...credits];
    newCredits[index] = value;
    setCredits(newCredits);
  };

  const calculateCGPA = () => {
    if (!marks.length || !credits.length) {
      alert("Please enter valid marks and credits.");
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    marks.forEach((mark, index) => {
      const numericMarks = Number(mark);
      const credit = Number(credits[index]);

      if (!isNaN(numericMarks) && !isNaN(credit) && numericMarks >= 0 && credit > 0) {
        const { points } = getGrade(numericMarks);
        totalPoints += points * credit;
        totalCredits += credit;
      } else {
        alert(`Invalid input at Subject ${index + 1}`);
        return;
      }
    });

    const calculatedCGPA = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
    setCgpa(calculatedCGPA);

    // Assign Overall Grade Based on CGPA
    const finalGrade = getGrade(calculatedCGPA * 10).grade;
    setGrade(finalGrade);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground">
      <motion.h1
        className="text-3xl font-bold mb-6 mt-36 text-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      
        📊 CGPA Calculator
      </motion.h1>

      <motion.label
        className="text-lg font-semibold mb-2 block text-muted-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        📝 Number of Subjects (1-10):
      </motion.label>

      <motion.input
        type="text"
        value={numSubjects}
        onChange={handleSubjectChange}
        className="bg-card text-foreground p-3 rounded-lg mb-4 text-center w-44 border border-border focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/70"
        placeholder="🔢 Enter number of subjects"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {marks.length > 0 && (
        <div className="w-full max-w-md card p-4">
          <table className="w-full text-center">
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-muted text-foreground transition duration-300"
              >
                <motion.th
                  whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                  className="p-3 border border-border rounded-lg text-foreground"
                >
                  Subject
                </motion.th>
                <motion.th
                  whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                  className="p-3 border border-border rounded-lg text-foreground"
                >
                  Marks
                </motion.th>
                <motion.th
                  whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                  className="p-3 border border-border rounded-lg text-foreground"
                >
                  Credits
                </motion.th>
              </motion.tr>

            </thead>
            <tbody>
              {marks.map((_, index) => (
                <tr key={index}>
                  <motion.td
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="p-3 text-foreground border border-border rounded-lg bg-accent/40 transition duration-300"
                  >
                    Subject {index + 1}
                  </motion.td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={marks[index]}
                      onChange={(e) => handleMarksChange(index, e.target.value)}
                      className="bg-card text-foreground p-1 w-12 text-center border border-border rounded"
                      placeholder="100"
                    />
                  </td>
                  <td className="p-2">
                    <motion.input
                      type="text"
                      value={credits[index]}
                      onChange={(e) => handleCreditChange(index, e.target.value)}
                      className="bg-card text-foreground p-2 w-16 text-center rounded-md border border-border focus:ring-2 focus:ring-ring focus:outline-none transition-all duration-300"
                      placeholder="4"
                      whileFocus={{ scale: 1.05 }}
                      whileHover={{ scale: 1.02 }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 🔥 Calculate CGPA Button */}
      <motion.div
        whileHover={{
          scale: 1.1, // Smooth scaling on hover
        }}
        whileTap={{ scale: 0.95 }} // Slight shrink effect on tap
        className="relative overflow-hidden mt-3"
      >
        <button
          onClick={calculateCGPA}
          className="button-primary px-8 py-4 text-base relative block"
        >
          🔥 Calculate CGPA
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </button>
      </motion.div>



      {cgpa !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-4 rounded-lg shadow-lg text-center card"
        >
          {/* CGPA Value */}
          <motion.h2
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="text-2xl font-extrabold text-primary"
          >
            Your CGPA is: {cgpa}
          </motion.h2>

          {/* Equivalent Grade */}
          <motion.h3
            whileHover={{ scale: 1.1 }}
            className="text-lg font-medium text-muted-foreground transition duration-200 mt-2"
          >
            Equivalent Grade: {grade}
          </motion.h3>
        </motion.div>
      )}
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl mt-6 mb-4 card"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-foreground">How to Use the CGPA Calculator</h2>

        <p className="mb-4 text-muted-foreground text-center">
          The CGPA (Cumulative Grade Point Average) is calculated using the formula:
        </p>

        {/* CGPA Formula Box */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 255, 255, 0.5)" }}
          className="p-4 rounded-md mb-4 text-center font-semibold text-primary bg-accent border border-border"
        >
          CGPA = (Sum of (Grade Points × Credits)) ÷ (Total Credits)
        </motion.div>

        {/* Marks to Grade Conversion */}
        <h3 className="text-xl font-semibold mb-2 text-primary">Marks to Grade Conversion:</h3>
        <ul className="list-disc list-inside text-muted-foreground mb-4">
          {[
            { range: "90 - 100", grade: "O", points: "10" },
            { range: "80 - 89", grade: "A+", points: "9" },
            { range: "70 - 79", grade: "A", points: "8" },
            { range: "60 - 69", grade: "B+", points: "7" },
            { range: "50 - 59", grade: "B", points: "6" },
            { range: "40 - 49", grade: "C", points: "5" },
            { range: "35 - 39", grade: "P", points: "4" },
            { range: "Below 35", grade: "F", points: "0" },
          ].map(({ range, grade, points }) => (
            <motion.li
              whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              key={grade}
              className="font-semibold transition duration-200"
            >
              <b>{range}</b>: {grade} ({points} Points)
            </motion.li>
          ))}
        </ul>

        {/* CGPA Division */}
        <h3 className="text-xl font-semibold mb-2 text-primary">CGPA Division:</h3>
        <ul className="list-disc list-inside text-muted-foreground">
          {[
            { label: "Third Division", range: "4.00 - 4.99" },
            { label: "Second Division", range: "5.00 - 6.49" },
            { label: "First Division", range: "6.50 or above" },
            { label: "Exemplary Performance", range: "CGPA of 10 (only if all courses are passed on the first attempt)" },
          ].map(({ label, range }) => (
            <motion.li
              whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              key={label}
              className="font-semibold transition duration-200"
            >
              <strong>{label}:</strong> {range}
            </motion.li>
          ))}
        </ul>
      </motion.div>



    </div>
  );
};

export default CgpaCalculator;
