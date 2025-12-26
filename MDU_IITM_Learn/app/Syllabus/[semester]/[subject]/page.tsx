"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ShinyText from "@/components/ui/ShinyText";

import { syllabusData } from "@/app/Syllabus/syllabusData";
import { useFavoriteItems } from "@/lib/favorite-items";
import { cn } from "@/lib/utils";

export default function SyllabusSubjectPage() {
    const params = useParams();
    const router = useRouter();
    const { status } = useSession();
    const { isFavorite, toggleFavorite } = useFavoriteItems("syllabus");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const semesterParam = params?.semester;
    const subjectParam = params?.subject;
    const semester = Array.isArray(semesterParam) ? semesterParam[0] : semesterParam;
    const subjectRaw = Array.isArray(subjectParam) ? subjectParam[0] : subjectParam;
    const subject = decodeURIComponent(subjectRaw || "");
    const semesterNum = Number(semester);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

    // Protect Semester 3+ subjects
    useEffect(() => {
        if (status === "unauthenticated" && semesterNum >= 3) {
            router.push(`/auth/signin?callbackUrl=/Syllabus/${semester}/${subject}`);
        }
    }, [status, semesterNum, router, semester, subject]);

    if (!semester || !subject) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
                ❌ Invalid subject.
            </div>
        );
    }

    const semesterKey = `semester${semester}` as keyof typeof syllabusData;
    const subjectsInSem = syllabusData[semesterKey] || {};

    // Robust lookup: normalize both input and keys
    const normalize = (s: string) => s.toLowerCase().replace(/[\s-]/g, "");
    const normalizedSubject = normalize(subject);

    let syllabusLink = "";
    let actualSubjectName = subject;

    for (const [key, value] of Object.entries(subjectsInSem)) {
        if (normalize(key) === normalizedSubject) {
            syllabusLink = value;
            actualSubjectName = key;
            break;
        }
    }

    const prettySubject = actualSubjectName.replace(/-/g, " ");
    const fav = isFavorite({ semester: semesterNum, subject: actualSubjectName });

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
                        <Link href={`/Syllabus/${semester}`}>
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
                                            Semester {semester} • Syllabus Materials
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
                                            Syllabus
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                                    {syllabusLink ? (
                                        <p className="text-sm text-emerald-400/80 leading-relaxed">
                                            Syllabus for this subject is active! Click the button below to open the official curriculum in Google Drive.
                                        </p>
                                    ) : (
                                        <p className="text-sm text-amber-400/80 leading-relaxed">
                                            Syllabus for this subject is currently being updated. Please check back soon!
                                        </p>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-wrap gap-3">
                                {syllabusLink ? (
                                    <Button asChild className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
                                        <a href={syllabusLink} target="_blank" rel="noopener noreferrer">
                                            Open Syllabus link
                                        </a>
                                    </Button>
                                ) : (
                                    <Button disabled className="bg-muted/50 border border-border text-foreground/70">Currently Unavailable</Button>
                                )}

                                <Button asChild variant="outline" className="border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10">
                                    <Link href="/Syllabus">View All Semesters</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </motion.main>
        </div>
    );
}
