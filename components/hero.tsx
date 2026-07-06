"use client";

import HeroBackground from "./hero-background";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowRight, Github } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import TaskPillDemo from "./task-pill-demo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.5,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const SUBHEAD =
  "Press ⌘⇧A, say what you want, and watch it happen — step by step, with a stop button.";

export default function Hero() {
  return (
    <main>
      <HeroBackground>
        <div
          style={{
            position: "absolute",
            top: "13%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            zIndex: 7,
          }}
        >
          <motion.div
            className="flex flex-col items-center justify-center w-full text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-full flex justify-center px-3 mb-4">
              <TextGenerateEffect
                words="Your Mac, on a first-name basis"
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white text-center max-w-5xl"
                duration={0.5}
                staggerDelay={0.02}
                byChar
                glow
                glowColor="rgba(127,180,232,0.45)"
              />
            </div>
            <motion.p
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg lg:text-xl font-light text-white/70 text-center px-6 mb-10 max-w-2xl leading-relaxed"
            >
              {SUBHEAD.split(" ").map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-1.5">
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Live task lifecycle demo: command bar -> activity pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="w-full px-6 mb-8"
            >
              <TaskPillDemo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="flex flex-col items-center gap-4 justify-center w-full"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    asChild
                    className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-sky-950/40 backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(180,215,245,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden text-sm sm:text-base"
                  >
                    <a href="#download">
                      <HugeiconsIcon
                        icon={Loading03Icon}
                        className="transition-transform duration-300 group-hover:rotate-[90deg]"
                      />
                      <span>Install with Homebrew</span>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-transparent backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(180,215,245,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden text-sm sm:text-base"
                  >
                    <a
                      href="https://github.com/mafex11/yuki-mac-use"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                      <span>Star on GitHub</span>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
                    </a>
                  </Button>
                </motion.div>
              </div>
              <p className="text-white/50 text-sm font-light">
                Free &amp; open source · macOS 13+ · Apple Silicon · v0.5.0
              </p>
            </motion.div>
          </motion.div>
        </div>
      </HeroBackground>
    </main>
  );
}
