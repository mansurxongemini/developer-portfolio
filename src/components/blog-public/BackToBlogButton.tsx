"use client";

import Link from "next/link";
import type { Locale } from "@/components/I18nProvider";
import { blogLabels } from "@/lib/blog-types";

interface BackToBlogButtonProps {
  locale: Locale;
}

export function BackToBlogButton({ locale }: BackToBlogButtonProps) {
  const labels = blogLabels[locale];

  return (
    <Link href={`/${locale}/blog`} className="briefs__all" data-cursor="Orqaga">
      ← {labels.backToBlog}
    </Link>
  );
}
