"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";

import { EASE_LUXURY } from "@/lib/animations";

type TimelineNodeData = {
  period: string;
  title: string;
  description: string;
  threshold: number;
};

type TimelineCopy = {
  badge: string;
  title: string;
  description: string;
  studentPeriod: string;
  studentTitle: string;
  studentDescription: string;
  founderPeriod: string;
  founderTitle: string;
  founderDescription: string;
  focusPeriod: string;
  focusTitle: string;
  focusDescription: string;
};

function TimelineNode({
  title,
  description,
  period,
  progress,
  threshold,
}: {
  title: string;
  description: string;
  period: string;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const glow = useTransform(progress, [threshold - 0.18, threshold, threshold + 0.16], [0.18, 1, 0.45]);
  const cardY = useTransform(progress, [threshold - 0.2, threshold], [18, 0]);

  return (
    <motion.article style={{ y: cardY }} className="relative grid grid-cols-[2.4rem_1fr] gap-4 pb-10 last:pb-0">
      <div className="relative flex justify-center">
        <motion.span
          aria-hidden
          style={{ opacity: glow }}
          className="absolute top-1.5 h-5 w-5 rounded-full bg-cyan-300 blur-[9px]"
        />
        <motion.span
          style={{ opacity: glow }}
          className="relative top-1.5 h-4 w-4 rounded-full border border-cyan-100/70 bg-slate-950"
        />
      </div>

      <motion.div
        style={{ opacity: glow }}
        className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-md"
      >
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">{period}</p>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 leading-relaxed text-gray-300">{description}</p>
      </motion.div>
    </motion.article>
  );
}

export function Timeline({ copy }: { copy: TimelineCopy }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const nodes: TimelineNodeData[] = [
    {
      period: copy.studentPeriod,
      title: copy.studentTitle,
      description: copy.studentDescription,
      threshold: 0.2,
    },
    {
      period: copy.founderPeriod,
      title: copy.founderTitle,
      description: copy.founderDescription,
      threshold: 0.5,
    },
    {
      period: copy.focusPeriod,
      title: copy.focusTitle,
      description: copy.focusDescription,
      threshold: 0.8,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 28%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="w-full py-20">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">{copy.badge}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-gray-300">
            {copy.description}
          </p>
        </motion.div>

        <div ref={ref} className="relative pl-1">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-sky-300 to-indigo-300 shadow-[0_0_14px_rgba(125,211,252,0.6)]"
          />

          <div className="relative">
            <TimelineNode
              period={nodes[0].period}
              title={nodes[0].title}
              description={nodes[0].description}
              threshold={nodes[0].threshold}
              progress={scrollYProgress}
            />
            <TimelineNode
              period={nodes[1].period}
              title={nodes[1].title}
              description={nodes[1].description}
              threshold={nodes[1].threshold}
              progress={scrollYProgress}
            />
            <TimelineNode
              period={nodes[2].period}
              title={nodes[2].title}
              description={nodes[2].description}
              threshold={nodes[2].threshold}
              progress={scrollYProgress}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
