"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Qa = { q: string; a: string };

const qas: Qa[] = [
  {
    q: "Is my data private?",
    a: "Yes. Yuki observes your app usage, music, and rhythm entirely on your Mac and distills it into plain markdown notes in ~/YukiVault that you can read and edit. Raw activity never leaves the machine — only small aggregated summaries reach the AI provider. You can turn observation off entirely with YUKI_OBSERVER=0.",
  },
  {
    q: "What can Yuki actually control?",
    a: "It has direct control of Spotify, Apple Music, your browser, Mail, Messages, Notes, Calendar, and Reminders, plus full GUI control of any app through the macOS accessibility tree — element-level clicking, no screenshots. Follow-ups work too: say \"actually skip this song\" and it just does.",
  },
  {
    q: "What AI does it use? Do I need an API key?",
    a: "Yuki defaults to Google Gemini, which has a free tier — bring your own key. You can also use Anthropic, or run fully local with Ollama and no key at all.",
  },
  {
    q: "Can I stop it mid-task?",
    a: "Always. The activity pill shows every step in plain words with a STOP button, and Yuki pauses instantly the moment you touch the mouse or keyboard — then asks whether to resume or stop. It can also ask you questions mid-task when it needs a decision.",
  },
  {
    q: "Why does it need Accessibility permission?",
    a: "Accessibility is how Yuki reads the screen — the same API VoiceOver uses. It lets Yuki see buttons, fields, and menus as structured elements and click them precisely, instead of taking screenshots and guessing at pixels.",
  },
  {
    q: "Is Yuki open source?",
    a: "Yes — free and MIT licensed. The full source is on GitHub at github.com/mafex11/yuki-mac-use, and the latest release is v0.5.0. Install it with: brew tap mafex11/tap && brew install --cask yuki.",
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
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-2"
            style={{
              textShadow: '0 0 6px rgba(251,50,50,0.9), 0 0 14px rgba(251,50,50,0.9)',
            }}
          >
            FAQ
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin mb-20">Answers to common questions</p>
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
