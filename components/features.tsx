"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiEditingIcon, AiVoiceIcon, CommandLineIcon, AccelerationIcon } from "@hugeicons/core-free-icons";
import { TaskDaily02Icon } from "@hugeicons/core-free-icons";
import { Brain02Icon } from "@hugeicons/core-free-icons";
import { ArrowRight02Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { Monitor, Apple } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  src?: string;
  platform: "macos" | "windows" | "both";
};

const featureImages: string[] = [
  "/GUIAutomation.png",
  "/image3.png",
  "/Shell.png",
  "/Tools.png",
  "/Memory.png",
  "/Task.png",
];

const features: Feature[] = [
  {
    title: "Native OS Automation",
    description: "macOS uses Accessibility APIs; Windows uses UI Automation — no computer vision needed for native app control.",
    platform: "both",
  },
  {
    title: "Voice Control",
    description: 'Say "Yuki" or press a hotkey to start. STT/TTS for hands-free operation on both platforms.',
    platform: "both",
  },
  {
    title: "Command Execution",
    description: "Execute shell commands, launch apps, manage files — full system-level access.",
    platform: "both",
  },
  {
    title: "17+ Automation Tools",
    description: "Click, type, scroll, launch, drag, move, shortcuts, keys, clipboard, shell, system, and more.",
    platform: "windows",
  },
  {
    title: "Memory & Context",
    description: "Remembers who you are, your preferences, and conversation history across sessions.",
    platform: "both",
  },
  {
    title: "Task Scheduling",
    description: "Schedule tasks, set reminders, and automate recurring workflows.",
    platform: "both",
  },
];

export type FeaturesProps = {
  onOpen?: (feature: Feature) => void;
};

export default function Features({ onOpen }: FeaturesProps) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const currentFeature = features[currentFeatureIndex];

  const nextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const renderIcon = (index: number) => {
    const iconCommon = { size: 20, color: "white" } as const;
    switch (index) {
      case 0: return <HugeiconsIcon icon={AiEditingIcon} {...iconCommon} />;
      case 1: return <HugeiconsIcon icon={AiVoiceIcon} {...iconCommon} />;
      case 2: return <HugeiconsIcon icon={CommandLineIcon} {...iconCommon} />;
      case 3: return <HugeiconsIcon icon={AccelerationIcon} {...iconCommon} />;
      case 4: return <HugeiconsIcon icon={Brain02Icon} {...iconCommon} />;
      case 5: return <HugeiconsIcon icon={TaskDaily02Icon} {...iconCommon} />;
      default: return null;
    }
  };

  const PlatformBadge = ({ platform }: { platform: string }) => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">
      {platform === "both" ? (
        <>
          <Apple className="w-3 h-3" />
          <Monitor className="w-3 h-3" />
          Both
        </>
      ) : platform === "macos" ? (
        <>
          <Apple className="w-3 h-3" />
          macOS
        </>
      ) : (
        <>
          <Monitor className="w-3 h-3" />
          Windows
        </>
      )}
    </span>
  );

  return (
    <section id="services" className="w-full relative bg-black py-12 overflow-hidden pt-40">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(244, 63, 94, 0.12) 20%, rgba(244, 63, 94, 0.06) 50%, rgba(0, 0, 0, 0.0) 80%)`,
        }}
      />

      <div className="w-full px-4 sm:px-4 lg:px-0 max-w-7xl mx-auto">
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
            Powerful Features
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin mb-20">
            Everything you need to automate and control your device
          </p>
        </motion.div>

        <div className="relative mb-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeatureIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {/* Image container */}
              <div className="w-full bg-gradient-to-br from-zinc-950/80 to-zinc-900/80 rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
                  <img
                    src={featureImages[currentFeatureIndex] ?? "/image.png"}
                    alt={currentFeature.title}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Title and content container */}
              <div className="w-full bg-gradient-to-br from-zinc-950/70 to-zinc-900/70 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/10 hover:shadow-[0_0_80px_rgba(250,50,50,0.1)] transition-all duration-500 group">
                <div className="p-5 lg:p-6 flex flex-col relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(250,50,50,0.05)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300">
                      {renderIcon(currentFeatureIndex)}
                    </div>
                    <h3 className="text-white font-semibold text-xl lg:text-2xl group-hover:text-orange-100 transition-colors duration-300">
                      {currentFeature.title}
                    </h3>
                    <PlatformBadge platform={currentFeature.platform} />
                  </div>
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300 relative z-10">
                    {currentFeature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous feature"
              onClick={prevFeature}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-zinc-950/95 to-zinc-900/95 hover:bg-[rgba(251,50,50,0.5)] border border-white/40 hover:border-[rgba(251,50,50,0.5)] backdrop-blur-md text-white transition-all duration-300 hover:scale-110 shadow-lg shadow-[rgba(251,50,50,0.3)] flex items-center justify-center group text-2xl"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={36} className="group-hover:text-white transition-colors duration-300" />
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={nextFeature}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-zinc-950/95 to-zinc-900/95 hover:bg-[rgba(251,50,50,0.5)] border border-white/40 hover:border-[rgba(251,50,50,0.5)] backdrop-blur-md text-white transition-all duration-300 hover:scale-110 shadow-lg shadow-[rgba(251,50,50,0.3)] flex items-center justify-center group text-2xl"
            >
              <HugeiconsIcon icon={ArrowRight02Icon} size={36} className="group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
