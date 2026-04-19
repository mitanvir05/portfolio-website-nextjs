"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Animation loop
    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");

      if (href?.startsWith("#")) {
        e.preventDefault();

        const element = document.querySelector(href) as HTMLElement | null;

        if (element) {
          lenis.scrollTo(element, {
            offset: -100,
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
