"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Heart, FileQuestion, Lock, ArrowLeft, Search, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";
import ShinyText from "@/components/ui/ShinyText"; // Assuming this exists as used in NotesPage

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const enabledSemesters = new Set(["1", "2", "3", "4", "5", "6", "7", "8"]);

// Data synchronized from app/semester/[semester]/pyqs/page.tsx
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

export default function PYQsPage() {
  const { theme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewState, setViewState] = useState<"list" | "semester" | "subject">("list");

  const { favorites, isFavorite, toggleFavorite } = useFavoriteItems("pyq");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedSemester) setViewState("list");
    else if (selectedSemester && !selectedSubject) setViewState("semester");
    else if (selectedSemester && selectedSubject) setViewState("subject");
  }, [selectedSemester, selectedSubject]);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const handleSemesterClick = (sem: string, isLocked: boolean) => {
    if (isLocked) return;
    setSelectedSemester(sem);
    setSelectedSubject(null);
    setQuery("");
    setShowFavoritesOnly(false);
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleBackToSemesters = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  const handleFavoriteClick = (sem: number, sub: string) => {
    // Check auth
    if (sem >= 3 && !session) {
      window.location.href = `/auth/signin?callbackUrl=/pyqs`;
      return;
    }
    setSelectedSemester(sem.toString());
    setSelectedSubject(sub);
  };

  const currentSemesterSubjects = useMemo(() => {
    if (!selectedSemester) return [];
    return subjectsBySemester[Number(selectedSemester)] || [];
  }, [selectedSemester]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = currentSemesterSubjects;

    if (q) {
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (showFavoritesOnly) {
      if (selectedSemester) {
        const semNum = Number(selectedSemester);
        filtered = filtered.filter((s) =>
          isFavorite({ semester: semNum, subject: s.name })
        );
      }
    }

    return filtered;
  }, [query, currentSemesterSubjects, showFavoritesOnly, isFavorite, selectedSemester]);

  // Find current subject detail
  const currentSubjectDetail = useMemo(() => {
    if (!selectedSemester || !selectedSubject) return null;
    const subs = subjectsBySemester[Number(selectedSemester)] || [];
    return subs.find(s => s.name === selectedSubject);
  }, [selectedSemester, selectedSubject]);


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
          <AnimatePresence mode="wait">
            {/* VIEW 1: SEMESTER LIST */}
            {viewState === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-10">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                    >
                      <FileQuestion className="h-8 w-8 text-emerald-500" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      PYQs
                    </h1>
                  </div>
                  <p className="text-muted-foreground">
                    Select a semester to open previous year question papers.
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">All Semesters available</Badge>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="semesters" className="mx-auto max-w-5xl">
                  <div className="flex justify-center mb-8">
                    <TabsList className="bg-card/50 border border-emerald-500/20">
                      <TabsTrigger value="semesters" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
                        All Semesters
                      </TabsTrigger>
                      <TabsTrigger value="favorites" className="gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
                        <Heart className="h-4 w-4" />
                        Favorites
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({favorites.length})
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="semesters">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {semesters.map((sem, index) => {
                        const semNum = Number(sem);

                        // Semesters 3-8: Require authentication
                        const requiresAuth = semNum >= 3;
                        const isLocked = requiresAuth && !session;

                        // Semesters 6-8: Show "Coming soon" after auth, "Sign in" before auth
                        if (semNum >= 6) {
                          if (isLocked) {
                            // Not logged in - show sign in required
                            return (
                              <motion.div
                                key={sem}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/auth/signin?callbackUrl=/pyqs`}
                                  className="group block focus-visible:outline-none"
                                >
                                  <Card className="h-full bg-card border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] group-hover:border-red-500/50 group-focus-visible:ring-2 group-focus-visible:ring-red-500">
                                    <CardHeader className="pb-4">
                                      <div className="flex items-center gap-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 text-sm font-bold text-red-400">
                                          <Lock className="h-4 w-4" />
                                        </span>
                                        <CardTitle className="text-foreground">Semester {sem}</CardTitle>
                                      </div>
                                      <CardDescription>Sign in to access</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="pt-0">
                                      <span className="text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors">
                                        Sign in →
                                      </span>
                                    </CardFooter>
                                  </Card>
                                </Link>
                              </motion.div>
                            );
                          }

                          // Logged in - show Coming soon
                          return (
                            <motion.div
                              key={sem}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="h-full bg-card/50 border-border/30 opacity-60">
                                <CardHeader className="pb-4">
                                  <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                                      {sem}
                                    </span>
                                    <CardTitle className="text-muted-foreground">Semester {sem}</CardTitle>
                                  </div>
                                  <CardDescription>Coming soon</CardDescription>
                                </CardHeader>
                                <CardFooter className="pt-0">
                                  <Badge variant="secondary" className="text-xs">Not available</Badge>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          );
                        }

                        // Semesters 3-5: Require authentication (variables already declared above)

                        if (isLocked) {
                          return (
                            <motion.div
                              key={sem}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={`/auth/signin?callbackUrl=/pyqs`}
                                className="group block focus-visible:outline-none"
                              >
                                <Card className="h-full bg-card border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] group-hover:border-red-500/50 group-focus-visible:ring-2 group-focus-visible:ring-red-500">
                                  <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2">
                                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 text-sm font-bold text-red-400">
                                        <Lock className="h-4 w-4" />
                                      </span>
                                      <CardTitle className="text-foreground">Semester {sem}</CardTitle>
                                    </div>
                                    <CardDescription>Sign in to access</CardDescription>
                                  </CardHeader>
                                  <CardFooter className="pt-0">
                                    <span className="text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors">
                                      Sign in →
                                    </span>
                                  </CardFooter>
                                </Card>
                              </Link>
                            </motion.div>
                          );
                        }

                        // Semesters 1-2 (always open) or 3-5 (authenticated)
                        return (
                          <motion.div
                            key={sem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSemesterClick(sem, false)}
                            className="cursor-pointer"
                          >
                            <Card className="group h-full bg-card border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] group-hover:border-emerald-500/50 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
                              <CardHeader className="pb-4">
                                <div className="flex items-center gap-2">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-sm font-bold text-emerald-400">
                                    {sem}
                                  </span>
                                  <CardTitle className="text-foreground">Semester {sem}</CardTitle>
                                </div>
                                <CardDescription>View subject-wise PYQs</CardDescription>
                              </CardHeader>
                              <CardFooter className="pt-0">
                                <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                  Open →
                                </span>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="favorites">
                    {favorites.length === 0 ? (
                      <div className="text-center py-10 rounded-2xl border border-emerald-500/20 bg-card/50">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <p className="text-muted-foreground">No favorite PYQs yet.</p>
                        <p className="text-sm text-muted-foreground mt-2">Browse semesters and click the heart icon to save favorite subjects.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((fav, index) => (
                          <motion.div
                            key={`${fav.semester}-${fav.subject}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleFavoriteClick(fav.semester, fav.subject)}
                            className="cursor-pointer"
                          >
                            <Card className={cn(
                              "h-full relative bg-card border-emerald-500/20 transition-all duration-300",
                              "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                              "hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/40",
                              "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            )}>
                              <CardHeader className="pb-3">
                                <Badge className="w-fit mb-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                                  Semester {fav.semester}
                                </Badge>
                                <CardTitle className="text-lg text-foreground line-clamp-1">{fav.subject.replace(/-/g, " ")}</CardTitle>
                              </CardHeader>
                              <CardFooter>
                                <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                  Go to PYQs →
                                </span>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* VIEW 2: SEMESTER VIEW (Subject List) */}
            {viewState === "semester" && (
              <motion.div
                key="semester"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Header Actions */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Button
                    variant="ghost"
                    className="gap-2 text-muted-foreground hover:text-emerald-400"
                    onClick={handleBackToSemesters}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Semesters
                  </Button>
                  <div className="flex gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">PYQs</Badge>
                    {favorites.filter(f => f.semester === Number(selectedSemester)).length > 0 && (
                      <Badge className="bg-emerald-600 text-white">
                        {favorites.filter(f => f.semester === Number(selectedSemester)).length} Favorites
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
                      Semester {selectedSemester}
                    </h1>
                  </div>
                  <p className="text-muted-foreground">
                    Select a subject to open the PYQs folder.
                  </p>
                </motion.div>

                {/* Search */}
                <div className="mx-auto w-full max-w-md mb-10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search subjects..."
                      aria-label="Search subjects"
                      className="pl-9 bg-card/50 border-emerald-500/20 focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject, index) => {
                      const semNum = Number(selectedSemester);
                      const isFav = isFavorite({ semester: semNum, subject: subject.name });

                      return (
                        <motion.div
                          key={subject.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSubjectClick(subject.name)}
                          className="cursor-pointer"
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
                                "absolute right-2 top-2 h-8 w-8 z-10 rounded-full border bg-background/80 backdrop-blur-sm transition-all",
                                isFav
                                  ? "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500"
                                  : "border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite({ semester: semNum, subject: subject.name, url: subject.link });
                              }}
                              title={isFav ? "Remove from favorites" : "Add to favorites"}
                            >
                              <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                            </Button>

                            <CardHeader className="pb-4 pr-14">
                              <CardTitle className="text-base sm:text-lg text-foreground">{subject.name}</CardTitle>
                              <CardDescription>PYQs Available</CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0">
                              <span className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                                View Details →
                              </span>
                            </CardFooter>
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
              </motion.div>
            )}

            {/* VIEW 3: SUBJECT DETAIL */}
            {viewState === "subject" && selectedSemester && selectedSubject && currentSubjectDetail && (
              <motion.div
                key="subject"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Back Button - Same position as VIEW 2 */}
                <Button
                  variant="ghost"
                  className="gap-2 text-muted-foreground hover:text-emerald-400 mb-6"
                  onClick={handleBackToSubjects}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Subjects
                </Button>

                <div className="mx-auto max-w-2xl px-4">
                  <Card className="border-emerald-500/20 bg-card/50 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />

                    <CardHeader className="relative">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight">
                            <ShinyText text={selectedSubject.replace(/-/g, " ")} speed={3} />
                          </CardTitle>
                          <CardDescription className="text-emerald-500/80 font-medium">
                            Semester {selectedSemester} • Previous Year Questions
                          </CardDescription>
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "shrink-0 rounded-full transition-all",
                            isFavorite({ semester: Number(selectedSemester), subject: selectedSubject })
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                              : "border-border bg-background/50 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50"
                          )}
                          onClick={() => toggleFavorite({ semester: Number(selectedSemester), subject: selectedSubject, url: currentSubjectDetail.link })}
                        >
                          <Heart className={cn("h-5 w-5", isFavorite({ semester: Number(selectedSemester), subject: selectedSubject }) && "fill-current")} />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="relative space-y-6 pt-2">
                      <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 sm:p-6">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <FileQuestion className="h-5 w-5 text-emerald-500" />
                          Study Material
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Access the collection of previous year question papers on Google Drive.
                        </p>

                        {currentSubjectDetail.link && currentSubjectDetail.link !== "#" ? (
                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 group"
                            size="lg"
                            asChild
                          >
                            <Link href={currentSubjectDetail.link} target="_blank" rel="noopener noreferrer">
                              Open PYQs in Drive
                              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        ) : (
                          <Button className="w-full" variant="secondary" size="lg" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
