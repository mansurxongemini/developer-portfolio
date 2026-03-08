"use client";

import { motion, useReducedMotion } from "framer-motion";

type ProjectCard = {
  title: string;
  category: string;
  summary: string;
  bullets: string[];
  className: string;
};

const projectCards: ProjectCard[] = [
  {
    title: "Alloma AI",
    category: "EdTech / LegalTech",
    summary:
      "A personalized AI mentor concept built to turn legal complexity into practical, adaptive learning.",
    bullets: ["Legal reasoning engine", "Adaptive study flows", "Human-centered interaction"],
    className: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Political & Economic Analysis",
    category: "Research",
    summary:
      "Frameworks and visual models for turning macro-level signals into concise strategic insight.",
    bullets: ["Scenario mapping", "Signal interpretation", "Decision-ready narratives"],
    className: "md:col-span-5",
  },
  {
    title: "Custom Notion Systems for Productivity",
    category: "Workflow Design",
    summary:
      "Minimal, highly-tailored productivity systems that make focus and execution feel inevitable.",
    bullets: ["Creator operating systems", "Automation-first setup", "Clarity-driven UX"],
    className: "md:col-span-5",
  },
  {
    title: "Cross-domain Strategy",
    category: "Law x AI",
    summary:
      "A design lens that fuses legal structure with intelligent systems to solve real-world friction.",
    bullets: ["Ethical guardrails", "Policy-aware ideation", "Pragmatic implementation"],
    className: "md:col-span-7",
  },
];

export function PremiumBentoGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mb-12 mt-8 w-full">
      <div className="mb-7 space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/75">Featured Work</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Premium projects crafted at the intersection of insight and execution
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[11.5rem]">
        {projectCards.map((project, index) => (
          <motion.article
            key={project.title}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-mesh-dark bg-slateNight/70 p-5 shadow-halo backdrop-blur-xl ${project.className}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
            whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 via-cyan-200/0 to-indigo-200/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">
                  {project.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/72">
                  {project.summary}
                </p>
              </div>

              <motion.ul
                className="mt-5 grid gap-2 text-sm text-white/78"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileHover={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              >
                {project.bullets.map((bullet) => (
                  <li key={`${project.title}-${bullet}`} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/80" />
                    {bullet}
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
