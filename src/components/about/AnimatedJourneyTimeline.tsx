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
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D97706]">
          {content.ui.journey_badge ?? "About Journey"}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-[#1C1917] md:text-3xl">
          {content.ui.journey_heading ?? "A dual track in legal depth and AI craftsmanship"}
        </h2>
      </div>

      <div ref={timelineRef} className="relative ml-2 border-l border-[#E7E5E4] pl-10 md:pl-12">
        <motion.span
          aria-hidden
          className="absolute left-[-1px] top-0 h-full w-px origin-top bg-gradient-to-b from-[#D97706] via-[#F59E0B] to-[#D97706]"
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
              className="absolute left-[-2.68rem] top-1.5 h-4 w-4 rounded-full border-2 border-[#D97706] bg-white shadow-[0_0_0_4px_#FAF8F5] md:left-[-3.15rem]"
              initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0.5 }}
              whileInView={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4 }}
            />

            <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition duration-300 group-hover:border-[#D6D3D1] group-hover:shadow-md md:p-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D97706]">
                {step.period}
              </div>
              <h3 className="text-lg font-semibold text-[#1C1917] md:text-xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-[#57534E]">{step.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
