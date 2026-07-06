"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Square } from "lucide-react";

const COMMAND = "play my japanese playlist";
const TYPE_MS = 55;

type Step = { label: string; progress: number; done?: boolean };

const STEPS: Step[] = [
  { label: "Opening Spotify", progress: 0.3 },
  { label: "Searching “japanese”…", progress: 0.68 },
  { label: "Done — Playing NIGHT DANCER by imase", progress: 1, done: true },
];

// Phases: -1 = command bar typing, 0..2 = pill steps
export default function TaskPillDemo() {
  const reducedMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  const [phase, setPhase] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 600; // small pause before typing starts

    // type the command character by character
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(setTimeout(() => setTypedCount(i), t + i * TYPE_MS));
    }
    t += COMMAND.length * TYPE_MS + 700; // dwell after typing

    // pill steps
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i), t));
      t += i === STEPS.length - 1 ? 2600 : 1500;
    });

    // reset and loop
    timers.push(
      setTimeout(() => {
        setTypedCount(0);
        setPhase(-1);
        setCycle((c) => c + 1);
      }, t)
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle, reducedMotion]);

  const showBar = reducedMotion ? false : phase === -1;
  const step = reducedMotion ? STEPS[STEPS.length - 1] : phase >= 0 ? STEPS[phase] : null;
  const typed = reducedMotion ? COMMAND : COMMAND.slice(0, typedCount);

  return (
    <div className="w-full max-w-xl mx-auto h-[60px] relative" aria-label="Demo of a Yuki task: play my japanese playlist">
      <AnimatePresence mode="wait">
        {showBar && (
          <motion.div
            key="bar"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl border border-white/15 bg-zinc-950/90 backdrop-blur-xl px-4 sm:px-5 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(127,180,232,0.12)]"
          >
            <span className="hidden sm:flex items-center gap-1 shrink-0">
              {["⌘", "⇧", "A"].map((k) => (
                <kbd
                  key={k}
                  className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] font-mono text-white/60"
                >
                  {k}
                </kbd>
              ))}
            </span>
            <span className="font-mono text-sm sm:text-base text-white/90 truncate">
              {typed}
              <span className="inline-block w-[2px] h-[1.1em] align-text-bottom bg-white/80 ml-0.5 animate-pulse" />
            </span>
          </motion.div>
        )}

        {step && (
          <motion.div
            key={reducedMotion ? "pill-static" : `pill-${cycle}`}
            initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-0 rounded-full border border-white/15 bg-zinc-950/90 backdrop-blur-xl px-4 sm:px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(127,180,232,0.12)] overflow-hidden"
          >
            <div className="flex items-center gap-3">
              {step.done ? (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40">
                  <Check className="h-3 w-3 text-emerald-400" />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
              )}
              <AnimatePresence mode="wait">
                <motion.span
                  key={step.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 text-left text-sm sm:text-base text-white/90 truncate"
                >
                  {step.label}
                </motion.span>
              </AnimatePresence>
              {!step.done && (
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(127,180,232,0.45)] bg-[rgba(127,180,232,0.12)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-sky-300">
                  <Square className="h-2.5 w-2.5 fill-current" />
                  STOP
                </span>
              )}
            </div>
            {/* live step progress bar */}
            <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${step.done ? "bg-emerald-400/80" : "bg-gradient-to-r from-sky-400 to-sky-300"}`}
                initial={reducedMotion ? false : { width: 0 }}
                animate={{ width: `${step.progress * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
