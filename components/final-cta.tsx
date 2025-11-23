"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, AccelerationIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";

export default function FinalCTA() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {!showForm ? (
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant="default"
              onClick={() => setShowForm(true)}
              className="h-14 px-7 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group"
            >
              <HugeiconsIcon 
                icon={Loading03Icon}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span>Join Waitlist</span>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-14 px-7 rounded-full bg-transparent backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group"
            >
              <a href="https://rzp.io/rzp/NuYjrpJa" target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={AccelerationIcon} size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-30deg]" />
                <span>Pre Order Now</span>
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline" />
              </a>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col items-center gap-3"
          >
            <div className="w-full flex items-center gap-2">
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setShowForm(false);
                  setEmail('');
                  setSubmitStatus(null);
                }}
                disabled={isSubmitting}
                className="h-14 px-4 rounded-full bg-zinc-950/90 border border-white/40 text-white hover:text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,180,120,0.5)] transition-all duration-300 shrink-0 disabled:opacity-50"
              >
                ←
              </Button>
              <input
                type="email"
                placeholder="Enter Your Email To Join Waitlist"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="flex-1 h-14 pl-6 pr-4 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:border-orange-950/50 focus:bg-orange-950/50 focus:shadow-[0_0_30px_rgba(255,180,120,0.3)] transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
              />
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting || !email}
                className="h-14 px-4 rounded-full bg-zinc-950/90 border border-white/40 text-white hover:text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,180,120,0.5)] transition-all duration-300 shrink-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <HugeiconsIcon icon={Loading03Icon} className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </div>
            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm">Successfully joined waitlist!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm">Failed to join waitlist. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}


