"use client";

import { useMemo, useRef } from "react";
import type { MouseEvent } from "react";
import type { MotionStyle, Transition } from "framer-motion";
import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TRANSITION_FAST: Transition = {
  duration: 0.28,
  ease: EASE_LUXURY,
};

export const TRANSITION_BASE: Transition = {
  duration: 0.48,
  ease: EASE_LUXURY,
};

export const PAGE_TRANSITION = {
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: EASE_LUXURY,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: {
      duration: 0.38,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

type AdvancedHoverOptions = {
  hoverScale?: number;
  hoverY?: number;
  tapScale?: number;
};

export function useAdvancedHover(options: AdvancedHoverOptions = {}) {
  const { hoverScale = 1.015, hoverY = -4, tapScale = 0.992 } = options;

  return {
    whileHover: { scale: hoverScale, y: hoverY },
    whileTap: { scale: tapScale },
    transition: TRANSITION_BASE,
  };
}

type CardTiltOptions = {
  maxTilt?: number;
  scale?: number;
};

export function use3DCardTilt(options: CardTiltOptions = {}) {
  const { maxTilt = 9, scale = 1.02 } = options;
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateXRaw = useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateYRaw = useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 170, damping: 18, mass: 0.34 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 170, damping: 18, mass: 0.34 });
  const cardScale = useSpring(1, { stiffness: 160, damping: 18, mass: 0.4 });
  const shine = useSpring(0, { stiffness: 120, damping: 20, mass: 0.5 });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    mx.set(x - 0.5);
    my.set(y - 0.5);

    const distance = Math.hypot(x - 0.5, y - 0.5);
    shine.set(Math.max(0, 1 - distance * 1.85));
  };

  const onMouseEnter = () => {
    cardScale.set(scale);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
    shine.set(0);
    cardScale.set(1);
  };

  const tiltStyle = useMemo(
    () =>
      ({
        rotateX,
        rotateY,
        scale: cardScale,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }) as MotionStyle,
    [rotateX, rotateY, cardScale],
  );

  const shineStyle = useMemo(
    () =>
      ({
        opacity: shine,
        background:
          "radial-gradient(420px circle at 50% 50%, rgba(125, 211, 252, 0.24), rgba(125, 211, 252, 0.06) 38%, transparent 72%)",
      }) as MotionStyle,
    [shine],
  );

  return {
    tiltRef: ref,
    tiltStyle,
    shineStyle,
    tiltBind: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    },
  };
}
