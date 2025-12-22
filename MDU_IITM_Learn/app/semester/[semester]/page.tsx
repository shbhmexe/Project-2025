"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Heart, BookOpen, Search } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useFavoriteNotes } from "@/lib/favorite-notes";
import { cn } from "@/lib/utils";

const subjectsBySemester: Record<number, string[]> = {
  1: [
    "Mathematics-I",
    "Semiconductor-Physics",
    "English",
    "Basic-Electrical-Engineering",
    "EDG-Sheets",
    "Physics-Lab",
    "BEE-Lab",
  ],
  2: [
    "Mathematics-II",
    "Chemistry-I",
    "PPS",
    "Workshop-Technology",
    "Chemistry-Lab-1",
    "Programming-in-C-Lab",
    "Language-Lab",
    "Manufacturing-lab",
  ],
};

export default function SemesterPage() {
  const params = useParams();

  const semesterParam = params?.semester;
  const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
  const semesterNum = Number(semester);

  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, toggleFavorite } = useFavoriteNotes();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const favoriteKeys = useMemo(() => {
    return new Set(favorites.map((f) => `${f.semester}:${f.subject}`));
  }, [favorites]);

  const subjects = useMemo(() => {
    return subjectsBySemester[semesterNum] || [];
  }, [semesterNum]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.toLowerCase().includes(q));
  }, [query, subjects]);

  const visibleSubjects = useMemo(() => {
    if (!showFavoritesOnly) return filteredSubjects;
    return filteredSubjects.filter((subject) => favoriteKeys.has(`${semesterNum}:${subject}`));
  }, [favoriteKeys, filteredSubjects, semesterNum, showFavoritesOnly]);

  if (!semester || Number.isNaN(semesterNum)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Error: Semester not found!
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
              <Link href="/notes">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowFavoritesOnly((v) => !v)}
                className={cn(
                  "gap-2 border-emerald-500/30",
                  showFavoritesOnly
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                )}
                aria-pressed={showFavoritesOnly}
              >
                <Heart className="h-4 w-4" fill={showFavoritesOnly ? "currentColor" : "none"} />
                Favorites
              </Button>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Notes</Badge>
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
                <BookOpen className="h-8 w-8 text-emerald-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Semester {semesterNum}
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select a subject to open the notes folder/file.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mx-auto w-full max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subjects..."
                aria-label="Search subjects"
                className="pl-10 bg-card/50 border-emerald-500/20 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSubjects.length > 0 ? (
              visibleSubjects.map((subject, index) => {
                const favKey = `${semesterNum}:${subject}`;
                const isFav = favoriteKeys.has(favKey);

                return (
                  <motion.div
                    key={subject}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/semester/${semesterNum}/subjects/${subject}`}
                      className="group block focus-visible:outline-none"
                    >
                      <Card
                        className={cn(
                          "h-full bg-card border-emerald-500/20 transition-all duration-300",
                          "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                          "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/40",
                          "group-focus-visible:ring-2 group-focus-visible:ring-emerald-500",
                          isFav && "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        )}
                      >
                        <CardHeader className="pb-4 pr-14">
                          <CardTitle className="text-base sm:text-lg text-foreground">
                            {subject.replace(/-/g, " ")}
                          </CardTitle>
                          <CardDescription>Open notes</CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-between gap-3 pt-0">
                          <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                            View →
                          </span>
                          {isFav && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                              <Heart className="h-3.5 w-3.5" fill="currentColor" />
                              Saved
                            </span>
                          )}
                        </CardFooter>
                      </Card>
                    </Link>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite({ semester: semesterNum, subject })}
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                      className={cn(
                        "absolute right-3 top-3 z-10 h-9 w-9 rounded-full border bg-background/80 shadow-sm backdrop-blur-sm transition-all",
                        isFav
                          ? "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50"
                          : "border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                      )}
                    >
                      <Heart className="h-4 w-4" fill={isFav ? "currentColor" : "none"} />
                    </Button>
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
                  {showFavoritesOnly
                    ? query.trim()
                      ? `No favorite subjects match "${query.trim()}".`
                      : "No favorites saved for this semester yet. Tap the heart to save a subject."
                    : `No subjects match "${query.trim()}".`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
