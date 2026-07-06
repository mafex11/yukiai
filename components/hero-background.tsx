"use client";

import { useRef, ReactNode } from "react";
import LaserFlow from "./LaserFlow";
import { motion } from "framer-motion";

interface HeroBackgroundProps {
  children?: ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000000",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "center center",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", "-9999px");
          el.style.setProperty("--my", "-9999px");
        }
      }}
    >
      {/* Laser Layer — clipped + masked so the beam pours INTO the app
          window in the hero instead of running the full page height. */}
      <div
        className="hidden md:block absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "58%",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        }}
      >
        <LaserFlow
          className=""
          style={{ height: "172%" }}
          dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.0}
          color="#7FB4E8"
        />
      </div>

      {/* Glow Layer (optional, makes the grid glow softly) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(127,180,232,0.08) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {children}
    </div>
  );
}
