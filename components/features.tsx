"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AiEditingIcon, AiVoiceIcon, CommandLineIcon, AccelerationIcon } from "@hugeicons/core-free-icons";
import { AircraftGameIcon } from "@hugeicons/core-free-icons";
import { TaskDaily02Icon } from "@hugeicons/core-free-icons";
import { FocusPointIcon } from "@hugeicons/core-free-icons";
import { AppleVisionProIcon } from "@hugeicons/core-free-icons";
import { Brain02Icon } from "@hugeicons/core-free-icons";

export type Feature = {
  title: string;
  description: string;
  src?: string;
};

const featureImages: string[] = [
  "/image.png",
  "/image3.png",
  "/next.svg",
  "/vercel.svg",
  "/globe.svg",
  "/window.svg",
  "/file.svg",
  "/image.png",
  "/image3.png",
];

const features: Feature[] = [
  {
    title: "Windows GUI Automation",
    description: "No computer vision; uses Windows UI Automation to interact with GUI elements.",
  },
  {
    title: "Voice Control",
    description: 'Trigger word detection ("yuki") with STT/TTS for voice commands.',
  },
  {
    title: "Command Execution",
    description: "Execute commands with shell and system commands.",
  },
  {
    title: "17 Automation Tools",
    description: "Click, type, scroll, launch, drag, move, shortcuts, keys, wait, clipboard, shell, system, scrape, human, switch, resize, done.",
  },
  {
    title: "Memory & Context",
    description: "Remembers conversation history and maintains context across tasks.",
  },
  {
    title: "Program Usage Tracking",
    description: "Monitor and track application usage patterns.",
  },
  {
    title: "Task Scheduling and Reminders",
    description: "Schedule tasks and set reminders for better productivity.",
  },
  {
    title: "Focus Suggestions",
    description: "Get intelligent suggestions to help maintain focus.",
  },
  {
    title: "Proactive Interruptions",
    description: "Smart notification system that adapts to your workflow.",
  },
];

type FeaturesProps = {
  onOpen?: (feature: Feature) => void;
};

