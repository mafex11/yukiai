"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  originalPrice?: string;
};

const plans: Plan[] = [
  {
    name: "Free Demo",
    price: "$0",
    description: "Great for trying out Yuki and for tiny teams",
    features: [
      "Full access to all features",
      "Limited usage time",
      "Perfect for testing",
    ],
    cta: "Start for Free",
  },
  {
    name: "Full Access",
    price: "$49",
    originalPrice: "$69",
    description: "One-time fee, lifetime updates",
    features: [
      "Unlimited everything",
      "All updates included",
      "Premium support",
      "Lifetime access",
    ],
    cta: "Buy now",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-zinc-950 py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">Pricing</h2>
          <p className="text-white/70 text-lg">Simple plans that grow with you</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className={`rounded-3xl border backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_60px_0_rgba(0,0,0,0.5)] w-full md:w-[420px] lg:w-[480px] min-h-[700px] lg:min-h-[800px] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_30px_80px_0_rgba(0,0,0,0.7)] group ${
                plan.highlight ? "border-[rgba(251,50,50,0.4)]" : "border-white/15 hover:border-white/25"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: plan.highlight
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.6) 100%)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.6) 100%)",
                boxShadow: plan.highlight
                  ? "0 20px 60px 0 rgba(0,0,0,0.6), 0 0 50px 15px rgba(251,50,50,0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)"
                  : "0 20px 60px 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  background:
                    "radial-gradient(ellipse 120% 90% at 50% 100%, rgba(255, 80, 120, 0.18), transparent 80%)",
                }}
              />
              <div className="relative z-10 flex flex-col h-full px-8 py-12 lg:px-10 lg:py-16">
                {/* Header */}
                <div className="mb-10 lg:mb-12">
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <h3 className="text-white text-3xl lg:text-4xl font-bold">{plan.name}</h3>
                      {plan.highlight && (
                        <span className="px-4 py-1.5 rounded-full bg-white/30 text-zinc-900 text-xs font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <div className="flex items-baseline gap-3">
                        {plan.highlight && plan.originalPrice && (
                          <span className="text-white/40 text-2xl lg:text-3xl line-through">{plan.originalPrice}</span>
                        )}
                        <span className="text-white text-6xl lg:text-7xl font-bold tracking-tight">{plan.price}</span>
                        {plan.highlight ? (
                          <span className="text-white/60 text-base lg:text-lg">one-time</span>
                        ) : (
                          <span className="text-white/60 text-base lg:text-lg">/month</span>
                        )}
                      </div>
                    </div>
                    <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-sm">{plan.description}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300 mb-10 lg:mb-12 ${
                    plan.highlight
                      ? "bg-zinc-950/20 text-white hover:bg-zinc-900/50 border border-white/10 shadow-lg shadow-[rgba(251,50,50,0.4)] hover:shadow-xl hover:shadow-[rgba(251,50,50,0.5)]"
                      : "bg-gradient-to-r from-zinc-800 to-zinc-900 text-white hover:from-zinc-700 hover:to-zinc-800 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </motion.button>

                {/* Features Separator */}
                <div className="relative mb-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-transparent px-4 text-white/60 text-xs uppercase tracking-wider font-medium">
                      Features
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-5 lg:space-y-6 flex-1">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={feature} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 group-hover:border-[rgba(251,50,50,0.5)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-md group-hover:shadow-[rgba(251,50,50,0.2)]">
                        <Check className="w-4 h-4 text-white group-hover:text-[rgba(251,50,50,0.9)] transition-colors duration-300" />
                      </div>
                      <span className="text-white/80 group-hover:text-white text-base lg:text-lg leading-relaxed pt-0.5 transition-colors duration-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


