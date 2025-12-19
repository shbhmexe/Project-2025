import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
  const semester = params.semester;
  const subject = decodeURIComponent(params.subject);

  const units = unitsBySubject[subject] || [];

  if (!semester || !subject || units.length === 0) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-36 md:pt-40 pb-16">
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
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-36 md:pt-40 pb-16">
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
              <Card className="h-full transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">{unitLabel(unit)}</CardTitle>
                  <CardDescription>Open on YouTube</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-sm font-medium text-primary">Open →</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
