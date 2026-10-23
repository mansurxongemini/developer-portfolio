"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/firestore-server";

const layoutPatterns = [
  "md:col-span-12",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-6",
];

interface ProjectBentoGridProps {
  projects: Project[];
}

export function ProjectBentoGrid({ projects }: ProjectBentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
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
              className={`group relative isolate flex flex-col justify-between min-h-[19rem] rounded-2xl border border-[#E7E5E4] bg-white p-6 md:p-7 shadow-[0_4px_20px_-2px_rgba(44,38,30,0.04)] transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_12px_32px_-4px_rgba(44,38,30,0.08)] ${spanClass}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: prefersReducedMotion ? 0 : Math.min(index * 0.06, 0.3),
              }}
              whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.008 }}
            >
              {/* Subtle warm ambient background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_80%_at_15%_10%,rgba(245,158,11,0.04),transparent_52%),radial-gradient(70%_70%_at_85%_80%,rgba(217,119,6,0.03),transparent_55%)]"
              />

              {/* Hover warm shimmer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-amber-400/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ backgroundSize: "200% 100%" }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <p className="inline-flex rounded-full border border-amber-700/15 bg-amber-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-900">
                    {tags}
                  </p>
                  <span className="rounded-full border border-[#E7E5E4] bg-[#F7F5F0] px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#78716C]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Visual Architecture Preview */}
                {projectImage && (
                  <div className="relative my-2 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#E7E5E4] bg-[#070d18] shadow-sm">
                    <Image
                      src={projectImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <h3
                    className={`max-w-[32ch] font-bold leading-[1.15] tracking-tight text-[#1C1917] ${
                      isPrimary ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="max-w-[55ch] text-[14px] leading-relaxed text-[#57534E] md:text-[15px]">
                    {description}
                  </p>
                </div>

                {/* Action bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3">
                    {hasReadMore && (
                      <a
                        href={`/work/${project.slug}`}
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-600/[0.08] px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-amber-950 transition-all duration-300 hover:border-amber-600/60 hover:bg-amber-600/[0.14] hover:shadow-[0_2px_12px_rgba(217,119,6,0.12)]"
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
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-[#D6D3D1] bg-[#F7F5F0] px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-[#44403C] transition-all duration-300 hover:border-[#A8A29E] hover:bg-[#E7E5E4] hover:text-[#1C1917]"
                      >
                        <ExternalLink size={13} />
                        <span>Loyihani ko&apos;rish</span>
                      </a>
                    )}
                    {!hasReadMore && !hasExternalLink && (
                      <span className="inline-flex rounded-full border border-[#E7E5E4] bg-[#F7F5F0] px-4 py-2.5 text-sm font-medium tracking-[0.01em] text-[#78716C]">
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
