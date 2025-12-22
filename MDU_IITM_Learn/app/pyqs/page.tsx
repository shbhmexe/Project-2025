"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileQuestion } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const enabledSemesters = new Set(["1", "2"]);

export default function PYQsPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

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
                <FileQuestion className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                PYQs
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select a semester to open previous year question papers.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Sem 1–2 available</Badge>
            </div>
          </motion.div>

          {/* Semester Grid */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      href={`/semester/${sem}/pyqs`}
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
                          <CardDescription>View subject-wise PYQs</CardDescription>
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
        </div>
      </motion.main>
    </div>
  );
}
