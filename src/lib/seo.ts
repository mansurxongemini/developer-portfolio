import type { Metadata } from "next";

import { baseURL } from "@/resources";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

type BuildOgImageUrlInput = {
  slug: string;
  title?: string;
  section?: string;
};

const DEFAULT_OG_IMAGE = "/og-image.jpg";

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, baseURL).toString();
}

/**
 * Reusable metadata builder for App Router pages.
 * Import and call from any page-level `generateMetadata` function.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);

  return {
    metadataBase: new URL(baseURL),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      url: canonicalUrl,
      title,
      description,
      siteName: "Mansurxon.dev",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildOgImageUrl({ slug, title, section }: BuildOgImageUrlInput): string {
  const params = new URLSearchParams({ slug });

  if (title) {
    params.set("title", title);
  }

  if (section) {
    params.set("section", section);
  }

  return toAbsoluteUrl(`/api/og/generate?${params.toString()}`);
}

/**
 * Template helper for page files.
 *
 * Example:
 * export async function generateMetadata() {
 *   return generatePageMetadata({
 *     title: "Article title",
 *     description: "Article summary",
 *     path: "/blog/article-slug",
 *     keywords: ["policy", "law"],
 *     image: "/api/og/generate?slug=article-slug",
 *     type: "article",
 *   });
 * }
 */
export function generatePageMetadata(input: BuildMetadataInput): Metadata {
  return buildMetadata(input);
}
