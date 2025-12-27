"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Heart, FileQuestion, Search } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";

const subjectsBySemester: Record<number, { name: string; link: string }[]> = {
  1: [
    {
      name: "Mathematics - 1",
      link: "https://drive.google.com/drive/folders/1jPBob5pCBv9Ddh7PcU5iMdPJF1KDu4rE?usp=sharing",
    },
    {
      name: "Semiconductor Physics",
      link: "https://drive.google.com/drive/folders/1PmR4R3zxFnWyUq9IHxgrlsx5PQuQTZVL?usp=drive_link",
    },
    {
      name: "English",
      link: "https://drive.google.com/drive/folders/1DkizK3aTQ5wTLuqhwCtooTtZfzuNLJXj?usp=sharing",
    },
    {
      name: "Basic Electrical Engineering",
      link: "https://drive.google.com/drive/folders/1fpYPmC3qPJH_DqeG9E5kvBzIYu8vETSG?usp=drive_link",
    },
  ],
  2: [
    {
      name: "Mathematics-II",
      link: "https://drive.google.com/drive/folders/1qYA8sZTuhWhr_H-nRE_i_iJawAEHNkm_?usp=drive_link",
    },
    {
      name: "Chemistry-I",
      link: "https://drive.google.com/drive/folders/1eor4OspUxRJt7o4aKm0XTifQZk3ma0KD?usp=sharing",
    },
    {
      name: "PPS",
      link: "https://drive.google.com/drive/folders/1jQYnqrFXjlhLI5zXjsSk3zyz0i92LcWV?usp=drive_link",
    },
    {
      name: "Workshop Technology",
      link: "https://drive.google.com/drive/folders/18EP9O6bcMTv9kgFnszftTOcKgIkHkmc5?usp=sharing",
    },
  ],
  3: [
    { name: "Database-Management-Systems", link: "#" },
    { name: "Data-Structures-and-Algorithms", link: "#" },
    { name: "Digital-Electronics", link: "#" },
    { name: "Python-Programming", link: "#" },
    { name: "Mathematics-III", link: "#" },
    { name: "Economics-for-Engineers", link: "#" },
    { name: "Database-Management-Systems-LAB", link: "#" },
    { name: "Digital-Electronics-LAB", link: "#" },
    { name: "Data-Structures-and-Algorithms-LAB-Using-C", link: "#" },
    { name: "Python-Programming-LAB", link: "#" },
  ],
  4: [
    { name: "Discrete-Mathematics", link: "#" },
    { name: "Computer-Organization-and-Architecture", link: "#" },
    { name: "Operating-System", link: "#" },
    { name: "Object-Oriented-Programming", link: "#" },
    { name: "Organizational-Behaviour", link: "#" },
    { name: "Environmental-Sciences", link: "#" },
    { name: "Web-Technologies", link: "#" },
    { name: "Operating-System-LAB", link: "#" },
    { name: "Object-Oriented-Programming-LAB-Using-Cpp", link: "#" },
    { name: "Web-Technologies-Lab", link: "#" },
  ],
  5: [
    { name: "Microprocessor", link: "#" },
    { name: "Computer-Networks", link: "#" },
    { name: "Formal-Languages-and-Automata", link: "#" },
    { name: "Design-and-Analysis-of-Algorithms", link: "#" },
    { name: "Programming-in-Java", link: "#" },
    { name: "Software-Engineering", link: "#" },
    { name: "Microprocessor-Lab", link: "#" },
    { name: "Computer-Networks-Lab", link: "#" },
    { name: "Design-and-Analysis-of-Algorithms-Using-Cpp", link: "#" },
    { name: "Programming-in-Java-Lab", link: "#" },
    { name: "Practical-Training-1", link: "#" },
  ],
};

export default function PYQSubjectsPage() {
  const params = useParams();

  const semesterParam = params?.semester;
  const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
  const semesterNum = Number(semester);

  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, isFavorite, toggleFavorite } = useFavoriteItems("pyq");
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const subjects = useMemo(() => {
    return subjectsBySemester[semesterNum] || [];
  }, [semesterNum]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = subjects;

    if (q) {
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter((s) =>
        isFavorite({ semester: semesterNum, subject: s.name })
      );
    }

    return filtered;
  }, [query, subjects, showFavoritesOnly, isFavorite, semesterNum]);

  if (!semester || Number.isNaN(semesterNum) || subjects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Invalid semester.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Animation for Dark Mode */}
      <div className="absolute inset-0 -z-30 bg-background" />
      {isDarkMode && (
        <div className="absolute inset-0 -z-20 hidden lg:block overflow-hidden opacity-20 pointer-events-none">
          <LightPillar
            topColor="#10b981"
            bottomColor="#059669"
            intensity={0.8}
            rotationSpeed={0.2}
            glowAmount={0.003}
            pillarWidth={2.0}
            pillarHeight={0.3}
            noiseIntensity={0.5}
            pillarRotation={45}
            interactive={false}
            mixBlendMode="normal"
          />
        </div>
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 min-h-screen pt-32 md:pt-40 pb-16"
      >
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-emerald-400">
              <Link href="/pyqs">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">PYQs</Badge>
              {favorites.filter(f => f.semester === semesterNum).length > 0 && (
                <Badge className="bg-emerald-600 text-white">
                  {favorites.filter(f => f.semester === semesterNum).length} Favorites
                </Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <FileQuestion className="h-8 w-8 text-emerald-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Semester {semesterNum}
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select a subject to open the PYQs folder.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mx-auto w-full max-w-md mb-10 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subjects..."
                aria-label="Search subjects"
                className="pl-9 bg-card/50 border-emerald-500/20 focus:border-emerald-500/50"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              title="Show favorites only"
              className={cn(
                "border-emerald-500/30",
                showFavoritesOnly
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                  : "text-muted-foreground hover:text-emerald-400"
              )}
            >
              <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-current")} />
            </Button>
          </div>

          {/* Subjects Grid */}
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => {
                const isFav = isFavorite({ semester: semesterNum, subject: subject.name });

                return (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={cn(
                      "h-full relative bg-card border-emerald-500/20 transition-all duration-300",
                      "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                      "hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/40",
                      isFav && "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    )}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute right-2 top-2 h-8 w-8 rounded-full border bg-background/80 backdrop-blur-sm transition-all",
                          isFav
                            ? "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500"
                            : "border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                        )}
                        onClick={() => toggleFavorite({ semester: semesterNum, subject: subject.name, url: subject.link })}
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                      </Button>
                      <a
                        href={subject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <CardHeader className="pb-4 pr-14">
                          <CardTitle className="text-base sm:text-lg text-foreground">{subject.name}</CardTitle>
                          <CardDescription>Open in Google Drive</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <span className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                            Open →
                          </span>
                        </CardFooter>
                      </a>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full rounded-2xl border border-emerald-500/20 bg-card/50 p-8 text-center"
              >
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  {showFavoritesOnly ? "No favorites in this semester." : `No subjects match "${query.trim()}".`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
