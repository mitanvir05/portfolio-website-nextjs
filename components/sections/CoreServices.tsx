"use client";

import { motion, Variants } from "framer-motion";
import { FaReact, FaServer, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Building clean, responsive, and highly scalable web applications using modern frameworks like React.js and Next.js.",
    icon: <FaReact size={32} />,
    color: "text-neonBlue",
    shadow: "group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]",
    border: "group-hover:border-neonBlue/50",
  },
  {
    id: 2,
    title: "API & Backend Integration",
    description:
      "Connecting seamless user interfaces with robust backends and databases using Node.js, Express, and RESTful APIs.",
    icon: <FaServer size={32} />,
    color: "text-neonPurple",
    shadow: "group-hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]",
    border: "group-hover:border-neonPurple/50",
  },
  {
    id: 3,
    title: "UI/UX & Performance",
    description:
      "Ensuring smooth, pixel-perfect experiences and optimized load times across all devices and screen sizes.",
    icon: <FaMobileAlt size={32} />,
    color: "text-white",
    shadow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    border: "group-hover:border-white/50",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CoreServices() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 px-6 bg-darkBg border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            <span className="text-neonBlue">/</span> What I Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Translating complex requirements into intuitive, high-performance
            digital experiences.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8 }} // 1. NEW: Let Framer Motion handle the hover lift
              // 2. UPDATED: Removed 'transition-all' and 'hover:-translate-y-2'
              // 3. UPDATED: Added 'transition-colors transition-shadow'
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-colors transition-shadow duration-300 cursor-default ${service.border} ${service.shadow}`}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div
                  className={`mb-6 p-4 rounded-xl bg-white/5 border border-white/10 ${service.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
