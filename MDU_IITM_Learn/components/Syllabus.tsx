"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Heart, FileText, Search } from "lucide-react";

import { syllabusData } from "@/app/Syllabus/syllabusData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";

const AVAILABLE_SEMESTERS = ["semester1", "semester2"] as const;
type AvailableSemester = (typeof AVAILABLE_SEMESTERS)[number];

function labelSemester(semesterKey: string) {
  return semesterKey.replace("semester", "Semester ");
}

function getSemesterNumber(semesterKey: string): number {
  return parseInt(semesterKey.replace("semester", ""));
}

export default function Syllabus() {
  const [activeSemester, setActiveSemester] = useState<AvailableSemester>("semester1");
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, isFavorite, toggleFavorite } = useFavoriteItems("syllabus");

  const filterSubjects = (semesterKey: AvailableSemester) => {
    const entries = Object.entries(syllabusData[semesterKey] || {});
    const q = query.trim().toLowerCase();
    let filtered = entries;

    if (q) {
      filtered = filtered.filter(([subject]) => subject.toLowerCase().includes(q));
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(([subject]) =>
        isFavorite({ semester: getSemesterNumber(semesterKey), subject })
      );
    }

    return filtered;
  };

  const totalSubjects = useMemo(() => {
    return Object.keys(syllabusData[activeSemester] || {}).length;
  }, [activeSemester]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground pt-32 md:pt-40 pb-16"
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
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Sem 1–2 available</Badge>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">More coming soon</Badge>
            {favorites.length > 0 && (
              <Badge className="bg-emerald-600 text-white">
                {favorites.length} Favorites
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <Tabs value={activeSemester} onValueChange={(v) => setActiveSemester(v as AvailableSemester)}>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mb-6">
              <TabsList className="bg-card/50 border border-emerald-500/20">
                <TabsTrigger
                  value="semester1"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Semester 1
                </TabsTrigger>
                <TabsTrigger
                  value="semester2"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Semester 2
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2 w-full sm:max-w-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search subjects..."
                    aria-label="Search syllabus subjects"
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
            </div>

            <div className="text-center text-sm text-muted-foreground mb-8">
              {labelSemester(activeSemester)} • {totalSubjects} subjects
            </div>

            {AVAILABLE_SEMESTERS.map((semesterKey) => {
              const items = filterSubjects(semesterKey);
              const semNum = getSemesterNumber(semesterKey);

              return (
                <TabsContent key={semesterKey} value={semesterKey}>
                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map(([subject, link], index) => {
                        const isFav = isFavorite({ semester: semNum, subject });

                        return (
                          <motion.div
                            key={subject}
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
                                onClick={() => toggleFavorite({ semester: semNum, subject, url: link })}
                                title={isFav ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                              </Button>
                              <CardHeader className="pb-4 pr-14">
                                <CardTitle className="text-base sm:text-lg text-foreground">{subject}</CardTitle>
                                <CardDescription>Open syllabus link</CardDescription>
                              </CardHeader>
                              <CardFooter className="pt-0">
                                <Button
                                  asChild
                                  size="sm"
                                  className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                >
                                  <a href={link} target="_blank" rel="noopener noreferrer">
                                    Open
                                  </a>
                                </Button>
                              </CardFooter>
                            </Card>
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
                        {showFavoritesOnly ? "No favorites in this semester." : `No subjects match "${query.trim()}".`}
                      </p>
                    </motion.div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </motion.main>
  );
}
