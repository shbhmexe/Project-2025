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
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
            >
              <Calculator className="h-7 w-7 text-emerald-500" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              CGPA Calculator
            </h2>
          </div>
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
              <InteractiveHoverButton className="shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] px-10 py-5 text-lg">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Use Now
                </div>
              </InteractiveHoverButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cgpa;
