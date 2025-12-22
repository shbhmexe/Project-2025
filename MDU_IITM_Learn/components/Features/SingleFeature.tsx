"use client";

import { motion } from "framer-motion";
import { Feature } from "@/types/feature";

const SingleFeature = ({ feature, index }: { feature: Feature; index: number }) => {
  const { icon, title, paragraph } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="w-full"
    >
      <div className="group bg-card rounded-2xl border border-emerald-500/20 p-6 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all duration-300">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-500 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="text-base font-medium leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      </div>
    </motion.div>
  );
};

export default SingleFeature;
