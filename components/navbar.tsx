"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Navbar() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -20]);
  const opacity = useTransform(scrollY, [0, 100], [1, 1]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

  return (
    <motion.nav 
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl"
      style={{ y, opacity, scale }}
    >
      <motion.div 
        className="bg-zinc-950/50 backdrop-blur-xl rounded-full border border-zinc-800/50 shadow-2xl/30 shadow-orange-950  px-6 py-4 mx-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/logowithoutbg.svg"
                alt="Yuki AI Logo"
                width={30}
                height={30}
                className="text-white"
              />
            </motion.div>
            <motion.div 
              className="text-white"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TextGenerateEffect
                words="YukiAI"
                className="font-thin text-xl m-0"
                byChar
                glow
                duration={0.35}
                glowColor="rgba(255,180,120,0.9)"
              />
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="hidden md:flex flex-1 items-center justify-center gap-8 font-thin text-lg mb-2"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {["Services", "Process", "Pricing", "Contact", "FAQ"].map((link, index) => (
              <motion.a 
                key={link}
                href={`#${link.toLowerCase()}`} 
                className="text-white/80 hover:text-white transition-colors"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TextGenerateEffect
                  words={link}
                  className="!font-thin text-lg sm:text-lg !m-2"
                  byChar
                  glow
                  duration={0.35}
                  glowColor="rgba(255,180,120,0.9)"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button 
            className="bg-zinc-900 text-white px-6 py-2 rounded-full transition-colors font-thin text-lg"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgb(63 63 70)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white/80 hover:text-white font-thin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
