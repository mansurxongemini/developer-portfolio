"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { use3DCardTilt } from "@/lib/animations";

type TiltCardProps = PropsWithChildren<{
  className?: string;
  maxTilt?: number;
  scale?: number;
}>;

/**
 * Ready-to-use 3D parallax card wrapper.
 * Add to any card container without editing card internals.
 */
export function TiltCard({ children, className, maxTilt, scale }: TiltCardProps) {
  const { tiltRef, tiltStyle, shineStyle, tiltBind } = use3DCardTilt({ maxTilt, scale });

  return (
    <motion.div
      ref={tiltRef}
      style={{ perspective: 1100 }}
      className={className}
      data-cursor="interactive"
      data-tilt-card="true"
      {...tiltBind}
    >
      <motion.div style={tiltStyle}>
        <motion.div
          aria-hidden
          style={{
            ...shineStyle,
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </motion.div>
    </motion.div>
  );
}
