"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRightIcon, X, Menu } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React, { useState, useEffect, useCallback, useRef } from "react";

const navItems = ["Services",  "Pricing", "How It Works","FAQ","Contact"];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("services");
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  
  const { scrollY, scrollYProgress } = useScroll();

  // Scroll-based animations using useTransform
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  // Dynamic styles based on scroll
  const [navbarStyles, setNavbarStyles] = useState({
    backdropBlur: 12,
    backgroundOpacity: 0.5,
    borderOpacity: 0.9,
    shadowOpacity: 0.3,
  });

  // Update navbar styles on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollAmount = Math.min(latest, 100);
    const progress = scrollAmount / 100;
    
    setNavbarStyles({
      backdropBlur: 12 + progress * 8, // 12 to 20
      backgroundOpacity: 0.5 + progress * 0.35, // 0.5 to 0.85
      borderOpacity: 0.9 - progress * 0.3, // 0.9 to 0.6
      shadowOpacity: 0.3 + progress * 0.5, // 0.3 to 0.8
    });
  });

  // Track active section and scroll state
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let ticking = false;

    const updateActiveSection = () => {
      if (isScrollingRef.current) {
        ticking = false;
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      const sections = navItems
        .map(item => {
          const id = item.toLowerCase().replace(/\s+/g, "-");
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const sectionCenter = sectionTop + rect.height / 2;
          
          // Check if viewport center is within this section
          const isInViewportCenter = viewportCenter >= sectionTop && viewportCenter <= sectionBottom;
          const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(sectionTop, 0);
          const visibleBottom = Math.min(sectionBottom, window.innerHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
          
          return { 
            id, 
            distance: distanceFromCenter, 
            isInViewportCenter, 
            visibilityRatio,
            sectionTop
          };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);

      if (sections.length === 0) {
        ticking = false;
        return;
      }

      // Prioritize sections where viewport center is within the section
      const sectionsInCenter = sections.filter(s => s.isInViewportCenter);
      let active: typeof sections[0];
      
      if (sectionsInCenter.length > 0) {
        // If multiple sections are in center, pick the one with highest visibility
        active = sectionsInCenter.reduce((prev, curr) => 
          curr.visibilityRatio > prev.visibilityRatio ? curr : prev
        );
      } else {
        // Otherwise, pick the section closest to viewport center with reasonable visibility
        const visibleSections = sections.filter(s => s.visibilityRatio > 0.2);
        if (visibleSections.length > 0) {
          active = visibleSections.reduce((prev, curr) => 
            curr.distance < prev.distance ? curr : prev
          );
        } else {
          // Fallback to closest section
          active = sections.reduce((prev, curr) => 
            curr.distance < prev.distance ? curr : prev
          );
        }
      }

      if (active) {
        setActiveSection(prev => prev !== active.id ? active.id : prev);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && !isScrollingRef.current) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // IntersectionObserver for better performance
    observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        handleScroll();
      },
      { 
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1], 
        rootMargin: "-40% 0px -40% 0px" 
      }
    );

    navItems.forEach((item) => {
      const id = item.toLowerCase().replace(/\s+/g, "-");
      const element = document.getElementById(id);
      if (element && observer) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    const unsubscribeScroll = scrollY.onChange((current) => {
      setScrolled(current > 50);
    });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      unsubscribeScroll();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollY]);

  // Lock body scroll and focus trap for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mobileMenuOpen]);

  const handleSmoothScroll = useCallback((e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const id = targetId.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(id);
    if (element) {
      // Temporarily disable IntersectionObserver updates during scroll
      isScrollingRef.current = true;
      setIsScrolling(true);
      setActiveSection(id);
      setMobileMenuOpen(false);
      
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Re-enable IntersectionObserver after scroll completes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 1000); // Wait for smooth scroll to complete
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    isScrollingRef.current = true;
    setIsScrolling(true);
    setActiveSection("");
    setMobileMenuOpen(false);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 to-red-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav 
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl "
        style={{
          y: navbarY,
          scale: navbarScale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
      >
        <motion.div 
          className="rounded-full border px-4 py-4 mx-4 transition-all duration-300 ease-out "
          style={{
            backdropFilter: `blur(${navbarStyles.backdropBlur}px)`,
            backgroundColor: `rgba(24, 24, 27, ${navbarStyles.backgroundOpacity})`,
            borderColor: `rgba(39, 39, 42, ${navbarStyles.borderOpacity})`,
            boxShadow: `0 8px 30px rgba(0, 0, 0, ${navbarStyles.shadowOpacity * 0.3}), 0 0 300px 10px rgba(250, 50, 50, 0.8)`,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between md:grid md:grid-cols-3">
            {/* Brand/Logo */}
            <motion.button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 outline-none focus:outline-none"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 1.0 }}
              aria-label="Scroll to top"
            >
              <motion.div
                whileHover={{ rotate: -30 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween" }}
              >
                <Image
                  src="/logowithoutbg.svg"
                  alt="Yuki AI Logo"
                  width={45}
                  height={45}
                  className="text-white rounded-full"
                />
              </motion.div>
              <motion.span 
                className="text-white font-thin text-xl tracking-tight"
              >
                YukiAI
              </motion.span>
            </motion.button>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex flex-1 items-center justify-center gap-6 font-normal text-xl"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {navItems.map((link, index) => (
                <motion.a 
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} 
                  onClick={(e) => handleSmoothScroll(e, link)}
                  className={`relative group py-1 transition-colors whitespace-nowrap
                             ${activeSection === link.toLowerCase().replace(/\s+/g, "-") 
                               ? "text-white font-medium" 
                               : "text-white/70 hover:text-white"}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === link.toLowerCase().replace(/\s+/g, "-") ? "page" : undefined}
                >
                  <span>{link}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600"
                    initial={false}
                    animate={{ 
                      width: activeSection === link.toLowerCase().replace(/\s+/g, "-") ? "100%" : "0%",
                      opacity: activeSection === link.toLowerCase().replace(/\s+/g, "-") ? 1 : 0
                    }}
                    whileHover={{ 
                      width: activeSection === link.toLowerCase().replace(/\s+/g, "-") ? "100%" : "100%",
                      opacity: 1
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Desktop CTA */}
            <motion.div
              className="hidden md:block justify-self-end"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <HoverBorderGradient as="button" onClick={() => {
                const el = document.getElementById("pricing");
                if (el) {
                  isScrollingRef.current = true;
                  setIsScrolling(true);
                  setActiveSection("pricing");
                  el.scrollIntoView({ behavior: "smooth" });
                  if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                  }
                  scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false;
                    setIsScrolling(false);
                  }, 1000);
                }
              }}>
                <motion.div
                  className="flex items-center gap-2 text-xl whitespace-nowrap font-bold"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plans and Pricing
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </HoverBorderGradient>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-7 h-7" strokeWidth={1.5} />
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950/95 backdrop-blur-2xl 
                         border-l border-zinc-800/50 z-[70] md:hidden flex flex-col pt-[40px]"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  staggerChildren: 0.05
                }
              }}
              exit={{ 
                x: "100%", 
                opacity: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  staggerChildren: 0.03,
                  staggerDirection: -1
                }
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-end ">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-8 h-8 mr-9 text-white/80 hover:text-white transition-colors" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                {navItems.map((link, index) => {
                  const linkId = link.toLowerCase().replace(/\s+/g, "-");
                  const isActive = activeSection === linkId;
                  return (
                    <motion.a
                      key={link}
                      href={`#${linkId}`}
                      onClick={(e) => handleSmoothScroll(e, link)}
                      className={`relative block w-full text-right text-2xl font-light mb-6 py-2
                                 ${isActive 
                                   ? "text-white" 
                                   : "text-white/60 hover:text-white"}`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: -10 }}
                    >
                      {link}
                      {isActive && (
                        <motion.span
                          className="absolute bottom-1 right-0 h-0.5 w-full bg-gradient-to-l from-red-500 to-red-600"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "100%", opacity: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="p-6 border-t border-zinc-800/30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <HoverBorderGradient as="button" className="w-full" onClick={() => {
                    const el = document.getElementById("pricing");
                    if (el) {
                      isScrollingRef.current = true;
                      setIsScrolling(true);
                      setActiveSection("pricing");
                      el.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                      if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                      }
                      scrollTimeoutRef.current = setTimeout(() => {
                        isScrollingRef.current = false;
                        setIsScrolling(false);
                      }, 1000);
                    }
                  }}>
                    <motion.div
                      className="flex items-center justify-center gap-2 text-lg w-full"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Plans and Pricing
                      <ArrowRightIcon className="w-5 h-5" />
                    </motion.div>
                  </HoverBorderGradient>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}