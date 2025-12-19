"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

  const subjects = useMemo(() => {
    return subjectsBySemester[semesterNum] || [];
  }, [semesterNum]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.toLowerCase().includes(q));
  }, [query, subjects]);

  if (!semester || Number.isNaN(semesterNum)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Error: Semester not found!
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground pt-36 md:pt-40 pb-16"
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/notes">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Badge variant="secondary">Notes</Badge>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Semester {semesterNum}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select a subject to open the notes folder/file.
          </p>
        </div>

        <div className="mx-auto mt-6 w-full max-w-md">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects..."
            aria-label="Search subjects"
          />
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <Link
                key={subject}
                href={`/semester/${semesterNum}/subjects/${subject}`}
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">
                      {subject.replace(/-/g, " ")}
                    </CardTitle>
                    <CardDescription>Open notes</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <span className="text-sm font-medium text-primary">View →</span>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No subjects match “{query.trim()}”.
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
