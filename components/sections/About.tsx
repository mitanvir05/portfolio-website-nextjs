"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neonPurple/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-neonBlue">/</span> About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-gray-400 leading-relaxed"
          >
            <p>
              I'm a Software Engineer based in Dhaka, Bangladesh, with a deep
              passion for transforming complex concepts into clean, real-world
              web applications. My expertise lies in modern JavaScript
              ecosystems, specifically React.js and Next.js.
            </p>
            <p>
              I obsess over UI/UX details, ensuring that everything I build is
              not just functional, but visually engaging, fully responsive, and
              highly scalable across all devices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-6">
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-neonPurple before:rounded-full">
                  <h4 className="text-lg font-semibold text-white">
                    M.Sc. in Information Technology
                  </h4>
                  <p className="text-sm text-gray-400">
                    Jahangirnagar University
                  </p>
                  <span className="text-xs text-neonBlue mt-1 inline-block">
                    2025 - Present
                  </span>
                </div>
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-neonPurple before:rounded-full">
                  <h4 className="text-lg font-semibold text-white">
                    B.Sc. in Computer Science
                  </h4>
                  <p className="text-sm text-gray-400">
                    Bangladesh University of Business and Technology
                  </p>
                  <span className="text-xs text-neonBlue mt-1 inline-block">
                    2020 - 2024 • CGPA: 3.86
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
