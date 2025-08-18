"use client";
import Link from "next/link";
import { motion } from "framer-motion";

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
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M8 6h8M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    cta: "Browse Notes",
  },
  {
    title: "PYQs",
    description: "Previous year papers to practice exam patterns and weightage.",
    href: "/pyqs",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M4 4h10l6 6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 4v6h6" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    cta: "Solve PYQs",
  },
  {
    title: "Syllabus",
    description: "Official syllabus mapped to subjects and semesters.",
    href: "/Syllabus",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7v10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    cta: "View Syllabus",
  },
  {
    title: "CGPA Calculator",
    description: "Compute CGPA fast with credits and auto grade mapping.",
    href: "/cgpa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 8h10M7 12h6M7 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    cta: "Calculate Now",
  },
  {
    title: "YouTube Explanation",
    description: "Explore topic-wise videos aligned to semesters and units.",
    href: "/youtube-explanation/semester",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M22 12s0-3.5-.4-5.1c-.2-.9-.9-1.6-1.8-1.8C17.9 4.6 12 4.6 12 4.6s-5.9 0-7.8.5c-.9.2-1.6.9-1.8 1.8C2 8.5 2 12 2 12s0 3.5.4 5.1c.2.9.9 1.6 1.8 1.8 1.9.5 7.8.5 7.8.5s5.9 0 7.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5.1.4-5.1z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 15l5-3-5-3v6z" fill="currentColor"/>
      </svg>
    ),
    cta: "Watch Videos",
  },
  {
    title: "Blog",
    description: "Tips, strategies, and updates for productive studying.",
    href: "/blog",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    cta: "Read Articles",
  },
];

const Dashboard = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Your Study Dashboard</h2>
          <p className="mt-3 text-muted-foreground md:text-lg">Quickly access notes, PYQs, syllabus, and tools to stay on track.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="card p-5 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-accent p-3">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-1.5 text-sm md:text-[15px] text-muted-foreground">{card.description}</p>
                </div>
              </div>
              <div className="mt-5">
                <Link href={card.href} className="button-primary px-4 py-2 text-sm md:text-[15px]">
                  {card.cta ?? "Open"}
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

