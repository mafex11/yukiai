"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiEditingIcon, AiVoiceIcon, CommandLineIcon, AccelerationIcon } from "@hugeicons/core-free-icons";

const features = [
  {
    title: "Windows GUI Automation",
    description: "No computer vision; uses Windows UI Automation to interact with GUI elements.",
  },
  {
    title: "Voice Control",
    description: 'Trigger word detection ("yuki") with STT/TTS for voice commands.',
  },
  {
    title: "Command Execution",
    description: "Execute commands with shell and system commands.",
  },
  {
    title: "17 Automation Tools",
    description: "Click, type, scroll, launch, drag, move, shortcuts, keys, wait, clipboard, shell, system, scrape, human, switch, resize, done.",
  },
  {
    title: "Memory & Context",
    description: "Remembers conversation history and maintains context across tasks.",
  },
  {
    title: "Program Usage Tracking",
    description: "Monitor and track application usage patterns.",
  },
  {
    title: "Task Scheduling and Reminders",
    description: "Schedule tasks and set reminders for better productivity.",
  },
  {
    title: "Focus Suggestions",
    description: "Get intelligent suggestions to help maintain focus.",
  },
  {
    title: "Proactive Interruptions",
    description: "Smart notification system that adapts to your workflow.",
  },
];

export default function Features() {
  return (
    <div className="w-full bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Everything you need to automate and control your Windows device
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex flex-col items-start gap-4">
                {index === 0 && (
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    <HugeiconsIcon icon={AiEditingIcon} size={24} color="white" />
                  </div>
                )}
                {index === 1 && (
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    <HugeiconsIcon icon={AiVoiceIcon} size={24} color="white" />
                  </div>
                )}
                {index === 2 && (
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    <HugeiconsIcon icon={CommandLineIcon} size={24} color="white" />
                  </div>
                )}
                {index === 3 && (
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    <HugeiconsIcon icon={AccelerationIcon} size={24} color="white" />
                  </div>
                )}
                <div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

