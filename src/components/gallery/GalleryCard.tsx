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
    "radial-gradient(600px circle at 30% 20%, rgba(217,119,6,0.12), transparent 55%), radial-gradient(400px circle at 75% 80%, rgba(245,158,11,0.08), transparent 50%)",
  portrait:
    "radial-gradient(600px circle at 25% 30%, rgba(180,83,9,0.12), transparent 55%), radial-gradient(400px circle at 80% 70%, rgba(217,119,6,0.08), transparent 50%)",
  "legal-work":
    "radial-gradient(600px circle at 35% 15%, rgba(120,53,15,0.10), transparent 55%), radial-gradient(400px circle at 70% 85%, rgba(217,119,6,0.08), transparent 50%)",
  "legal-tech-event":
    "radial-gradient(600px circle at 20% 25%, rgba(217,119,6,0.14), transparent 55%), radial-gradient(400px circle at 85% 75%, rgba(180,83,9,0.08), transparent 50%)",
  award:
    "radial-gradient(600px circle at 40% 20%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(400px circle at 65% 80%, rgba(217,119,6,0.10), transparent 50%)",
};

const categoryAccent: Record<GalleryAsset["category"], string> = {
  certificate: "text-[#D97706]",
  portrait: "text-[#B45309]",
  "legal-work": "text-[#78350F]",
  "legal-tech-event": "text-[#D97706]",
  award: "text-[#B45309]",
};

const categoryPill: Record<GalleryAsset["category"], string> = {
  certificate: "border-[#FDE68A] bg-[#FEF3C7] text-[#92400E]",
  portrait: "border-[#E7E5E4] bg-[#F5F2EB] text-[#57534E]",
  "legal-work": "border-[#E7E5E4] bg-[#F5F2EB] text-[#1C1917]",
  "legal-tech-event": "border-[#FDE68A] bg-[#FEF3C7] text-[#92400E]",
  award: "border-[#FDE68A] bg-[#FEF3C7] text-[#92400E]",
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
        "border border-[#E7E5E4] bg-white",
        "shadow-sm transition-all duration-300",
        "hover:border-[#D6D3D1] hover:shadow-md",
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
            {/* Subtle warm texture overlay */}
            <div className="absolute inset-0 bg-[#FAF8F5]/30" />

            {/* Centered icon with glow */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative">
                <div
                  className={[
                    "absolute inset-0 scale-[2] rounded-full blur-2xl opacity-20",
                    "transition-opacity duration-500 group-hover:opacity-40",
                    "bg-[#D97706]",
                  ].join(" ")}
                />
                <Icon
                  className={[
                    "relative h-10 w-10 stroke-[1.4]",
                    categoryAccent[asset.category],
                    "transition-all duration-500 group-hover:scale-110",
                  ].join(" ")}
                />
              </div>
            </div>
          </>
        )}

        {/* Featured badge */}
        {asset.featured && (
          <div className="absolute right-3 top-3 rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#92400E] shadow-sm">
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
              "rounded-full border px-2.5 py-0.5",
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              categoryPill[asset.category],
            ].join(" ")}
          >
            {categoryLabel}
          </span>
          <span className="text-[11px] tabular-nums tracking-wide text-[#78716C]">
            {asset.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-[0.01em] text-[#1C1917]">
          {asset.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#57534E]">
          {asset.description}
        </p>
      </div>
    </motion.article>
  );
}
