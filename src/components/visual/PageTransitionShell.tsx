"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { PAGE_TRANSITION } from "@/lib/animations";

/**
 * Wrap page content for smooth route transitions.
 * Mount around `{children}` in your app shell when ready.
 */
export function PageTransitionShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={PAGE_TRANSITION}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
