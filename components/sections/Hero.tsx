"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch((err) => console.error("Failed to load resume link", err));
  }, []);

  return (
    <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center relative overflow-hidden bg-darkBg text-white py-10 md:py-0">
      <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-neonBlue/10 md:bg-neonBlue/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-neonPurple/10 md:bg-neonPurple/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen" />

      <div className="z-10 text-center space-y-4 md:space-y-6 max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-2 md:mb-4"
        >
          <span className="text-neonBlue text-xs md:text-sm font-medium tracking-wider">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          MUHAIMIN ISLAM{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">
            TANVIR
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Frontend Developer specializing in React.js & Next.js. Transforming
          concepts into scalable, real-world web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8"
        >
          {/* Projects Link */}
          <a href="#projects" className="inline-block">
            <Button className="bg-neonBlue/95 hover:bg-neonBlue/80 text-black font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer text-sm md:text-base">
              View Projects
            </Button>
          </a>

          {/* Dynamic Resume Download Button */}
          <a
            href={resumeUrl || "#"}
            target={resumeUrl ? "_blank" : undefined}
            rel={resumeUrl ? "noopener noreferrer" : undefined}
            className={`inline-block transition-opacity duration-300 ${
              !resumeUrl
                ? "opacity-50 pointer-events-none cursor-not-allowed"
                : ""
            }`}
          >
            <Button
              variant="outline"
              className="rounded-full px-6 md:px-8 py-5 md:py-6 border-neonPurple/50 hover:bg-neonPurple/10 text-white flex items-center gap-2 transition-all cursor-pointer text-sm md:text-base"
            >
              <FaDownload size={16} />
              Resume
            </Button>
          </a>

          {/* Contact Link */}
          <a href="#contact" className="inline-block">
            <Button
              variant="outline"
              className="rounded-full px-6 md:px-8 py-5 md:py-6 border-white/20 hover:bg-white/10 glass-gradient text-black dark:text-white cursor-pointer text-sm md:text-base"
            >
              Contact Me
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
