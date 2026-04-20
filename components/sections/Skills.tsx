"use client";

import { motion } from "framer-motion";
import {
  SiReact,
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
import { FaServer } from "react-icons/fa";

// Grouped skills into categories (6 items each for perfect responsive grids)
const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Redux", icon: SiRedux, color: "text-[#764ABC]" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "REST APIs", icon: FaServer, color: "text-neonPurple" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
    ],
  },
  {
    title: "Tools & Version Control",
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

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            <span className="text-neonPurple">/</span> Technical Arsenal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            The core technologies and tools I use to build scalable,
            high-performance web applications.
          </motion.p>
        </div>

        {/* Categorized Skills Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-8 hover:border-neonPurple/50 transition-colors duration-300 flex flex-col items-center text-center overflow-hidden shadow-lg w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <h3 className="relative z-10 text-lg md:text-xl font-bold text-white mb-6 md:mb-8 tracking-wide">
                {category.title}
              </h3>

              {/* UPDATED: Smart Responsive Grid (2 cols mobile, 3 tablet, 2 desktop, 3 large desktop) */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 md:gap-3 w-full">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIdx * 0.1 + idx * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    // UPDATED: Kept as flex-row everywhere for horizontal pill design, added truncate to protect text
                    className="flex flex-row items-center justify-center gap-2 px-2 py-2.5 md:px-3 md:py-3 rounded-xl bg-darkBg border border-white/10 hover:border-neonPurple hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] transition-colors duration-300 cursor-default"
                  >
                    {/* shrink-0 ensures the icon never gets squished */}
                    <skill.icon
                      className={`text-base md:text-lg shrink-0 ${skill.color} hover:scale-110 transition-transform duration-300`}
                    />

                    <span className="text-[11px] md:text-xs font-medium tracking-wide text-gray-300 hover:text-white transition-colors truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
