"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ShinyText from "@/components/ui/ShinyText";

import { useFavoriteNotes } from "@/lib/favorite-notes";
import { cn } from "@/lib/utils";

const notesLinks: Record<string, string> = {
  // Semester 1 subjects
  "Mathematics-I": "https://drive.google.com/drive/folders/1HZQi4FTLiciTWfu1vfAxZHHLeHFlKxRM?usp=sharing",
  "Semiconductor-Physics": "https://drive.google.com/drive/folders/1L0_rhXxBJydjD19vYv74CGn1GhaVS-Vh?usp=drive_link",
  English: "https://drive.google.com/drive/folders/1Slhm_7XzByZy-GdMjfyAZsXBhKXydRDB?usp=sharing",
  "Basic-Electrical-Engineering": "https://drive.google.com/drive/folders/1f63yzhipcUgf_b0bbmIRCqQSwYu9F4nz?usp=sharing",
  "BEE-Lab": "https://drive.google.com/file/d/1mHz3-W-liZ4q5nGIdOMVQCTpl_Mn4CAn/view?usp=sharing",
  "EDG-Sheets": "https://drive.google.com/file/d/1c27l7qrD87pTXG1WV_5HaEfn0qcNEqmq/view?usp=sharing",
  "Physics-Lab": "https://drive.google.com/drive/folders/1Ei-umh3fas6wzz52kJZbZsPBVpg2kurI?usp=sharing",

  // Semester 2 subjects
  "Chemistry-I": "https://drive.google.com/drive/folders/11naYGaPv6GNCwhTLc_HZ2fSMkvR-K8YF",
  PPS: "https://drive.google.com/drive/folders/1ETZPIgAEPicHQDlPUPD-2LXBdqfSE5y9?usp=sharing",
  "Workshop-Technology": "https://drive.google.com/drive/folders/1_08MeYQSOuIddQ3Y9-mxYlXPOyJV0dKl?usp=sharing",
  "Chemistry-Lab-1": "https://drive.google.com/drive/folders/1AbkO28z6RTGoSrX6YL-qHEjwgyNM2cv7?usp=sharing",
  "Language-Lab": "https://drive.google.com/drive/folders/1-p4p3PwbrxIYh_RPbYaZyDyxWb382sjI?usp=sharing",
  "Programming-in-C-Lab": "https://drive.google.com/drive/folders/1HI-MnCZo-U4ay_3rDGlpYFK0VjsV1g3_?usp=sharing",
  "Mathematics-II": "https://drive.google.com/drive/folders/1ORSLS7L2JZfAY-J9y1S0SIN5UjdLM0p7?usp=drive_link",
  "Manufacturing-lab": "https://drive.google.com/drive/folders/1kEXZj_GJ18txYCouBTn7qry6YM3hVQ9h?usp=drive_link",

  // Semester 3 subjects
  "Database-Management-Systems": "",
  "Data-Structures-and-Algorithms": "",
  "Digital-Electronics": "",
  "Python-Programming": "",
  "Mathematics-III": "",
  "Economics-for-Engineers": "",
  "Database-Management-Systems-LAB": "",
  "Digital-Electronics-LAB": "",
  "Data-Structures-and-Algorithms-LAB-Using-C": "",
  "Python-Programming-LAB": "",

  // Semester 4 subjects
  "Discrete-Mathematics": "",
  "Computer-Organization-and-Architecture": "",
  "Operating-System": "",
  "Object-Oriented-Programming": "",
  "Organizational-Behaviour": "",
  "Environmental-Sciences": "",
  "Web-Technologies": "",
  "Operating-System-LAB": "",
  "Object-Oriented-Programming-LAB-Using-Cpp": "",
  "Web-Technologies-Lab": "",
};

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isFavorite, toggleFavorite } = useFavoriteNotes();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const semesterParam = params?.semester;
  const subjectParam = params?.subject;
  const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
  const subject = Array.isArray(subjectParam) ? subjectParam[0] : subjectParam;
  const semesterNum = Number(semester);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Protect Semester 3+ subjects
  useEffect(() => {
    if (status === "unauthenticated" && semesterNum >= 3) {
      router.push(`/auth/signin?callbackUrl=/semester/${semester}/subjects/${subject}`);
    }
  }, [status, semesterNum, router, semester, subject]);

  if (!semester || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Invalid subject.
      </div>
    );
  }

  const prettySubject = subject.replace(/-/g, " ");
  const notesLink = notesLinks[subject] || "";

  const fav = isFavorite({ semester: semesterNum, subject });

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
        className="relative z-10 min-h-screen pt-36 md:pt-40 pb-16"
      >
        <div className="container">
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-emerald-400">
            <Link href={`/semester/${semester}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to subjects
            </Link>
          </Button>

          <div className="mx-auto mt-8 max-w-2xl">
            <Card className="border-emerald-500/20 bg-card/50 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl sm:text-4xl font-bold">
                      <ShinyText text={prettySubject} speed={3} />
                    </CardTitle>
                    <CardDescription className="text-emerald-500/70 font-medium">
                      Semester {semester} • Notes Materials
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite({ semester: semesterNum, subject })}
                      className={cn(
                        "gap-2 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10",
                        fav &&
                        "border-emerald-500/40 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      )}
                      aria-pressed={fav}
                    >
                      <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
                      {fav ? "Favorited" : "Favorite"}
                    </Button>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Notes
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                  {notesLink ? (
                    <p className="text-sm text-emerald-400/80 leading-relaxed">
                      Handwritten notes are ready! Click the button below to open the official Google Drive folder. You can view, download, or print these materials directly.
                    </p>
                  ) : (
                    <p className="text-sm text-amber-400/80 leading-relaxed">
                      Notes for this subject are currently being prepared. Please check back soon!
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap gap-3">
                {notesLink ? (
                  <Button asChild className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
                    <a href={notesLink} target="_blank" rel="noopener noreferrer">
                      Open Notes Folder
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="bg-muted">Currently Unavailable</Button>
                )}

                <Button asChild variant="outline" className="border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10">
                  <Link href="/notes">View All Semesters</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
