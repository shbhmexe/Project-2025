"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileQuestion, FileText, Calculator, Youtube, Newspaper, Sparkles } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

type Card = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  cta?: string;
};

const cards: Card[] = [
  {
    title: "Notes",
    description: "Semester-wise handwritten notes curated for quick revision.",
    href: "/notes",
    icon: <BookOpen className="h-6 w-6" />,
    cta: "Browse Notes",
  },
  {
    title: "PYQs",
    description: "Previous year papers to practice exam patterns and weightage.",
    href: "/pyqs",
    icon: <FileQuestion className="h-6 w-6" />,
    cta: "Solve PYQs",
  },
  {
    title: "Syllabus",
    description: "Official syllabus mapped to subjects and semesters.",
    href: "/Syllabus",
    icon: <FileText className="h-6 w-6" />,
    cta: "View Syllabus",
  },
  {
    title: "CGPA Calculator",
    description: "Compute CGPA fast with credits and auto grade mapping.",
    href: "/cgpa",
    icon: <Calculator className="h-6 w-6" />,
    cta: "Calculate Now",
  },
  {
    title: "YouTube Explanation",
    description: "Explore topic-wise videos aligned to semesters and units.",
    href: "/youtube-explanation/semester",
    icon: <Youtube className="h-6 w-6" />,
    cta: "Watch Videos",
  },
  {
    title: "Blog",
    description: "Tips, strategies, and updates for productive studying.",
    href: "/blog",
    icon: <Newspaper className="h-6 w-6" />,
    cta: "Read Articles",
  },
];

const Dashboard = () => {
  return (
    <section className="relative z-10 py-12 md:py-16 bg-background">
      <div className="absolute top-0 left-0 right-0 -z-10 h-64 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-30" />
      {/* Top fade mask to match Hero section */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight text-zinc-900 dark:!text-white whitespace-nowrap">
            Your Study Dashboard
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Quickly access notes, PYQs, syllabus, and tools to stay on track.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group relative bg-card rounded-2xl border border-emerald-500/20 p-5 md:p-6 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-3 text-emerald-500">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm md:text-[15px] text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:justify-start">
                <Link href={card.href} className="w-auto">
                  <InteractiveHoverButton className="w-full sm:w-auto flex items-center justify-center text-sm md:text-[15px] px-6 py-2 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <span className="inline-flex items-center">
                      {card.cta ?? "Open"}
                    </span>
                  </InteractiveHoverButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
