"use client";

import { useState } from "react";

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
    <section id="faq" className="w-full bg-black py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">FAQ</h2>
          <p className="text-white/70 text-lg">Answers to common questions</p>
        </div>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          {qas.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <button
                key={item.q}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full text-left p-6 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-white text-lg sm:text-xl font-medium">{item.q}</h3>
                  <span className="text-white/60">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && (
                  <p className="text-white/70 mt-3 leading-relaxed">{item.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


