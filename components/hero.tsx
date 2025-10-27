"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
     <div className="min-h-screen bg-zinc-900 font-sans dark:bg-black p-4">
       <div className="min-h-screen bg-zinc-950/60 backdrop-blur-xl rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
         <div
           className="absolute inset-0 z-0 w-full h-full"
           style={{
             backgroundImage: `
               radial-gradient(circle at 50% 100%, rgba(255, 69, 0, 0.6) 0%, transparent 90%),
               radial-gradient(circle at 50% 100%, rgba(255, 140, 0, 0.4) 0%, transparent 60%),
               radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 10%)
             `,
           }}
         />
         <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-16 py-32">
           <motion.div
             className="flex flex-col items-center gap-8"
             style={{ scale, opacity }}
           >
            

             <motion.div
               className="text-center"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.3 }}
             >
                <div className="flex flex-col items-center gap-2 mb-4 mt-20">
                {/* <Image
                    src="/logowithoutbg.svg"
                    alt="Yuki AI Logo"
                    width={60}
                    height={60}
                    className="mx-auto my-2 w-12 h-12 sm:w-16 sm:h-16"
                  /> */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white text-center px-4">AI Agentic Assistant to Control And Automate Your Device</h1>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white"></h1>
                </div>
               <p className="text-base sm:text-lg text-white/80 mb-8 text-center px-4">Yuki AI is a platform for creating and deploying AI models.</p>
               <motion.button 
                 className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-xl transition-colors font-thin"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Get Started
               </motion.button>
             </motion.div>

              <motion.div
                className="relative w-full max-w-4xl mx-auto p-2 bg-zinc-950/80 border border-white/10 rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/image2.png"
                  alt="Yuki AI"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl shadow-2xl shadow-orange-500/50"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </motion.div>

           </motion.div>
         </main>
       </div>
     </div>
  );
}
