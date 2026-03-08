"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/components/I18nProvider";

type JourneyStep = {
  period: string;
  title: string;
  description: string;
};

export function AnimatedJourneyTimeline() {
  const { content } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const journey: JourneyStep[] = [
    {
      period: content.ui.journey_period_present ?? "Present",
      title: content.ui.journey_student_title ?? "First-year Law Student at TSUL",
      description:
        content.ui.journey_student_desc ??
        "Deep diving into Jurisprudence, State Theory, and analytical problem-solving.",
    },
    {
      period: content.ui.journey_period_present ?? "Present",
      title: content.ui.journey_founder_title ?? "AI Developer & Founder",
      description:
        content.ui.journey_founder_desc ??
        "Architecting Alloma AI, a personalized AI mentor blending legal algorithms with artificial intelligence.",
    },
    {
      period: content.ui.journey_period_focus ?? "Focus",
      title: content.ui.journey_focus_title ?? "Bridging Law, AI, and Society",
      description:
        content.ui.journey_focus_desc ??
        "Designing products and ideas that make legal reasoning and intelligent systems useful, ethical, and human-centered.",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 28%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 90 : 140,
    damping: prefersReducedMotion ? 24 : 26,
  });

  return (
    <section className="relative mt-16 w-full">
      <div className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/75">
          {content.ui.journey_badge ?? "About Journey"}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {content.ui.journey_heading ?? "A dual track in legal depth and AI craftsmanship"}
        </h2>
      </div>

      <div ref={timelineRef} className="relative ml-2 border-l border-white/15 pl-10 md:pl-12">
        <motion.span
          aria-hidden
          className="absolute left-[-1px] top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-300/90 via-sky-300/70 to-indigo-300/70"
          style={{ scaleY: progress }}
        />

        {journey.map((step) => (
          <motion.article
            key={`${step.period}-${step.title}`}
            className="group relative pb-12 last:pb-0"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              aria-hidden
              className="absolute left-[-2.68rem] top-1.5 h-4 w-4 rounded-full border border-cyan-200/45 bg-slate-950 shadow-[0_0_0_4px_rgba(10,12,18,0.95)] md:left-[-3.15rem]"
              initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0.5 }}
              whileInView={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4 }}
            />

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-halo backdrop-blur-md transition duration-300 group-hover:border-cyan-200/35 group-hover:shadow-glow md:p-6">
              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">
                {step.period}
              </div>
              <h3 className="text-lg font-semibold text-white md:text-xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/72">{step.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
