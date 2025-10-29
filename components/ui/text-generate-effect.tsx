"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay,
  byChar = false,
  glow = false,
  glowColor = "rgba(255,255,255,0.9)",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  byChar?: boolean;
  glow?: boolean;
  glowColor?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const charsArray = Array.from(words);
  useEffect(() => {
    animate(
      byChar ? ".char" : "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(
          byChar ? (staggerDelay ?? 0.03) : (staggerDelay ?? 0.12)
        ),
      }
    );
  }, [scope.current, byChar, duration, filter, staggerDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className=" text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  const renderChars = () => {
    return (
      <motion.div ref={scope}>
        {charsArray.map((ch, idx) => (
          <motion.span
            key={idx}
            className="char text-white opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
              textShadow: glow
                ? `0 0 6px ${glowColor}, 0 0 14px ${glowColor}`
                : "none",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="  text-white leading-snug tracking-wide">
          {byChar ? renderChars() : renderWords()}
        </div>
      </div>
    </div>
  );
};
