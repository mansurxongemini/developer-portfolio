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
      className={`group relative flex overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_4px_20px_-2px_rgba(44,38,30,0.04)] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_12px_32px_-4px_rgba(44,38,30,0.08)] ${
        isRow ? "flex-row gap-6" : "flex-col"
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
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
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
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
            <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-amber-700/20">
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                quality={85}
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-[12.5px] font-medium text-[#57534E]">
              {person.name}
            </span>
            <span className="text-[#A8A29E]">·</span>
            <time className="text-[12px] tabular-nums text-[#78716C]">
              {formatDate(post.metadata.publishedAt, false)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[1.18rem] font-bold leading-snug tracking-tight text-[#1C1917] transition-colors duration-300 group-hover:text-amber-800">
            {post.metadata.title}
          </h3>

          {/* Summary */}
          {post.metadata.summary && (
            <p className="line-clamp-2 text-[14px] leading-relaxed text-[#57534E]">
              {post.metadata.summary}
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {post.metadata.tag && (
            <span className="rounded-full border border-amber-700/15 bg-amber-500/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-900">
              {post.metadata.tag}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-900 transition-all duration-300 group-hover:text-amber-700 group-hover:gap-2.5">
            O&apos;qish
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
