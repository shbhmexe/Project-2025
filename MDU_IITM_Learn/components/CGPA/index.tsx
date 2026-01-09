"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Cgpa = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight text-zinc-900 dark:!text-white whitespace-nowrap">
            CGPA Calculator
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
            The <span className="text-emerald-400 font-semibold">CGPA Calculator</span> on{" "}
            <span className="text-emerald-400 font-semibold">MDU IITM Notes</span> for BTech is a user-friendly tool designed to help students easily calculate their{" "}
            <span className="text-emerald-400 font-semibold">cumulative grade point average</span>. By inputting their{" "}
            <span className="text-emerald-400 font-semibold">grades and credits</span> for each subject, students can quickly get an accurate CGPA result.
          </p>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/cgpa">
              <InteractiveHoverButton className="w-full sm:w-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] px-10 py-5 text-lg">
                <span className="inline-flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <span>Use Now</span>
                </span>
              </InteractiveHoverButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cgpa;
