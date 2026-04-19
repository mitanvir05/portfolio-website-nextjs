"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to show or hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] p-3 md:p-4 rounded-full bg-neonBlue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-colors duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp
            size={20}
            className="group-hover:-translate-y-1 transition-transform duration-300"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
