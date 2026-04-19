"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-darkBg text-white">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonBlue/20 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonPurple/20 rounded-full blur-[120px] mix-blend-screen" />

      <div className="z-10 text-center space-y-6 max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4"
        >
          <span className="text-neonBlue text-sm font-medium tracking-wider">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          MD. MUHAIMIN ISLAM{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">
            TANVIR
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-400 md:text-xl"
        >
          Frontend Developer specializing in React.js & Next.js. Transforming
          concepts into scalable, real-world web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Button className="bg-neonBlue hover:bg-neonBlue/80 text-black font-semibold rounded-full px-8 py-6 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
            View Projects
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10 glass-gradient text-black dark:text-white"
          >
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
