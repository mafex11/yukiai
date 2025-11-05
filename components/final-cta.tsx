"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="w-full bg-zinc-900 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-white text-3xl sm:text-4xl font-light mb-4">Control your PC with one sentence</h3>
        <p className="text-white/70 text-lg mb-8">Join the waitlist or try the demo today.</p>
        <div className="flex items-center justify-center gap-4">
          <Button className="h-12 px-6 rounded-full bg-orange-950/60 border border-white/30 text-white hover:bg-white hover:text-black">
            Join waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-full border-white/30 text-white hover:bg-white hover:text-black">
            Get demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}


