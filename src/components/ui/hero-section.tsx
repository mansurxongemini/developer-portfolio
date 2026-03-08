"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useI18n } from "@/components/I18nProvider";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { CustomCursor } from "@/components/visual/CustomCursor";
import { DynamicAtmosphere } from "@/components/visual/DynamicAtmosphere";
import { TiltCard } from "@/components/visual/TiltCard";

export type HeroCopy = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.22,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection({ copy }: { copy?: HeroCopy }) {
  const { content } = useI18n();

  const resolvedCopy: HeroCopy = copy ?? {
    badge: content.person.role,
    title: content.home.title,
    subtitle: content.home.description,
    description: content.home.description,
    ctaPrimary: content.ui.view_project ?? "View Projects",
    ctaSecondary: content.ui.blog ?? "Blog",
  };

  const headlineLines = useMemo(() => {
    const words = resolvedCopy.title.split(" ").filter(Boolean);
    const pivot = Math.ceil(words.length / 2);
    return [words.slice(0, pivot).join(" "), words.slice(pivot).join(" ")].filter(Boolean);
  }, [resolvedCopy.title]);

  const subtitleLines = useMemo(() => {
    const words = resolvedCopy.subtitle.split(" ").filter(Boolean);
    const pivot = Math.ceil(words.length / 2);
    return [words.slice(0, pivot).join(" "), words.slice(pivot).join(" ")].filter(Boolean);
  }, [resolvedCopy.subtitle]);

  return (
    <section className="relative w-full overflow-hidden py-4 md:py-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <DynamicAtmosphere />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(125,211,252,0.16),transparent_42%),radial-gradient(circle_at_84%_78%,rgba(45,212,191,0.12),transparent_40%)]" />
      </div>

      <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-8 lg:px-14">
        <motion.div
          className="lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 text-xs uppercase tracking-[0.24em] text-cyan-200/75"
            style={{ willChange: "transform, opacity" }}
          >
            {resolvedCopy.badge}
          </motion.p>

          <motion.h1
            variants={containerVariants}
            className="mb-3 text-5xl font-black leading-[0.95] md:text-7xl"
            style={{ willChange: "transform, opacity" }}
          >
            {headlineLines.map((line, index) => (
              <motion.span
                key={`${resolvedCopy.title}-${line}`}
                variants={itemVariants}
                className="block bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent"
                style={{ willChange: "transform, opacity" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={containerVariants}
            className="mb-6 text-xl font-medium text-white/90 md:text-2xl"
            style={{ willChange: "transform, opacity" }}
          >
            {subtitleLines.map((line, index) => (
              <motion.span
                key={`${resolvedCopy.subtitle}-${line}`}
                variants={itemVariants}
                className="block"
                style={{ willChange: "transform, opacity" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{ willChange: "transform, opacity" }}
          >
            <ShimmerButton href="#projects">{resolvedCopy.ctaPrimary}</ShimmerButton>

            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-cyan-200/55 hover:bg-cyan-100/10 hover:text-cyan-50"
              data-cursor="interactive"
            >
              {resolvedCopy.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative hidden items-center justify-end lg:col-span-5 lg:flex">
          <TiltCard className="w-full max-w-md" maxTilt={10} scale={1.01}>
            <motion.div
              className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_22px_54px_rgba(0,0,0,0.52)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070c16]">
                <Image
                  src="/images/avatar.jpg"
                  alt={content.person.name}
                  fill
                  loading="eager"
                  priority
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover object-top"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_70%_at_76%_0%,rgba(125,211,252,0.36),transparent_55%),linear-gradient(180deg,rgba(3,8,16,0.02)_28%,rgba(3,8,16,0.72)_84%)]"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-12 -top-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl"
                />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-cyan-200/85">
                    Featured Profile
                  </p>
                  <h3 className="text-xl font-semibold text-white">{content.person.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{content.person.role}</p>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
