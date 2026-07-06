"use client";

import { motion } from "framer-motion";

/// One header system for every section: a small frost eyebrow, a display-face
/// title (no glow — the hero owns the glow), an optional one-line sub.
export default function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      className="mb-12 sm:mb-16 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-200/80 mb-5">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      {sub && (
        <p className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
