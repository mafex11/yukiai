"use client";

import { motion } from "framer-motion";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free Demo",
    price: "$0",
    description: "Try Yuki before you buy",
    features: [
      "Full access to all features",
      "Limited usage time",
      "Perfect for testing",
    ],
    cta: "Get started",
  },
  {
    name: "Full Access",
    price: "$49",
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
    <section className="w-full bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">Pricing</h2>
          <p className="text-white/70 text-lg">Simple plans that grow with you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className={`rounded-2xl border p-6 bg-zinc-950/60 backdrop-blur-xl ${
                plan.highlight ? "border-white/30" : "border-white/10"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="mb-4">
                <h3 className="text-white text-xl font-medium">{plan.name}</h3>
                <div className="text-white text-3xl mt-2">{plan.price}</div>
                <p className="text-white/60 text-sm mt-1">{plan.description}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-white/80 text-sm">• {f}</li>
                ))}
              </ul>
              <button className={`w-full rounded-xl px-4 py-2 text-sm transition-colors ${
                plan.highlight
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


