import type { Locale } from "@/components/I18nProvider";

/** Shape used by public-facing blog components */
export interface PublicArticle {
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

/** Blog section labels per locale */
export const blogLabels: Record<Locale, {
  title: string;
  subtitle: string;
  backToBlog: string;
  share: string;
  relatedArticles: string;
  readMore: string;
  minRead: string;
  noArticles: string;
}> = {
  uz: {
    title: "Blog & Tahlil",
    subtitle: "Huquq, texnologiya va jamiyat sohasidagi maqolalar",
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
