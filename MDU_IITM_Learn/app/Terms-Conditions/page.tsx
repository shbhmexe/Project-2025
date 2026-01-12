import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms & Conditions | MDU IITM Learn",
  description: "Terms and conditions for using mduiitmlearn.app.",
};

const LAST_UPDATED = "December 19, 2025";

const terms: Array<{ title: string; points: string[] }> = [
  {
    title: "1. Acceptance of terms",
    points: [
      "By accessing or using this website, you agree to these Terms & Conditions.",
      "If you do not agree, please do not use the website.",
    ],
  },
  {
    title: "2. Educational purpose",
    points: [
      "MDU IITM Learn is an educational resource hub for students.",
      "Content is provided for learning and convenience; always follow your official syllabus/department guidelines.",
    ],
  },
  {
    title: "3. Acceptable use",
    points: [
      "Do not misuse the site, attempt to break it, or interfere with other users.",
      "Do not upload/post illegal content or attempt unauthorized access.",
      "Do not use automated scraping/abuse that harms availability.",
    ],
  },
  {
    title: "4. Third‑party links",
    points: [
      "The site may link to Google Drive, YouTube, or other third-party services.",
      "We are not responsible for third-party content, availability, or their policies.",
    ],
  },
  {
    title: "5. Intellectual property",
    points: [
      "The website UI, branding, and original content belong to their respective owners.",
      "If you believe any linked material infringes your rights, contact us and we will review/remove links if needed.",
    ],
  },
  {
    title: "6. Disclaimer & limitation of liability",
    points: [
      "The website is provided “as is” without warranties.",
      "We are not liable for any direct/indirect damages arising from use of the website or third-party links.",
    ],
  },
  {
    title: "7. Changes to these terms",
    points: [
      "We may update these terms from time to time.",
      "When we update, we will revise the “Last updated” date on this page.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-40 md:pt-44 pb-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms &amp; Conditions</h1>
          <p className="mt-2 text-muted-foreground">Please read these terms carefully before using mduiitmlearn.app.</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Last updated: {LAST_UPDATED}</Badge>
            <Badge variant="outline">Educational resources</Badge>
          </div>


        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          {terms.map((t) => (
            <Card key={t.title}>
              <CardHeader className="pb-4">
                <CardTitle>{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card className="lg:col-span-2">
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
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Contact page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
