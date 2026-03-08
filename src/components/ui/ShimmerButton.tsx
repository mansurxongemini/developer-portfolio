"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { EASE_LUXURY } from "@/lib/animations";
import styles from "./ShimmerButton.module.css";

type ShimmerButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    className?: string;
  }
>;

function joinClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

export function ShimmerButton({
  children,
  href,
  className,
  type = "button",
  ...props
}: ShimmerButtonProps) {
  const baseClassName = joinClassNames(styles.button, className);

  const content = <span className={styles.content}>{children}</span>;

  if (href) {
    return (
      <motion.div
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.992 }}
        transition={{ duration: 0.38, ease: EASE_LUXURY }}
        style={{ display: "inline-flex" }}
      >
        <Link href={href} className={baseClassName} data-cursor="interactive">
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.992 }}
      transition={{ duration: 0.38, ease: EASE_LUXURY }}
      style={{ display: "inline-flex" }}
    >
      <button type={type} className={baseClassName} data-cursor="interactive" {...props}>
        {content}
      </button>
    </motion.div>
  );
}
