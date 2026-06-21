"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CommandLineIcon } from "@hugeicons/core-free-icons";
import { Monitor, Apple, Download, Terminal, ExternalLink } from "lucide-react";

const platforms = [
  {
    name: "macOS",
    icon: Apple,
    description: "Native macOS app with Accessibility API integration",
    primary: {
      label: "Download Yuki.app",
      href: "https://github.com/mafex11/yuki-mac-use/releases/download/v0.1.0/Yuki-0.1.0.zip",
    },
    secondary: {
      label: "brew install --cask mafex11/tap/yuki",
      type: "command" as const,
    },
    requirements: "macOS 12.0+, Apple Silicon or Intel",
  },
  {
    name: "Windows",
    icon: Monitor,
    description: "Windows GUI Automation with UI Automation framework",
    primary: {
      label: "View on GitHub",
      href: "https://github.com/mafex11/LLM-OS",
    },
    secondary: {
      label: "git clone & python main.py",
      type: "command" as const,
    },
    requirements: "Windows 10/11, Python 3.12+",
  },
];

export default function DownloadSection() {
  return (
    <section id="download" className="w-full bg-black py-20 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(244, 63, 94, 0.12) 20%, rgba(244, 63, 94, 0.06) 50%, rgba(0, 0, 0, 0.0) 80%)`,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Download
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin">
            Available now for macOS and Windows
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl hover:border-[rgba(251,50,50,0.4)] hover:shadow-[0_20px_45px_rgba(251,50,50,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(251,50,50,0.05)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                {/* Platform header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/20 group-hover:border-[rgba(251,50,50,0.5)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(251,50,50,0.3)]">
                    <platform.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-semibold group-hover:text-orange-100 transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <p className="text-white/50 text-sm">{platform.requirements}</p>
                  </div>
                </div>

                <p className="text-white/70 text-base mb-6 leading-relaxed">
                  {platform.description}
                </p>

                {/* Primary download button */}
                <a
                  href={platform.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 text-white hover:from-zinc-700 hover:to-zinc-800 border border-white/20 hover:border-[rgba(251,50,50,0.5)] transition-all duration-300 mb-4 group/btn hover:shadow-lg hover:shadow-[rgba(251,50,50,0.2)]"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">{platform.primary.label}</span>
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>

                {/* Secondary (terminal command) */}
                {platform.secondary.type === "command" && (
                  <div className="rounded-xl bg-zinc-950/80 border border-white/10 px-4 py-3 flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-white/50 shrink-0" />
                    <code className="text-white/80 text-xs sm:text-sm font-mono truncate">
                      {platform.secondary.label}
                    </code>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
