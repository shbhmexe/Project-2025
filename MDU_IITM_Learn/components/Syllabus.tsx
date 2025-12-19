"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { syllabusData } from "@/app/Syllabus/syllabusData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AVAILABLE_SEMESTERS = ["semester1", "semester2"] as const;
type AvailableSemester = (typeof AVAILABLE_SEMESTERS)[number];

function labelSemester(semesterKey: string) {
  return semesterKey.replace("semester", "Semester ");
}

export default function Syllabus() {
  const [activeSemester, setActiveSemester] = useState<AvailableSemester>("semester1");
  const [query, setQuery] = useState("");

  const filterSubjects = (semesterKey: AvailableSemester) => {
    const entries = Object.entries(syllabusData[semesterKey] || {});
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(([subject]) => subject.toLowerCase().includes(q));
  };

  const totalSubjects = useMemo(() => {
    return Object.keys(syllabusData[activeSemester] || {}).length;
  }, [activeSemester]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground pt-40 md:pt-44 pb-16"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Syllabus</h1>
          <p className="mt-2 text-muted-foreground">
            Semester-wise syllabus links for all branches.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Sem 1–2 available</Badge>
            <Badge variant="outline">More coming soon</Badge>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <Tabs value={activeSemester} onValueChange={(v) => setActiveSemester(v as AvailableSemester)}>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <TabsList>
                <TabsTrigger value="semester1">Semester 1</TabsTrigger>
                <TabsTrigger value="semester2">Semester 2</TabsTrigger>
              </TabsList>

              <div className="w-full sm:max-w-sm">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subjects..."
                  aria-label="Search syllabus subjects"
                />
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              {labelSemester(activeSemester)} • {totalSubjects} subjects
            </div>

            {AVAILABLE_SEMESTERS.map((semesterKey) => {
              const items = filterSubjects(semesterKey);

              return (
                <TabsContent key={semesterKey} value={semesterKey}>
                  {items.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map(([subject, link]) => (
                        <Card key={subject} className="h-full">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-base sm:text-lg">{subject}</CardTitle>
                            <CardDescription>Open syllabus link</CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <Button asChild size="sm">
                              <a href={link} target="_blank" rel="noopener noreferrer">
                                Open
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                      No subjects match “{query.trim()}”.
                    </div>
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
