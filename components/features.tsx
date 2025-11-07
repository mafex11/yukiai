"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AiEditingIcon, AiVoiceIcon, CommandLineIcon, AccelerationIcon } from "@hugeicons/core-free-icons";
import { AircraftGameIcon } from "@hugeicons/core-free-icons";
import { TaskDaily02Icon } from "@hugeicons/core-free-icons";
import { FocusPointIcon } from "@hugeicons/core-free-icons";
import { AppleVisionProIcon } from "@hugeicons/core-free-icons";
import { Brain02Icon } from "@hugeicons/core-free-icons";
import { ArrowRight02Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";

export type Feature = {
  title: string;
  description: string;
  src?: string;
};

const featureImages: string[] = [
  "/image.png",
  "/image3.png",
  "/next.svg",
  "/vercel.svg",
  "/globe.svg",
  "/window.svg",
  "/file.svg",
  "/image.png",
  "/image3.png",
];

const features: Feature[] = [
  {
    title: "Windows GUI Automation",
    description: "No computer vision; uses Windows UI Automation to interact with GUI elements.",
  },
  {
    title: "Voice Control",
    description: 'Trigger word detection ("yuki") with STT/TTS for voice commands.',
  },
  {
    title: "Command Execution",
    description: "Execute commands with shell and system commands.",
  },
  {
    title: "17 Automation Tools",
    description: "Click, type, scroll, launch, drag, move, shortcuts, keys, wait, clipboard, shell, system, scrape, human, switch, resize, done.",
  },
  {
    title: "Memory & Context",
    description: "Remembers conversation history and maintains context across tasks.",
  },
  {
    title: "Program Usage Tracking",
    description: "Monitor and track application usage patterns.",
  },
  {
    title: "Task Scheduling and Reminders",
    description: "Schedule tasks and set reminders for better productivity.",
  },
  {
    title: "Focus Suggestions",
    description: "Get intelligent suggestions to help maintain focus.",
  },
  {
    title: "Proactive Interruptions",
    description: "Smart notification system that adapts to your workflow.",
  },
];

type FeaturesProps = {
  onOpen?: (feature: Feature) => void;
};

export default function Features({ onOpen }: FeaturesProps) {
  const [active, setActive] = useState<Feature | boolean | null>(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  const autoScrollRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const id = useId();

  const currentFeature = features[currentFeatureIndex];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    if (!onOpen && active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onOpen]);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    if (isPaused) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = window.setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPaused]);

  const nextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => setIsPaused(false), 8000);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => setIsPaused(false), 8000);
  };

  const goToFeature = (index: number) => {
    setCurrentFeatureIndex(index);
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => setIsPaused(false), 8000);
  };

  const renderIcon = (index: number) => {
    const iconCommon = { size: 28, color: "white" } as const;
    switch (index) {
      case 0:
        return <HugeiconsIcon icon={AiEditingIcon} {...iconCommon} />;
      case 1:
        return <HugeiconsIcon icon={AiVoiceIcon} {...iconCommon} />;
      case 2:
        return <HugeiconsIcon icon={CommandLineIcon} {...iconCommon} />;
      case 3:
        return <HugeiconsIcon icon={AccelerationIcon} {...iconCommon} />;
      case 4:
        return <HugeiconsIcon icon={Brain02Icon} {...iconCommon} />;
      case 5:
        return <HugeiconsIcon icon={AircraftGameIcon} {...iconCommon} />;
      case 6:
        return <HugeiconsIcon icon={TaskDaily02Icon} {...iconCommon} />;
      case 7:
        return <HugeiconsIcon icon={FocusPointIcon} {...iconCommon} />;
      case 8:
        return <HugeiconsIcon icon={AppleVisionProIcon} {...iconCommon} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full relative bg-black py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 100%, rgba(255, 80, 120, 0.18), transparent 80%)",
        }}
      />
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">Powerful Features</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Everything you need to automate and control your Windows device</p>
        </motion.div>

        {/* Full-width feature with navigation */}
        <div 
          className="relative mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeatureIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Image container */}
              <div
                onClick={() =>
                  onOpen
                    ? onOpen({ ...currentFeature, src: featureImages[currentFeatureIndex] })
                    : setActive({ ...currentFeature, src: featureImages[currentFeatureIndex] })
                }
                className="w-full bg-gradient-to-br from-zinc-950/80 to-zinc-900/80 rounded-3xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full aspect-[16/9] bg-zinc-900 overflow-hidden">
                  <img
                    src={featureImages[currentFeatureIndex] ?? "/image.png"}
                    alt={currentFeature.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Title and content container */}
              <div
                onClick={() =>
                  onOpen
                    ? onOpen({ ...currentFeature, src: featureImages[currentFeatureIndex] })
                    : setActive({ ...currentFeature, src: featureImages[currentFeatureIndex] })
                }
                className="w-full bg-gradient-to-br from-zinc-950/70 to-zinc-900/70 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group"
              >
                <div className="p-8 lg:p-12 flex flex-col relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/40 flex items-center justify-center shrink-0 group-hover:border-orange-500/50 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                      {renderIcon(currentFeatureIndex)}
                    </div>
                    <h3 className="text-white font-semibold text-3xl lg:text-4xl group-hover:text-orange-100 transition-colors duration-300">{currentFeature.title}</h3>
                  </div>
                  <p className="text-white/70 text-lg lg:text-xl leading-relaxed group-hover:text-white/80 transition-colors duration-300 relative z-10">{currentFeature.description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            type="button"
            aria-label="Previous feature"
            onClick={prevFeature}
            className="absolute -left-12 lg:-left-16 xl:-left-20 top-1/2 -translate-y-1/2 h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-gradient-to-br from-zinc-950/95 to-zinc-900/95 hover:bg-[rgba(251,50,50,0.5)] border border-white/40 hover:border-[rgba(251,50,50,0.5)] backdrop-blur-md text-white z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[rgba(251,50,50,0.3)] flex items-center justify-center group"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={30} className="group-hover:text-white transition-colors duration-300" />
          </button>
          <button
            type="button"
            aria-label="Next feature"
            onClick={nextFeature}
            className="absolute -right-12 lg:-right-16 xl:-right-20 top-1/2 -translate-y-1/2 h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-gradient-to-br from-zinc-950/95 to-zinc-900/95 hover:bg-[rgba(251,50,50,0.5)] border border-white/40 hover:border-[rgba(251,50,50,0.5)] backdrop-blur-md text-white z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[rgba(251,50,50,0.3)] flex items-center justify-center group"
          >
            <HugeiconsIcon icon={ArrowRight02Icon} size={30} className="group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Feature indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {features.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                aria-label={`Go to feature ${index + 1}`}
                onClick={() => goToFeature(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentFeatureIndex
                    ? "h-2.5 w-10 bg-[rgba(251,50,50,0.8)] shadow-lg shadow-[rgba(251,50,50,0.4)]"
                    : "h-2 w-2 bg-white/40 hover:bg-[rgba(251,50,50,0.5)] hover:scale-125"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for feature details */}
      {!onOpen && (
        <>
      <AnimatePresence>
        {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 h-full w-full z-10"
              />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-100">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-[96%] max-w-[840px] h-full md:h-fit md:max-h-[92%] flex flex-col bg-zinc-950/95 backdrop-blur-xl border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <motion.div layout className="w-full bg-zinc-900/50 p-4 md:p-6">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src={active.src ?? "/image.png"}
                    alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <div className="p-6 md:p-8 flex items-start gap-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                        {renderIcon(features.findIndex((f) => f.title === active.title))}
                  </div>
                  <div className="flex-1">
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="text-white text-2xl font-medium leading-tight"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.description}-${id}`}
                          className="text-white/70 text-base mt-2"
                        >
                          {active.description}
                        </motion.p>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white/80 text-sm md:text-base leading-relaxed"
                      >
                    {active.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
        </>
      )}
    </div>
  );
}