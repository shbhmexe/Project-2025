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

const subjectsBySemester: Record<number, { name: string; link: string }[]> = {
  1: [
    {
      name: "Mathematics - 1",
      link: "https://drive.google.com/drive/folders/1jPBob5pCBv9Ddh7PcU5iMdPJF1KDu4rE?usp=sharing",
    },
    {
      name: "Semiconductor Physics",
      link: "https://drive.google.com/drive/folders/1PmR4R3zxFnWyUq9IHxgrlsx5PQuQTZVL?usp=drive_link",
    },
    {
      name: "English",
      link: "https://drive.google.com/drive/folders/1DkizK3aTQ5wTLuqhwCtooTtZfzuNLJXj?usp=sharing",
    },
    {
      name: "Basic Electrical Engineering",
      link: "https://drive.google.com/drive/folders/1fpYPmC3qPJH_DqeG9E5kvBzIYu8vETSG?usp=drive_link",
    },
  ],
  2: [
    {
      name: "Mathematics-II",
      link: "https://drive.google.com/drive/folders/1qYA8sZTuhWhr_H-nRE_i_iJawAEHNkm_?usp=drive_link",
    },
    {
      name: "Chemistry-I",
      link: "https://drive.google.com/drive/folders/1eor4OspUxRJt7o4aKm0XTifQZk3ma0KD?usp=sharing",
    },
    {
      name: "PPS",
      link: "https://drive.google.com/drive/folders/1jQYnqrFXjlhLI5zXjsSk3zyz0i92LcWV?usp=drive_link",
    },
    {
      name: "Workshop Technology",
      link: "https://drive.google.com/drive/folders/18EP9O6bcMTv9kgFnszftTOcKgIkHkmc5?usp=sharing",
    },
  ],
};

export default function PYQSubjectsPage() {
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
    return subjects.filter((s) => s.name.toLowerCase().includes(q));
  }, [query, subjects]);

  if (!semester || Number.isNaN(semesterNum) || subjects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-destructive">
        ❌ Invalid semester.
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
            <Link href="/pyqs">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Badge variant="secondary">PYQs</Badge>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Semester {semesterNum}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select a subject to open the PYQs folder.
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
              <a
                key={subject.name}
                href={subject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">{subject.name}</CardTitle>
                    <CardDescription>Open in Google Drive</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <span className="text-sm font-medium text-primary">Open →</span>
                  </CardFooter>
                </Card>
              </a>
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