export default function Features({ onOpen }: FeaturesProps) {
  const [active, setActive] = useState<Feature | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [centeredCardIndex, setCenteredCardIndex] = useState<number | null>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    if (!onOpen && active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    let isScrolling = false;
    
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const containerRect = el.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        const items = Array.from(el.querySelectorAll('li')) as HTMLElement[];
        items.forEach((li, i) => {
          const r = li.getBoundingClientRect();
          const liCenter = r.left + r.width / 2;
          const d = Math.abs(liCenter - containerCenter);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        const originalIdx = bestIdx % features.length;
        setCurrentIndex(originalIdx);
        setCenteredCardIndex(bestIdx);
        
        // Infinite scroll handling
        if (isScrolling) return;
        const firstCard = items[0];
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth;
        const gap = 16;
        const cardAndGap = cardWidth + gap;
        const totalCardsWidth = features.length * cardAndGap;
        
        // If scrolled past second set, jump back to first set
        if (el.scrollLeft >= totalCardsWidth * 2 - 50) {
          isScrolling = true;
          el.scrollTo({ left: el.scrollLeft - totalCardsWidth, behavior: 'auto' });
          setTimeout(() => { isScrolling = false; }, 50);
        }
        // If scrolled before first set, jump to second set
        else if (el.scrollLeft <= 50) {
          isScrolling = true;
          el.scrollTo({ left: el.scrollLeft + totalCardsWidth, behavior: 'auto' });
          setTimeout(() => { isScrolling = false; }, 50);
        }
      });
    };
    
    el.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize scroll position to show middle card in center
    const initScroll = () => {
      const firstCard = el.querySelector('li') as HTMLElement;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 16;
      const cardAndGap = cardWidth + gap;
      const totalCardsWidth = features.length * cardAndGap;
      // Start at second set, showing first card as center
      el.scrollTo({ left: totalCardsWidth + cardAndGap, behavior: 'auto' });
      handleScroll();
    };
    
    setTimeout(initScroll, 100);
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (isHoveringList) return;
      if (active && typeof active === "object") return;
      const firstCard = el.querySelector('li') as HTMLElement;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 16;
      const cardAndGap = cardWidth + gap;
      el.scrollBy({ left: cardAndGap, behavior: 'smooth' });
    }, 3000);
    return () => clearInterval(interval);
  }, [isHoveringList, active]);

  const renderIcon = (index: number) => {
    const iconCommon = { size: 28, color: "white" } as const;
    switch (index) {
      case 0:
        return <HugeiconsIcon icon={AiEditingIcon} {...iconCommon} />;
      case 1:
        return <HugeiconsIcon icon={AiVoiceIcon} {...iconCommon} />;
      case 2:
        return <HugeiconsIcon icon={CommandLineIcon} {...iconCommon} />;
      case 3:
        return <HugeiconsIcon icon={AccelerationIcon} {...iconCommon} />;
      case 4:
        return <HugeiconsIcon icon={Brain02Icon} {...iconCommon} />;
      case 5:
        return <HugeiconsIcon icon={AircraftGameIcon} {...iconCommon} />;
      case 6:
        return <HugeiconsIcon icon={TaskDaily02Icon} {...iconCommon} />;
      case 7:
        return <HugeiconsIcon icon={FocusPointIcon} {...iconCommon} />;
      case 8:
        return <HugeiconsIcon icon={AppleVisionProIcon} {...iconCommon} />;
      default:
        return null;
    }
  };

  const AUTO_SCROLL_INTERVAL = 3000;
  const [dotTimer, setDotTimer] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | undefined;
    let animating = true;
    function animate(ts: number) {
      if (!animating) return;
      if (typeof start !== 'number') start = ts;
      const elapsed = ts - start;
      let progress = Math.min(1, elapsed / AUTO_SCROLL_INTERVAL);
      setDotTimer(progress);
      if (progress < 1 && animating) {
        frame = requestAnimationFrame(animate);
      }
    }
    setDotTimer(0);
    start = undefined;
    animating = true;
    frame = requestAnimationFrame(animate);
    return () => {
      animating = false;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [currentIndex]);

  return (
    <div className="w-full relative bg-black py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 100%, rgba(255, 80, 120, 0.18), transparent 80%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">Powerful Features</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Everything you need to automate and control your Windows device</p>
        </motion.div>

        {!onOpen && (
          <>
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 h-full w-full z-10" />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-100">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-[96%] max-w-[840px] h-full md:h-fit md:max-h-[92%] flex flex-col bg-zinc-950/95 backdrop-blur-xl border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <motion.div layout className="w-full bg-zinc-900/50 p-4 md:p-6">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <img
                      src={active.src ?? "/image.png"}
                      alt={active.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <div className="p-6 md:p-8 flex items-start gap-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                      {renderIcon(features.findIndex(f => f.title === active.title))}
                    </div>
                    <div className="flex-1">
                      <motion.h3 layoutId={`title-${active.title}-${id}`} className="text-white text-2xl font-medium leading-tight">{active.title}</motion.h3>
                      <motion.p layoutId={`description-${active.description}-${id}`} className="text-white/70 text-base mt-2">{active.description}</motion.p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/80 text-sm md:text-base leading-relaxed">
                      {active.description}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
          </>
        )}

        <motion.div
          className="relative w-full overflow-visible px-4 sm:px-6 lg:px-8"
          initial={false}
          animate={{ opacity: active && typeof active === "object" ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setIsHoveringList(true)}
          onMouseLeave={() => setIsHoveringList(false)}
        >
          <ul
            ref={listRef}
            className="relative flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ overflowY: 'visible' }}
          >
            {[...features, ...features, ...features].map((card, index) => {
              const originalIndex = index % features.length;
              const isCenterCard = centeredCardIndex === index;
              
              return (
                <li
                  key={`card-${card.title}-${id}-${index}`}
                  onClick={() =>
                    onOpen ? onOpen({ ...card, src: featureImages[originalIndex] }) : setActive({ ...card, src: featureImages[originalIndex] })
                  }
                  className={`relative z-0 w-[calc((100%-4rem)/3)] shrink-0 snap-center bg-zinc-950/60 backdrop-blur-xl rounded-3xl p-4 md:p-6 border transition-all duration-300 cursor-pointer h-[480px] md:h-[520px] lg:h-[560px] ${
                    isCenterCard
                      ? 'border-white/40 scale-105 bg-zinc-950/80 shadow-2xl z-10'
                      : 'border-white/10 scale-100'
                  }`}
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="relative w-full h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 bg-zinc-900/50">
                    <img src={featureImages[originalIndex]} alt={card.title} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex items-start gap-4 mt-6 mb-6 p-2">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">{renderIcon(originalIndex)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-xl md:text-2xl lg:text-2xl truncate">{card.title}</h3>
                      <p className="mt-3 text-white/60 text-base md:text-lg line-clamp-2 md:line-clamp-3">{card.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 flex items-center justify-center gap-2 h-2">
            {[currentIndex - 1, currentIndex, currentIndex + 1].map(i => {
              if (i < 0 || i >= features.length) return null;
              if (i === currentIndex) {
                return (
                  <span key={`dot-${i}`} className="relative h-1.5 w-8 bg-white/20 rounded-full overflow-hidden">
                    <span
                      className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-none"
                      style={{ width: `${(1 - dotTimer) * 100}%`, transition: dotTimer === 0 ? 'none' : 'width 80ms linear' }}
                    />
                  </span>
                );
              }
              return <span key={`dot-${i}`} className="h-1.5 w-2 bg-white/40 rounded-full transition-all duration-300" />;
            })}
          </div>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => {
              const el = listRef.current;
              if (!el) return;
              const firstCard = el.querySelector('li') as HTMLElement;
              if (!firstCard) return;
              const cardWidth = firstCard.offsetWidth;
              const gap = 16;
              el.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }}
            className="hidden md:flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-zinc-800/60 hover:bg-zinc-700/70 border border-white/10 backdrop-blur-md text-white z-10"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => {
              const el = listRef.current;
              if (!el) return;
              const firstCard = el.querySelector('li') as HTMLElement;
              if (!firstCard) return;
              const cardWidth = firstCard.offsetWidth;
              const gap = 16;
              el.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }}
            className="hidden md:flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-zinc-800/60 hover:bg-zinc-700/70 border border-white/10 backdrop-blur-md text-white z-10"
          >
            ›
          </button>
        </motion.div>
      </div>
    </div>
  );
}

