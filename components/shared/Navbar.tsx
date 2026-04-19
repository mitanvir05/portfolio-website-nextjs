"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-white"
        >
          TANVIR<span className="text-neonBlue">.DEV</span>
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <Link href="#about" className="hover:text-neonBlue transition-colors">
            About
          </Link>
          <Link
            href="#skills"
            className="hover:text-neonPurple transition-colors"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className="hover:text-neonBlue transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#experience"
            className="hover:text-neonPurple transition-colors"
          >
            Experience
          </Link>
        </div>

        <Link
          href="#contact"
          className="px-6 py-2.5 rounded-full border border-white/20 hover:border-neonBlue hover:text-neonBlue text-sm transition-all duration-300 text-white"
        >
          Let's Talk
        </Link>
      </div>
    </motion.nav>
  );
}
