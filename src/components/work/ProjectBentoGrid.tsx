"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/firestore-server";

const layoutPatterns = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-12",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

interface ProjectBentoGridProps {
  projects: Project[];
}

export function ProjectBentoGrid({ projects }: ProjectBentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[13rem]">
        {projects.map((project, index) => {
          const isPrimary = index === 0;
          const spanClass = layoutPatterns[index % layoutPatterns.length];
          const tags = project.tags?.length ? project.tags.join(" / ") : "Portfolio Project";
          const projectImage = project.image || project.imageUrl || "";
          const description =
            project.description?.trim() ||
            "Huquq, AI va mahsulot tizimlari kesishmasidagi amaliy loyiha.";
          const hasReadMore = Boolean(project.content?.trim());
          const hasExternalLink = Boolean(project.link);

          return (
            <motion.article
              key={project.id}
              className={`group relative isolate min-h-[16rem] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0b121d]/90 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-200/25 hover:shadow-glow md:min-h-0 ${spanClass}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
            >
              {/* Mesh gradient background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-card opacity-30"
              />

              {/* Hover shimmer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-cyan-400/[0.06] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ backgroundSize: "200% 100%" }}
              />

              {/* Border glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/0 transition-all duration-500 group-hover:border-cyan-300/18"
              />

              {/* Background image */}
              {projectImage && (
                <div
                  className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.14] transition-opacity duration-700 group-hover:opacity-[0.24]"
                  style={{ backgroundImage: `url(${projectImage})` }}
                />
              )}

              {!projectImage && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_80%_at_15%_10%,rgba(56,189,248,0.14),transparent_52%),radial-gradient(70%_70%_at_85%_80%,rgba(99,102,241,0.16),transparent_55%)]"
                />
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,12,0.08)_0%,rgba(2,6,12,0.62)_72%,rgba(2,6,12,0.86)_100%)]"
              />

              <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <p className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
                    {tags}
                  </p>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3
                    className={`max-w-[20ch] font-bold leading-[1.08] tracking-tight text-white ${
                      isPrimary ? "text-3xl md:text-[2.05rem]" : "text-2xl md:text-[1.8rem]"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/75 md:text-base">
                    {description}
                  </p>
                </div>

                {/* Action bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3">
                    {hasReadMore && (
                      <a
                        href={`/work/${project.slug}`}
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/[0.1] px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-cyan-50 transition-all duration-300 hover:border-cyan-200/55 hover:bg-cyan-400/[0.16] hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                      >
                        <span>Batafsil</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    )}
                    {hasExternalLink && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.05] px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-white/85 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
                      >
                        <ExternalLink size={13} />
                        <span>Loyihani ko&apos;rish</span>
                      </a>
                    )}
                    {!hasReadMore && !hasExternalLink && (
                      <span className="inline-flex rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm font-medium tracking-[0.01em] text-white/70">
                        Yaqinda yangilanadi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
