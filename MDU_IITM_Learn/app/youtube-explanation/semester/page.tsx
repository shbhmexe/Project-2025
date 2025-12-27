"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Heart, Youtube, Lock, ArrowLeft, Search, ExternalLink, PlayCircle } from "lucide-react";
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
import ShinyText from "@/components/ui/ShinyText"; // Assuming usage

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const enabledSemesters = new Set(["1", "2", "3", "4", "5", "6", "7", "8"]);

// Data synchronized from app/youtube-explanation/semester/[semester]/page.tsx
const subjectsBySemester: Record<number, string[]> = {
  1: ["Mathematics-I", "Semiconductor-Physics", "English", "Basic-Electrical-Engineering"],
  2: ["Mathematics-II", "Chemistry-I", "PPS", "Workshop-Technology"],
  3: ["Database-Management-Systems", "Data-Structures-and-Algorithms", "Digital-Electronics", "Python-Programming", "Mathematics-III", "Economics-for-Engineers", "Database-Management-Systems-LAB", "Digital-Electronics-LAB", "Data-Structures-and-Algorithms-LAB-Using-C", "Python-Programming-LAB"],
  4: ["Discrete-Mathematics", "Computer-Organization-and-Architecture", "Operating-System", "Object-Oriented-Programming", "Organizational-Behaviour", "Environmental-Sciences", "Web-Technologies", "Operating-System-LAB", "Object-Oriented-Programming-LAB-Using-Cpp", "Web-Technologies-Lab"],
  5: ["Microprocessor", "Computer-Networks", "Formal-Languages-and-Automata", "Design-and-Analysis-of-Algorithms", "Programming-in-Java", "Software-Engineering"],
};

// Data synchronized from app/youtube-explanation/semester/[semester]/[subject]/page.tsx
const unitsBySubject: Record<string, string[]> = {
  "Mathematics-I": [
    "1", "2", "3", "4",
    "Beta Gamma Function", "Evolutes and Involutes", "Taylor Series",
    "Maclaurin Series", "Inner Space Product", "Revision All Unit"
  ],
  "Semiconductor-Physics": ["1", "2", "3", "4"],
  "English": ["1", "2"],
  "Basic-Electrical-Engineering": ["1", "2", "3", "4", "Electrical ONE SHOT"],
};

// Data synchronized from app/youtube-explanation/semester/[semester]/[subject]/[unit]/page.tsx
const videoLinks: Record<string, Record<string, string>> = {
  "Mathematics-I": {
    "1": "https://youtu.be/sHSlfJugXe4?si=UuR95RMmok5Z_qaZ",
    "2": "https://www.youtube.com/watch?v=pfN1_rrEEuw",
    "3": "https://www.youtube.com/watch?v=_6oRqxY6O5w",
    "4": "https://www.youtube.com/watch?v=cZkscKSX_9I&list=PLhSp9OSVmeyIVQpCt2kwsC1dNVl1GwlVn&index=28",
    "Beta Gamma Function": "https://www.youtube.com/watch?v=ffNpqBVyYew",
    "Evolutes and Involutes": "https://www.youtube.com/watch?v=WBVtY0J-b54",
    "Maclaurin Series": "https://youtu.be/nS29gTQj8lo?si=WyNep0aQHUWP8t5t",
    "Taylor Series": "https://www.youtube.com/watch?v=0bHky1ocA1Y",
    "Inner Space Product": "https://www.youtube.com/watch?v=2e03K_056t0",
    "Revision All Unit": "https://youtube.com/playlist?list=PL-vEH_IPWrhBjbOkN4PWzhyJpdLloDB_L&si=YkOwZTJ8Zzn1Emsy"
  },
  "Semiconductor-Physics": {
    "1": "https://www.youtube.com/watch?v=3QQWi8Rtaxg&list=PLbEcQ5OsD1QWPzPxBFaVTzsHIY1yF0DU6",
    "2": "https://www.youtube.com/watch?v=o-WGSVrsS_Y&list=PLY19sFAAjnoMQr_-4_fKx82Gv-wfu0FnR",
    "3": "https://www.youtube.com/watch?v=b28Kg0o2iT8&list=PL3qvHcrYGy1u112gfsHycdWaLTVRt8ame&index=47",
    "4": "https://www.youtube.com/watch?v=8vNs1b3NP8A&list=PL3qvHcrYGy1u112gfsHycdWaLTVRt8ame&index=37"
  },
  "Basic-Electrical-Engineering": {
    "1": "https://www.youtube.com/watch?v=63gk5V0FtUo&list=PLohtAIfLLw8c5V9dTc4S1auZUfjDYarbM&index=11",
    "2": "https://www.youtube.com/watch?v=nt6anUZjfxM&list=PLohtAIfLLw8f53yvI4ue84hn4k_vqiIWX",
    "3": "https://www.youtube.com/watch?v=SWHJqYVro5o&list=PLohtAIfLLw8fFa2TGj3ZjUvS42nWFUQK3",
    "4": "https://www.youtube.com/watch?v=IbHHMWUQaB0&list=PL9RcWoqXmzaL1q8tiuQwo0p7xL2aV_bNe",
    "Electrical ONE SHOT": "https://www.youtube.com/playlist?list=PL-vEH_IPWrhAda9e2l6QtfYQASGFA5yPS"
  },
  "English": {
    "1": "https://www.youtube.com/watch?v=wMb-CQSKLiA&list=PL3qvHcrYGy1sU_1nMMVrfFEhYROpQtVXV",
    "2": "https://www.youtube.com/watch?v=5EWrcsK3q7g",
  }
};

