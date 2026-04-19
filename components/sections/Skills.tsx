"use client";

import { motion } from "framer-motion";

const skills = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "RESTful APIs",
  "Firebase",
  "Redux",
  "Git/Github",
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
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-neonPurple hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] transition-all duration-300 cursor-default"
            >
              <span className="text-sm font-medium tracking-wide text-gray-200 hover:text-white">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
