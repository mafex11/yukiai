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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center mb-5">
                <HugeiconsIcon icon={s.icon} size={26} color="white" />
              </div>
              <h3 className="text-white text-2xl font-medium mb-2">{s.title}</h3>
              <p className="text-white/70 text-base leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


