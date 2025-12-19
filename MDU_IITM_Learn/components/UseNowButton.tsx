"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UseNowButton() {
  return (
    <Link href="/cgpa">
      <motion.button
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 px-10 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-all duration-200 hover:shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        whileHover={{
          scale: 1.04,
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">USE NOW</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
        />
      </motion.button>
    </Link>

  );
}
