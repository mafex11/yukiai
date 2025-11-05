"use client";

import { motion } from "framer-motion";

export default function DemoVideo() {
  return (
    <section id="demo" className="w-full bg-black py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">See Yuki in action</h2>
          <p className="text-white/70 text-lg">A short walkthrough of real Windows automation</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900"
        >
          {/* Replace the placeholder with your hosted MP4 or GIF when ready */}
          <video
            className="w-full h-full object-cover"
            src="/demo.mp4"
            controls
            poster="/image2.png"
          />
        </motion.div>
      </div>
    </section>
  );
}


