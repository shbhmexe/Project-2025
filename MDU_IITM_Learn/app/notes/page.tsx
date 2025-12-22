"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Heart, BookOpen, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useFavoriteNotes } from "@/lib/favorite-notes";
import { cn } from "@/lib/utils";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const enabledSemesters = new Set(["1", "2"]);

export default function NotesPage() {
  const { favorites, toggleFavorite } = useFavoriteNotes();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const favoritesSorted = useMemo(() => {
    return [...favorites].sort((a, b) => {
      if (a.semester !== b.semester) return a.semester - b.semester;
      return a.subject.localeCompare(b.subject);
    });
  }, [favorites]);

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
                <BookOpen className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Notes
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select a semester to browse subjects and download handwritten notes.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">CSE & related</Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Sem 1–2 available</Badge>
            </div>
          </motion.div>

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
                  const enabled = enabledSemesters.has(sem);

                  if (enabled) {
                    return (
                      <motion.div
                        key={sem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/semester/${sem}`}
                          className="group block focus-visible:outline-none"
                        >
                          <Card className="h-full bg-card border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] group-hover:border-emerald-500/50 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
                            <CardHeader className="pb-4">
                              <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-sm font-bold text-emerald-400">
                                  {sem}
                                </span>
                                <CardTitle className="text-foreground">Semester {sem}</CardTitle>
                              </div>
                              <CardDescription>Browse subjects</CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0">
                              <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                Open →
                              </span>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  }

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
                })}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              {favoritesSorted.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favoritesSorted.map((fav, index) => {
                    const key = `${fav.semester}:${fav.subject}`;
                    const href = `/semester/${fav.semester}/subjects/${fav.subject}`;

                    return (
                      <motion.div
                        key={key}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={href} className="group block focus-visible:outline-none">
                          <Card className="h-full bg-card border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] group-hover:border-emerald-500/50">
                            <CardHeader className="pb-4 pr-12">
                              <CardTitle className="text-base sm:text-lg text-foreground">
                                {fav.subject.replace(/-/g, " ")}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-emerald-500" />
                                Semester {fav.semester}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0">
                              <span className="text-sm font-medium text-emerald-400">Open →</span>
                            </CardFooter>
                          </Card>
                        </Link>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite({ semester: fav.semester, subject: fav.subject })}
                          aria-label="Remove from favorites"
                          className={cn(
                            "absolute right-3 top-3 z-10 h-9 w-9 rounded-full border border-emerald-500/30 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-red-500/20 hover:border-red-500/50",
                            "text-emerald-500 hover:text-red-500"
                          )}
                        >
                          <Heart className="h-4 w-4" fill="currentColor" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-emerald-500/20 bg-card/50 p-8 text-center"
                >
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    No favorites yet. Open any semester and tap the heart on a subject to save it here.
                  </p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
    </div>
  );
}
