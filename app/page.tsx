"use client";

import Hero from "../components/hero";
import Features, { Feature } from "../components/features";
import DemoVideo from "../components/demo-video";
import HowItWorks from "../components/how-it-works";
import FAQ from "../components/faq";
import Pricing from "../components/pricing";
import GradualBlur from "../components/GradualBlur";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function YukiAI() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const ref = useRef<HTMLDivElement>(null!);
  useOutsideClick(ref, () => setActiveFeature(null));

  return (
    <>
      <Hero/>
      {/* <DemoVideo /> */}
      <Features onOpen={setActiveFeature} />
      <AnimatePresence>
        {activeFeature && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-lg h-full w-full z-50" 
            />
            <div className="fixed inset-0 grid place-items-center z-50 p-4">
              <motion.div
                ref={ref}
                className="w-full max-w-4xl h-full md:h-fit md:max-h-[90vh] flex flex-col bg-gradient-to-b from-zinc-950/98 to-zinc-900/98 backdrop-blur-2xl border border-white/20 sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="relative w-full aspect-video">
                    <img 
                      src={activeFeature.src ?? "/image.png"} 
                      alt={activeFeature.title} 
                      className="absolute inset-0 w-full h-full object-cover object-center" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col bg-zinc-950/50">
                  <div className="p-6 md:p-8 lg:p-10 flex items-start gap-4 border-b border-white/10 bg-gradient-to-b from-zinc-950/50 to-transparent">
                    <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white text-2xl md:text-3xl font-semibold leading-tight mb-3"
                      >
                        {activeFeature.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-white/70 text-base md:text-lg leading-relaxed"
                      >
                        {activeFeature.description}
                      </motion.p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 lg:p-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/80 text-sm md:text-base leading-relaxed space-y-4"
                    >
                      <p>{activeFeature.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <Pricing />
      <HowItWorks />
      <FAQ />
      <GradualBlur preset="page-footer" target="page" position="bottom" height="8rem" strength={2} zIndex={40} animated />
    </>
  );
}