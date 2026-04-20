"use client";

import { motion, Variants } from "framer-motion";
import { FaReact, FaServer, FaMobileAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiRedux,
  SiGithub,
  SiVercel,
  SiPostman,
  SiStripe,
  SiCloudinary,
  SiPython,
  SiAxios,
} from "react-icons/si";

// Unified Data Structure mapping Services directly to their required Skills
const specialties = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Building clean, responsive, and highly scalable web applications.",
    icon: <FaReact size={28} />,
    color: "text-neonBlue",
    shadow: "group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]",
    border: "group-hover:border-neonBlue/50",
    skills: [
      { name: "React.js", icon: FaReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Redux", icon: SiRedux, color: "text-[#764ABC]" },
    ],
  },
  {
    id: 2,
    title: "Backend Integration",
    description:
      "Connecting seamless user interfaces with robust backends and databases.",
    icon: <FaServer size={28} />,
    color: "text-neonPurple",
    shadow: "group-hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]",
    border: "group-hover:border-neonPurple/50",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "Express", icon: SiExpress, color: "text-gray-300" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "REST APIs", icon: FaServer, color: "text-neonPurple" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
    ],
  },
  {
    id: 3,
    title: "UI/UX & Core Tools",
    description:
      "Ensuring optimized load times, pixel-perfect experiences, and smooth CI/CD.",
    icon: <FaMobileAlt size={28} />,
    color: "text-white",
    shadow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    border: "group-hover:border-white/50",
    skills: [
      { name: "Git/Github", icon: SiGithub, color: "text-white" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]" },
      { name: "Stripe", icon: SiStripe, color: "text-[#008CDD]" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-[#3448C5]" },
      { name: "Axios", icon: SiAxios, color: "text-[#5A29E4]" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function SkillsAndServices() {
  return (
    <section
      id="skills"
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
            <span className="text-neonPurple">/</span> Skills & Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Translating complex requirements into high-performance digital
            experiences using modern tools.
          </motion.p>
        </div>

        {/* Merged Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {specialties.map((specialty) => (
            <motion.div
              key={specialty.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-colors transition-shadow duration-300 flex flex-col h-full cursor-default ${specialty.border} ${specialty.shadow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Service Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 ${specialty.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {specialty.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {specialty.title}
                  </h3>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                  {specialty.description}
                </p>

                {/* Skills Grid (Pushed to bottom) */}
                <div className="mt-auto">
                  <div className="h-px w-full bg-white/10 mb-5" />
                  
                  <div className="grid grid-cols-2 gap-2.5 md:gap-3 w-full">
                    {specialty.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        // RESTORED: The original pop-in spring animation!
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: (specialty.id * 0.1) + (idx * 0.05), // Stagger based on card ID and skill index
                          type: "spring",
                          stiffness: 100,
                        }}
                        // RESTORED: The group/skill hover effects for the icon and text
                        className="group/skill flex flex-row items-center justify-start gap-2.5 px-3 py-2.5 rounded-xl bg-darkBg border border-white/10 hover:border-white/30 transition-colors duration-300"
                      >
                        <skill.icon
                          className={`text-sm md:text-base shrink-0 ${skill.color} group-hover/skill:scale-110 transition-transform duration-300`}
                        />
                        <span className="text-[11px] md:text-xs font-medium tracking-wide text-gray-300 group-hover/skill:text-white transition-colors truncate">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}