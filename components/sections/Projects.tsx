"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCodeBranch,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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

/**
 * MODAL COMPONENT
 */
const ProjectModal = ({
  project,
  onClose,
}: {
  project: ProjectType;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-darkBg border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative custom-scrollbar overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-300 hover:text-white bg-black/60 hover:bg-neonPurple/20 border border-white/20 hover:border-neonPurple/50 transition-all z-[60] p-2.5 rounded-full backdrop-blur-md shadow-xl cursor-pointer"
        >
          <FaTimes size={20} />
        </button>

        <div className="space-y-6">
          {project.imageUrls && project.imageUrls.length > 0 && (
            <AutoSlider imageUrls={project.imageUrls} title={project.title} />
          )}

          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold text-neonBlue leading-tight">
              {project.title}
            </h3>

            {/* ACTION LINKS: MODAL */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="text-gray-300 hover:text-white flex items-center gap-2 font-semibold text-sm"
                >
                  <FaCodeBranch /> REPO
                </Link>
              )}
              {project.frontendLink && (
                <Link
                  href={project.frontendLink}
                  target="_blank"
                  className="text-gray-300 hover:text-white flex items-center gap-2 font-semibold text-sm relative group/tooltip"
                >
                  <FaCodeBranch /> FR
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-darkBg border border-neonBlue/50 text-neonBlue text-xs px-2.5 py-1.5 rounded-md opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)] pointer-events-none z-50">
                    Frontend Repository
                  </span>
                </Link>
              )}
              {project.backendLink && (
                <Link
                  href={project.backendLink}
                  target="_blank"
                  className="text-gray-300 hover:text-white flex items-center gap-2 font-semibold text-sm relative group/tooltip"
                >
                  <FaCodeBranch /> BR
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-darkBg border border-neonBlue/50 text-neonBlue text-xs px-2.5 py-1.5 rounded-md opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)] pointer-events-none z-50">
                    Backend Repository
                  </span>
                </Link>
              )}
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="text-neonBlue hover:text-cyan-300 flex items-center gap-2 font-semibold text-sm"
                >
                  <FaExternalLinkAlt /> LIVE DEMO
                </Link>
              )}
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-neonPurple/10 border border-neonPurple/30 rounded-full text-[#d8b4fe] font-medium text-sm shadow-[0_0_10px_rgba(157,78,221,0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * SLIDER COMPONENT
 */
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
    }, 3000);
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
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {imageUrls.map((url, i) => (
          <div key={i} className="w-full h-full shrink-0 snap-center">
            <img src={url} alt={title} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      {imageUrls.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
          {imageUrls.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
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

/**
 * MAIN PROJECTS COMPONENT
 */
export default function Projects({ projects }: { projects: ProjectType[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );

  // NEW: State to track visible projects
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedProject]);

  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          / Featured Projects
        </h2>
        <p className="text-gray-400">Projects coming soon.</p>
      </section>
    );
  }

  // Toggles between showing 6 and showing all
  const toggleShowMore = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(6);
      // Optional: Scroll back to the top of the projects section when collapsing
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      setVisibleCount(projects.length);
    }
  };

  return (
    <section
      id="projects"
      className="py-12 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
        <span className="text-neonBlue">/</span> Featured Projects
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Slice the array based on visibleCount */}
        {projects.slice(0, visibleCount).map((project, idx) => (
          <motion.div
            key={project._id || idx}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // Stagger animation based on modulo 6 so newly revealed cards animate perfectly
            transition={{ duration: 0.5, delay: (idx % 6) * 0.1 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-8 hover:border-neonBlue/5 transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              {project.imageUrls && project.imageUrls.length > 0 && (
                <AutoSlider
                  imageUrls={project.imageUrls}
                  title={project.title}
                />
              )}

              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neonBlue transition-colors line-clamp-1 mb-4">
                {project.title}
              </h3>

              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4 line-clamp-4">
                {project.description}
              </p>

              <div className="text-neonBlue text-[10px] md:text-xs font-bold mb-6 flex items-center gap-2">
                CLICK TO READ MORE →
              </div>

              {/* ACTION LINKS: CARD */}
              <div
                className="flex flex-wrap gap-4 mb-6 pt-4 border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <FaCodeBranch size={14} /> REPO
                  </Link>
                )}
                {project.frontendLink && (
                  <Link
                    href={project.frontendLink}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold relative group/tooltip"
                  >
                    <FaCodeBranch size={14} /> FR
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-darkBg/95 border border-neonBlue/50 text-neonBlue text-[10px] px-2.5 py-1.5 rounded-md opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all shadow-lg z-50">
                      Frontend Repository
                    </span>
                  </Link>
                )}
                {project.backendLink && (
                  <Link
                    href={project.backendLink}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold relative group/tooltip"
                  >
                    <FaCodeBranch size={14} /> BR
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-darkBg/95 border border-neonBlue/50 text-neonBlue text-[10px] px-2.5 py-1.5 rounded-md opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all shadow-lg z-50">
                      Backend Repository
                    </span>
                  </Link>
                )}
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="text-neonBlue hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <FaExternalLinkAlt size={14} /> LIVE
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    // UPDATED: Ambient purple style with high visibility text for cards
                    className="px-2.5 py-0.5 text-[10px] font-medium bg-neonPurple/10 border border-neonPurple/30 rounded-full text-[#d8b4fe] shadow-[0_0_8px_rgba(157,78,221,0.15)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SHOW MORE BUTTON */}
      {projects.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={toggleShowMore}
            className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-neonPurple/50 text-white hover:bg-neonPurple/10 hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all duration-300 font-semibold text-sm cursor-pointer"
          >
            {visibleCount >= projects.length ? (
              <>
                Show Less{" "}
                <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                View More Projects{" "}
                <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key="project-modal"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
