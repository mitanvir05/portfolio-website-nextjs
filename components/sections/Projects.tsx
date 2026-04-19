"use client";

import { motion } from "framer-motion";
import { FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

export type ProjectType = {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string; 
  frontendLink?: string;
  backendLink?: string;
  imageUrl?: string;
};

export default function Projects({ projects }: { projects: ProjectType[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-neonBlue">/</span> Featured Projects
        </h2>
        <p className="text-center text-gray-400">
          No projects found. Add some from the dashboard!
        </p>
      </section>
    );
  }

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
            key={project._id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-neonBlue/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              {project.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10 aspect-video relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-neonBlue transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-gray-400">
                  {/* Single GitHub Repo */}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="GitHub Repository"
                    >
                      <FaCodeBranch size={16} />{" "}
                      <span className="text-xs">CODE</span>
                    </Link>
                  )}

                  {/* Frontend Repo */}
                  {project.frontendLink && (
                    <Link
                      href={project.frontendLink}
                      target="_blank"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="Frontend Repository"
                    >
                      <FaCodeBranch size={16} />{" "}
                      <span className="text-xs">FE</span>
                    </Link>
                  )}

                  {/* Backend Repo */}
                  {project.backendLink && (
                    <Link
                      href={project.backendLink}
                      target="_blank"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="Backend Repository"
                    >
                      <FaCodeBranch size={16} />{" "}
                      <span className="text-xs">BE</span>
                    </Link>
                  )}

                  {/* Live URL */}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="hover:text-neonBlue transition-colors flex items-center gap-1"
                      title="Live Project"
                    >
                      <FaExternalLinkAlt size={16} />{" "}
                      <span className="text-xs">LIVE</span>
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, techIdx) => (
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