function prettyLabel(slug: string) {
  return slug.replace(/-/g, " ");
}

function unitLabel(unit: string) {
  return /^\d+$/.test(unit) ? `Unit ${unit}` : unit;
}

export default function YouTubeSemesterPage() {
  const { theme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewState, setViewState] = useState<"list" | "semester" | "subject">("list");

  const { favorites, isFavorite, toggleFavorite } = useFavoriteItems("youtube");

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
    if (sem >= 3 && !session) {
      window.location.href = `/auth/signin?callbackUrl=/youtube-explanation/semester`;
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
      filtered = filtered.filter((s) => s.toLowerCase().includes(q));
    }

    if (showFavoritesOnly) {
      if (selectedSemester) {
        const semNum = Number(selectedSemester);
        filtered = filtered.filter((s) =>
          isFavorite({ semester: semNum, subject: s })
        );
      }
    }

    return filtered;
  }, [query, currentSemesterSubjects, showFavoritesOnly, isFavorite, selectedSemester]);

  const currentUnits = useMemo(() => {
    if (!selectedSubject) return [];
    return unitsBySubject[selectedSubject] || [];
  }, [selectedSubject]);

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
                      <Youtube className="h-8 w-8 text-emerald-500" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      YouTube
                    </h1>
                  </div>
                  <p className="text-muted-foreground">
                    Select a semester to browse subject-wise unit playlists and explanations.
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
                        <span className="ml-1 text-xs text-muted-foreground">({favorites.length})</span>
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
                                <Link href={`/auth/signin?callbackUrl=/youtube-explanation/semester`} className="group block focus-visible:outline-none">
                                  <Card className="h-full bg-card border-red-500/30 shadow-lg transition-all group-hover:border-red-500/50">
                                    <CardHeader>
                                      <div className="flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-red-400" />
                                        <CardTitle>Semester {sem}</CardTitle>
                                      </div>
                                      <CardDescription>Sign in to access</CardDescription>
                                    </CardHeader>
                                    <CardFooter><span className="text-red-400 text-sm">Sign in →</span></CardFooter>
                                  </Card>
                                </Link>
                              </motion.div>
                            );
                          }

                          // Logged in - show Coming soon
                          return (
                            <motion.div key={sem} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: index * 0.05 }}>
                              <Card className="h-full bg-card/50 opacity-60">
                                <CardHeader>
                                  <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                                      {sem}
                                    </span>
                                    <CardTitle className="text-muted-foreground">Semester {sem}</CardTitle>
                                  </div>
                                  <CardDescription>Coming soon</CardDescription>
                                </CardHeader>
                                <CardFooter>
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
                              <Link href={`/auth/signin?callbackUrl=/youtube-explanation/semester`} className="group block focus-visible:outline-none">
                                <Card className="h-full bg-card border-red-500/30 shadow-lg transition-all group-hover:border-red-500/50">
                                  <CardHeader>
                                    <div className="flex items-center gap-2">
                                      <Lock className="h-4 w-4 text-red-400" />
                                      <CardTitle>Semester {sem}</CardTitle>
                                    </div>
                                    <CardDescription>Sign in to access</CardDescription>
                                  </CardHeader>
                                  <CardFooter><span className="text-red-400 text-sm">Sign in →</span></CardFooter>
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
                            <Card className="group h-full bg-card border-emerald-500/30 shadow-lg transition-all group-hover:border-emerald-500/50">
                              <CardHeader>
                                <div className="flex items-center gap-2">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">{sem}</span>
                                  <CardTitle>Semester {sem}</CardTitle>
                                </div>
                                <CardDescription>Browse subjects</CardDescription>
                              </CardHeader>
                              <CardFooter><span className="text-emerald-400 text-sm group-hover:text-emerald-300">Open →</span></CardFooter>
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
                        <p className="text-muted-foreground">No favorite subjects yet.</p>
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
                            <Card className="group h-full bg-card border-emerald-500/30 hover:border-emerald-500/60 transition-all">
                              <CardHeader>
                                <Badge className="w-fit mb-2 bg-emerald-500/10 text-emerald-500">Semester {fav.semester}</Badge>
                                <CardTitle>{prettyLabel(fav.subject)}</CardTitle>
                              </CardHeader>
                              <CardFooter><span className="text-emerald-400 text-sm">View Units →</span></CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* VIEW 2: SEMESTER VIEW (SUBJECT LIST) */}
            {viewState === "semester" && (
              <motion.div
                key="semester"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Button variant="ghost" onClick={handleBackToSemesters} className="gap-2 text-muted-foreground hover:text-emerald-400">
                    <ArrowLeft className="h-4 w-4" /> Back to Semesters
                  </Button>
                  <div className="flex gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">YouTube</Badge>
                    {favorites.filter(f => f.semester === Number(selectedSemester)).length > 0 && (
                      <Badge className="bg-emerald-600 text-white">{favorites.filter(f => f.semester === Number(selectedSemester)).length} Favorites</Badge>
                    )}
                  </div>
                </div>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">Semester {selectedSemester}</h1>
                  <p className="text-muted-foreground">Select a subject to browse unit playlists.</p>

                  <div className="flex items-center justify-center mt-6">
                    <div className="relative w-full max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subjects..." className="pl-9 bg-card/50 border-emerald-500/20" />
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSubjects.length === 0 ? (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">No subjects found.</p>
                    </div>
                  ) : (
                    filteredSubjects.map((subject, index) => {
                      const semNum = Number(selectedSemester);
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
                          <Card className={cn("h-full relative bg-card border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg transition-all", isFav && "border-emerald-500/40 shadow-md")}>
                            <Button
                              variant="ghost" size="icon"
                              className={cn("absolute right-2 top-2 z-10 rounded-full border bg-background/80", isFav ? "text-emerald-500 border-emerald-500/50" : "text-muted-foreground border-border/50")}
                              onClick={(e) => { e.stopPropagation(); toggleFavorite({ semester: semNum, subject }); }}
                            >
                              <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                            </Button>
                            <CardHeader>
                              <CardTitle>{prettyLabel(subject)}</CardTitle>
                              <CardDescription>Browse units</CardDescription>
                            </CardHeader>
                            <CardFooter><span className="text-emerald-400 text-sm">View Units →</span></CardFooter>
                          </Card>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 3: SUBJECT DETAIL (UNIT LIST) */}
            {viewState === "subject" && selectedSemester && selectedSubject && (
              <motion.div
                key="subject"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Back Button - Same position as VIEW 2 */}
                <Button variant="ghost" onClick={handleBackToSubjects} className="mb-6 gap-2 text-muted-foreground hover:text-emerald-400">
                  <ArrowLeft className="h-4 w-4" /> Back to Subjects
                </Button>

                <div className="mx-auto max-w-5xl">

                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h1 className="text-3xl font-bold"><ShinyText text={prettyLabel(selectedSubject)} speed={3} /></h1>
                      <p className="text-emerald-500/80">Semester {selectedSemester} • YouTube Playlists</p>
                    </div>
                    <Button
                      variant="outline" size="icon"
                      className={cn("rounded-full", isFavorite({ semester: Number(selectedSemester), subject: selectedSubject }) ? "text-emerald-500 border-emerald-500" : "text-muted-foreground")}
                      onClick={() => toggleFavorite({ semester: Number(selectedSemester), subject: selectedSubject })}
                    >
                      <Heart className={cn("h-5 w-5", isFavorite({ semester: Number(selectedSemester), subject: selectedSubject }) && "fill-current")} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {currentUnits.length > 0 ? (
                      currentUnits.map((unit, index) => {
                        const link = videoLinks[selectedSubject]?.[unit];
                        return (
                          <motion.div
                            key={unit}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {link ? (
                              <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                <Card className="h-full bg-card border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg transition-all group">
                                  <CardHeader>
                                    <div className="flex items-center justify-between">
                                      <CardTitle className="text-lg">{unitLabel(unit)}</CardTitle>
                                      <PlayCircle className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <CardDescription>Watch on YouTube</CardDescription>
                                  </CardHeader>
                                  <CardFooter>
                                    <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                                      Play Video <ExternalLink className="h-3 w-3" />
                                    </span>
                                  </CardFooter>
                                </Card>
                              </a>
                            ) : (
                              <Card className="h-full bg-card/50 opacity-60">
                                <CardHeader>
                                  <CardTitle className="text-muted-foreground">{unitLabel(unit)}</CardTitle>
                                  <CardDescription>Coming soon</CardDescription>
                                </CardHeader>
                              </Card>
                            )}
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-10 rounded-2xl border border-emerald-500/10 bg-card/30">
                        <p className="text-muted-foreground">No units found for this subject.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.main >
    </div >
  );
}
