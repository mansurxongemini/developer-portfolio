"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
  description: ReactNode;
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
    description: content.home.subline,
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
    <section className="relative w-full overflow-hidden py-1 sm:py-2 md:py-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <DynamicAtmosphere />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(245,158,11,0.08),transparent_42%),radial-gradient(circle_at_84%_78%,rgba(217,119,6,0.06),transparent_40%)]" />
      </div>

      <div className="mx-auto grid min-h-[66vh] w-full max-w-7xl grid-cols-1 items-start gap-5 px-4 py-4 sm:min-h-[72vh] sm:gap-6 sm:px-5 sm:py-8 md:min-h-[88vh] md:items-center md:gap-10 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-8 lg:px-14">
        <motion.div
          className="max-w-[40rem] lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-flex items-center rounded-full border border-amber-700/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900"
            style={{ willChange: "transform, opacity" }}
          >
            {resolvedCopy.badge}
          </motion.p>

          <motion.h1
            variants={containerVariants}
            className="mb-2 text-[2.05rem] font-black leading-[0.96] text-[#1C1917] sm:text-5xl md:mb-3 md:text-7xl"
            style={{ willChange: "transform, opacity" }}
          >
            {headlineLines.map((line, index) => (
              <motion.span
                key={`${resolvedCopy.title}-${line}`}
                variants={itemVariants}
                className="block text-[#1C1917]"
                style={{ willChange: "transform, opacity" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={containerVariants}
            className="mb-3 text-[0.95rem] font-medium leading-snug text-[#292524] sm:text-lg md:mb-6 md:text-2xl"
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

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-[0.92rem] leading-relaxed text-[#57534E] sm:text-base md:text-lg md:leading-relaxed"
            style={{ willChange: "transform, opacity" }}
          >
            {resolvedCopy.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center gap-3 md:mt-9"
            style={{ willChange: "transform, opacity" }}
          >
            <ShimmerButton href="#projects">{resolvedCopy.ctaPrimary}</ShimmerButton>

            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-[#D6D3D1] bg-white px-5 py-2.5 text-sm font-medium text-[#44403C] shadow-sm transition hover:border-amber-600/40 hover:bg-[#F7F5F0] hover:text-[#1C1917]"
              data-cursor="interactive"
            >
              {resolvedCopy.ctaSecondary}
            </Link>
          </motion.div>

          <div className="relative mt-4 w-full lg:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white p-2 shadow-[0_8px_30px_rgba(44,38,30,0.06)]">
              <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-[#EFECE6] bg-[#F7F5F0] sm:h-[360px]">
                <Image
                  src="/images/avatar.jpg"
                  alt={content.person.name}
                  fill
                  loading="eager"
                  priority
                  sizes="100vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(28,25,23,0.85)_90%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Featured Profile
                  </p>
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    {content.person.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-stone-200 sm:text-xs">{content.person.role}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative hidden items-center justify-end lg:col-span-5 lg:flex">
          <TiltCard className="w-full max-w-md" maxTilt={10} scale={1.01}>
            <motion.div
              className="relative rounded-3xl border border-[#E7E5E4] bg-white p-4 shadow-[0_16px_40px_-8px_rgba(44,38,30,0.08)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-[#EFECE6] bg-[#F7F5F0]">
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
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(28,25,23,0.85)_92%)]"
                />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Featured Profile
                  </p>
                  <h3 className="text-xl font-bold text-white">{content.person.name}</h3>
                  <p className="mt-1 text-sm text-stone-200">{content.person.role}</p>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
