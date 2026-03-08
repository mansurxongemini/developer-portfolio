import { getArticles, getArticleBySlug } from "@/lib/firestore-server";
import type { Locale } from "@/components/I18nProvider";
import { blogLabels, type PublicArticle } from "@/lib/blog-types";
import { BlogPostContent } from "@/components/BlogPostContent";
import { ArticleCard, MarkdownRenderer } from "@/components/blog-public";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseURL, home } from "@/resources";

const VALID_LOCALES = ["uz", "en", "ru"] as const;

function isLocale(value: string): value is Locale {
  return VALID_LOCALES.includes(value as (typeof VALID_LOCALES)[number]);
}

function toPublicArticle(a: { slug: string; category: string; title: string; summary: string; content: string; publishedAt?: Date | null; createdAt?: Date; image?: string; imageUrl?: string; views: number }): PublicArticle {
  const wordCount = (a.content ?? "").split(/\s+/).length;
  return {
    slug: a.slug,
    category: a.category,
    title: a.title,
    excerpt: a.summary || a.content.slice(0, 160),
    content: a.content,
    publishedAt: (a.publishedAt ?? a.createdAt ?? new Date()).toISOString(),
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    image: a.image || a.imageUrl,
    author: "Mansurxon Rustamov",
  };
}

function toAbsoluteImageUrl(image?: string): string {
  if (!image) return `${baseURL}${home.image}`;
  if (/^https?:\/\//i.test(image)) return image;
  return `${baseURL}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  try {
    const article = await getArticleBySlug(slug);
    if (!article || article.status !== "published" || article.locale !== locale) {
      return {
        robots: { index: false, follow: true, "max-image-preview": "large" },
      };
    }

    const title = article.title;
    const description = article.summary || article.content.slice(0, 160);
    const imageUrl = toAbsoluteImageUrl(article.image || article.imageUrl);
    const url = `${baseURL}/${locale}/blog/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
      openGraph: {
        type: "article",
        siteName: "Mansurxon Rustamov",
        url,
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      robots: { index: false, follow: true, "max-image-preview": "large" },
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  let article: PublicArticle | null = null;
  let related: PublicArticle[] = [];

  try {
    const fsArticle = await getArticleBySlug(slug);
    if (fsArticle && fsArticle.status === "published" && fsArticle.locale === locale) {
      article = toPublicArticle(fsArticle);
    }

    if (article) {
      const allArticles = await getArticles(undefined, "published", locale);
      related = allArticles
        .filter((a) => a.slug !== slug)
        .slice(0, 2)
        .map(toPublicArticle);
    }
  } catch {
    // Firestore unavailable
  }

  if (!article) {
    notFound();
  }

  const post = {
    slug: article.slug,
    content: article.content,
    metadata: {
      title: article.title,
      summary: article.excerpt,
      publishedAt: article.publishedAt,
      subtitle: article.excerpt,
      image: article.image,
    },
  };

  const labels = blogLabels[locale];

  const recentPosts = related.length > 0 ? (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {related.map((a) => (
        <ArticleCard key={a.slug} article={a} locale={locale} />
      ))}
    </div>
  ) : (
    <p className="text-center text-white/40">{labels.noArticles}</p>
  );

  return (
    <BlogPostContent
      post={post}
      article={<MarkdownRenderer content={article.content} />}
      recentPosts={recentPosts}
    />
  );
}
