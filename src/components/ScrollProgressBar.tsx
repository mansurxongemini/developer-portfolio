"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 120 : 180,
    damping: prefersReducedMotion ? 32 : 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[220] h-[3px] w-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400"
      style={{ scaleX }}
    />
  );
}
