"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Terminal, ExternalLink, Check, Copy, Github } from "lucide-react";

const BREW_COMMAND = "brew tap mafex11/tap && brew install --cask yuki";
const RELEASES_URL = "https://github.com/mafex11/yuki-mac-use/releases/tag/v0.5.0";
const REPO_URL = "https://github.com/mafex11/yuki-mac-use";

export default function DownloadSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(BREW_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  return (
    <section id="download" className="w-full bg-black py-20 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(244, 63, 94, 0.12) 20%, rgba(244, 63, 94, 0.06) 50%, rgba(0, 0, 0, 0.0) 80%)`,
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
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
            Get Yuki
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin">
            One command. Free &amp; open source.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl hover:border-[rgba(251,50,50,0.4)] hover:shadow-[0_20px_45px_rgba(251,50,50,0.15)] transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(251,50,50,0.05)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/20 group-hover:border-[rgba(251,50,50,0.5)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(251,50,50,0.3)]">
                <Apple className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-semibold group-hover:text-orange-100 transition-colors duration-300">
                  macOS
                </h3>
                <p className="text-white/50 text-sm">macOS 13+ · Apple Silicon · v0.5.0</p>
              </div>
            </div>

            {/* Brew command with copy button */}
            <div className="rounded-xl bg-zinc-950/80 border border-white/10 px-4 py-3.5 flex items-center gap-3 mb-6">
              <Terminal className="w-4 h-4 text-white/50 shrink-0" />
              <code className="text-white/90 text-xs sm:text-sm font-mono flex-1 overflow-x-auto whitespace-nowrap">
                {BREW_COMMAND}
              </code>
              <motion.button
                type="button"
                onClick={copyCommand}
                whileTap={{ scale: 0.9 }}
                aria-label={copied ? "Copied" : "Copy install command"}
                className="shrink-0 p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 text-white hover:from-zinc-700 hover:to-zinc-800 border border-white/20 hover:border-[rgba(251,50,50,0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(251,50,50,0.2)]"
              >
                <span className="font-medium">Release notes — v0.5.0</span>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">Source on GitHub</span>
              </a>
            </div>

            <p className="text-white/40 text-xs text-center mt-6">
              MIT licensed. Bring your own AI key — Google Gemini (free tier), Anthropic, or local Ollama.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
