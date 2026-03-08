"use client";

import Link from "next/link";
import type { Locale } from "@/components/I18nProvider";
import { blogLabels } from "@/lib/blog-types";
import { ArrowLeft } from "lucide-react";

interface BackToBlogButtonProps {
  locale: Locale;
}

export function BackToBlogButton({ locale }: BackToBlogButtonProps) {
  const labels = blogLabels[locale];

  return (
    <Link
      href={`/${locale}/blog`}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2
                 rounded-full border border-white/[0.1] bg-white/[0.06] px-5 py-3
                 text-sm font-medium text-white/70 backdrop-blur-xl
                 shadow-halo transition-all duration-300
                 hover:border-white/[0.18] hover:bg-white/[0.1] hover:text-white"
    >
      <ArrowLeft size={16} />
      {labels.backToBlog}
    </Link>
  );
}
