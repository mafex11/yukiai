"use client";

import React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import SectionHeader from "./section-header";
import {
  CommandLineIcon,
  Loading03Icon,
  Message01Icon,
  CursorPointer01Icon,
  Brain02Icon,
  LockKeyIcon,
} from "@hugeicons/core-free-icons";

type Feature = {
  title: string;
  description: string;
  icon: IconSvgElement;
  tag: string;
};

const features: Feature[] = [
  {
    title: "One shortcut, plain words",
    description:
      "Press ⌘⇧A anywhere and a Raycast-style command bar appears. Type what you want — \"email Bob about tomorrow\" — and the bar gets out of the way the moment the task starts.",
    icon: CommandLineIcon,
    tag: "⌘⇧A command bar",
  },
  {
    title: "Watch every step, stop anytime",
    description:
      "A small activity pill narrates the task in plain words — \"Opening Spotify\", \"Typing…\" — with a live progress bar and a STOP button. Touch the mouse or keyboard and Yuki pauses instantly.",
    icon: Loading03Icon,
    tag: "Activity pill",
  },
  {
    title: "It asks before it guesses",
    description:
      "When a task is ambiguous, Yuki asks you mid-task right on the pill — tap an option button or type a quick reply — then carries on exactly where it left off.",
    icon: Message01Icon,
    tag: "Mid-task questions",
  },
  {
    title: "Real control of real apps",
    description:
      "Direct control of Spotify, Apple Music, your browser, Mail, Messages, Notes, Calendar, and Reminders — plus any app via the accessibility tree. Element-level clicks, no screenshots.",
    icon: CursorPointer01Icon,
    tag: "Native app control",
  },
  {
    title: "It learns you, locally",
    description:
      "Yuki quietly observes your apps, music, and rhythm on-device, then distills daily notes into ~/YukiVault — plain markdown you can read and edit. Tasks use that memory of your people, projects, and routines.",
    icon: Brain02Icon,
    tag: "Local memory",
  },
  {
    title: "Your data stays on the Mac",
    description:
      "Raw activity never leaves your machine. Only small aggregated summaries reach the AI provider, and you can switch observation off entirely with YUKI_OBSERVER=0.",
    icon: LockKeyIcon,
    tag: "Privacy first",
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="w-full relative bg-black py-24 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(127, 180, 232, 0.12) 20%, rgba(127, 180, 232, 0.06) 50%, rgba(0, 0, 0, 0.0) 80%)`,
        }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="What Yuki does"
            title="An assistant that works your Mac the way you do"
            sub="And tells you what it's doing, every step."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/70 to-zinc-900/70 backdrop-blur-xl p-6 lg:p-8 hover:border-[rgba(127,180,232,0.4)] hover:shadow-[0_20px_45px_rgba(127,180,232,0.15)] transition-[border-color,box-shadow] duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(127,180,232,0.06)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/20 group-hover:border-[rgba(127,180,232,0.5)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(127,180,232,0.3)]">
                    <HugeiconsIcon
                      icon={feature.icon}
                      size={24}
                      color="white"
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-white text-xl lg:text-2xl font-semibold mb-3 group-hover:text-sky-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm lg:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
