"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ScrollText,
  Camera,
  Scale,
  Cpu,
  Trophy,
} from "lucide-react";
import type { Gallery } from "@/types";

type GalleryAsset = Gallery["assets"][number];

type GalleryCardProps = {
  asset: GalleryAsset;
  index: number;
  categoryLabel: string;
};

const categoryIcon: Record<GalleryAsset["category"], React.ElementType> = {
  certificate: ScrollText,
  portrait: Camera,
  "legal-work": Scale,
  "legal-tech-event": Cpu,
  award: Trophy,
};

const categoryGradient: Record<GalleryAsset["category"], string> = {
  certificate:
    "radial-gradient(600px circle at 30% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(400px circle at 75% 80%, rgba(99,102,241,0.14), transparent 50%)",
  portrait:
    "radial-gradient(600px circle at 25% 30%, rgba(168,85,247,0.16), transparent 55%), radial-gradient(400px circle at 80% 70%, rgba(236,72,153,0.12), transparent 50%)",
  "legal-work":
    "radial-gradient(600px circle at 35% 15%, rgba(59,130,246,0.16), transparent 55%), radial-gradient(400px circle at 70% 85%, rgba(100,116,139,0.14), transparent 50%)",
  "legal-tech-event":
    "radial-gradient(600px circle at 20% 25%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(400px circle at 85% 75%, rgba(16,185,129,0.14), transparent 50%)",
  award:
    "radial-gradient(600px circle at 40% 20%, rgba(245,158,11,0.16), transparent 55%), radial-gradient(400px circle at 65% 80%, rgba(251,191,36,0.10), transparent 50%)",
};

const categoryAccent: Record<GalleryAsset["category"], string> = {
  certificate: "text-cyan-400/70",
  portrait: "text-purple-400/70",
  "legal-work": "text-blue-400/70",
  "legal-tech-event": "text-emerald-400/70",
  award: "text-amber-400/70",
};

const categoryPill: Record<GalleryAsset["category"], string> = {
  certificate: "border-cyan-400/20 text-cyan-300/80",
  portrait: "border-purple-400/20 text-purple-300/80",
  "legal-work": "border-blue-400/20 text-blue-300/80",
  "legal-tech-event": "border-emerald-400/20 text-emerald-300/80",
  award: "border-amber-400/20 text-amber-300/80",
};

export default function GalleryCard({ asset, index, categoryLabel }: GalleryCardProps) {
  const Icon = categoryIcon[asset.category];
  const aspectClass =
    asset.ratio === "portrait"
      ? "aspect-[3/4]"
      : asset.ratio === "square"
        ? "aspect-square"
        : "aspect-[16/10]";

  const isRealImage = asset.src.startsWith("http://") || asset.src.startsWith("https://");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
        "transition-shadow duration-500",
        "hover:border-white/[0.18] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.08),0_20px_50px_-12px_rgba(0,0,0,0.6)]",
      ].join(" ")}
    >
      {/* ── Visual area: real image or mesh gradient ── */}
      <div
        className={[
          "relative flex items-center justify-center overflow-hidden",
          aspectClass,
        ].join(" ")}
        style={isRealImage ? undefined : { backgroundImage: categoryGradient[asset.category] }}
      >
        {isRealImage ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={index < 4}
          />
        ) : (
          <>
            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjgiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')] opacity-60" />

            {/* Centered icon with glow */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative">
                <div
                  className={[
                    "absolute inset-0 scale-[2] rounded-full blur-2xl opacity-30",
                    "transition-opacity duration-500 group-hover:opacity-50",
                    categoryAccent[asset.category].replace("text-", "bg-").replace("/70", "/30"),
                  ].join(" ")}
                />
                <Icon
                  className={[
                    "relative h-10 w-10 stroke-[1.2]",
                    categoryAccent[asset.category],
                    "transition-all duration-500 group-hover:scale-110",
                  ].join(" ")}
                />
              </div>
            </div>
          </>
        )}

        {/* Bottom gradient fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(9,11,16,0.7)] to-transparent" />

        {/* Featured badge */}
        {asset.featured && (
          <div className="absolute right-3 top-3 rounded-full border border-white/[0.12] bg-white/[0.08] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
            Featured
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Category pill + date */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={[
              "rounded-full border bg-white/[0.04] px-2.5 py-0.5",
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              categoryPill[asset.category],
            ].join(" ")}
          >
            {categoryLabel}
          </span>
          <span className="text-[11px] tabular-nums tracking-wide text-white/30">
            {asset.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-[0.01em] text-white/90">
          {asset.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-white/40">
          {asset.description}
        </p>
      </div>

      {/* ── Hover shimmer border effect ── */}
      <div
        className={[
          "pointer-events-none absolute inset-0 rounded-2xl",
          "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "bg-[length:200%_100%] animate-shimmer",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />
    </motion.article>
  );
}
