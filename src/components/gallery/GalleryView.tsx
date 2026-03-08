"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import type { Gallery } from "@/types";

type GalleryAsset = Gallery["assets"][number];

const categoryLabels = {
  en: {
    certificate: "Certificate",
    portrait: "Portrait",
    "legal-work": "Legal Practice",
    "legal-tech-event": "Legal-Tech Event",
    award: "Award",
  },
  uz: {
    certificate: "Sertifikat",
    portrait: "Portret",
    "legal-work": "Yuridik amaliyot",
    "legal-tech-event": "LegalTech tadbiri",
    award: "Mukofot",
  },
  ru: {
    certificate: "Сертификат",
    portrait: "Портрет",
    "legal-work": "Юридическая практика",
    "legal-tech-event": "LegalTech-событие",
    award: "Награда",
  },
} as const;

interface FirestoreGalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryAsset["category"];
  ratio: GalleryAsset["ratio"];
  date: string;
  featured?: boolean;
}

export default function GalleryView() {
  const { content, locale } = useI18n();
  const { gallery } = content;
  const [assets, setAssets] = useState<GalleryAsset[]>(gallery.assets);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/content/gallery")
      .then((res) => res.json())
      .then((data) => {
        const items: FirestoreGalleryItem[] = data.items ?? [];
        if (items.length > 0) {
          const mapped: GalleryAsset[] = items.map((item) => ({
            id: item.id,
            src: item.imageUrl,
            alt: item.title,
            title: item.title,
            description: item.description,
            date: item.date,
            category: item.category,
            ratio: item.ratio,
            featured: item.featured,
          }));
          setAssets(mapped);
        }
      })
      .catch(() => {
        // Keep static fallback on error
      })
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <GalleryHeader
        title={gallery.title}
        description={gallery.description}
        headline={gallery.headline}
        intro={gallery.intro}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {assets.map((asset, index) => {
          const spanClass = asset.ratio === "portrait"
            ? "lg:col-span-4"
            : asset.featured
              ? "lg:col-span-8"
              : "lg:col-span-6";

          return (
            <div key={asset.id} className={spanClass}>
              <GalleryCard
                asset={asset}
                index={index}
                categoryLabel={categoryLabels[locale][asset.category]}
              />
            </div>
          );
        })}
      </div>

      {!loaded && (
        <p className="text-center text-sm text-white/30">Loading gallery...</p>
      )}
    </section>
  );
}
