"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AccelerationIcon } from "@hugeicons/core-free-icons";
import { Apple, Monitor } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="w-full bg-zinc-900 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-normal mb-2"
          style={{
            textShadow: '0 0 6px rgba(251,50,50,0.9), 0 0 14px rgba(251,50,50,0.9)',
          }}
        >
          Control your device with one sentence
        </h3>
        <p className="text-white/70 text-xl sm:text-2xl max-w-5xl mx-auto font-thin mb-8">
          Available now on macOS and Windows. Download and start automating.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="default"
            asChild
            className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base"
          >
            <a href="https://github.com/mafex11/yuki-mac-use/releases/download/v0.1.0/Yuki-0.1.0.zip">
              <Apple className="w-5 h-5" />
              <span>Download for Mac</span>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-12 px-4 sm:h-14 sm:px-7 rounded-full bg-transparent backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base"
          >
            <a href="https://github.com/mafex11/LLM-OS" target="_blank" rel="noopener noreferrer">
              <Monitor className="w-5 h-5" />
              <span>Get for Windows</span>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
