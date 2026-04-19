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
} from "react-icons/si";
import { FaServer } from "react-icons/fa";

// Upgraded to an array of objects to hold the name, icon, and brand color
const skills = [
  { name: "React.js", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "REST APIs", icon: FaServer, color: "text-neonPurple" }, // Generic icon for APIs
  { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
  { name: "Redux", icon: SiRedux, color: "text-[#764ABC]" },
  { name: "Git/Github", icon: SiGithub, color: "text-white" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-neonPurple">/</span> Technical Arsenal
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-neonPurple hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] transition-all duration-300 cursor-default"
            >
              {/* Icon rendering with brand color and a slight hover pop effect */}
              <skill.icon
                className={`text-xl ${skill.color} group-hover:scale-110 transition-transform duration-300`}
              />

              <span className="text-sm font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
