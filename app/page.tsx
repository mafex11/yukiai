"use client";

import Hero from "../components/hero";
import Features from "../components/features";
import DownloadSection from "../components/download";
import HowItWorks from "../components/how-it-works";
import FAQ from "../components/faq";
import Pricing from "../components/pricing";
import GradualBlur from "../components/GradualBlur";

export default function YukiAI() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <DownloadSection />
      <FAQ />
      <GradualBlur preset="page-footer" target="page" position="bottom" height="8rem" strength={2} zIndex={40} animated />
    </>
  );
}
