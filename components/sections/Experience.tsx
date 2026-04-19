"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "Skyland Web",
    date: "01-06-2024 - Present",
    desc: "Building and improving modern web apps with the team, focusing on clean, responsive, and scalable front-end development using React.js and Next.js.",
  },
  {
    title: "Software Engineer Intern",
    company: "Skyland Web",
    date: "01-03-2024 - 31-05-2024",
    desc: "Created user-friendly front-end features using React.js, ensuring smooth and scalable experiences.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 relative border-t border-white/5"
    >
      {/* UPDATED: Section Header with Subtitle */}
      <div className="mb-12 md:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          <span className="text-neonPurple">/</span> Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
        >
          My professional journey and the roles where I've grown and
          contributed.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            key={idx}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 bg-darkBg shadow-[0_0_10px_rgba(157,78,221,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-neonPurple rounded-full"></div>
            </div>

            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-neonPurple/50 transition-colors duration-300">
              <div className="flex flex-col mb-2">
                <span className="text-neonBlue text-[10px] md:text-sm font-semibold uppercase tracking-wider">
                  {exp.date}
                </span>
                <h3 className="text-lg md:text-xl font-bold">{exp.title}</h3>
                <h4 className="text-gray-400 text-sm md:text-base">
                  {exp.company}
                </h4>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
