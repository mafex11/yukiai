"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
          Control your PC with one sentence
        </h3>
        <p className="text-white/70 text-2xl max-w-5xl mx-auto font-thin mb-8">Join the waitlist or try the demo today.</p>
        <div className="flex items-center justify-center gap-4">
          <Button className="h-16 px-8 text-lg rounded-full bg-orange-950/60 border border-white/30 text-white hover:bg-white hover:text-black">
            Join waitlist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="h-16 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white hover:text-black">
            Get demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}


