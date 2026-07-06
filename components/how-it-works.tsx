"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CommandLineIcon, Loading03Icon, Brain02Icon } from "@hugeicons/core-free-icons";
import SectionHeader from "./section-header";

const steps = [
  {
    title: "Press ⌘⇧A and ask",
    description:
      "A command bar drops down wherever you are. Tell it what you want in plain words — no syntax, no setup — and it gets to work.",
    icon: CommandLineIcon,
  },
  {
    title: "Watch the pill, stay in control",
    description:
      "The activity pill narrates each step with a live progress bar. Hit STOP anytime, answer its questions mid-task, or just touch the mouse — Yuki pauses instantly.",
    icon: Loading03Icon,
  },
  {
    title: "It gets more yours over time",
    description:
      "Yuki learns your apps, music, and routines locally, keeping editable notes in ~/YukiVault. The more you use it, the less you have to explain.",
    icon: Brain02Icon,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-zinc-950 py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="How it works"
            title="From a sentence to a finished task"
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 p-8 lg:p-10 backdrop-blur-xl hover:border-[rgba(127,180,232,0.35)] hover:shadow-[0_20px_45px_rgba(127,180,232,0.12)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(127,180,232,0.07)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/20 group-hover:border-[rgba(127,180,232,0.5)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(127,180,232,0.5)]">
                    <HugeiconsIcon icon={s.icon} size={28} color="white" className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-white/20 text-5xl font-thin select-none">{i + 1}</span>
                </div>
                <h3 className="text-white text-2xl font-semibold mb-3 group-hover:text-sky-100 transition-colors duration-300">{s.title}</h3>
                <p className="text-white/70 text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
