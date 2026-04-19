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
      className="py-20 bg-darkBg text-white px-6 md:px-20 relative"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        <span className="text-neonPurple">/</span> Experience
      </h2>
      <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            key={idx}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-darkBg shadow-[0_0_10px_rgba(157,78,221,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-3 h-3 bg-neonPurple rounded-full"></div>
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-neonPurple/50 transition-colors duration-300">
              <div className="flex flex-col mb-2">
                <span className="text-neonBlue text-sm font-semibold">
                  {exp.date}
                </span>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <h4 className="text-gray-400">{exp.company}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
