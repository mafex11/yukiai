"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, X } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -20]);
  const opacity = useTransform(scrollY, [0, 100], [1, 1]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

  return (
    <>
      <motion.nav 
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl"
        style={{ y, opacity, scale }}
      >
        <motion.div 
          className="bg-zinc-950/50 backdrop-blur-xl rounded-full border border-zinc-800/90 shadow-2xl/30 shadow-orange-950  px-6 py-4 mx-4"
          style={{
            boxShadow: '0px 0 500px rgba(251,50,50,1)'
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between md:grid md:grid-cols-3">
            {/* Brand/Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Image
                  src="/logowithoutbg.svg"
                  alt="Yuki AI Logo"
                  width={30}
                  height={30}
                  className="text-white"
                />
              </motion.div>
              <motion.span 
                className="text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-normal text-xl">YukiAI</span>
              </motion.span>
            </motion.div>

            {/* Navigation Links - Desktop Only */}
            <motion.div 
              className="hidden md:flex flex-1 items-center justify-center gap-10 font-thin text-xl"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {["Services", "Process", "Pricing", "Contact", "FAQ"].map((link, index) => (
                <motion.a 
                  key={link}
                  href={`#${link.toLowerCase()}`} 
                  className="text-white/80 hover:text-white transition-colors"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-normal m-2">
                    {link}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button - Desktop Only */}
            <motion.div
              className="hidden md:block justify-self-end"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <HoverBorderGradient as="button">
                <div className="flex items-center gap-2">
                  <p className="text-xl">
                    Plans and Pricing
                  </p>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </HoverBorderGradient>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-white/80 hover:text-white font-thin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-950/95 backdrop-blur-xl z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1]
              }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[70] md:hidden flex flex-col items-end justify-start px-6 pt-40"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1
              }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-10 right-7 text-white/80 hover:text-white transition-colors p-2"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  rotate: 180,
                  transition: {
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.3
                }}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-8 h-8" />
              </motion.button>

              {/* Navigation Links */}
              <div className="flex flex-col items-end gap-8 mb-8">
                {["Services", "Process", "Pricing", "Contact", "FAQ"].map((link, index) => {
                  const totalLinks = 5;
                  const reverseIndex = totalLinks - 1 - index;
                  return (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-white/80 hover:text-white text-2xl font-normal transition-colors relative"
                      initial={{ x: 100, opacity: 0, scale: 0.8 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ 
                        x: 120, 
                        opacity: 0, 
                        scale: 0.7,
                        transition: {
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                          delay: reverseIndex * 0.04
                        }
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.4, 0, 0.2, 1],
                        delay: 0.2 + index * 0.08
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ 
                        scale: 1.05, 
                        x: -5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link}
                    </motion.a>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ x: 100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ 
                  x: 120, 
                  opacity: 0, 
                  scale: 0.7,
                  transition: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.05
                  }
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.6
                }}
              >
                <HoverBorderGradient as="button" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-2">
                    <p className="text-xl">
                      Plans and Pricing
                    </p>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </HoverBorderGradient>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
