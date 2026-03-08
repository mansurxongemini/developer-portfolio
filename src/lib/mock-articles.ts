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

const articles: ArticlesByLocale = {
  uz: [
    {
      slug: "sun-iy-intellekt-huquqiy-tartibga-solish",
      category: "Huquqiy Tahlil",
      title: "Sun'iy intellektni huquqiy tartibga solish: O'zbekiston uchun imkoniyatlar",
      excerpt:
        "AI texnologiyalari rivojlanishi bilan huquqiy tartibga solish zarurati ortib bormoqda. O'zbekiston bu sohada qanday yondashuvni tanlashi kerak?",
      content: `
# Sun'iy intellektni huquqiy tartibga solish

## Kirish

Sun'iy intellekt (AI) texnologiyalari hayotimizning barcha sohalariga kirib kelmoqda. Transport, sog'liqni saqlash, ta'lim va moliya — barchasi AI ning ta'siriga uchramoqda.

## Hozirgi holat

O'zbekistonda AI sohasida bir qancha muhim qadamlar tashlangan:

- **2020-yil**: "Raqamli O'zbekiston 2030" strategiyasi qabul qilindi
- **2023-yil**: Sun'iy intellekt bo'yicha milliy strategiya ishlab chiqildi
- **2024-yil**: AI regulyatsiyasi bo'yicha qonun loyihasi tayyorlandi

## Asosiy muammolar

### 1. Ma'lumotlar maxfiyligi

Shaxsiy ma'lumotlarni himoya qilish — AI regulyatsiyasining eng muhim jihati:

\`\`\`
Asosiy tamoyillar:
- Ma'lumotlarni yig'ish uchun rozilik olish
- Ma'lumotlarni minimal darajada yig'ish
- Ma'lumotlarni saqlash muddati cheklash
\`\`\`

### 2. Algoritmik shaffoflik

AI qarorlarining shaffof bo'lishi zarur. Qora quti (black box) yondashuvi huquqiy jihatdan qabul qilinmas.

### 3. Javobgarlik masalasi

AI tomonidan yetkazilgan zarar uchun kim javobgar?

| Tomon | Javobgarlik darajasi |
|-------|---------------------|
| Ishlab chiqaruvchi | Yuqori |
| Foydalanuvchi | O'rta |
| Davlat | Past |

## Xulosa

O'zbekiston AI regulyatsiyasini shakllantirish jarayonida jahon tajribasini o'rganib, o'z milliy manfaatlariga mos yondashuvni ishlab chiqishi lozim.

> "Texnologiya insonga xizmat qilishi kerak, aksincha emas." — Mansurxon Rustamov
      `,
      publishedAt: "2024-12-15",
      readingTime: 8,
      image: "/images/og/home.jpg",
      author: "Mansurxon Rustamov",
    },
    {
      slug: "raqamli-iqtisodiyot-va-huquq",
      category: "Raqamli Iqtisodiyot",
      title: "Raqamli iqtisodiyot: Huquqiy infratuzilma va muammolar",
      excerpt:
        "Raqamli iqtisodiyotning rivojlanishi bilan yangi huquqiy munosabatlarni tartibga solish zarurati paydo bo'ldi.",
      content: `
# Raqamli iqtisodiyot: Huquqiy infratuzilma

## Muqaddima

Dunyo iqtisodiyoti jadal raqamlashtrilmoqda. O'zbekiston ham bu jarayondan chetda qolmayapti.

## Raqamli iqtisodiyot nima?

Raqamli iqtisodiyot — Internet texnologiyalari asosida faoliyat ko'rsatuvchi iqtisodiy tizim. Bunga quyidagilar kiradi:

- **E-tijorat** — onlayn savdo platformalari
- **Fintech** — moliyaviy texnologiyalar
- **Sharing economy** — birgalikda foydalanish iqtisodiyoti
- **Gig economy** — frilanserlik

## Huquqiy muammolar

### Soliqqa tortish

Raqamli kompaniyalarni soliqqa tortish — murakkab masala:

\`\`\`
Misol: Xalqaro kompaniya
- Bosh ofis: Irlandiya
- Serverlar: AQSh
- Foydalanuvchilar: O'zbekiston
- Soliq qayerda to'lanadi?
\`\`\`

### Iste'molchilar huquqini himoya qilish

Onlayn xaridlarda iste'molchi huquqi — yangi qonunchilik talab qiladi.

## Taklif va tavsiyalar

1. Raqamli kodeksni qabul qilish
2. Elektron imzo qonunchiligini yangilash
3. Kiberxavfsizlik standartlarini joriy etish

## Xulosa

Raqamli iqtisodiyot — kelajak iqtisodiyoti. Uning huquqiy asosini bugundan shakllantira boshlashimiz zarur.
      `,
      publishedAt: "2024-11-28",
      readingTime: 6,
      author: "Mansurxon Rustamov",
    },
    {
      slug: "kiberjinoyatchilik-tendentsiyalari",
      category: "Kiberxavfsizlik",
      title: "Kiberjinoyatchilik tendentsiyalari va huquqiy javob choralari",
      excerpt:
        "2024-yilda kiberjinoyatchilik yangi cho'qqilarga chiqdi. O'zbekiston qanday himoya choralarini ko'rmoqda?",
      content: `
# Kiberjinoyatchilik tendentsiyalari

## Joriy holat

Kiberjinoyatchilik global miqyosda yillik **$8 trillion** zarar keltirmoqda. O'zbekistonda ham bu muammo tobora dolzarb bo'lib bormoqda.

## Asosiy tahdid turlari

### 1. Fishing hujumlari

Fishing — eng keng tarqalgan kiberjinoyat turi. 2024-yilda O'zbekistonda **12,000** dan ortiq fishing hodisasi qayd etilgan.

### 2. Ransomware

Ma'lumotlarni shifrlab, to'lov talab qilish:

- O'rtacha to'lov: **$250,000**
- Tiklanish muddati: **21 kun**
- Muvaffaqiyatli tiklanish: **65%**

### 3. Social engineering

Insoniy zaifliklardan foydalanish — texnik himoyani chetlab o'tishning eng samarali usuli.

## Huquqiy javob

O'zbekiston Jinoyat kodeksining 278-moddasi kiberjinoyatchilikka bag'ishlangan. Ammo bu yetarli emas.

### Taklif etiladigan o'zgartirishlar

1. **Jazolarni kuchaytirish** — hozirgi jazolar yetarli darajada qattiq emas
2. **Xalqaro hamkorlik** — kiberjinoyatchilar chegaralarni tan olmaydi
3. **Kadrlar tayyorlash** — ixtisoslashtirilgan kiberhuquqshunoslar yetishmasligi

## Profilaktika

> Eng yaxshi himoya — bu oldindan ogohlantirish.

Har bir fuqaro quyidagilarni bilishi kerak:
- Kuchli parollardan foydalanish
- Ikki bosqichli autentifikatsiya
- Shubhali havolalarni ochmaslik

## Xulosa

Kiberjinoyatchilik — XXI asrning eng katta tahdidlaridan biri. Uni bartaraf etish uchun huquqiy, texnik va ta'limiy yondashuvlar zarur.
      `,
      publishedAt: "2024-10-20",
      readingTime: 7,
      author: "Mansurxon Rustamov",
    },
    {
      slug: "blockchain-va-smart-kontraktlar",
      category: "Texnologiya va Huquq",
      title: "Blockchain texnologiyasi va smart-kontraktlarning huquqiy maqomi",
      excerpt:
        "Blockchain texnologiyasi va aqlli shartnomalar O'zbekiston huquq tizimida qanday o'rin egallashi kerak?",
      content: `
# Blockchain va Smart-kontraktlar

## Texnologiya haqida

Blockchain — markazlashtirilmagan, o'zgartirib bo'lmaydigan raqamli daftar texnologiyasi.

## Smart-kontraktlar

Smart-kontraktlar — bu o'z-o'zidan bajariladigan dasturiy shartnomalar:

\`\`\`javascript
// Smart-kontrakt misoli (soddalashtirilgan)
contract IjaraShartomasi {
  tomonlar: [ijarachi, ijaraga_beruvchi]
  shartlar: {
    oylik_to'lov: 5_000_000 // so'm
    muddat: 12 // oy
  }
  avtomatik: {
    to'lov_olinadi: har_oyning_1_sanasida
    jarima: kechikish * 0.01
  }
}
\`\`\`

## Huquqiy muammolar

### Shartnomaviy munosabatlar

| Aspekt | An'anaviy | Smart-kontrakt |
|--------|-----------|----------------|
| Imzolash | Qo'lda | Raqamli |
| Bajarish | Qo'lda | Avtomatik |
| Nizoni hal qilish | Sud | ? |

### O'zbekiston qonunchiligi

Hozirda O'zbekistonda smart-kontraktlar bo'yicha maxsus qonun mavjud emas. **Fuqarolik kodeksining** umumiy qoidalari qo'llaniladi.

## Tavsiyalar

1. Smart-kontraktlar bo'yicha maxsus qonun qabul qilish
2. Raqamli identifikatsiya tizimini kuchaytirish
3. Blockchain texnologiyasini davlat xizmatlarga joriy etish

## Xulosa

Blockchain va smart-kontraktlar — kelajak texnologiyalari. O'zbekiston bu sohada huquqiy asos yaratib, innovatsion rivojlanishga yo'l ochishi kerak.
      `,
      publishedAt: "2024-09-10",
      readingTime: 5,
      author: "Mansurxon Rustamov",
    },
  ],

  en: [
    {
      slug: "ai-legal-regulation-opportunities",
      category: "Legal Analysis",
      title: "Legal Regulation of Artificial Intelligence: Opportunities for Uzbekistan",
      excerpt:
        "As AI technologies advance, the need for legal regulation grows. What approach should Uzbekistan take?",
      content: `
# Legal Regulation of Artificial Intelligence

## Introduction

Artificial Intelligence (AI) technologies are penetrating every sphere of our lives. Transportation, healthcare, education, and finance — all are being transformed by AI.

## Current State

Several important steps have been taken in Uzbekistan regarding AI:

- **2020**: "Digital Uzbekistan 2030" strategy adopted
- **2023**: National AI strategy developed
- **2024**: Draft law on AI regulation prepared

## Key Challenges

### 1. Data Privacy

Personal data protection is the most critical aspect of AI regulation:

\`\`\`
Core Principles:
- Obtaining consent for data collection
- Data minimization
- Limiting data retention periods
\`\`\`

### 2. Algorithmic Transparency

AI decisions must be transparent. The black box approach is legally unacceptable.

### 3. Liability Issues

Who is responsible for damages caused by AI?

| Party | Liability Level |
|-------|----------------|
| Developer | High |
| User | Medium |
| State | Low |

## Conclusion

Uzbekistan should study global experience while developing an approach to AI regulation that aligns with its national interests.

> "Technology should serve humanity, not the other way around." — Mansurxon Rustamov
      `,
      publishedAt: "2024-12-15",
      readingTime: 8,
      image: "/images/og/home.jpg",
      author: "Mansurxon Rustamov",
    },
    {
      slug: "digital-economy-legal-infrastructure",
      category: "Digital Economy",
      title: "Digital Economy: Legal Infrastructure and Challenges",
      excerpt:
        "The development of the digital economy has created the need to regulate new types of legal relationships.",
      content: `
# Digital Economy: Legal Infrastructure

## Introduction

The global economy is rapidly digitalizing. Uzbekistan is no exception to this process.

## What is Digital Economy?

The digital economy is an economic system based on Internet technologies. It includes:

- **E-commerce** — online trading platforms
- **Fintech** — financial technologies
- **Sharing economy** — collaborative consumption
- **Gig economy** — freelancing

## Legal Challenges

### Taxation

Taxing digital companies is a complex issue:

\`\`\`
Example: International Company
- Headquarters: Ireland
- Servers: USA
- Users: Uzbekistan
- Where should taxes be paid?
\`\`\`

### Consumer Protection

Consumer rights in online purchases require new legislation.

## Recommendations

1. Adopt a Digital Code
2. Update electronic signature legislation
3. Implement cybersecurity standards

## Conclusion

The digital economy is the economy of the future. We must start building its legal foundation today.
      `,
      publishedAt: "2024-11-28",
      readingTime: 6,
      author: "Mansurxon Rustamov",
    },
    {
      slug: "cybercrime-trends-legal-response",
      category: "Cybersecurity",
      title: "Cybercrime Trends and Legal Countermeasures",
      excerpt:
        "Cybercrime reached new heights in 2024. What protective measures is Uzbekistan implementing?",
      content: `
# Cybercrime Trends

## Current Situation

Cybercrime causes **$8 trillion** in damages globally each year. This problem is becoming increasingly urgent in Uzbekistan as well.

## Main Threat Types

### 1. Phishing Attacks

Phishing is the most widespread type of cybercrime. In 2024, over **12,000** phishing incidents were recorded in Uzbekistan.

### 2. Ransomware

Encrypting data and demanding payment:

- Average ransom: **$250,000**
- Recovery time: **21 days**
- Successful recovery rate: **65%**

### 3. Social Engineering

Exploiting human vulnerabilities — the most effective way to bypass technical defenses.

## Legal Response

Article 278 of Uzbekistan's Criminal Code addresses cybercrime. However, it is insufficient.

### Proposed Changes

1. **Strengthen penalties** — current penalties are not severe enough
2. **International cooperation** — cybercriminals don't respect borders
3. **Personnel training** — shortage of specialized cyber-lawyers

## Prevention

> The best defense is proactive awareness.

Every citizen should know:
- Use strong passwords
- Enable two-factor authentication
- Avoid clicking suspicious links

## Conclusion

Cybercrime is one of the greatest threats of the 21st century. Addressing it requires legal, technical, and educational approaches.
      `,
      publishedAt: "2024-10-20",
      readingTime: 7,
      author: "Mansurxon Rustamov",
    },
    {
      slug: "blockchain-smart-contracts-legal-status",
      category: "Technology & Law",
      title: "Blockchain Technology and the Legal Status of Smart Contracts",
      excerpt:
        "What role should blockchain technology and smart contracts play in Uzbekistan's legal system?",
      content: `
# Blockchain and Smart Contracts

## About the Technology

Blockchain is a decentralized, immutable digital ledger technology.

## Smart Contracts

Smart contracts are self-executing programmatic agreements:

\`\`\`javascript
// Smart contract example (simplified)
contract LeaseAgreement {
  parties: [tenant, landlord]
  terms: {
    monthly_payment: 5_000_000 // UZS
    duration: 12 // months
  }
  automatic: {
    payment_collected: first_of_each_month
    penalty: delay * 0.01
  }
}
\`\`\`

## Legal Issues

### Contractual Relations

| Aspect | Traditional | Smart Contract |
|--------|------------|----------------|
| Signing | Manual | Digital |
| Execution | Manual | Automatic |
| Dispute Resolution | Court | ? |

### Uzbekistan Legislation

Currently, there is no specific law on smart contracts in Uzbekistan. **Civil Code** general provisions apply.

## Recommendations

1. Adopt specific legislation for smart contracts
2. Strengthen digital identification systems
3. Integrate blockchain technology into government services

## Conclusion

Blockchain and smart contracts are technologies of the future. Uzbekistan should create a legal foundation to pave the way for innovative development.
      `,
      publishedAt: "2024-09-10",
      readingTime: 5,
      author: "Mansurxon Rustamov",
    },
  ],

  ru: [
    {
      slug: "pravovoe-regulirovanie-iskusstvennogo-intellekta",
      category: "Правовой Анализ",
      title: "Правовое регулирование искусственного интеллекта: возможности для Узбекистана",
      excerpt:
        "С развитием технологий ИИ растёт необходимость правового регулирования. Какой подход следует выбрать Узбекистану?",
      content: `
# Правовое регулирование искусственного интеллекта

## Введение

Технологии искусственного интеллекта (ИИ) проникают во все сферы нашей жизни. Транспорт, здравоохранение, образование и финансы — всё подвергается влиянию ИИ.

## Текущее состояние

В Узбекистане предприняты важные шаги в сфере ИИ:

- **2020 г.**: Принята стратегия «Цифровой Узбекистан 2030»
- **2023 г.**: Разработана национальная стратегия ИИ
- **2024 г.**: Подготовлен проект закона о регулировании ИИ

## Ключевые проблемы

### 1. Конфиденциальность данных

Защита персональных данных — важнейший аспект регулирования ИИ:

\`\`\`
Основные принципы:
- Получение согласия на сбор данных
- Минимизация сбора данных
- Ограничение сроков хранения данных
\`\`\`

### 2. Алгоритмическая прозрачность

Решения ИИ должны быть прозрачными. Подход «чёрного ящика» юридически неприемлем.

### 3. Вопросы ответственности

Кто несёт ответственность за ущерб, причинённый ИИ?

| Сторона | Уровень ответственности |
|---------|------------------------|
| Разработчик | Высокий |
| Пользователь | Средний |
| Государство | Низкий |

## Заключение

Узбекистану следует изучить мировой опыт и выработать подход к регулированию ИИ, соответствующий национальным интересам.

> «Технологии должны служить человеку, а не наоборот.» — Мансурхон Рустамов
      `,
      publishedAt: "2024-12-15",
      readingTime: 8,
      image: "/images/og/home.jpg",
      author: "Мансурхон Рустамов",
    },
    {
      slug: "tsifrovaya-ekonomika-pravovaya-infrastruktura",
      category: "Цифровая Экономика",
      title: "Цифровая экономика: правовая инфраструктура и проблемы",
      excerpt:
        "Развитие цифровой экономики порождает необходимость регулирования новых правовых отношений.",
      content: `
# Цифровая экономика: правовая инфраструктура

## Введение

Мировая экономика стремительно цифровизируется. Узбекистан не остаётся в стороне от этого процесса.

## Что такое цифровая экономика?

Цифровая экономика — экономическая система на основе интернет-технологий:

- **Э-коммерция** — онлайн-торговые площадки
- **Финтех** — финансовые технологии
- **Шеринговая экономика** — коллективное потребление
- **Гиг-экономика** — фриланс

## Правовые проблемы

### Налогообложение

Налогообложение цифровых компаний — сложный вопрос:

\`\`\`
Пример: Международная компания
- Штаб-квартира: Ирландия
- Серверы: США
- Пользователи: Узбекистан
- Где платить налоги?
\`\`\`

### Защита прав потребителей

Права потребителей при онлайн-покупках требуют нового законодательства.

## Рекомендации

1. Принять Цифровой кодекс
2. Обновить законодательство об электронной подписи
3. Внедрить стандарты кибербезопасности

## Заключение

Цифровая экономика — экономика будущего. Необходимо уже сегодня создавать её правовую основу.
      `,
      publishedAt: "2024-11-28",
      readingTime: 6,
      author: "Мансурхон Рустамов",
    },
    {
      slug: "tendentsii-kiberprestupnosti",
      category: "Кибербезопасность",
      title: "Тенденции киберпреступности и правовые меры противодействия",
      excerpt:
        "В 2024 году киберпреступность достигла новых высот. Какие защитные меры принимает Узбекистан?",
      content: `
# Тенденции киберпреступности

## Текущая ситуация

Киберпреступность наносит **$8 триллионов** ущерба в мировом масштабе ежегодно. Эта проблема становится всё актуальнее и для Узбекистана.

## Основные виды угроз

### 1. Фишинговые атаки

Фишинг — самый распространённый вид киберпреступности. В 2024 году в Узбекистане зафиксировано более **12 000** фишинговых инцидентов.

### 2. Программы-вымогатели

Шифрование данных с требованием выкупа:

- Средний выкуп: **$250 000**
- Время восстановления: **21 день**
- Успешное восстановление: **65%**

### 3. Социальная инженерия

Использование человеческих слабостей — наиболее эффективный способ обхода технической защиты.

## Правовой ответ

Статья 278 Уголовного кодекса Узбекистана посвящена киберпреступлениям, но этого недостаточно.

### Предлагаемые изменения

1. **Ужесточение наказаний** — текущие санкции недостаточно строги
2. **Международное сотрудничество** — киберпреступники не признают границ
3. **Подготовка кадров** — нехватка специализированных киберюристов

## Профилактика

> Лучшая защита — это проактивная осведомлённость.

Каждый гражданин должен знать:
- Использовать надёжные пароли
- Включать двухфакторную аутентификацию
- Не переходить по подозрительным ссылкам

## Заключение

Киберпреступность — одна из величайших угроз XXI века. Для борьбы с ней необходимы правовые, технические и образовательные подходы.
      `,
      publishedAt: "2024-10-20",
      readingTime: 7,
      author: "Мансурхон Рустамов",
    },
    {
      slug: "blockchain-i-smart-kontrakty",
      category: "Технологии и Право",
      title: "Технология блокчейн и правовой статус смарт-контрактов",
      excerpt:
        "Какое место должны занимать технология блокчейн и смарт-контракты в правовой системе Узбекистана?",
      content: `
# Блокчейн и смарт-контракты

## О технологии

Блокчейн — децентрализованная, неизменяемая технология цифрового реестра.

## Смарт-контракты

Смарт-контракты — самоисполняющиеся программные соглашения:

\`\`\`javascript
// Пример смарт-контракта (упрощённый)
contract ДоговорАренды {
  стороны: [арендатор, арендодатель]
  условия: {
    ежемесячная_оплата: 5_000_000 // сум
    срок: 12 // месяцев
  }
  автоматически: {
    оплата_взимается: первого_числа_каждого_месяца
    штраф: просрочка * 0.01
  }
}
\`\`\`

## Правовые вопросы

### Договорные отношения

| Аспект | Традиционный | Смарт-контракт |
|--------|-------------|----------------|
| Подписание | Вручную | Цифровое |
| Исполнение | Вручную | Автоматическое |
| Разрешение споров | Суд | ? |

### Законодательство Узбекистана

В настоящее время в Узбекистане нет специального закона о смарт-контрактах. Применяются общие положения **Гражданского кодекса**.

## Рекомендации

1. Принять специальный закон о смарт-контрактах
2. Усилить систему цифровой идентификации
3. Внедрить блокчейн в государственные услуги

## Заключение

Блокчейн и смарт-контракты — технологии будущего. Узбекистан должен создать правовую базу для инновационного развития.
      `,
      publishedAt: "2024-09-10",
      readingTime: 5,
      author: "Мансурхон Рустамов",
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
