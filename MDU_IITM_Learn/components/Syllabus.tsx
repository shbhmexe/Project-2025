"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Heart, FileText, Search, ArrowLeft, Lock, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LightPillar from "./LightPillar";

import { syllabusData } from "@/app/Syllabus/syllabusData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";

const AVAILABLE_SEMESTERS = ["semester1", "semester2", "semester3", "semester4", "semester5", "semester6", "semester7", "semester8"] as const;
const ALL_SEMESTERS_NUM = [1, 2, 3, 4, 5, 6, 7, 8];

type AvailableSemester = (typeof AVAILABLE_SEMESTERS)[number];

function getSemesterNumber(semesterKey: string): number {
  return parseInt(semesterKey.replace("semester", ""));
}

export default function Syllabus() {
  const [activeTab, setActiveTab] = useState("semesters");
  const [selectedSemester, setSelectedSemester] = useState<AvailableSemester | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [viewState, setViewState] = useState<"list" | "semester" | "subject">("list");
  const [query, setQuery] = useState("");
  const { theme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const { favorites, toggleFavorite, isFavorite } = useFavoriteItems("syllabus");

  const filterSubjects = (semesterKey: AvailableSemester) => {
    const entries = Object.entries(syllabusData[semesterKey] || {});
    const q = query.trim().toLowerCase();
    let filtered = entries;

    if (q) {
      filtered = filtered.filter(([subject]) => subject.toLowerCase().includes(q));
    }

    return filtered;
  };

  const handleSemesterClick = (semNum: number) => {
    setSelectedSemester(`semester${semNum}` as AvailableSemester);
    setViewState("semester");
    setQuery("");
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setViewState("subject");
  };

  const handleBackToSemesters = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
    setViewState("list");
    setQuery("");
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setViewState("semester");
  };

  const getSubjectLink = (subject: string): string => {
    if (!selectedSemester) return "";
    const semData = syllabusData[selectedSemester];
    return semData?.[subject] || "";
  };

  const enabledSemestersSet = useMemo(() => {
    return new Set(AVAILABLE_SEMESTERS.map(s => getSemesterNumber(s)));
  }, []);

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
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              >
                <FileText className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Syllabus
              </h1>
            </div>
            <p className="text-muted-foreground">
              Semester-wise syllabus links for all branches.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">All Semesters available</Badge>
            </div>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-card/50 border border-emerald-500/20">
                  <TabsTrigger
                    value="semesters"
                    className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    All Semesters
                  </TabsTrigger>
                  <TabsTrigger
                    value="favorites"
                    className="gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    <Heart className="h-4 w-4" />
                    Favorites
                    <span className="ml-1 text-xs text-muted-foreground">({favorites.length})</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="semesters">
                <AnimatePresence mode="wait">
                  {/* VIEW 1: SEMESTER LIST */}
                  {viewState === "list" && (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      {ALL_SEMESTERS_NUM.map((sem, index) => {
                        // Semesters 3-8: Require authentication
                        const requiresAuth = sem >= 3;
                        const isLocked = requiresAuth && !session;

                        // Semesters 6-8: Show "Coming soon" after auth, "Sign in" before auth
                        if (sem >= 6) {
                          if (isLocked) {
                            return (
                              <motion.div
                                key={sem}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/auth/signin`}
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

                        // Semesters 3-5: Require authentication
                        if (isLocked) {
                          return (
                            <motion.div
                              key={sem}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={`/auth/signin`}
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
                            onClick={() => handleSemesterClick(sem)}
                            className="cursor-pointer group block focus-visible:outline-none"
                          >
                            <Card className="h-full bg-card border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] group-hover:border-emerald-500/50 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
                              <CardHeader className="pb-4">
                                <div className="flex items-center gap-2">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-sm font-bold text-emerald-400">
                                    {sem}
                                  </span>
                                  <CardTitle className="text-foreground">Semester {sem}</CardTitle>
                                </div>
                                <CardDescription>View Syllabus</CardDescription>
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
                    </motion.div>
                  )}

                  {/* VIEW 2: SUBJECT LIST */}
                  {viewState === "semester" && selectedSemester && (
                    <motion.div
                      key="subjects"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                        <Button
                          variant="ghost"
                          className="gap-2 text-muted-foreground hover:text-emerald-400 self-start sm:self-auto"
                          onClick={handleBackToSemesters}
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to Semesters
                        </Button>

                        <div className="w-full sm:max-w-md relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search subjects..."
                            className="pl-9 bg-card/50 border-emerald-500/20 focus:border-emerald-500/50"
                          />
                        </div>
                      </div>

                      {/* Header for Subject List */}
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground">
                          Semester {getSemesterNumber(selectedSemester)} Syllabus
                        </h2>
                        <p className="text-muted-foreground mt-2">Select a subject to view details</p>
                      </div>

                      {/* Subject Grid */}
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filterSubjects(selectedSemester).map(([subject, link], index) => {
                          const semNum = getSemesterNumber(selectedSemester);
                          const isFav = isFavorite({ semester: semNum, subject });

                          return (
                            <motion.div
                              key={subject}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleSubjectClick(subject)}
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
                                    "absolute right-2 top-2 h-8 w-8 rounded-full border bg-background/80 backdrop-blur-sm transition-all z-10",
                                    isFav
                                      ? "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500"
                                      : "border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite({ semester: semNum, subject, url: link });
                                  }}
                                  title={isFav ? "Remove from favorites" : "Add to favorites"}
                                >
                                  <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                                </Button>
                                <CardHeader className="pb-4 pr-14">
                                  <CardTitle className="text-base sm:text-lg text-foreground">{subject}</CardTitle>
                                  <CardDescription>Click to view syllabus</CardDescription>
                                </CardHeader>
                                <CardFooter className="pt-0">
                                  <span className="text-sm font-medium text-emerald-400">
                                    View Details →
                                  </span>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          );
                        })}
                        {filterSubjects(selectedSemester).length === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full rounded-2xl border border-emerald-500/20 bg-card/50 p-8 text-center"
                          >
                            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                            <p className="text-muted-foreground">
                              {`No subjects match "${query.trim()}".`}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* VIEW 3: SUBJECT DETAIL */}
                  {viewState === "subject" && selectedSemester && selectedSubject && (
                    <motion.div
                      key="subject-detail"
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
                                <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight text-emerald-400">
                                  {selectedSubject}
                                </CardTitle>
                                <CardDescription className="text-emerald-500/80 font-medium">
                                  Semester {getSemesterNumber(selectedSemester)} • Subject Syllabus
                                </CardDescription>
                              </div>

                              <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                  "shrink-0 rounded-full transition-all",
                                  isFavorite({ semester: getSemesterNumber(selectedSemester), subject: selectedSubject })
                                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                    : "border-border bg-background/50 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50"
                                )}
                                onClick={() => {
                                  const semNum = getSemesterNumber(selectedSemester);
                                  toggleFavorite({ semester: semNum, subject: selectedSubject, url: getSubjectLink(selectedSubject) });
                                }}
                              >
                                <Heart className={cn("h-5 w-5", isFavorite({ semester: getSemesterNumber(selectedSemester), subject: selectedSubject }) && "fill-current")} />
                              </Button>
                            </div>
                          </CardHeader>

                          <CardContent className="relative space-y-6 pt-2">
                            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 sm:p-6">
                              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-emerald-500" />
                                Syllabus Document
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Access the complete syllabus and course outline for this subject.
                              </p>

                              {getSubjectLink(selectedSubject) ? (
                                <Button
                                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 group"
                                  size="lg"
                                  asChild
                                >
                                  <a href={getSubjectLink(selectedSubject)} target="_blank" rel="noopener noreferrer">
                                    Open Syllabus
                                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  </a>
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
              </TabsContent>

              <TabsContent value="favorites">
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((fav, index) => (
                      <motion.div
                        key={`${fav.semester}-${fav.subject}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className={cn(
                          "h-full relative bg-card border-emerald-500/20 transition-all duration-300",
                          "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                          "hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/40",
                          "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        )}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "absolute right-2 top-2 h-8 w-8 rounded-full border bg-background/80 backdrop-blur-sm transition-all",
                              "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500"
                            )}
                            onClick={() => toggleFavorite(fav)}
                            title="Remove from favorites"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                          <CardHeader className="pb-4 pr-14">
                            <CardTitle className="text-base sm:text-lg text-foreground">{fav.subject}</CardTitle>
                            <CardDescription>Semester {fav.semester}</CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <Button
                              asChild
                              size="sm"
                              className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                            >
                              <a href={fav.url || "#"} target="_blank" rel="noopener noreferrer">
                                Open
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-emerald-500/20 bg-card/50 p-8 text-center"
                  >
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      No favorite syllabus items yet. Browse semesters and tap the heart to save subjects here.
                    </p>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
