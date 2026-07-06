"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Square } from "lucide-react";

const COMMAND = "play my japanese playlist";
const TYPE_MS = 55;

type Row =
  | { kind: "user"; text: string }
  | { kind: "step"; text: string; done?: boolean }
  | { kind: "reply"; text: string };

// The conversation that plays inside the window, in order.
const SCRIPT: Row[] = [
  { kind: "user", text: COMMAND },
  { kind: "step", text: "Opening Spotify" },
  { kind: "step", text: "Searching your library for “japanese”" },
  { kind: "step", text: "Playing NIGHT DANCER", done: true },
  { kind: "reply", text: "Playing your japanese playlist 🎵 — now on “NIGHT DANCER” by imase." },
];

const STEP_COUNT = SCRIPT.filter((r) => r.kind === "step").length;

/// The Yuki command-bar window, as it looks on a Mac, running one task on
/// loop: type → steps narrate (with Stop) → answer. One window, one shape —
/// the hero beam lands on this.
export default function TaskPillDemo() {
  const reducedMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  // index into SCRIPT of the last visible row; -1 = still typing
  const [visible, setVisible] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 700;

    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(setTimeout(() => setTypedCount(i), t + i * TYPE_MS));
    }
    t += COMMAND.length * TYPE_MS + 600;

    SCRIPT.forEach((row, i) => {
      timers.push(setTimeout(() => setVisible(i), t));
      t += row.kind === "user" ? 500 : row.kind === "reply" ? 3600 : 1400;
    });

    timers.push(
      setTimeout(() => {
        setTypedCount(0);
        setVisible(-1);
        setCycle((c) => c + 1);
      }, t)
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle, reducedMotion]);

  const shownRows = reducedMotion ? SCRIPT : SCRIPT.slice(0, visible + 1);
  const typed = reducedMotion ? COMMAND : COMMAND.slice(0, typedCount);
  const running =
    !reducedMotion && visible >= 0 && visible < SCRIPT.length - 1;
  const stepsShown = shownRows.filter((r) => r.kind === "step").length;

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      aria-label="Demo of a Yuki task: play my japanese playlist"
    >
      <div
        className="relative rounded-2xl text-left overflow-hidden border border-white/10 bg-[#101216]/95 shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
      >
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/90" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/90" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/90" />
          <span className="ml-3 text-[12px] text-white/40 select-none">Yuki</span>
          <span className="ml-auto flex items-center gap-1 select-none">
            {["⌘", "⇧", "A"].map((k) => (
              <kbd
                key={k}
                className="rounded border border-white/12 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono text-white/45"
              >
                {k}
              </kbd>
            ))}
          </span>
        </div>

        {/* conversation area — fixed height so the window never jumps */}
        <div className="px-4 sm:px-5 py-4 h-[176px] sm:h-[188px] flex flex-col justify-end gap-2 overflow-hidden">
          <AnimatePresence initial={false}>
            {shownRows.map((row, i) => (
              <motion.div
                key={`${cycle}-${i}`}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                layout={!reducedMotion}
              >
                {row.kind === "user" && (
                  <div className="flex justify-end">
                    <span className="rounded-xl rounded-br-sm bg-sky-500/15 border border-sky-300/25 px-3.5 py-2 text-sm text-sky-100/95">
                      {row.text}
                    </span>
                  </div>
                )}
                {row.kind === "step" && (
                  <div className="flex items-center gap-2.5 pl-1">
                    {row.done ? (
                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      </span>
                    ) : (
                      <span
                        className={`h-[14px] w-[14px] shrink-0 rounded-full border-[1.5px] ${
                          i === visible && running
                            ? "border-white/15 border-t-sky-300 animate-spin"
                            : "border-white/20"
                        }`}
                      />
                    )}
                    <span className="text-[13px] text-white/60">{row.text}</span>
                  </div>
                )}
                {row.kind === "reply" && (
                  <div className="flex justify-start">
                    <span className="rounded-xl rounded-bl-sm bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm text-white/85 leading-relaxed max-w-[85%]">
                      {row.text}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* input row */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-t border-white/[0.07] bg-white/[0.03]">
          <span className="text-sky-300/80 font-mono text-sm select-none">❯</span>
          {visible < 0 && !reducedMotion ? (
            <span className="flex-1 font-mono text-sm text-white/90 truncate">
              {typed}
              <span className="inline-block w-[2px] h-[1.05em] align-text-bottom bg-sky-200/80 ml-0.5 animate-pulse" />
            </span>
          ) : (
            <span className="flex-1 font-mono text-sm text-white/25 select-none">
              Ask Yuki…
            </span>
          )}
          {running ? (
            <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-red-400/25 bg-red-500/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-red-300/90 select-none">
              <Square className="h-2 w-2 fill-current" />
              STOP
            </span>
          ) : (
            <span className="shrink-0 text-[10px] text-white/25 select-none">
              step {Math.min(stepsShown, STEP_COUNT)}/{STEP_COUNT}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
