"use client";

import { motion, Variants } from "framer-motion";
import { FaTrophy, FaUsers, FaCameraRetro } from "react-icons/fa";

const activities = [
  {
    id: 1,
    title: "BUBT IT Club",
    role: "Active Member",
    date: "Ongoing",
    description:
      "Engaged in community tech events, workshops, and collaborative learning environments to foster IT skills and networking alongside peers.",
    icon: <FaUsers size={28} />,
    color: "text-neonPurple",
    border: "group-hover:border-neonPurple/50",
    shadow: "group-hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]",
  },
  {
    id: 2,
    title: "ICPC Asia Dhaka Regional",
    role: "Participant",
    date: "November 2023",
    description:
      "Competed in the prestigious International Collegiate Programming Contest, demonstrating algorithmic problem-solving and teamwork skills under pressure.",
    icon: <FaTrophy size={28} />,
    color: "text-neonBlue",
    border: "group-hover:border-neonBlue/50",
    shadow: "group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]",
  },
  {
    id: 3,
    title: "BUBT Photography Club",
    role: "Member",
    date: "Ongoing",
    description:
      "Developing a strong eye for visual composition, lighting, and storytelling through photography—skills that directly enhance my UI/UX design approach.",
    icon: <FaCameraRetro size={28} />,
    color: "text-neonPurple",
    border: "group-hover:border-neonPurple/50",
    shadow: "group-hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]",
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

export default function Achievements() {
  return (
    <section
      id="achievements"
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
            <span className="text-neonBlue">/</span> Achievements & Activities
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Beyond the code: Hackathons, programming contests, and tech
            community involvement.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={cardVariants}
              whileHover={{ y: -8 }} // 1. NEW: Framer Motion handles the hover lift
              // 2. UPDATED: Removed transition-all and hover:-translate-y-2
              // 3. UPDATED: Added transition-colors transition-shadow
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-colors transition-shadow duration-300 cursor-default ${activity.border} ${activity.shadow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start text-left h-full">
                <div className="flex items-center justify-between w-full mb-6">
                  <div
                    className={`p-4 rounded-xl bg-white/5 border border-white/10 ${activity.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {activity.icon}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-500 border border-white/10 px-3 py-1.5 rounded-full bg-darkBg/50">
                    {activity.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                  {activity.title}
                </h3>

                <h4 className={`text-sm font-semibold mb-4 ${activity.color}`}>
                  {activity.role}
                </h4>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base flex-grow">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
