"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";
import Image from "next/image";

interface PostProps {
  post: {
    slug: string;
    metadata: {
      image?: string;
      title: string;
      publishedAt: string;
      summary?: string;
      tag?: string;
    };
  };
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  const prefersReducedMotion = useReducedMotion();
  const isRow = direction === "row";

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className={`group relative flex overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-editorial ${
        isRow ? "flex-row gap-6" : "flex-col"
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? {} : { y: -3 }}
    >
      {/* Thumbnail */}
      {post.metadata.image && thumbnail && (
        <div
          className={`relative overflow-hidden ${
            isRow ? "w-2/5 shrink-0" : "aspect-[16/9] w-full"
          }`}
        >
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`flex flex-1 flex-col justify-between gap-5 ${
          post.metadata.image && thumbnail ? "p-6" : "p-7"
        }`}
      >
        <div className="space-y-4">
          {/* Meta row */}
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                quality={85}
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-[12.5px] font-medium text-white/60">
              {person.name}
            </span>
            <span className="text-white/20">·</span>
            <time className="text-[12px] tabular-nums text-white/40">
              {formatDate(post.metadata.publishedAt, false)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[1.15rem] font-semibold leading-snug tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
            {post.metadata.title}
          </h3>

          {/* Summary */}
          {post.metadata.summary && (
            <p className="line-clamp-2 text-[13.5px] leading-relaxed text-white/40">
              {post.metadata.summary}
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {post.metadata.tag && (
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
              {post.metadata.tag}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] font-medium text-cyan-300/60 transition-all duration-300 group-hover:text-cyan-300/90 group-hover:gap-2.5">
            O&apos;qish
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
