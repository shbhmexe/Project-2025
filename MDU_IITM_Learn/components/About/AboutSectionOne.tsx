"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Handwritten Notes",
  "PYQs (2020-2024)",
  "Lab Manuals & Practicals",
  "EDG Sheets",
  "100% Syllabus Coverage",
  "Assignment Solutions"
];

const stats = [
  { value: "1000+", label: "Students" },
  { value: "500+", label: "Resources" },
  { value: "1-8", label: "Semesters" },
  { value: "6+", label: "Branches" }
];

const AboutSectionOne = () => {
  return (
    <section id="about" className="relative pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-20">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/10" />

      <div className="container">
        <div className="mx-auto max-w-5xl">

          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">
                What We Offer
              </h2>

              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
                Everything you need to excel in your B.Tech journey, all in one place.
              </p>
            </motion.div>
          </div>

          {/* Clean Feature List */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-zinc-200 dark:border-zinc-800 pt-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
