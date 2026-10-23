"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const pathname = usePathname() ?? "";
  const isHome = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 120 : 180,
    damping: prefersReducedMotion ? 32 : 28,
    mass: 0.2,
  });

  if (isHome) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[220] h-[3px] w-full origin-left bg-[#ff5100]"
      style={{ scaleX }}
    />
  );
}
