"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Features, { Feature } from "./features";

type HeroProps = {
  featuresOnOpen?: (feature: Feature) => void;
};

export default function Hero({ featuresOnOpen }: HeroProps) {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const imageOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const [email, setEmail] = useState("");
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
    "start screen recording and open powerpoint",
    "read my unread emails",
    "open github and check notifications",
    "show cpu and memory usage",
    "lock the system after 10 minutes",
    "open latest project folder in vscode",
    "delete temporary files and clear cache",
    "start chrome in incognito mode",
    "join my next calendar meeting",
    "turn on dark mode",
    "enable airplane mode",
    "restart system after update completes",
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
    <div className="min-h-screen w-full relative bg-zinc-950 overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 "
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 100%), #100000",
        }}
      />
      

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-16 py-66 ">
        <div className="flex flex-col items-center gap-8 ">
          <motion.div
            className="flex flex-col items-center justify-center w-full text-center min-h-[40vh]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 mb-4 mt-20">
              <div className="flex items-center justify-center gap-2">
                {/* <Image
                  src="/logowithoutbg.svg"
                  alt="Yuki AI Logo"
                  width={80}
                  height={80}
                  className="w-10 h-10 sm:w-14 sm:h-14 mt-2"
                /> */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayText}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <TextGenerateEffect
                      words={displayText}
                      className="text-xl sm:text-6xl lg:text-8xl font-normal text-white text-center px-4"
                      duration={0.5}
                      staggerDelay={0.015}
                      byChar
                      glow
                      glowColor="rgba(255,180,120,0.9)"
                      
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white text-center px-4 mb-20">
                AI Agentic Assistant to Control And Automate Your Device
              </h1>
            {/* <p className="text-base sm:text-lg text-white/80 mb-8 text-center px-4">Yuki AI is a platform for creating and deploying AI models.</p> */}
            <div className="flex flex-col items-center gap-4 justify-center w-full">
              <form
                onSubmit={(e) => { e.preventDefault(); /* hook up later */ }}
                className="w-full max-w-xl flex items-center gap-2"
              >
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
                <Button type="submit" variant="secondary">Join waitlist</Button>
              </form>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">Get prelaunch demo</Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full mt-10">
            <Features onOpen={featuresOnOpen} />
          </div>
        </div>
      </main>
    </div>
  );
}
