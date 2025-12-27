"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Youtube } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";

const subjectsBySemester: Record<number, string[]> = {
  1: ["Mathematics-I", "Semiconductor-Physics", "English", "Basic-Electrical-Engineering"],
  2: ["Mathematics-II", "Chemistry-I", "PPS", "Workshop-Technology"],
  3: ["Database-Management-Systems", "Data-Structures-and-Algorithms", "Digital-Electronics", "Python-Programming", "Mathematics-III", "Economics-for-Engineers", "Database-Management-Systems-LAB", "Digital-Electronics-LAB", "Data-Structures-and-Algorithms-LAB-Using-C", "Python-Programming-LAB"],
  4: ["Discrete-Mathematics", "Computer-Organization-and-Architecture", "Operating-System", "Object-Oriented-Programming", "Organizational-Behaviour", "Environmental-Sciences", "Web-Technologies", "Operating-System-LAB", "Object-Oriented-Programming-LAB-Using-Cpp", "Web-Technologies-Lab"],
  5: ["Microprocessor", "Computer-Networks", "Formal-Languages-and-Automata", "Design-and-Analysis-of-Algorithms", "Programming-in-Java", "Software-Engineering"],
};

function prettyLabel(slug: string) {
  return slug.replace(/-/g, " ");
}

export default function YouTubeSubjectsPage({ params }: { params: { semester: string } }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const semesterNum = Number(params.semester);
  const subjects = subjectsBySemester[semesterNum] || [];

  const { favorites, isFavorite, toggleFavorite } = useFavoriteItems("youtube");

  if (!params.semester || Number.isNaN(semesterNum) || subjects.length === 0) {
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

        <main className="relative z-10 min-h-screen bg-transparent text-foreground pt-32 md:pt-40 pb-16">
          <div className="container">
            <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-emerald-400">
              <Link href="/youtube-explanation/semester">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>

            <div className="mx-auto mt-10 max-w-2xl text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Semester {params.semester}
              </h1>
              <p className="mt-2 text-muted-foreground">YouTube explanations for this semester are not available yet.</p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Coming soon</Badge>
              </div>
            </div>
          </div>
        </main>
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
              <Link href="/youtube-explanation/semester">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">YouTube</Badge>
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
                <Youtube className="h-8 w-8 text-emerald-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Semester {semesterNum}
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select a subject to browse unit-wise playlists.
            </p>
          </motion.div>

          {/* Subjects Grid */}
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => {
              const isFav = isFavorite({ semester: semesterNum, subject });

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
                        "absolute right-2 top-2 h-8 w-8 z-10 rounded-full border bg-background/80 backdrop-blur-sm transition-all",
                        isFav
                          ? "border-emerald-500/50 text-emerald-500 hover:bg-red-500/20 hover:text-red-500"
                          : "border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/50"
                      )}
                      onClick={() => toggleFavorite({ semester: semesterNum, subject })}
                      title={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                    </Button>
                    <Link
                      href={`/youtube-explanation/semester/${semesterNum}/${subject}`}
                      className="block"
                    >
                      <CardHeader className="pb-4 pr-14">
                        <CardTitle className="text-base sm:text-lg text-foreground">{prettyLabel(subject)}</CardTitle>
                        <CardDescription>Browse units</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0">
                        <span className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                          Open →
                        </span>
                      </CardFooter>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
