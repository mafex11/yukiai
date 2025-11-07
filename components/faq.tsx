"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Qa = { q: string; a: string };

const qas: Qa[] = [
  {
    q: "Does Yuki work offline?",
    a: "Wake word and device control work locally. Cloud STT/TTS is optional.",
  },
  {
    q: "What Windows versions are supported?",
    a: "Windows 10 and 11 with the UI Automation framework enabled by default.",
  },
  {
    q: "How is my data handled?",
    a: "Commands run on your PC. No keystrokes are stored; logs are opt-in.",
  },
  {
    q: "Can I trigger actions with a hotkey?",
    a: "Yes. Configure a global hotkey to start/stop listening instantly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="w-full bg-black py-24 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 0%, rgba(255, 80, 120, 0.12), transparent 80%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">FAQ</h2>
          <p className="text-white/70 text-lg">Answers to common questions</p>
        </motion.div>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-950/80 to-zinc-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          {qas.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <motion.button
                key={item.q}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full text-left p-6 lg:p-8 focus:outline-none hover:bg-white/5 transition-colors duration-300 group"
                aria-expanded={isOpen}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-white text-lg sm:text-xl font-semibold group-hover:text-orange-100 transition-colors duration-300">{item.q}</h3>
                  <motion.span 
                    className="text-white/60 text-2xl font-light flex-shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/70 mt-4 leading-relaxed overflow-hidden"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


