import type { Project } from "./firestore-server";

export interface LocalizedProjectData {
  slug: string;
  image: string;
  link: string;
  githubUrl: string;
  tags: string[];
  publishedAt: Date;
  translations: {
    uz: {
      title: string;
      description: string;
      content: string;
    };
    en: {
      title: string;
      description: string;
      content: string;
    };
    ru: {
      title: string;
      description: string;
      content: string;
    };
  };
}

export const staticProjectsData: LocalizedProjectData[] = [
  {
    slug: "inclusive-legal-rag",
    image: "/images/projects/inclusive-legal-rag.svg",
    link: "https://github.com/mansurxongemini/inclusive-legal-rag",
    githubUrl: "https://github.com/mansurxongemini/inclusive-legal-rag",
    tags: ["Legal-AI", "RAG", "FastAPI", "LanceDB", "Python"],
    publishedAt: new Date("2025-11-15"),
    translations: {
      uz: {
        title: "Inclusive Legal AI & Statutory RAG Platform",
        description:
          "O'zbekistonda nogironligi bo'lgan shaxslar huquqlari va ijtimoiy qonunchilik normalarini tahlil qiluvchi ixtisoslashgan gibrid RAG tizimi.",
        content: `
# Inclusive Legal AI & Statutory RAG Platform

## Loyiha Haqida
Ushbu loyiha O'zbekiston Respublikasining milliy qonunchiligi hamda BMTning "Nogironlar huquqlari to'g'risida"gi Konvensiyasi normalarini o'zaro muvofiqlashtiruvchi va chuqur semantik tahlil qiluvchi ixtisoslashgan LegalTech tizimidir.

## Texnologik Arxitektura
- **Asosiy freymvork:** FastAPI (Python 3.11+, asinxron API arxitekturasi)
- **Vektorli Qidiruv:** LanceDB orqali o'ta tezkor vektorli qidiruv va embedding taqqoslash
- **Matnli Qidiruv:** SQLite FTS5 orqali aniq leksik qidiruv
- **Gibrid Qidiruv:** Reciprocal Rank Fusion (RRF) algoritmi yordamida leksik va semantik qidiruv natijalarini birlashtirish
- **Standartlar:** UN CRPD xalqaro inson huquqlari standartlariga moslashtirilgan ontologiya

## Hal Qiladigan Muammo
Huquqiy hujjatlardagi inklyuzivlik normalarini qidirish, ziddiyatlarni aniqlash va fuqarolar hamda huquqshunoslar uchun aniq normativ havolalarni bir zumda taqdim etish.
`,
      },
      en: {
        title: "Inclusive Legal AI & Statutory RAG Platform",
        description:
          "Statutory intelligence and hybrid RAG engine dedicated to disability rights and accessibility legislation in Uzbekistan.",
        content: `
# Inclusive Legal AI & Statutory RAG Platform

## Overview
A specialized LegalTech solution bridging national legislation in Uzbekistan with the UN Convention on the Rights of Persons with Disabilities (CRPD) using hybrid retrieval-augmented generation.

## Technical Architecture
- **Backend Core:** FastAPI (Python 3.11+ asynchronous runtime)
- **Vector Storage:** LanceDB for high-throughput localized vector search
- **Lexical Search:** SQLite FTS5 for precision statutory phrase matching
- **Hybrid Fusion:** Reciprocal Rank Fusion (RRF) for optimal ranking of semantic and lexical hits
- **Domain Alignment:** Formatted according to international human rights standards

## Impact & Use Case
Enables legal researchers, human rights advocates, and policymakers to query complex legal corpora with verified citations and zero hallucination.
`,
      },
      ru: {
        title: "Inclusive Legal AI & Statutory RAG Platform",
        description:
          "Правовая аналитическая платформа и гибридный RAG-движок для анализа законодательства о правах лиц с инвалидностью в Узбекистане.",
        content: `
# Inclusive Legal AI & Statutory RAG Platform

## О проекте
Инновационная LegalTech система, объединяющая национальное законодательство Республики Узбекистан и нормы Конвенции ООН о правах инвалидов с использованием гибридного RAG.

## Архитектура
- **Фреймворк:** FastAPI (Python 3.11+, асинхронный бэкенд)
- **Векторная база данных:** LanceDB для быстрого семантического поиска
- **Полнотекстовый поиск:** SQLite FTS5
- **Гибридный поиск:** Reciprocal Rank Fusion (RRF)
- **Стандарты:** Онтология, согласованная с нормами ООН
`,
      },
    },
  },
  {
    slug: "alloma-cognitive-engine",
    image: "/images/projects/alloma-ai.svg",
    link: "https://github.com/mansurxongemini/alloma-cognitive-engine",
    githubUrl: "https://github.com/mansurxongemini/alloma-cognitive-engine",
    tags: ["Cognitive-AI", "Vector-DB", "OpenRouter", "TypeScript", "Next.js"],
    publishedAt: new Date("2025-10-20"),
    translations: {
      uz: {
        title: "Alloma AI Cognitive Engine & Knowledge Memory",
        description:
          "Doimiy vektorli xotiraga ega, shaxsiylashtirilgan ta'lim va tahliliy kognitiv intellekt dvigateli.",
        content: `
# Alloma AI Cognitive Engine

## Loyiha Haqida
Alloma AI — talabalar va intellektual mutaxassislar uchun shaxsiy bilimlarni doimiy saqlovchi va muloqot davomida chuqur kontekstni eslab qoluvchi kognitiv agentlar tizimi.

## Asosiy Imkoniyatlar
- **Uzoq muddatli xotira:** Foydalanuvchi ma'lumotlari va ilmiy yozuvlarini doimiy vektor bazasida (Pinecone) indekslash
- **Ko'p modulli LLM marshrutlash:** OpenRouter orqali eng tejamkor va sifatli modellarni dinamik tanlash
- **Kontekstual tushunish:** Murakkab ilmiy, falsafiy va huquqiy matnlarni tahlil qilish
`,
      },
      en: {
        title: "Alloma AI Cognitive Engine & Knowledge Memory",
        description:
          "Intelligent cognitive architecture with persistent vector memory for personalized educational workflows.",
        content: `
# Alloma AI Cognitive Engine

## Overview
Alloma AI is an agentic cognitive platform designed for intelligent learning workflows, personal knowledge indexing, and context-aware conversational mentoring.

## Core Features
- **Persistent Vector Memory:** Long-term memory store powered by vector embeddings and semantic caching
- **Dynamic Provider Routing:** OpenRouter integration for cost-efficient frontier model inference
- **High-Performance Architecture:** TypeScript and Next.js frontend with modular agent backends
`,
      },
      ru: {
        title: "Alloma AI Cognitive Engine & Knowledge Memory",
        description:
          "Когнитивный движок с постоянной векторной памятью для персонализированного обучения и анализа знаний.",
        content: `
# Alloma AI Cognitive Engine

## О проекте
Платформа когнитивного интеллекта, предоставляющая агентов с постоянной долговременной памятью для глубокого анализа обучающих материалов.
`,
      },
    },
  },
  {
    slug: "multi-agent-roundtable-system",
    image: "/images/projects/multi-agent-roundtable.svg",
    link: "https://github.com/mansurxongemini/multi-agent-roundtable-system",
    githubUrl: "https://github.com/mansurxongemini/multi-agent-roundtable-system",
    tags: ["Multi-Agent", "Consensus", "FastAPI", "Docker", "Python"],
    publishedAt: new Date("2025-09-10"),
    translations: {
      uz: {
        title: "Multi-Agent AI Roundtable Orchestration Platform",
        description:
          "Murakkab muammolarni bir nechta mustaqil AI rollari va konsensus protokollari orqali tahlil qiluvchi ko'p agentli platforma.",
        content: `
# Multi-Agent Roundtable System

## Loyiha Falsafasi
Bitta AI modelining bir tomonlama xatolari (bias) va cheklovlarini yengish uchun bir nechta ixtisoslashgan subagentlar (The Contrarian, The First Principles, The Executor) o'rtasida davra suhbati va o'zaro anonim ekspertiza o'tkazish tizimi.

## Texnologiyalar
- **Python / FastAPI:** Asinxron agentlararo muloqot boshqaruvi
- **Docker:** Har bir agent va servis uchun izolyatsiya qilingan muhit
- **Peer-Review protokollari:** Karpathy LLM Council metodologiyasiga asoslangan konsensus yig'ish
`,
      },
      en: {
        title: "Multi-Agent AI Roundtable Orchestration Platform",
        description:
          "Collaborative multi-agent framework featuring dynamic provider routing and automated peer-review consensus.",
        content: `
# Multi-Agent Roundtable System

## Overview
A framework inspired by the LLM Council paradigm where independent specialized agents debate multifaceted dilemmas, peer-review candidate hypotheses anonymously, and synthesize unified consensus.
`,
      },
      ru: {
        title: "Multi-Agent AI Roundtable Orchestration Platform",
        description:
          "Многоагентная система принятия решений с динамической маршрутизацией и протоколами консенсуса.",
        content: `
# Multi-Agent Roundtable System

## О проекте
Система оркестрации множества специализированных агентов для глубокого дебатирования и синтеза взвешенных решений без субъективной предвзятости.
`,
      },
    },
  },
  {
    slug: "huquqplus-uz",
    image: "/images/projects/huquqplus.svg",
    link: "https://github.com/mansurxongemini/Huquqplus.uz",
    githubUrl: "https://github.com/mansurxongemini/Huquqplus.uz",
    tags: ["LegalTech", "FastAPI", "Aiogram 3", "Redis", "Celery", "SQLModel"],
    publishedAt: new Date("2025-08-01"),
    translations: {
      uz: {
        title: "Huquqplus.uz — Ochiq Huquqiy Axborot Portali",
        description:
          "Fuqarolar uchun huquqiy maslahat, normativ tahlil va advokatlar bilan tezkor bog'lanish imkonini beruvchi ochiq platforma.",
        content: `
# Huquqplus.uz

## Loyiha Maqsadi
O'zbekistonda aholining huquqiy savodxonligini oshirish, keng tarqalgan yuridik savollarga avtomatlashtirilgan aniq javoblar berish va advokatlar bilan fuqarolar o'rtasidagi ko'prikni yaratish.

## Stack
- **FastAPI:** Yuqori unumdor REST API
- **Aiogram 3:** Telegram bot orqali interaktiv konsultatsiya qabul qilish
- **Redis & Celery:** Navbatlar va asinxron xabarnomalar boshqaruvi
- **SQLModel & PostgreSQL:** Xavfsiz va normallashgan ma'lumotlar bazasi
`,
      },
      en: {
        title: "Huquqplus.uz — Citizen Legal Intelligence Platform",
        description:
          "Open-source legal advisory, statutory assistance, and citizen consultation portal built for Uzbekistan.",
        content: `
# Huquqplus.uz

## Overview
A public civic-tech platform empowering citizens with verified legal guidance, automated statutory Q&A, and direct dispatch to legal aid practitioners.
`,
      },
      ru: {
        title: "Huquqplus.uz — Правовой портал для граждан",
        description:
          "Открытая платформа правовой поддержки, консультаций и навигации по законодательству Узбекистана.",
        content: `
# Huquqplus.uz

## О проекте
Платформа для повышения правовой грамотности и автоматизированного юридического сопровождения граждан с интеграцией через Telegram и веб-сервисы.
`,
      },
    },
  },
  {
    slug: "mahalla-management-system",
    image: "/images/projects/mahalla-management.svg",
    link: "https://github.com/mansurxongemini/mahalla-management-system",
    githubUrl: "https://github.com/mansurxongemini/mahalla-management-system",
    tags: ["GovTech", "Civic-Tech", "Automation", "Playwright", "Python"],
    publishedAt: new Date("2025-06-15"),
    translations: {
      uz: {
        title: "Mahalla Boshqaruvi va Ijro Intizomi Avtomatizatsiyasi",
        description:
          "Mahalliy jamoatchilik ma'muriyati uchun fuqarolik ma'lumotlarini tekshirish va hujjatlar aylanmasini avtomatlashtiruvchi GovTech yechimi.",
        content: `
# Mahalla Boshqaruvi va Ijro Intizomi Tizimi

## Xususiyatlar
- Fuqarolik reestri va idoralararo ma'lumotlarni xavfsiz sinxronlash
- Playwright va OpenPyXL orqali yuzlab hisobotlarni bir necha soniyada generatsiya qilish
- Qo'lda bajariladigan qog'ozbozlik va xatoliklarni 90% ga qisqartirish
`,
      },
      en: {
        title: "Mahalla Management & Civic Automation Suite",
        description:
          "Civic-tech automation and registry ingestion dashboard for local community governance and administrative workflows.",
        content: `
# Mahalla Management & Civic Automation Suite

## Overview
A municipal GovTech tool modernizing local community governance through automated civil data validation, record processing, and dashboard analytics.
`,
      },
      ru: {
        title: "Цифровая система управления махаллей",
        description:
          "GovTech решение для автоматизации документооборота и верификации данных органов местного самоуправления.",
        content: `
# Цифровая система управления махаллей

## О проекте
Инструмент для снижения бюрократической нагрузки и прозрачного управления задачами местных сообществ.
`,
      },
    },
  },
  {
    slug: "kitobplus-app",
    image: "/images/projects/kitobplus.svg",
    link: "https://github.com/mansurxongemini/kitobplus-app",
    githubUrl: "https://github.com/mansurxongemini/kitobplus-app",
    tags: ["Mobile", "Audiobook", "Education", "JavaScript"],
    publishedAt: new Date("2025-04-10"),
    translations: {
      uz: {
        title: "KitobPlus & Mutolaa — Audiokitoblar va Ma'rifat Ekotizimi",
        description:
          "O'zbek tilidagi nodir adabiy va ilmiy kitoblarni qulay audio formatda tinglash hamda o'qish imkonini beruvchi mobil platforma.",
        content: `
# KitobPlus & Mutolaa

## Loyiha Maqsadi
Kitobxonlik madaniyatini rivojlantirish va yoshlarga audio formatdagi sifatli ma'rifiy asarlardan erkin foydalanish imkoniyatini taqdim etish.
`,
      },
      en: {
        title: "KitobPlus & Mutolaa — Digital Audiobook Ecosystem",
        description:
          "Interactive audiobook streaming and digital reading application preserving national and world literature.",
        content: `
# KitobPlus & Mutolaa

## Overview
A dedicated mobile and digital reading platform focused on accessible audiobooks and curated educational literature.
`,
      },
      ru: {
        title: "KitobPlus & Mutolaa — Аудиокниги и цифровая библиотека",
        description:
          "Мобильная платформа для прослушивания аудиокниг и популяризации чтения качественной литературы.",
        content: `
# KitobPlus & Mutolaa

## О проекте
Культурно-образовательный проект, создающий удобный доступ к аудиокнигам и мировому литературному наследию.
`,
      },
    },
  },
  {
    slug: "uzbekistan-map-puzzle",
    image: "/images/projects/uzbekistan-map-puzzle.svg",
    link: "https://github.com/mansurxongemini/uzbekistan-map-puzzle",
    githubUrl: "https://github.com/mansurxongemini/uzbekistan-map-puzzle",
    tags: ["Interactive-Web", "Educational-Game", "Geography", "JavaScript"],
    publishedAt: new Date("2025-02-01"),
    translations: {
      uz: {
        title: "O'zbekiston Xaritasi — Interaktiv Geografik Boshqotirma",
        description:
          "O'zbekiston viloyatlari, ularning relyefi, tarixi va geografiyasini o'rganish uchun interaktiv ta'limiy veb-o'yin.",
        content: `
# O'zbekiston Xaritasi Boshqotirmasi

## Xususiyatlar
- Vektorli interaktiv SVG xarita texnologiyasi
- Drag-and-drop o'yin mexanikasi orqali hududlarni joy-joyiga joylashtirish
- Maktab va yoshlar uchun qiziqarli geografik bilimlar sinovi
`,
      },
      en: {
        title: "Uzbekistan Regional Map & Geography Puzzle",
        description:
          "Interactive SVG educational game testing knowledge of Uzbekistan's provinces and geography.",
        content: `
# Uzbekistan Regional Map Puzzle

## Overview
An interactive canvas and vector puzzle application designed to foster geographical knowledge of Uzbekistan through gamified mechanics.
`,
      },
      ru: {
        title: "Карта Узбекистана — интерактивный географический пазл",
        description:
          "Обучающая интерактивная игра для изучения областей и географии Узбекистана.",
        content: `
# Карта Узбекистана — интерактивный пазл

## О проекте
Интерактивная карта-игра, помогающая визуально и на практике изучить административное деление Узбекистана.
`,
      },
    },
  },
];

export function getStaticProjects(locale: string = "uz"): Project[] {
  const validLocale = (["uz", "en", "ru"].includes(locale) ? locale : "uz") as "uz" | "en" | "ru";

  return staticProjectsData.map((item, index) => {
    const trans = item.translations[validLocale] || item.translations.uz;
    return {
      id: `static-${item.slug}-${index}`,
      title: trans.title,
      slug: item.slug,
      description: trans.description,
      content: trans.content,
      tags: item.tags,
      image: item.image,
      imageUrl: item.image,
      link: item.link,
      status: "published",
      views: 120 + index * 42,
      publishedAt: item.publishedAt,
      createdAt: item.publishedAt,
      updatedAt: item.publishedAt,
    };
  });
}

export function getStaticProjectBySlug(slug: string, locale: string = "uz"): Project | undefined {
  const projects = getStaticProjects(locale);
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllStaticProjectSlugs(): string[] {
  return staticProjectsData.map((p) => p.slug);
}
