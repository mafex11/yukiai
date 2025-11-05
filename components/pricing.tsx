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
    <section className="w-full bg-zinc-900 py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">Pricing</h2>
          <p className="text-white/70 text-lg">Simple plans that grow with you</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className={`rounded-3xl border backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_60px_0_rgba(0,0,0,0.5)] w-full md:w-[420px] lg:w-[480px] min-h-[700px] lg:min-h-[800px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_70px_0_rgba(0,0,0,0.6)] ${
                plan.highlight ? "border-white/30" : "border-white/15"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: plan.highlight
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.5) 100%)",
                boxShadow: plan.highlight
                  ? "0 20px 60px 0 rgba(0,0,0,0.5), 0 0 40px 12px rgba(251,50,50,0.5)"
                  : undefined,
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
                <button
                  className={`w-full rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300 mb-10 lg:mb-12 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
                      : "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10"
                  }`}
                >
                  {plan.cta}
                </button>

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
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/80 text-base lg:text-lg leading-relaxed pt-0.5">{feature}</span>
                    </li>
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


