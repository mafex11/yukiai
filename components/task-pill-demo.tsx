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
      {/* aurora behind the glass: liquid glass needs light to refract.
          Bright drifting blobs sitting just under the window, like a
          wallpaper glowing through the material. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible" aria-hidden="true">
        <motion.div
          className="absolute left-[4%] top-[6%] h-64 w-96 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(127,180,232,0.85), transparent 68%)", filter: "blur(34px)" }}
          animate={reducedMotion ? undefined : { x: [0, 46, -14, 0], y: [0, 20, 42, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[2%] top-[18%] h-72 w-[26rem] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(150,130,245,0.75), transparent 68%)", filter: "blur(38px)" }}
          animate={reducedMotion ? undefined : { x: [0, -50, 12, 0], y: [0, 30, -16, 0], scale: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[28%] bottom-[-6%] h-56 w-[30rem] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(110,225,235,0.7), transparent 68%)", filter: "blur(36px)" }}
          animate={reducedMotion ? undefined : { x: [0, 34, -40, 0], y: [0, -22, 8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* SVG displacement filter: bends the backdrop at the edges the way
          real glass refracts. Supported in Blink/Gecko; Safari falls back to
          plain blur (the rest of the treatment still reads as glass). */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="liquid-glass-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div
        className="liquid-glass relative rounded-[32px] text-left"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: [
            "0 24px 70px rgba(0,0,0,0.55)",
            "0 0 60px rgba(127,180,232,0.12)",
            "inset 0 4px 18px rgba(255,255,255,0.14)",
          ].join(", "),
        }}
      >
        {/* refracting blur layer (distorted where supported) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] overflow-hidden"
          style={{
            backdropFilter: "blur(3px) saturate(1.8)",
            WebkitBackdropFilter: "blur(3px) saturate(1.8)",
            filter: "url(#liquid-glass-distort)",
          }}
        />
        {/* inner shine: bright rim along top+bottom inner edges */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] z-10"
          style={{
            boxShadow:
              "inset 2px 2px 1px -2px rgba(255,255,255,0.9), inset -2px -2px 1px -2px rgba(255,255,255,0.75), inset 0 -10px 24px -18px rgba(255,255,255,0.8)",
          }}
        />
        {/* specular sweep across the top of the glass */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 z-10 rounded-t-[32px]"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 38%, transparent 60%)",
          }}
        />
        {/* title bar */}
        <div className="relative z-20 flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.14]">
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
        <div className="relative z-20 px-4 sm:px-5 py-4 h-[210px] sm:h-[224px] flex flex-col justify-end gap-2 overflow-hidden">
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
                    <span
                      className="rounded-2xl rounded-br-md px-3.5 py-2 text-sm text-sky-50/95"
                      style={{
                        background: "rgba(127,180,232,0.16)",
                        border: "1px solid rgba(210,232,252,0.45)",
                        boxShadow: "inset 0 2px 6px rgba(255,255,255,0.22)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
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
                    <span className="text-[13px] text-white/55">{row.text}</span>
                  </div>
                )}
                {row.kind === "reply" && (
                  <div className="flex justify-start">
                    <span
                      className="rounded-2xl rounded-bl-md px-3.5 py-2 text-sm text-white/90 leading-relaxed max-w-[85%]"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        boxShadow: "inset 0 2px 6px rgba(255,255,255,0.18)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      {row.text}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* input row */}
        <div className="relative z-20 flex items-center gap-3 px-4 sm:px-5 py-3 border-t border-white/[0.14]">
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
            <span
              className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider text-red-200/95 select-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,90,90,0.28), rgba(255,90,90,0.12))",
                border: "1px solid rgba(255,140,140,0.30)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
              }}
            >
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
