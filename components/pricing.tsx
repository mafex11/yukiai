"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Every feature, no tiers",
  "⌘⇧A command bar + activity pill",
  "Native control of your Mac's apps",
  "Local learning & memory in ~/YukiVault",
  "MIT licensed — read, fork, contribute",
  "Bring your own AI key (Gemini free tier, Anthropic, or local Ollama)",
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-zinc-950 py-20 sm:py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
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
            Pricing
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin mb-16">
            There isn&apos;t any. Yuki is free and open source.
          </p>
        </motion.div>

        <div className="flex justify-center px-4 sm:px-0">
          <motion.div
            className="rounded-3xl border border-[rgba(251,50,50,0.4)] backdrop-blur-2xl relative overflow-hidden w-full max-w-md group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } }}
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.6) 100%)",
              boxShadow:
                "0 20px 60px 0 rgba(0,0,0,0.6), 0 0 50px 15px rgba(251,50,50,0.35), inset 0 1px 0 0 rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 120% 90% at 50% 100%, rgba(255, 80, 120, 0.18), transparent 80%)",
              }}
            />
            <div className="relative z-10 flex flex-col px-6 py-8 sm:px-8 sm:py-10">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <span className="px-3 py-1 rounded-full bg-white/30 text-zinc-900 text-xs font-semibold mb-4">
                  MIT Licensed
                </span>
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                  Free &amp; open source
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-white text-4xl sm:text-5xl font-bold tracking-tight">$0</span>
                  <span className="text-white/60 text-sm sm:text-base">forever</span>
                </div>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm">
                  The whole app, every feature. The only thing you bring is an AI key — and
                  Gemini&apos;s free tier or a local Ollama model means even that can cost nothing.
                </p>
              </div>

              {/* CTA */}
              <motion.a
                href="#download"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-full px-5 py-3 text-base sm:text-lg font-normal transition-all duration-300 mb-6 text-center block bg-zinc-950/10 text-white hover:bg-zinc-950/30 border border-white/30 shadow-lg shadow-[rgba(251,50,50,0.4)] hover:shadow-xl hover:shadow-[rgba(251,50,50,0.5)]"
              >
                Install Yuki
              </motion.a>

              {/* Separator */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-transparent px-3 text-white/60 text-xs uppercase tracking-wider font-medium">
                    Included
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 + 0.2 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 group-hover/item:border-[rgba(251,50,50,0.5)] flex items-center justify-center shrink-0 transition-all duration-300">
                      <Check className="w-3 h-3 text-white group-hover/item:text-[rgba(251,50,50,0.9)] transition-colors duration-300" />
                    </div>
                    <span className="text-white/80 group-hover/item:text-white text-sm sm:text-base leading-relaxed pt-0.5 transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
