"use client";

import Hero from "../components/hero";
import Features, { Feature } from "../components/features";
import Pricing from "../components/pricing";
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
      <Features onOpen={setActiveFeature} />
      <AnimatePresence>
        {activeFeature && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 h-full w-full z-50" />
            <div className="fixed inset-0 grid place-items-center z-50">
              <motion.div
                ref={ref}
                className="w-[96%] max-w-[840px] h-full md:h-fit md:max-h-[92%] flex flex-col bg-zinc-950/95 backdrop-blur-xl border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div className="w-full bg-zinc-900/50">
                  <div className="relative w-full aspect-video">
                    <img src={activeFeature.src ?? "/image.png"} alt={activeFeature.title} className="absolute inset-0 w-full h-full  object-center" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="p-6 md:p-8 flex items-start gap-4 border-b border-white/10">
                    <div className="flex-1">
                      <h3 className="text-white text-2xl font-medium leading-tight">{activeFeature.title}</h3>
                      <p className="text-white/70 text-base mt-2">{activeFeature.description}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="text-white/80 text-sm md:text-base leading-relaxed">{activeFeature.description}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <Pricing />
    </>
  );
}