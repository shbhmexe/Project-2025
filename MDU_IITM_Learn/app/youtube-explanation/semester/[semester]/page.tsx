import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const subjectsBySemester: Record<number, string[]> = {
  1: ["Mathematics-I", "Semiconductor-Physics", "English", "Basic-Electrical-Engineering"],
};

function prettyLabel(slug: string) {
  return slug.replace(/-/g, " ");
}

export default function YouTubeSubjectsPage({ params }: { params: { semester: string } }) {
  const semesterNum = Number(params.semester);
  const subjects = subjectsBySemester[semesterNum] || [];

  if (!params.semester || Number.isNaN(semesterNum) || subjects.length === 0) {
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Semester {params.semester}</h1>
            <p className="mt-2 text-muted-foreground">YouTube explanations for this semester are not available yet.</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Coming soon</Badge>
            </div>
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
            <Link href="/youtube-explanation/semester">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Badge variant="secondary">YouTube</Badge>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Semester {semesterNum}</h1>
          <p className="mt-2 text-muted-foreground">Select a subject to browse unit-wise playlists.</p>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject}
              href={`/youtube-explanation/semester/${semesterNum}/${subject}`}
              className="group block focus-visible:outline-none"
            >
              <Card className="h-full transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">{prettyLabel(subject)}</CardTitle>
                  <CardDescription>Browse units</CardDescription>
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
