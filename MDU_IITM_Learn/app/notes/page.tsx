"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const enabledSemesters = new Set(["1", "2"]);

export default function NotesPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground pt-40 md:pt-44 pb-16"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Notes</h1>
          <p className="mt-2 text-muted-foreground">
            Select a semester to browse subjects and download handwritten notes.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">CSE & related</Badge>
            <Badge variant="outline">Sem 1–2 available</Badge>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {semesters.map((sem) => {
            const enabled = enabledSemesters.has(sem);

            if (enabled) {
              return (
                <Link
                  key={sem}
                  href={`/semester/${sem}`}
                  className="group block focus-visible:outline-none"
                >
                  <Card className="h-full transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                    <CardHeader className="pb-4">
                      <CardTitle>Semester {sem}</CardTitle>
                      <CardDescription>Browse subjects</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <span className="text-sm font-medium text-primary">Open →</span>
                    </CardFooter>
                  </Card>
                </Link>
              );
            }

            return (
              <Card key={sem} className="h-full opacity-60">
                <CardHeader className="pb-4">
                  <CardTitle>Semester {sem}</CardTitle>
                  <CardDescription>Coming soon</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Badge variant="secondary">Not available</Badge>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.main>
  );
}
