"use client";

import { useI18n } from "@/components/I18nProvider";

interface CapabilityItem {
  num: string;
  titles: Record<"uz" | "en" | "ru", string>;
  descs: Record<"uz" | "en" | "ru", string>;
  points: Record<"uz" | "en" | "ru", string[]>;
  tags: string[];
}

const capabilities: CapabilityItem[] = [
  {
    num: "01",
    titles: {
      uz: "STATUTORY RAG VA GIBRID QIDIRUV",
      en: "STATUTORY RAG & HYBRID RETRIEVAL",
      ru: "STATUTORY RAG И ГИБРИДНЫЙ ПОИСК",
    },
    descs: {
      uz: "Qonun hujjatlari va normativ aktlar uchun maxsus gibrid qidiruv (RAG) arxitekturasi. Gallyutsinatsiyasiz, aniq modda va bandlarga tayanuvchi ishonchli yechim.",
      en: "Specialized statutory RAG architecture designed for complex legislative corpora. Guarantees zero hallucinations through exact statutory citation grounding.",
      ru: "Специализированная гибридная архитектура RAG для нормативно-правовых актов с гарантией нулевых галлюцинаций и точной привязкой к статьям.",
    },
    points: {
      uz: [
        "LanceDB vektorli qidiruv + SQLite FTS5 to'liq matnli leksik qidiruv",
        "Reciprocal Rank Fusion (RRF) orqali semantik va leksik natijalarni birlashtirish",
        "BMT Konvensiyasi (UN CRPD) va milliy qonunchilik korpusini sinxronlash",
      ],
      en: [
        "LanceDB dense vector search paired with SQLite FTS5 lexical matching",
        "Reciprocal Rank Fusion (RRF) for optimal ranking of legal hits",
        "Alignment with UN CRPD international standards and national legislation",
      ],
      ru: [
        "Векторная база LanceDB + полнотекстовый лексический поиск SQLite FTS5",
        "Reciprocal Rank Fusion (RRF) для точного ранжирования результатов",
        "Согласование с международными нормами ООН (CRPD) и законами Узбекистана",
      ],
    },
    tags: ["LanceDB", "FastAPI", "Hybrid RRF", "Python", "UN CRPD"],
  },
  {
    num: "02",
    titles: {
      uz: "KO'P AGENTLI KONSENSUS TIZIMLARI",
      en: "MULTI-AGENT ROUNDTABLE & CONSENSUS",
      ru: "МНОГОАГЕНТНЫЙ КОНСЕНСУС И ЭКСПЕРТИЗА",
    },
    descs: {
      uz: "Bir nechta ixtisoslashgan AI agentlari o'rtasida munozara, anonim ekspertiza (peer-review) va xolis qarorlar sintezini ta'minlovchi platforma.",
      en: "Collaborative multi-agent framework orchestrating debate, anonymous peer-review, and synthesized consensus among specialized AI personas.",
      ru: "Оркестрация независимых ИИ-агентов для глубокого дебатирования, анонимного взаимного рецензирования и синтеза взвешенных решений.",
    },
    points: {
      uz: [
        "Karpathy LLM Council metodologiyasiga asoslangan 5 ta mustaqil qarash",
        "Anonim o'zaro tekshirish va xatolarni (bias) avtomatik yo'qotish",
        "Asinxron Docker mikroservislari orqali xavfsiz izolyatsiya",
      ],
      en: [
        "Inspired by Karpathy LLM Council: 5 specialized independent viewpoints",
        "Automated anonymous peer review eliminating individual model bias",
        "Asynchronous runtime isolated across Docker containers",
      ],
      ru: [
        "Методология LLM Council: 5 независимых экспертных ролей",
        "Анонимная перекрёстная оценка и устранение субъективной предвзятости",
        "Асинхронная микросервисная изоляция в Docker",
      ],
    },
    tags: ["Multi-Agent", "Consensus", "FastAPI", "Docker", "Python"],
  },
  {
    num: "03",
    titles: {
      uz: "KOGNITIV ARXITEKTURA VA DOIMIY XOTIRA",
      en: "COGNITIVE ARCHITECTURE & VECTOR MEMORY",
      ru: "КОГНИТИВНАЯ ПАМЯТЬ И EDTECH ДВИЖКИ",
    },
    descs: {
      uz: "Talabalar va tadqiqotchilar uchun shaxsiy bilimlarni doimiy vektor bazasida saqlovchi va muloqot davomida chuqur kontekstni eslab qoluvchi intellekt dvigateli.",
      en: "Persistent long-term cognitive architecture for educational mentoring, personal knowledge indexing, and context-aware dialogue.",
      ru: "Когнитивная архитектура с постоянной долговременной памятью для образовательного менторства и анализа сложных академических текстов.",
    },
    points: {
      uz: [
        "Pinecone vektorli xotira va semantik kesh tizimi",
        "OpenRouter orqali eng tejamkor va kuchli modellarni dinamik tanlash",
        "Next.js va TypeScript asosidagi yuqori unumdor interfeys",
      ],
      en: [
        "Pinecone vector index paired with high-performance semantic caching",
        "OpenRouter integration for dynamic cost-efficient model routing",
        "TypeScript and Next.js frontend with modular agent backends",
      ],
      ru: [
        "Векторная база Pinecone и высокопроизводительный семантический кэш",
        "Маршрутизация моделей через OpenRouter с оптимизацией затрат",
        "Фронтенд на Next.js и TypeScript с модульными бэкендами",
      ],
    },
    tags: ["Pinecone", "OpenRouter", "TypeScript", "Next.js"],
  },
  {
    num: "04",
    titles: {
      uz: "FUQAROLAR HUQUQIY PORTALLARI",
      en: "CIVIC LEGAL EMPOWERMENT PLATFORMS",
      ru: "ОТКРЫТЫЕ ПРАВОВЫЕ ПОРТАЛЫ ГРАЖДАН",
    },
    descs: {
      uz: "Fuqarolarning kundalik hayotdagi huquqiy muammolarini hal etish, normativ hujjatlarni oddiy tilda tushuntirish va advokatlar bilan bog'lanish tizimi.",
      en: "Accessible portals breaking down complex statutory rights for citizens, providing automated legal intake and attorney connection.",
      ru: "Платформы для правового просвещения, автоматического разъяснения законов простым языком и быстрой связи с адвокатами.",
    },
    points: {
      uz: [
        "Normativ-huquqiy aktlarni semantik qidirish va tezkor xulosa chiqarish",
        "Telegram bot va veb-portalning yagona sinxron bazasi",
        "Huquqiy atamalarni soddalashtirilgan interaktiv tushuntirish",
      ],
      en: [
        "Semantic indexing of civic codes and rapid statutory summary generation",
        "Unified real-time synchronization across Web portals and Telegram bots",
        "Interactive plain-language explanations of complex legal provisions",
      ],
      ru: [
        "Семантический поиск по кодексам и мгновенная генерация правовых справок",
        "Единая синхронизированная база данных между веб-порталом и Telegram-ботом",
        "Интерактивное разъяснение юридических терминов понятным языком",
      ],
    },
    tags: ["FastAPI", "PostgreSQL", "Next.js", "Civic-Tech"],
  },
  {
    num: "05",
    titles: {
      uz: "SUVEREN AI VA ALGORITMIK XAVFSIZLIK",
      en: "SOVEREIGN AI & ALGORITHMIC VERIFICATION",
      ru: "СУВЕРЕННЫЙ ИИ И АЛГОРИТМИЧЕСКИЙ АУДИТ",
    },
    descs: {
      uz: "Lokal serverlarda to'liq maxfiy ishlovchi, tashqi tarmoqqa ma'lumot sizdirmaydigan va yuridik jihatdan tekshiriladigan avtonom AI tizimlari.",
      en: "Air-gapped on-premise AI deployments guaranteeing sovereign privacy, zero data exfiltration, and verifiable algorithmic auditability.",
      ru: "Локально развертываемые автономные системы ИИ с гарантией суверенной конфиденциальности и защитой от утечек данных.",
    },
    points: {
      uz: [
        "Lokal Ollama va vLLM inferens infratuzilmasi",
        "Yuridik ma'lumotlar maxfiyligi va GDPR / milliy qonunchilik talablari",
        "Avtomatlashtirilgan audit va qarorlar shaffofligi protokoli",
      ],
      en: [
        "Local inference using Ollama and vLLM optimized runtime",
        "Strict adherence to legal confidentiality and national data sovereignty",
        "Automated auditing pipeline ensuring complete algorithmic transparency",
      ],
      ru: [
        "Локальная инфраструктура на базе Ollama и vLLM",
        "Полное соответствие требованиям конфиденциальности и суверенитета данных",
        "Автоматизированный аудит и прозрачность принимаемых решений",
      ],
    },
    tags: ["Ollama", "vLLM", "Data Sovereignty", "Docker"],
  },
];

