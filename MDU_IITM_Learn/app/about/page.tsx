import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | MDU IITM Learn",
  description:
    "MDU IITM Learn helps B.Tech students with semester-wise handwritten notes, PYQs, syllabus links and curated YouTube explanations.",
};

const highlights = [
  {
    title: "Handwritten Notes",
    points: [
      "Semester-wise subject folders",
      "Google Drive links (easy download)",
      "Fast search and clean UI",
    ],
  },
  {
    title: "Previous Year Question Papers (PYQs)",
    points: ["Subject-wise folders", "Exam-focused preparation", "Regular updates"],
  },
  {
    title: "Syllabus",
    points: ["Official/curated syllabus links", "Semester tabs", "Quick subject search"],
  },
  {
    title: "YouTube Explanations",
    points: ["Semester → Subject → Unit flow", "Handpicked playlists/videos", "More subjects coming"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-40 md:pt-44 pb-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h1>
          <p className="mt-2 text-muted-foreground">
            MDU IITM Learn is a student-first platform that organizes notes, PYQs, syllabus, and useful YouTube
            explanations—semester-wise.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">MDU + IITM</Badge>
            <Badge variant="outline">B.Tech resources</Badge>
            <Badge variant="outline">Sem 1–2 live</Badge>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="pb-4">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card className="md:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle>Need help / want to contribute?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                If you find a broken link, want to request a subject, or want to share resources, feel free to reach out.
              </p>
              <p className="mt-3">
                Email:{" "}
                <a className="font-medium text-primary hover:underline" href="mailto:mduiitmnotes@gmail.com">
                  mduiitmnotes@gmail.com
                </a>
              </p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/notes">Browse Notes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pyqs">Browse PYQs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/Syllabus">View Syllabus</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/youtube-explanation/semester">YouTube Explanations</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact">Contact</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
