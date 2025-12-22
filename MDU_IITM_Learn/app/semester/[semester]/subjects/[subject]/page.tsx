"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useFavoriteNotes } from "@/lib/favorite-notes";
import { cn } from "@/lib/utils";

const notesLinks: Record<string, string> = {
  "Mathematics-I": "https://drive.google.com/drive/folders/1HZQi4FTLiciTWfu1vfAxZHHLeHFlKxRM?usp=sharing",
  "Semiconductor-Physics": "https://drive.google.com/drive/folders/1L0_rhXxBJydjD19vYv74CGn1GhaVS-Vh?usp=drive_link",
  English: "https://drive.google.com/drive/folders/1Slhm_7XzByZy-GdMjfyAZsXBhKXydRDB?usp=sharing",
  "Basic-Electrical-Engineering": "https://drive.google.com/drive/folders/1f63yzhipcUgf_b0bbmIRCqQSwYu9F4nz?usp=sharing",
  "BEE-Lab": "https://drive.google.com/file/d/1mHz3-W-liZ4q5nGIdOMVQCTpl_Mn4CAn/view?usp=sharing",
  "EDG-Sheets": "https://drive.google.com/file/d/1c27l7qrD87pTXG1WV_5HaEfn0qcNEqmq/view?usp=sharing",
  "Physics-Lab": "https://drive.google.com/drive/folders/1Ei-umh3fas6wzz52kJZbZsPBVpg2kurI?usp=sharing",
  "Chemistry-I": "https://drive.google.com/drive/folders/11naYGaPv6GNCwhTLc_HZ2fSMkvR-K8YF",
  PPS: "https://drive.google.com/drive/folders/1ETZPIgAEPicHQDlPUPD-2LXBdqfSE5y9?usp=sharing",
  "Workshop-Technology": "https://drive.google.com/drive/folders/1_08MeYQSOuIddQ3Y9-mxYlXPOyJV0dKl?usp=sharing",
  "Chemistry-Lab-1": "https://drive.google.com/drive/folders/1AbkO28z6RTGoSrX6YL-qHEjwgyNM2cv7?usp=sharing",
  "Language-Lab": "https://drive.google.com/drive/folders/1-p4p3PwbrxIYh_RPbYaZyDyxWb382sjI?usp=sharing",
  "Programming-in-C-Lab": "https://drive.google.com/drive/folders/1HI-MnCZo-U4ay_3rDGlpYFK0VjsV1g3_?usp=sharing",
  "Mathematics-II": "https://drive.google.com/drive/folders/1ORSLS7L2JZfAY-J9y1S0SIN5UjdLM0p7?usp=drive_link",
  "Manufacturing-lab": "https://drive.google.com/drive/folders/1kEXZj_GJ18txYCouBTn7qry6YM3hVQ9h?usp=drive_link",
};

export default function SubjectPage() {
  const params = useParams();
  const { isFavorite, toggleFavorite } = useFavoriteNotes();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const semesterParam = params?.semester;
  const subjectParam = params?.subject;

  const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
  const subject = Array.isArray(subjectParam) ? subjectParam[0] : subjectParam;

  if (!semester || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Invalid subject.
      </div>
    );
  }

  const prettySubject = subject.replace(/-/g, " ");
  const notesLink = notesLinks[subject] || "";

  const semesterNum = Number(semester);
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
          <Button asChild variant="ghost" className="gap-2">
            <Link href={`/semester/${semester}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to subjects
            </Link>
          </Button>

          <div className="mx-auto mt-8 max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl">{prettySubject}</CardTitle>
                    <CardDescription>Semester {semester} • Notes</CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite({ semester: semesterNum, subject })}
                      className={cn(
                        "gap-2",
                        fav &&
                        "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 hover:text-emerald-700"
                      )}
                      aria-pressed={fav}
                    >
                      <Heart fill={fav ? "currentColor" : "none"} />
                      {fav ? "Favorited" : "Favorite"}
                    </Button>
                    <Badge variant="secondary">Notes</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {notesLink ? (
                  <p className="text-sm text-muted-foreground">
                    This will open Google Drive in a new tab.
                  </p>
                ) : (
                  <p className="text-sm text-destructive">
                    Link not available for this subject yet.
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex flex-wrap gap-3">
                {notesLink ? (
                  <Button asChild>
                    <a href={notesLink} target="_blank" rel="noopener noreferrer">
                      Open Notes
                    </a>
                  </Button>
                ) : (
                  <Button disabled>Open Notes</Button>
                )}

                <Button asChild variant="outline">
                  <Link href="/notes">All Semesters</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
