"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Hero() {
  // For zoom effect on image2.png only
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const imageOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
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
                <TextGenerateEffect
                  words='"Yuki, help me with this"'
                  className="text-xl sm:text-6xl lg:text-8xl font-normal text-white text-center px-4"
                  byChar
                  glow
                  glowColor="rgba(255,180,120,0.9)"
                />
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

          <motion.div
            className="relative w-full max-w-6xl mx-auto p-4 bg-zinc-950/90 border border-white/10 rounded-3xl mt-10"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <Image
              src="/image2.png"
              alt="Yuki AI"
              width={1800}
              height={1000}
              className="w-full h-auto rounded-3xl shadow-2xl shadow-orange-500/50"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
