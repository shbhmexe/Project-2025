"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const unitsBySubject: Record<string, string[]> = {
  "Mathematics-I": [
    "1",
    "2",
    "3",
    "4",
    "Beta Gamma Function",
    "Evolutes and Involutes",
    "Taylor Series",
    "Maclaurin Series",
    "Inner Space Product",
    "Revision All Unit",
  ],
  "Semiconductor-Physics": ["1", "2", "3", "4"],
  English: ["1", "2"],
  "Basic-Electrical-Engineering": ["1", "2", "3", "4", "Electrical ONE SHOT"],
};

function prettyLabel(slug: string) {
  return slug.replace(/-/g, " ");
}

function unitLabel(unit: string) {
  return /^\d+$/.test(unit) ? `Unit ${unit}` : unit;
}

export default function YouTubeUnitsPage({
  params,
}: {
  params: { semester: string; subject: string };
}) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const semester = params.semester;
  const subject = decodeURIComponent(params.subject);

  const units = unitsBySubject[subject] || [];

  if (!semester || !subject || units.length === 0) {
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

        <main className="relative z-10 min-h-screen bg-transparent text-foreground pt-36 md:pt-40 pb-16">
          <div className="container">
            <Button asChild variant="ghost" className="gap-2">
              <Link href="/youtube-explanation/semester">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>

            <div className="mx-auto mt-10 max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Invalid subject</h1>
              <p className="mt-2 text-muted-foreground">Please go back and select a valid subject.</p>
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

      <main className="relative z-10 min-h-screen bg-transparent text-foreground pt-36 md:pt-40 pb-16">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" className="gap-2">
              <Link href={`/youtube-explanation/semester/${semester}`}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Badge variant="secondary">YouTube</Badge>
          </div>

          <div className="mx-auto mt-6 max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{prettyLabel(subject)}</h1>
            <p className="mt-2 text-muted-foreground">Select a unit to open YouTube in a new tab.</p>
          </div>

          <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <Link
                key={unit}
                href={`/youtube-explanation/semester/${semester}/${encodeURIComponent(subject)}/${encodeURIComponent(unit)}`}
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full bg-card border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] group-hover:border-emerald-500/50 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">{unitLabel(unit)}</CardTitle>
                    <CardDescription>Open on YouTube</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">Open →</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
