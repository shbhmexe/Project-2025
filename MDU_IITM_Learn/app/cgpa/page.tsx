"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Sparkles, GraduationCap, TrendingUp, Award, BookOpen } from "lucide-react";

const gradeData = [
  { range: "90 - 100", grade: "O", points: 10, color: "from-emerald-500 to-teal-500" },
  { range: "80 - 89", grade: "A+", points: 9, color: "from-green-500 to-emerald-500" },
  { range: "70 - 79", grade: "A", points: 8, color: "from-blue-500 to-cyan-500" },
  { range: "60 - 69", grade: "B+", points: 7, color: "from-indigo-500 to-blue-500" },
  { range: "50 - 59", grade: "B", points: 6, color: "from-purple-500 to-indigo-500" },
  { range: "40 - 49", grade: "C", points: 5, color: "from-yellow-500 to-orange-500" },
  { range: "35 - 39", grade: "P", points: 4, color: "from-orange-500 to-red-500" },
  { range: "Below 35", grade: "F", points: 0, color: "from-red-500 to-rose-600" },
];

const divisionData = [
  { label: "Third Division", range: "4.00 - 4.99", icon: "🥉" },
  { label: "Second Division", range: "5.00 - 6.49", icon: "🥈" },
  { label: "First Division", range: "6.50 or above", icon: "🥇" },
  { label: "Exemplary", range: "CGPA 10 (all first attempts)", icon: "🏆" },
];

const CgpaCalculator = () => {
  const [numSubjects, setNumSubjects] = useState("");
  const [marks, setMarks] = useState<string[]>([]);
  const [credits, setCredits] = useState<string[]>([]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [grade, setGrade] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);

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
    setCgpa(null);
    setGrade("");
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

    setIsCalculating(true);

    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < marks.length; i++) {
      const numericMarks = Number(marks[i]);
      const credit = Number(credits[i]);

      if (isNaN(numericMarks) || isNaN(credit) || numericMarks < 0 || credit <= 0) {
        alert(`Invalid input at Subject ${i + 1}`);
        setIsCalculating(false);
        return;
      }

      const { points } = getGrade(numericMarks);
      totalPoints += points * credit;
      totalCredits += credit;
    }

    setTimeout(() => {
      const calculatedCGPA = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
      setCgpa(calculatedCGPA);
      const finalGrade = getGrade(calculatedCGPA * 10).grade;
      setGrade(finalGrade);
      setIsCalculating(false);
    }, 800);
  };

  const getCgpaColor = () => {
    if (cgpa === null) return "text-primary";
    if (cgpa >= 9) return "text-emerald-500";
    if (cgpa >= 7) return "text-blue-500";
    if (cgpa >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
            >
              <Calculator className="h-8 w-8 text-emerald-500" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              CGPA Calculator
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Calculate your Cumulative Grade Point Average instantly with our modern calculator
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-6 md:p-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            {/* Subject Input */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <BookOpen className="h-4 w-4" />
                Number of Subjects (1-10)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={numSubjects}
                onChange={handleSubjectChange}
                className="w-full bg-background/50 text-foreground p-4 rounded-xl text-center text-lg font-semibold border-2 border-border/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-muted-foreground/50"
                placeholder="Enter 1-10"
              />
            </div>

            {/* Subject Table */}
            <AnimatePresence>
              {marks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 mb-6"
                >
                  <div className="grid grid-cols-3 gap-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Subject</span>
                    <span className="text-center">Marks</span>
                    <span className="text-center">Credits</span>
                  </div>
                  {marks.map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-3 gap-3 items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-sm font-bold text-emerald-500">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium hidden sm:block">Subject</span>
                      </div>
                      <input
                        type="text"
                        value={marks[index]}
                        onChange={(e) => handleMarksChange(index, e.target.value)}
                        className="w-full bg-background/50 p-3 rounded-xl text-center border border-border/50 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                        placeholder="0-100"
                      />
                      <input
                        type="text"
                        value={credits[index]}
                        onChange={(e) => handleCreditChange(index, e.target.value)}
                        className="w-full bg-background/50 p-3 rounded-xl text-center border border-border/50 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                        placeholder="1-5"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateCGPA}
              disabled={isCalculating || marks.length === 0}
              className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isCalculating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Calculate CGPA
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Result */}
            <AnimatePresence>
              {cgpa !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center"
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="relative"
                    >
                      <svg className="w-24 h-24 -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          strokeWidth="8"
                          fill="none"
                          className="stroke-border"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          className="stroke-emerald-500"
                          initial={{ strokeDasharray: "0 251.2" }}
                          animate={{ strokeDasharray: `${(cgpa / 10) * 251.2} 251.2` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${getCgpaColor()}`}>{cgpa}</span>
                      </div>
                    </motion.div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Your CGPA</p>
                      <p className={`text-3xl font-bold ${getCgpaColor()}`}>{cgpa}/10</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span className="text-amber-500 font-semibold">Grade: {grade}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Grade Conversion */}
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-xl">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Marks to Grade Conversion
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {gradeData.map((item, i) => (
                  <motion.div
                    key={item.grade}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="p-3 rounded-xl bg-accent/50 border border-border/50"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{item.range}</span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded bg-gradient-to-r ${item.color} text-white`}>
                        {item.grade}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.points} Points</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Division */}
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-xl">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                <GraduationCap className="h-5 w-5 text-emerald-500" />
                CGPA Divisions
              </h3>
              <div className="space-y-3">
                {divisionData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border/30"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.range}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20"
            >
              <p className="text-sm text-muted-foreground mb-2">Formula</p>
              <p className="font-mono text-sm font-semibold text-emerald-400">
                CGPA = Σ(Grade Points × Credits) ÷ Total Credits
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CgpaCalculator;
