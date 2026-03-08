import { getArticles } from "@/lib/firestore-server";
import type { Locale } from "@/components/I18nProvider";
import { blogLabels, type PublicArticle } from "@/lib/blog-types";
import { BlogContent } from "@/components/BlogContent";
import { ArticleCard } from "@/components/blog-public";

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

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  let articles: PublicArticle[] = [];
  try {
    const firestoreArticles = await getArticles(undefined, "published", locale);
    articles = firestoreArticles.map(toPublicArticle);
  } catch {
    // Firestore unavailable — render empty list
  }

  const [firstArticle, ...remaining] = articles;
  const middleArticles = remaining.slice(0, 2);
  const laterArticles = remaining.slice(2);
  const labels = blogLabels[locale];

  const postsFirst = firstArticle ? (
    <ArticleCard article={firstArticle} locale={locale} />
  ) : (
    <p className="text-center text-white/40">{labels.noArticles}</p>
  );

  const postsMiddle = middleArticles.length > 0 ? (
    <div className="grid gap-6 sm:grid-cols-2">
      {middleArticles.map((article) => (
        <ArticleCard key={article.slug} article={article} locale={locale} />
      ))}
    </div>
  ) : null;

  const postsLater = laterArticles.length > 0 ? (
    <div className="grid gap-6 sm:grid-cols-2">
      {laterArticles.map((article) => (
        <ArticleCard key={article.slug} article={article} locale={locale} />
      ))}
    </div>
  ) : null;

  return (
    <BlogContent
      postsFirst={postsFirst}
      postsMiddle={postsMiddle}
      postsLater={postsLater}
    />
  );
}