  "use client";

  import { useState, useEffect } from "react";
  import HeroBackground from './hero-background';
  import { motion, AnimatePresence } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
  import { Input } from "@/components/ui/input";
  import { ArrowRight } from "lucide-react";
  import { HugeiconsIcon } from "@hugeicons/react";
  import { Loading01Icon, AccelerationIcon, Triangle02Icon, Loading03Icon } from "@hugeicons/core-free-icons";

  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  export default function Hero() {
    const [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(false);
    const rotatingPhrases = [
      "help me with this",
      "email bob to ask for leave tomorrow",
      "turn on bluetooth and connect to airpods",
      "send meeting link to sam on whatsapp",
      "set a reminder to call mom at 7pm",
      "play my workout playlist on spotify",
      "close all apps except vscode",
      "mute system volume for 30 minutes",
      "take a screenshot and save it to desktop",
      "start screen recording and open powerpoint",
      "read my unread emails",
      "open github and check notifications",
      "show cpu and memory usage",
      "lock the system after 10 minutes",
      "open latest project folder in vscode",
      "delete temporary files and clear cache",
      "start chrome in incognito mode",
      "join my next calendar meeting",
      "turn on dark mode",
      "enable airplane mode",
      "restart system after update completes",
    ];
    const [phraseIndex, setPhraseIndex] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
      }, 2000);
      return () => clearInterval(id);
    }, []);
    const displayText = `"Yuki, ${rotatingPhrases[phraseIndex]}"`;

    return (
      <main>
        <HeroBackground>
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            zIndex: 7
          }}>
            <motion.div
              className="flex flex-col items-center justify-center w-full text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-col items-center gap-2 mb-4 pt-2ffffff0">
                <div className="flex items-center justify-center gap-2">
                  {/* Mobile: Static Title */}
                  <div className="md:hidden text-center">
                    <TextGenerateEffect
                      words='Yuki AI'
                      className="text-7xl font-normal text-white "
                      duration={0.5}
                      staggerDelay={0.015}
                      byChar
                      glow
                      glowColor="rgba(251,50,50,0.9)"
                    />
                  </div>
                  {/* Desktop: Rotating Title */}
                  <div className="hidden md:block w-full max-w-8xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayText}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full"
                      >
                        <div className="w-full flex justify-center px-2 md:px-3 lg:px-4">
                          <TextGenerateEffect
                            words={displayText}
                            className="md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-white text-center wrap-break-words whitespace-normal max-w-full"
                            duration={0.5}
                            staggerDelay={0.015}
                            byChar
                            glow
                            glowColor="rgba(251,50,50,0.9)"
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white text-center px-4 mb-6 -mt-4"
              >
                {"AI Agentic Assistant to Control And Automate Your Device"
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      variants={wordVariants}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col items-center gap-6 justify-center w-full min-h-[110px]"
              >
                <AnimatePresence mode="wait">
                  {showForm ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={(e) => { e.preventDefault(); }}
                      className="w-full max-w-xl flex items-center gap-2"
                    >
                      <div className="relative w-full rounded-full">
                        <Input
                          placeholder="Enter Your Email To Join Waitlist"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          className="text-lg h-14 pl-6 pr-32 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:border-orange-950/50 focus:bg-orange-950/50 focus:shadow-[0_0_30px_rgba(255,180,120,0.3)] transition-all duration-300"
                        />
                        <Button
                          type="submit"
                          variant="default"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full p-0 bg-zinc-950/90 border border-white/40 text-white hover:text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,180,120,0.5)] transition-all duration-300 group"
                        >
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="buttons"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      variants={containerVariants}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        variants={wordVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="default"
                          onClick={() => setShowForm(true)}
                          className="h-14 px-7 rounded-full bg-orange-950/50 backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden"
                        >
                          <motion.div
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: 1.4 }}
                          >
                            <HugeiconsIcon 
                              icon={Loading03Icon}
                              className="transition-transform duration-300 group-hover:rotate-[90deg] "
                            />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.5 }}
                          >
                            Join Waitlist
                          </motion.span>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.3, delay: 1.6 }}
                            className="group-hover:opacity-100"
                          >
                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                          </motion.div>
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={wordVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="h-14 px-7 rounded-full bg-transparent backdrop-blur-xl border border-white/40 text-white hover:bg-white/90 hover:text-black hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,180,120,0.5)] transition-all duration-300 flex items-center gap-2 group overflow-hidden"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10, rotate: -30 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 0.4, delay: 1.7 }}
                          >
                            <HugeiconsIcon icon={AccelerationIcon} size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-30deg]" />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.8 }}
                          >
                            Get Demo
                          </motion.span>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.3, delay: 1.9 }}
                            className="group-hover:opacity-100"
                          >
                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </HeroBackground>
      </main>
    );
  }

