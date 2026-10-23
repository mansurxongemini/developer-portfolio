"use client";

import { motion } from "framer-motion";

/**
 * Subtle luxury background aura for dark surfaces.
 * Mount once at app shell level with pointer-events disabled.
 */
export function DynamicAtmosphere() {
  return (
    <div
      aria-hidden
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          transform: [
            "translate3d(-2%, -1%, 0) scale(1)",
            "translate3d(2%, 1%, 0) scale(1.02)",
            "translate3d(-1%, 2%, 0) scale(1)",
          ],
        }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
        style={{
          position: "absolute",
          inset: "-12%",
          background:
            "radial-gradient(60rem circle at 18% 22%, rgba(245, 158, 11, 0.06), transparent 55%), radial-gradient(52rem circle at 78% 18%, rgba(217, 119, 6, 0.04), transparent 52%), radial-gradient(46rem circle at 74% 80%, rgba(251, 191, 36, 0.04), transparent 50%)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        aria-hidden
        animate={{
          transform: [
            "translate3d(1%, 2%, 0) scale(1)",
            "translate3d(-2%, -1%, 0) scale(1.02)",
            "translate3d(2%, -2%, 0) scale(1.01)",
          ],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 34,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
        style={{
          position: "absolute",
          inset: "-16%",
          background:
            "radial-gradient(56rem circle at 12% 84%, rgba(245, 158, 11, 0.04), transparent 52%), radial-gradient(50rem circle at 90% 16%, rgba(217, 119, 6, 0.03), transparent 50%)",
          willChange: "transform, opacity",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(250, 248, 245, 0) 0%, rgba(247, 245, 240, 0.3) 76%, rgba(245, 242, 235, 0.5) 100%)",
        }}
      />
    </div>
  );
}
