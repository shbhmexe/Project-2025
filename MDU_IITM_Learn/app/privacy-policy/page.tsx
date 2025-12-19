import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | MDU IITM Learn",
  description: "Privacy policy for mduiitmlearn.app.",
};

const LAST_UPDATED = "December 19, 2025";

const sections: Array<{ title: string; points: string[] }> = [
  {
    title: "1. Information we collect",
    points: [
      "Basic analytics/technical information (e.g., browser type, device type, approximate location, pages visited).",
      "If you contact us, we may receive your name, email address, and the message you send.",
      "We do not intentionally collect sensitive personal data.",
    ],
  },
  {
    title: "2. How we use information",
    points: [
      "To operate and improve the website and its content.",
      "To respond to your questions and support requests.",
      "To monitor for abuse, spam, and security issues.",
    ],
  },
  {
    title: "3. Cookies & similar technologies",
    points: [
      "We may use cookies or local storage for basic functionality (e.g., theme preference).",
      "You can disable cookies in your browser settings, but some parts of the site may not work as expected.",
    ],
  },
  {
    title: "4. Third-party links (Google Drive, YouTube, etc.)",
    points: [
      "Notes/PYQs/Syllabus links may open third-party websites (e.g., Google Drive, YouTube).",
      "Those services have their own privacy policies, and we do not control their data practices.",
    ],
  },
  {
    title: "5. Data security",
    points: [
      "We use reasonable safeguards to protect data.",
      "No method of transmission or storage is 100% secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Your choices",
    points: [
      "You can request deletion of messages you sent us by contacting the email below.",
      "You can choose not to use the site if you do not agree with this policy.",
    ],
  },
  {
    title: "7. Updates to this policy",
    points: [
      "We may update this policy from time to time.",
      "When we do, we will update the “Last updated” date on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-40 md:pt-44 pb-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">
            This page explains how we handle information when you use mduiitmlearn.app.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Last updated: {LAST_UPDATED}</Badge>
            <Badge variant="outline">Student resources</Badge>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle>Quick summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc space-y-2 pl-5">
                <li>We collect minimal technical/usage data to keep the site working and improve it.</li>
                <li>Resources often open third-party sites like Google Drive/YouTube.</li>
                <li>You can contact us to request changes/deletion of messages you sent.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            {sections.map((s) => (
              <Card key={s.title}>
                <CardHeader className="pb-4">
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc space-y-2 pl-5">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Email:{" "}
                  <a className="font-medium text-primary hover:underline" href="mailto:mduiitmnotes@gmail.com">
                    mduiitmnotes@gmail.com
                  </a>
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Contact page</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
