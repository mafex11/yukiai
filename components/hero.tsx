"use client";

import { useState, useEffect } from "react";
import HeroBackground from './hero-background';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AccelerationIcon, Loading03Icon } from "@hugeicons/core-free-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
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

export default function Hero() {
  const rotatingPhrases = [
    "help me with this",
    "email bob to ask for leave tomorrow",
    "turn on bluetooth and connect to airpods",
    "send meeting link to sam on whatsapp",
    "set a reminder to call mom at 7pm",
    "play my workout playlist on spotify",
    "close all apps except vscode",
    "mute system volume for 30 minutes",
    "take a screenshot and save it to desktop",
    "read my unread emails",
    "open github and check notifications",
    "show cpu and memory usage",
    "join my next calendar meeting",
    "turn on dark mode",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  const displayText = `"Yuki, ${rotatingPhrases[phraseIndex]}"`;

  return (
    <main>
      <HeroBackground>
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          zIndex: 7
        }}>
          <motion.div
            className="flex flex-col items-center justify-center w-full text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center justify-center gap-2">
                {/* Mobile: Static Title */}
                <div className="md:hidden text-center">
                  <TextGenerateEffect
                    words='Yuki AI'
                    className="text-7xl font-normal text-white"
                    duration={0.5}
                    staggerDelay={0.015}
                    byChar
                    glow
                    glowColor="rgba(251,50,50,0.9)"
                  />
                </div>
                {/* Desktop: Rotating Title */}
                <div className="hidden md:block w-full max-w-8xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={displayText}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full"
                    >
                      <div className="w-full flex justify-center px-2 md:px-3 lg:px-4">
                        <TextGenerateEffect
                          words={displayText}
                          className="md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-white text-center wrap-break-words whitespace-normal max-w-full"
                          duration={0.5}
                          staggerDelay={0.015}
                          byChar
                          glow
                          glowColor="rgba(251,50,50,0.9)"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white text-center px-4 mb-6 -mt-4"
            >
              {"AI Agentic Assistant for macOS and Windows"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col items-center gap-6 justify-center w-full min-h-[110px]"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    asChild
                    className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden text-sm sm:text-base"
                  >
                    <a href="#download">
                      <motion.div
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                      >
                        <HugeiconsIcon
                          icon={Loading03Icon}
                          className="transition-transform duration-300 group-hover:rotate-[90deg]"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        Download Now
                      </motion.span>
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: 0.25 }}
                      >
                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
                      </motion.div>
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-transparent backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden text-sm sm:text-base"
                  >
                    <a href="#services">
                      <motion.div
                        initial={{ opacity: 0, x: -5, rotate: -30 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <HugeiconsIcon icon={AccelerationIcon} size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-30deg]" />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.25 }}
                      >
                        See Features
                      </motion.span>
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: 0.3 }}
                      >
                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
                      </motion.div>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </HeroBackground>
    </main>
  );
}
