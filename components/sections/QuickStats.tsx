"use client";

import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    value: "15+",
    label: "Projects Completed",
  },
  {
    id: 2,
    value: "2+",
    label: "Years Experience",
  },
  {
    id: 3,
    value: "React/Next",
    label: "Specialist",
  },
  {
    id: 4,
    value: "5+",
    label: "Tech Mastered",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5, // Waits slightly for the Hero animation to finish
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function QuickStats() {
  return (
    <section className="relative z-20 px-6 -mt-10 md:-mt-16 mb-12 md:mb-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-darkBg/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-white/10">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="flex flex-col items-center md:items-start text-center md:text-left md:pl-8 first:pl-0"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
