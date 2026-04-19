"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "ShopNest",
    description:
      "A robust e-commerce platform featuring secure Stripe payments, a comprehensive admin panel with real-time analytics, and a seamless user dashboard.",
    tech: ["React.js", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "TripNow",
    description:
      "Modern travel booking platform with a dynamic search interface, smooth swiper animations, and fully responsive UI across all devices.",
    tech: ["Next.js 15", "React 19", "Tailwind CSS", "AOS"],
    liveLink: "#",
    githubLink: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        <span className="text-neonBlue">/</span> Featured Projects
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-neonBlue/50 transition-all duration-300 hover:-translate-y-2"
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-neonBlue transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-gray-400">
                  <Link
                    href={project.githubLink}
                    className="hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <GitBranch size={20} />
                  </Link>
                  <Link
                    href={project.liveLink}
                    className="hover:text-neonBlue transition-colors"
                    aria-label="Live Project"
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-neonPurple"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
