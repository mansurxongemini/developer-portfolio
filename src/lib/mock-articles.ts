import type { Locale } from "@/components/I18nProvider";

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: number;
  image?: string;
  author: string;
}

type ArticlesByLocale = Record<Locale, Article[]>;

// Only articles that actually exist. The live blog has a single post ("Alloma Ai"); the earlier
// placeholder articles (AI regulation, digital economy, cybercrime, blockchain) were never written
// by the author and have been removed.
const articles: ArticlesByLocale = {
  uz: [
    {
      slug: "alloma-ai",
      category: "Loyiha",
      title: "Alloma Ai",
      excerpt:
        "Biz bu loyihaga butun boshli universitetni jalb qilmoqchimiz. Bu kelajak loyihasi bo'ladi. Hammasini sekin-sekin amalga oshadi.",
      content: `# Alloma Ai

Biz bu loyihaga butun boshli universitetni jalb qilmoqchimiz. Bu kelajak loyihasi bo'ladi. Hammasini sekin-sekin amalga oshadi.
`,
      publishedAt: "2026-03-08",
      readingTime: 1,
      image: "/images/site/texture-desk.jpg",
      author: "Mansurxon Rustamov",
    },
  ],
  en: [
    {
      slug: "alloma-ai",
      category: "Project",
      title: "Alloma AI",
      excerpt:
        "We want to involve the whole university in this project. It will be a project of the future. Everything will happen step by step.",
      content: `# Alloma AI

We want to involve the whole university in this project. It will be a project of the future. Everything will happen step by step.
`,
      publishedAt: "2026-03-08",
      readingTime: 1,
      image: "/images/site/texture-desk.jpg",
      author: "Mansurxon Rustamov",
    },
  ],
  ru: [
    {
      slug: "alloma-ai",
      category: "Проект",
      title: "Alloma AI",
      excerpt:
        "Мы хотим вовлечь в этот проект весь университет. Это будет проект будущего. Всё будет происходить постепенно.",
      content: `# Alloma AI

Мы хотим вовлечь в этот проект весь университет. Это будет проект будущего. Всё будет происходить постепенно.
`,
      publishedAt: "2026-03-08",
      readingTime: 1,
      image: "/images/site/texture-desk.jpg",
      author: "Mansurxon Rustamov",
    },
  ],
};

export function getArticles(locale: Locale): Article[] {
  return articles[locale] || articles.uz;
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  const localeArticles = getArticles(locale);
  return localeArticles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  const allSlugs = new Set<string>();
  for (const locale of Object.keys(articles) as Locale[]) {
    for (const article of articles[locale]) {
      allSlugs.add(article.slug);
    }
  }
  return Array.from(allSlugs);
}

/** Blog section labels per locale */
export const blogLabels: Record<Locale, { title: string; subtitle: string; backToBlog: string; share: string; relatedArticles: string; readMore: string; minRead: string; noArticles: string }> = {
  uz: {
    title: "Blog & Tahlil",
    subtitle: "Huquq, texnologiya va jamiyat haqida maqolalar",
    backToBlog: "Blogga qaytish",
    share: "Ulashish",
    relatedArticles: "Boshqa maqolalar",
    readMore: "Batafsil o'qish",
    minRead: "daqiqa o'qish",
    noArticles: "Hozircha maqolalar yo'q",
  },
  en: {
    title: "Blog & Analysis",
    subtitle: "Articles about law, technology, and society",
    backToBlog: "Back to Blog",
    share: "Share",
    relatedArticles: "Related Articles",
    readMore: "Read More",
    minRead: "min read",
    noArticles: "No articles yet",
  },
  ru: {
    title: "Блог и Аналитика",
    subtitle: "Статьи о праве, технологиях и обществе",
    backToBlog: "Вернуться к блогу",
    share: "Поделиться",
    relatedArticles: "Другие статьи",
    readMore: "Читать далее",
    minRead: "мин чтения",
    noArticles: "Статей пока нет",
  },
};
