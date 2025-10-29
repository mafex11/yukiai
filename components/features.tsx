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

type Feature = {
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

export default function Features() {
  const [active, setActive] = useState<Feature | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null!);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const renderIcon = (index: number) => {
    const iconCommon = { size: 24, color: "white" } as const;
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
    <div className="w-full bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 h-full w-full z-10" />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-100">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[560px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-zinc-950 border border-white/10 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layout className="w-full h-56 bg-zinc-900/50">
                  <img
                    src={active.src ?? "/image.png"}
                    alt={active.title}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <div className="p-6 flex items-start gap-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    {renderIcon(features.findIndex(f => f.title === active.title))}
                  </div>
                  <div className="flex-1">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="text-white text-lg font-medium">{active.title}</motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-white/60 text-sm">{active.description}</motion.p>
                  </div>
                  <motion.button onClick={() => setActive(null)} className="ml-auto text-white/80 hover:text-white" aria-label="Close">×</motion.button>
                </div>
                <div className="p-6">
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/70 text-sm leading-relaxed">
                    {active.description}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((card, index) => (
            <motion.li
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive({ ...card, src: featureImages[index] })}
              className="bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">{renderIcon(index)}</div>
                <div className="flex-1 min-w-0">
                  <motion.h3 layoutId={`title-${card.title}-${id}`} className="text-white font-medium text-base truncate">{card.title}</motion.h3>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

