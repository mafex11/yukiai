"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiVoiceIcon, Brain02Icon, AccelerationIcon } from "@hugeicons/core-free-icons";

const steps = [
  {
    title: "Wake word",
    description: "Say \"Yuki\" or press a hotkey to start.",
    icon: AiVoiceIcon,
  },
  {
    title: "Understands intent",
    description: "Parses your command and chooses the right tools.",
    icon: Brain02Icon,
  },
  {
    title: "Does the work",
    description: "Automates apps using Windows UI Automation; fast and reliable.",
    icon: AccelerationIcon,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-zinc-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">How it works</h2>
          <p className="text-white/70 text-lg">From voice to action in three steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-white/10 bg-linear-to-br from-zinc-900/60 to-zinc-950/60 p-8 lg:p-10 backdrop-blur-xl hover:border-[rgba(251,50,50,0.5)] hover:shadow-[0_20px_45px_rgba(251,50,50,0.5)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[rgba(251,50,50,0.5)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/20 group-hover:border-[rgba(251,50,50,0.5)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(251,50,50,0.5)]">
                  <HugeiconsIcon icon={s.icon} size={28} color="white" className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-white text-2xl font-semibold mb-3 group-hover:text-orange-100 transition-colors duration-300">{s.title}</h3>
                <p className="text-white/70 text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