const capCopy = {
  uz: {
    stamp: "№ 02",
    title: "Usullar",
    subtitle: "Methods",
    field: "05 Metodologiya",
    stackTitle: "Stack & Texnologiyalar",
    marginalia: "Har bir tizim TDYU huquqiy mezonlari va qat'iy dasturiy arxitektura asosida qurilgan.",
  },
  en: {
    stamp: "№ 02",
    title: "Capabilities",
    subtitle: "Methods",
    field: "05 Methods",
    stackTitle: "Stack & Architecture",
    marginalia: "Every system is grounded in TSUL statutory rigor and production-grade software engineering.",
  },
  ru: {
    stamp: "№ 02",
    title: "Методы",
    subtitle: "Methods",
    field: "05 Методологий",
    stackTitle: "Стек и Архитектура",
    marginalia: "Каждая архитектура базируется на юридической строгости ТГЮУ и надежном открытом коде.",
  },
};

export function DossierCapabilities() {
  const { locale } = useI18n();
  const t = capCopy[locale] || capCopy.en;

  return (
    <section
      className="sec caps"
      id="capabilities"
      data-theme-trigger="ink"
      data-tab-target="capabilities"
    >
      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            {t.stamp}
          </span>
          <h2 className="sec-head__title">
            <span data-redact>{t.title}</span> <em>{t.subtitle}</em>
          </h2>
        </div>
        <p className="sec-head__field font-mono">{t.field}</p>
      </header>

      {/* Left Rail Field Card */}
      <dl className="field caps__rail" data-clip>
        <div>
          <dt>Arxitektura</dt>
          <dd>Statutory RAG · Multi-Agent Consensus</dd>
        </div>
        <div>
          <dt>Vektor bazasi</dt>
          <dd>LanceDB · Pinecone · SQLite FTS5</dd>
        </div>
        <div>
          <dt>Boshqaruv</dt>
          <dd>FastAPI · Python 3.11+ · Next.js 16</dd>
        </div>
        <div>
          <dt>Standart</dt>
          <dd>UN CRPD · O'zbekiston Qonunchiligi</dd>
        </div>
      </dl>

      {/* Accordion Body with Weight Lens */}
      <div className="caps__body" data-lens>
        {capabilities.map((cap) => (
          <div key={cap.num} className="cap" data-cap>
            <button
              className="cap__head"
              type="button"
              aria-expanded="false"
              data-cursor="Ochish"
            >
              <span className="cap__num font-mono">{cap.num}</span>
              <span className="cap__name font-display" data-lens-item>
                {cap.titles[locale]}
              </span>
              <span className="cap__plus" aria-hidden="true" />
            </button>

            <div className="cap__body">
              <div className="cap__inner">
                <p className="cap__text font-body text-base leading-relaxed">
                  {cap.descs[locale]}
                </p>
                <ul className="mb-4 space-y-1.5 font-mono text-xs text-[#f2eee3]/80">
                  {cap.points[locale].map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#ff5100]">▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <ul className="tags" role="list">
                  {cap.tags.map((tag, tIdx) => (
                    <li key={tIdx} className="font-mono">{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="marginalia caps__margin font-serif">
        <span className="marginalia__ast mr-1">*</span>
        {t.marginalia}
      </p>
    </section>
  );
}
