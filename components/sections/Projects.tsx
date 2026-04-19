"use client";

import { useEffect, useRef, useState } from "react";
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
  imageUrls?: string[];
};

const AutoSlider = ({
  imageUrls,
  title,
}: {
  imageUrls: string[];
  title: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (!isDesktop || isHovered || imageUrls.length <= 1) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, imageUrls.length]);

  return (
    <div
      className="mb-4 md:mb-6 rounded-xl overflow-hidden border border-white/10 aspect-video relative group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {imageUrls.map((url, i) => (
          <div key={i} className="w-full h-full shrink-0 snap-center relative">
            <img
              src={url}
              alt={`${title} - Screenshot ${i + 1}`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {imageUrls.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20 bg-black/40 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-sm border border-white/10 pointer-events-none">
          {imageUrls.map((_, i) => (
            <div
              key={i}
              className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "bg-neonBlue scale-125 shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Projects({ projects }: { projects: ProjectType[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
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
      className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
        <span className="text-neonBlue">/</span> Featured Projects
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project._id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-8 hover:border-neonBlue/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              {project.imageUrls && project.imageUrls.length > 0 && (
                <AutoSlider
                  imageUrls={project.imageUrls}
                  title={project.title}
                />
              )}

              <div className="flex justify-between items-start mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neonBlue transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3 md:gap-4 text-gray-400">
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="GitHub Repository"
                    >
                      <FaCodeBranch size={14} className="md:w-[16px]" />{" "}
                      <span className="text-[10px] md:text-xs">CODE</span>
                    </Link>
                  )}

                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="hover:text-neonBlue transition-colors flex items-center gap-1"
                      title="Live Project"
                    >
                      <FaExternalLinkAlt size={14} className="md:w-[16px]" />{" "}
                      <span className="text-[10px] md:text-xs">LIVE</span>
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5 md:mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium bg-white/5 border border-white/10 rounded-full text-neonPurple"
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
