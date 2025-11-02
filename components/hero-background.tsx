"use client";

import { useRef, ReactNode } from "react";
import LaserFlow from './LaserFlow';
import { motion } from "framer-motion";

interface HeroBackgroundProps {
  children?: ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div 
      style={{ 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <LaserFlow
        className="hidden md:block"
        style={{}}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        horizontalBeamOffset={0.00}
        verticalBeamOffset={-0.00}
        color="#FB3232"
      />
      
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 
                   w-[90%] sm:w-[80%] md:w-[70%] lg:w-[55%] xl:w-[47%]
                   top-[55%] sm:top-[52%] md:top-[50%]
                   rounded-lg sm:rounded-xl md:rounded-2xl
                   border border-red-500 sm:border-[1.5px] md:border-2
                   flex items-center justify-center
                   text-white z-[6]
                   px-2 sm:px-3 md:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.01 }}
      >
        <img
          ref={revealImgRef}
          src="/image3.png"
          alt="Yuki AI"
          className="w-full h-auto block 
                     rounded-lg sm:rounded-xl md:rounded-2xl
                     shadow-[0_10px_40px_rgba(251,50,50,0.3)]"
        />
      </motion.div>

      {children}
    </div>
  );
}

