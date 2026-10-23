// Multilingual content for all 3 locales
// This provides the same typed content objects as content.tsx but per-locale

import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import type { Locale } from "@/components/I18nProvider";

// ====== PERSON (shared base — name stays the same across locales) ======

const personBase: Person = {
  firstName: "Mansurxon",
  lastName: "Rustamov",
  name: "Mansurxon Rustamov",
  role: "Law Student, AI Developer & Independent Analyst",
  avatar: "/images/avatar.jpg",
  email: "r.mansurxon01@gmail.com",
  location: "Asia/Tashkent",
  languages: ["Uzbek", "English", "Russian"],
};

const personByLocale: Record<Locale, Person> = {
  uz: {
    ...personBase,
    role: "TDYU Huquqshunoslik talabasi & AI Dasturchi",
  },
  en: {
    ...personBase,
    role: "TSUL Law Student & AI Developer",
  },
  ru: {
    ...personBase,
    role: "Студент-юрист ТГЮУ и AI-разработчик",
  },
};

// ====== SOCIAL (same across all locales) ======

const socialLinks: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mansurxongemini",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mansurxon-rustamov/",
    essential: true,
  },
  {
    name: "Telegram",
    icon: "telegram",
    link: "https://t.me/rustamovmansurxon",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/rustamovmansurxon/",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${personBase.email}`,
    essential: true,
  },
];

// ====== NEWSLETTER ======

const newsletterByLocale: Record<Locale, Newsletter> = {
  uz: {
    display: true,
    title: <>{personBase.firstName} tahliliy xabarnomasi</>,
    description: <>Huquq, sun'iy intellekt va texnologiyalar rivoji haqida tahliliy qaydlar</>,
  },
  en: {
    display: true,
    title: <>{personBase.firstName}'s Analytical Newsletter</>,
    description: <>Analytical notes on law, artificial intelligence, and societal trends</>,
  },
  ru: {
    display: true,
    title: <>Аналитическая рассылка {personBase.firstName}</>,
    description: <>Аналитические заметки о праве, искусственном интеллекте и технологиях</>,
  },
};

// ====== HOME ======

const homeByLocale: Record<Locale, Home> = {
  uz: {
    path: "/",
    image: "/og-image.jpg",
    label: "Bosh sahifa",
    title: "Mansurxon Rustamov",
    description: "Huquqshunoslik, Sun'iy Intellekt va Jamiyat o'rtasidagi amaliy tahlillar va LegalTech loyihalar.",
    headline: <>Huquqshunoslik, Sun'iy Intellekt va Jamiyat o'rtasida amaliy ko'prik</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">LegalTech &amp; AI</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Inclusive Legal RAG
          </Text>
        </Row>
      ),
      href: "/work/inclusive-legal-rag",
    },
    subline: (
      <>
        Men Mansurxon, <Text as="span" size="xl" weight="strong">TDYU</Text> birinchi kurs talabasi va dasturchiman.
        <br /> Qonun ustuvorligi va zamonaviy AI texnologiyalarini birlashtirib, jamiyat uchun ochiq va amaliy yechimlar yarataman.
      </>
    ),
  },
  en: {
    path: "/",
    image: "/og-image.jpg",
    label: "Home",
    title: "Mansurxon Rustamov",
    description: "Practical analyses and LegalTech projects bridging Jurisprudence, Artificial Intelligence, and Society.",
    headline: <>Bridging Jurisprudence, Artificial Intelligence, and Society</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">LegalTech &amp; AI</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Inclusive Legal RAG
          </Text>
        </Row>
      ),
      href: "/work/inclusive-legal-rag",
    },
    subline: (
      <>
        I'm Mansurxon, a first-year Law student at <Text as="span" size="xl" weight="strong">TSUL</Text> and software engineer.
        <br /> Building open, accessible, and grounded software at the intersection of Jurisprudence and Artificial Intelligence.
      </>
    ),
  },
  ru: {
    path: "/",
    image: "/og-image.jpg",
    label: "Главная",
    title: "Mansurxon Rustamov",
    description: "Правовой анализ и прикладные LegalTech-проекты на стыке юриспруденции, искусственного интеллекта и общества.",
    headline: <>Связывая Юриспруденцию, Искусственный Интеллект и Общество</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">LegalTech &amp; ИИ</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Inclusive Legal RAG
          </Text>
        </Row>
      ),
      href: "/work/inclusive-legal-rag",
    },
    subline: (
      <>
        Я Мансурхон, студент первого курса <Text as="span" size="xl" weight="strong">ТГЮУ</Text> и разработчик.
        <br /> Создаю открытые и прикладные решения, объединяющие правовой анализ и современные технологии ИИ.
      </>
    ),
  },
};

// ====== ABOUT ======

const aboutByLocale: Record<Locale, About> = {
  uz: {
    path: "/about",
    label: "Men haqimda",
    title: `Men haqimda – ${personBase.name}`,
    description: `${personBase.name} — TDYU talabasi, AI dasturchi va LegalTech tadqiqotchisi`,
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: true, link: "https://t.me/rustamovmansurxon" },
    intro: {
      display: true,
      title: "Profil",
      description: (
        <>
          Men Toshkent davlat yuridik universiteti birinchi kurs talabasi va dasturchiman.
          Qonunchilik tahlili va zamonaviy hisoblash arxitekturalari (Hybrid RAG, kognitiv mentor tizimlari, ochiq ma'lumotlar platformalari) ustida amaliy ishlayman.
          Maqsadim — huquqiy tafakkur va sun'iy intellekt texnologiyalarini birlashtirib, jamiyat uchun ishonchli va adolatli tizimlar yaratishdir.
        </>
      ),
    },
    work: {
      display: true,
      title: "Amaliy va muhandislik tajribasi",
      experiences: [
        {
          company: "LegalTech va AI Tadqiqotlari",
          timeframe: "2024 - Hozir",
          role: "AI Dasturchi & Tadqiqotchi",
          achievements: [
            "Inclusive Legal RAG platformasi ishlab chiqildi: LanceDB, SQLite FTS5 va BMT Konvensiyasi ontologiyasi orqali inklyuziv qonunchilik tahlil qilindi.",
            "Alloma AI loyihasi arxitekturasi: talabalar uchun shaxsiy kognitiv mentor va huquqiy tahlil tizimi yo'lga qo'yildi.",
          ],
          images: [],
        },
        {
          company: "Fuqarolik va Veb Loyihalari",
          timeframe: "2023 - 2024",
          role: "Full-Stack Dasturchi",
          achievements: [
            "Mahalla boshqaruvi va fuqarolar murojaatlarini avtomatlashtirish tizimi yaratildi.",
            "Next.js, TypeScript va Python asosida yuqori tezlikdagi, xavfsiz va qulay veb-ilovalar ishlab chiqildi.",
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Ta'lim",
      institutions: [
        {
          name: "Toshkent Davlat Yuridik Universiteti (TDYU)",
          description: <>Birinchi kurs huquq talabasi, huquqiy tafakkur va analitik yondashuvga ixtisoslashgan.</>,
        },
        {
          name: "Ixtisoslashtirilgan maktab",
          description: <>2021 - 2024 yillarda formal ta'limni tamomlagan.</>,
        },
        {
          name: "IT PARK dasturlash ta'limi",
          description: <>2022 - 2023 yillarda dasturlash bo'yicha amaliy kurslarni tamomlagan.</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Texnik ko'nikmalar",
      skills: [
        {
          title: "Frontend",
          description: <>React, Next.js, JavaScript/TypeScript asosida zamonaviy va tezkor interfeyslar yaratish.</>,
          tags: [{ name: "React" }, { name: "Next.js", icon: "nextjs" }, { name: "JavaScript", icon: "javascript" }],
          images: [],
        },
        {
          title: "Backend",
          description: <>Python va Django asosida API, biznes mantiq va ma'lumot oqimlarini ishlab chiqish.</>,
          tags: [{ name: "Python" }, { name: "Django" }],
          images: [],
        },
        {
          title: "Jamoaviy muloqot va koordinatsiya",
          description: <>Huquqiy va texnologik loyihalarda jamoaviy koordinatsiya, fikrni aniq yetkazish va tizimli tahlil ko'nikmalari.</>,
          tags: [{ name: "Leadership" }, { name: "Communication" }],
          images: [],
        },
        {
          title: "Yutuqlar",
          description: <>Turin University Hackathon, TATU University 1-o'rin, Robo Contest Uzbekistan Top natijalar.</>,
          tags: [{ name: "Hackathon" }, { name: "Contest" }],
          images: [],
        },
      ],
    },
  },
  en: {
    path: "/about",
    label: "About",
    title: `About – ${personBase.name}`,
    description: `Meet ${personBase.name} — Junior Programmer, TSUL Law Student, and builder`,
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: true, link: "https://t.me/rustamovmansurxon" },
    intro: {
      display: true,
      title: "Profile",
      description: (
        <>
          I am a first-year Law student at Tashkent State University of Law and an AI Developer.
          My work centers on the intersection of statutory jurisprudence and modern machine intelligence — developing specialized LegalTech systems, hybrid RAG engines, and civic automation tools.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work & Engineering Experience",
      experiences: [
        {
          company: "LegalTech & AI Research",
          timeframe: "2024 - Present",
          role: "AI Developer & LegalTech Researcher",
          achievements: [
            "Developed Inclusive Legal RAG: a hybrid statutory retrieval engine combining LanceDB, SQLite FTS5, and UN CRPD ontology for disability rights legislation in Uzbekistan.",
            "Architected Alloma AI cognitive mentor engine with adaptive learning workflows and legal statutory reasoning modules.",
          ],
          images: [],
        },
        {
          company: "Civic & Web Engineering",
          timeframe: "2023 - 2024",
          role: "Full-Stack Developer",
          achievements: [
            "Engineered Mahalla Management & Civic Automation Suite for community administration and citizen registry tracking.",
            "Built high-performance, accessible web platforms using Next.js, TypeScript, Python, and modern relational databases.",
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Studies",
      institutions: [
        {
          name: "Tashkent State University of Law (TSUL)",
          description: <>First-year Law student focused on legal structure and analytical reasoning.</>,
        },
        {
          name: "Specialized School",
          description: <>Formal secondary/specialized education completed (2021 - 2024).</>,
        },
        {
          name: "Programming Learning IT PARK",
          description: <>Practical programming education track completed (2022 - 2023).</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Technical skills",
      skills: [
        {
          title: "Frontend",
          description: <>React, Next.js, and JavaScript/TypeScript for responsive and maintainable web interfaces.</>,
          tags: [{ name: "React" }, { name: "Next.js", icon: "nextjs" }, { name: "JavaScript", icon: "javascript" }],
          images: [],
        },
        {
          title: "Backend",
          description: <>Python and Django for backend services, APIs, and data workflows.</>,
          tags: [{ name: "Python" }, { name: "Django" }],
          images: [],
        },
        {
          title: "Team Coordination & Analysis",
          description: <>Clear communication, project coordination, and structured problem-solving across technical and legal domains.</>,
          tags: [{ name: "Leadership" }, { name: "Communication" }],
          images: [],
        },
        {
          title: "Achievements",
          description: <>Turin University Hackathon, TATU University 1st place, and Robo Contest Uzbekistan top results.</>,
          tags: [{ name: "Hackathon" }, { name: "Contest" }],
          images: [],
        },
      ],
    },
  },
  ru: {
    path: "/about",
    label: "Обо мне",
    title: `Обо мне – ${personBase.name}`,
    description: `${personBase.name} — студент ТГЮУ, разработчик AI и исследователь LegalTech`,
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: true, link: "https://t.me/rustamovmansurxon" },
    intro: {
      display: true,
      title: "Профиль",
      description: (
        <>
          Студент первого курса Ташкентского государственного юридического университета и AI-разработчик.
          Занимаюсь практическими исследованиями на стыке юриспруденции и машинного интеллекта: разрабатываю системы гибридного RAG, когнитивные движки и решения для гражданской автоматизации.
        </>
      ),
    },
    work: {
      display: true,
      title: "Практический и инженерный опыт",
      experiences: [
        {
          company: "LegalTech и AI исследования",
          timeframe: "2024 - Настоящее время",
          role: "AI-разработчик и исследователь",
          achievements: [
            "Разработал платформу Inclusive Legal RAG: гибридный поисковый движок на LanceDB, SQLite FTS5 и онтологии Конвенции ООН о правах инвалидов.",
            "Спроектировал когнитивный ментор Alloma AI с долговременной памятью и модулями правового анализа.",
          ],
          images: [],
        },
        {
          company: "Гражданские и веб-проекты",
          timeframe: "2023 - 2024",
          role: "Full-Stack разработчик",
          achievements: [
            "Создал систему автоматизации документооборота и обработки обращений граждан для местного самоуправления (махалли).",
            "Разрабатывал высокопроизводительные веб-приложения на Next.js, TypeScript, Python и реляционных базах данных.",
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Образование",
      institutions: [
        {
          name: "Ташкентский Государственный Юридический Университет (ТГЮУ)",
          description: <>Студент 1 курса юриспруденции, фокус на правовой структуре и аналитическом мышлении.</>,
        },
        {
          name: "Специализированная школа",
          description: <>Завершенное среднее/профильное образование (2021 - 2024).</>,
        },
        {
          name: "Программирование в IT PARK",
          description: <>Практическая программа по программированию (2022 - 2023).</>,
        },
      ],
    },
    technical: {
      display: true,
      title: "Технические навыки",
      skills: [
        {
          title: "Frontend",
          description: <>React, Next.js и JavaScript/TypeScript для современных и поддерживаемых интерфейсов.</>,
          tags: [{ name: "React" }, { name: "Next.js", icon: "nextjs" }, { name: "JavaScript", icon: "javascript" }],
          images: [],
        },
        {
          title: "Backend",
          description: <>Python и Django для API, серверной логики и обработки данных.</>,
          tags: [{ name: "Python" }, { name: "Django" }],
          images: [],
        },
        {
          title: "Командная координация и анализ",
          description: <>Чёткая коммуникация, ведение проектов и структурный анализ правовых и технических задач.</>,
          tags: [{ name: "Leadership" }, { name: "Communication" }],
          images: [],
        },
        {
          title: "Достижения",
          description: <>Turin University Hackathon, 1-е место в TATU University, топ результат Robo Contest Uzbekistan.</>,
          tags: [{ name: "Hackathon" }, { name: "Contest" }],
          images: [],
        },
      ],
    },
  },
};

// ====== BLOG ======

const blogByLocale: Record<Locale, Blog> = {
  uz: {
    path: "/blog",
    label: "Blog",
    title: "Huquq, AI va Jamiyat haqida...",
    description: `${personBase.name} yaqinda nima tahlil qilganini o'qing`,
  },
  en: {
    path: "/blog",
    label: "Blog",
    title: "Writing about Law, AI & Society...",
    description: `Read what ${personBase.name} has been analyzing recently`,
  },
  ru: {
    path: "/blog",
    label: "Блог",
    title: "О Праве, ИИ и Обществе...",
    description: `Читайте последние аналитические статьи ${personBase.name}`,
  },
};

// ====== WORK ======

const workByLocale: Record<Locale, Work> = {
  uz: {
    path: "/work",
    label: "Loyihalar",
    title: `Loyihalar – ${personBase.name}`,
    description: `${personBase.name} tomonidan loyihalar va tahlillar`,
  },
  en: {
    path: "/work",
    label: "Work",
    title: `Projects – ${personBase.name}`,
    description: `Projects and analyses by ${personBase.name}`,
  },
  ru: {
    path: "/work",
    label: "Проекты",
    title: `Проекты – ${personBase.name}`,
    description: `Проекты и аналитика ${personBase.name}`,
  },
};

// ====== GALLERY ======

const galleryAssetBlueprint = [
  {
    id: "degree-llb",
    src: "/images/gallery/professional/certificate-tsul.svg",
    category: "certificate" as const,
    ratio: "landscape" as const,
    featured: true,
  },
  {
    id: "certificate-aiml",
    src: "/images/gallery/professional/certificate-ai-ml.svg",
    category: "certificate" as const,
    ratio: "landscape" as const,
  },
  {
    id: "portrait-main",
    src: "/images/gallery/professional/portrait-formal.svg",
    category: "portrait" as const,
    ratio: "portrait" as const,
  },
  {
    id: "courthouse-study",
    src: "/images/gallery/professional/courthouse-exterior.svg",
    category: "legal-work" as const,
    ratio: "landscape" as const,
  },
  {
    id: "negotiation-simulation",
    src: "/images/gallery/professional/negotiation-room.svg",
    category: "legal-work" as const,
    ratio: "landscape" as const,
  },
  {
    id: "office-research",
    src: "/images/gallery/professional/office-research.svg",
    category: "legal-work" as const,
    ratio: "landscape" as const,
  },
  {
    id: "event-legaltech",
    src: "/images/gallery/professional/legal-tech-event.svg",
    category: "legal-tech-event" as const,
    ratio: "landscape" as const,
    featured: true,
  },
  {
    id: "event-hackathon",
    src: "/images/gallery/professional/legal-hackathon.svg",
    category: "legal-tech-event" as const,
    ratio: "landscape" as const,
  },
  {
    id: "award-academic",
    src: "/images/gallery/professional/award-academic.svg",
    category: "award" as const,
    ratio: "portrait" as const,
  },
  {
    id: "portrait-speaking",
    src: "/images/gallery/professional/portrait-speaking.svg",
    category: "portrait" as const,
    ratio: "portrait" as const,
  },
];

const galleryLocaleText = {
  en: {
    headline: "Documented trajectory in law and legal technology",
    intro:
      "A curated visual dossier of legal education, analytical work, certifications, and professional development milestones.",
    assets: [
      {
        alt: "TSUL degree certificate placeholder",
        title: "Degree: Bachelor of Laws (LL.B.)",
        description: "Tashkent State University of Law, Graduating 2029",
        date: "2025 - 2029",
      },
      {
        alt: "AI and machine learning certificate placeholder",
        title: "Certificate: Applied AI and ML Foundations",
        description: "Professional coursework in machine learning, automation, and legal analytics",
        date: "Issued 2025",
      },
      {
        alt: "Formal professional portrait placeholder",
        title: "Professional Portrait",
        description: "Official portrait for legal-tech speaking profiles and conference bios",
        date: "Updated 2026",
      },
      {
        alt: "Courthouse exterior placeholder",
        title: "Courthouse Study Visit",
        description: "Field observation of judicial institutions and legal process environments",
        date: "Spring 2026",
      },
      {
        alt: "Negotiation room placeholder",
        title: "Negotiation and Mediation Simulation",
        description: "Practical legal communication and argument-structuring exercises",
        date: "2026",
      },
      {
        alt: "Legal office research placeholder",
        title: "Legal Research Workspace",
        description: "Case analysis, policy review, and drafting practice in professional settings",
        date: "Ongoing",
      },
      {
        alt: "Legal-tech event placeholder",
        title: "Legal-Tech Conference Session",
        description: "Participation in discussions on AI compliance, governance, and digital law",
        date: "Conference 2026",
      },
      {
        alt: "Legal hackathon placeholder",
        title: "Legal AI Product Sprint",
        description: "Collaborative ideation and prototype testing for legal workflow automation",
        date: "Hackathon 2026",
      },
      {
        alt: "Academic award placeholder",
        title: "Academic Recognition Award",
        description: "Merit-based achievement for analytical excellence and disciplined study",
        date: "Awarded 2026",
      },
      {
        alt: "Public speaking portrait placeholder",
        title: "Public Speaking and Presentation",
        description: "Panel and workshop communication for law, AI, and social impact topics",
        date: "2026",
      },
    ],
  },
  uz: {
    headline: "Huquq hamda LegalTech sohasidagi amaliy faoliyat va tadqiqotlar",
    intro:
      "Yuridik ta'lim, tahlil jarayonlari, sertifikatlar va professional rivojlanish bosqichlarini aks ettiruvchi hujjatlar to'plami.",
    assets: [
      {
        alt: "TDYU bakalavriat sertifikati",
        title: "Daraja: Huquq bakalavri (LL.B.)",
        description: "Toshkent Davlat Yuridik Universiteti, 2025 - 2029",
        date: "2025 - 2029",
      },
      {
        alt: "AI va ML sertifikati uchun placeholder",
        title: "Sertifikat: AI va ML asoslari",
        description: "Machine learning, avtomatlashtirish va legal analytics bo'yicha professional kurs",
        date: "Berilgan: 2025",
      },
      {
        alt: "Rasmiy professional portret uchun placeholder",
        title: "Professional portret",
        description: "LegalTech tadbirlari va konferensiya profillari uchun rasmiy foto",
        date: "Yangilangan: 2026",
      },
      {
        alt: "Sud binosi tashqi ko'rinishi uchun placeholder",
        title: "Sud muassasasiga tashrif",
        description: "Sud amaliyoti muhiti va yuridik jarayonlarni joyida kuzatish",
        date: "Bahor 2026",
      },
      {
        alt: "Muzokara xonasi uchun placeholder",
        title: "Muzokara va mediatsiya simulyatsiyasi",
        description: "Huquqiy muloqot va argument qurish bo'yicha amaliy mashg'ulot",
        date: "2026",
      },
      {
        alt: "Yuridik ofis tadqiqot muhiti uchun placeholder",
        title: "Yuridik tadqiqot ish maydoni",
        description: "Case analysis, policy review va hujjat loyihalash amaliyoti",
        date: "Davom etmoqda",
      },
      {
        alt: "LegalTech tadbiri uchun placeholder",
        title: "LegalTech konferensiya sessiyasi",
        description: "AI compliance, governance va digital law mavzularidagi professional muhokamalar",
        date: "Konferensiya 2026",
      },
      {
        alt: "Legal AI hackathon uchun placeholder",
        title: "Legal AI product sprint",
        description: "Yuridik jarayonlarni avtomatlashtirish uchun prototip va g'oya sinovi",
        date: "Hackathon 2026",
      },
      {
        alt: "Akademik mukofot uchun placeholder",
        title: "Akademik e'tirof mukofoti",
        description: "Tahliliy yondashuv va intizomli o'qish uchun merit asosidagi yutuq",
        date: "Taqdirlangan: 2026",
      },
      {
        alt: "Omma oldida nutq so'zlash uchun portret placeholder",
        title: "Ommaviy chiqish va taqdimot",
        description: "Huquq, AI va ijtimoiy ta'sir yo'nalishidagi panel va workshop chiqishlari",
        date: "2026",
      },
    ],
  },
  ru: {
    headline: "Задокументированная траектория в праве и LegalTech",
    intro:
      "Кураторская визуальная подборка юридического образования, аналитической практики, сертификатов и профессиональных достижений.",
    assets: [
      {
        alt: "Плейсхолдер диплома ТГЮУ",
        title: "Степень: Бакалавр права (LL.B.)",
        description: "Ташкентский государственный юридический университет, выпуск в 2029",
        date: "2025 - 2029",
      },
      {
        alt: "Плейсхолдер сертификата AI и ML",
        title: "Сертификат: Основы Applied AI и ML",
        description: "Профессиональный курс по машинному обучению, автоматизации и legal analytics",
        date: "Выдан в 2025",
      },
      {
        alt: "Плейсхолдер официального профессионального портрета",
        title: "Профессиональный портрет",
        description: "Официальное фото для LegalTech-профилей и выступлений",
        date: "Обновлено в 2026",
      },
      {
        alt: "Плейсхолдер фасада здания суда",
        title: "Учебный визит в судебное учреждение",
        description: "Наблюдение за судебной средой и юридическими процессами",
        date: "Весна 2026",
      },
      {
        alt: "Плейсхолдер переговорной комнаты",
        title: "Симуляция переговоров и медиации",
        description: "Практика юридической коммуникации и структурирования аргументации",
        date: "2026",
      },
      {
        alt: "Плейсхолдер рабочего пространства юриста",
        title: "Пространство юридического исследования",
        description: "Анализ кейсов, review policy-документов и практика drafting",
        date: "В процессе",
      },
      {
        alt: "Плейсхолдер LegalTech-мероприятия",
        title: "Сессия на LegalTech-конференции",
        description: "Участие в обсуждениях AI compliance, governance и digital law",
        date: "Конференция 2026",
      },
      {
        alt: "Плейсхолдер legal AI хакатона",
        title: "Спринт по продукту Legal AI",
        description: "Командная проработка и тестирование прототипов для автоматизации юрпроцессов",
        date: "Хакатон 2026",
      },
      {
        alt: "Плейсхолдер академической награды",
        title: "Академическая награда",
        description: "Признание за аналитическую глубину и учебную дисциплину",
        date: "Награждение 2026",
      },
      {
        alt: "Плейсхолдер портрета для публичного выступления",
        title: "Публичное выступление и презентация",
        description: "Панели и воркшопы на стыке права, ИИ и общественного развития",
        date: "2026",
      },
    ],
  },
};

const galleryByLocale: Record<Locale, Gallery> = {
  uz: {
    path: "/gallery",
    label: "Galereya",
    title: `Professional galereya – ${personBase.name}`,
    description: `${personBase.name}ning huquqiy va analitik faoliyatiga oid vizual hujjatlar`,
    headline: galleryLocaleText.uz.headline,
    intro: galleryLocaleText.uz.intro,
    assets: galleryAssetBlueprint.map((asset, index) => ({
      ...asset,
      ...galleryLocaleText.uz.assets[index],
    })),
  },
  en: {
    path: "/gallery",
    label: "Gallery",
    title: `Professional Gallery – ${personBase.name}`,
    description: `A capability-first visual dossier by ${personBase.name}`,
    headline: galleryLocaleText.en.headline,
    intro: galleryLocaleText.en.intro,
    assets: galleryAssetBlueprint.map((asset, index) => ({
      ...asset,
      ...galleryLocaleText.en.assets[index],
    })),
  },
  ru: {
    path: "/gallery",
    label: "Галерея",
    title: `Профессиональная галерея – ${personBase.name}`,
    description: `Визуальное досье о правовой и аналитической деятельности ${personBase.name}`,
    headline: galleryLocaleText.ru.headline,
    intro: galleryLocaleText.ru.intro,
    assets: galleryAssetBlueprint.map((asset, index) => ({
      ...asset,
      ...galleryLocaleText.ru.assets[index],
    })),
  },
};

// ====== UI STRINGS (hardcoded in pages) ======

export const uiStrings: Record<Locale, Record<string, string>> = {
  uz: {
    "latest_from_blog": "Yaqinda joylangan",
    "schedule_call": "Suhbatga yozilish",
    "page_not_found": "Sahifa topilmadi",
    "page_not_found_desc": "Siz qidirayotgan sahifa mavjud emas.",
    "blog": "Blog",
    "recent_posts": "So'nggi maqolalar",
    "earlier_posts": "Oldingi maqolalar",
    "projects": "Loyihalar",
    "related_projects": "Tegishli loyihalar",
    "share_post": "Ushbu maqolani ulashing:",
    "link_copied": "Havola nusxalandi",
    "copy_failed": "Havolani nusxalash amalga oshmadi",
    "read_case_study": "Tadqiqotni o'qing",
    "view_project": "Loyihani ko'ring",
    "featured_endeavors": "Asosiy yutuqlar",
    "featured_heading": "Startup ijrosi va chuqur tahlil",
    "startup_spotlight": "Startup diqqat markazida",
    "alloma_desc": "Alloma AI — O'zbekistondagi talabalar uchun shaxsiylashtirilgan AI mentor. U EdTech, maxsus algoritmlar va Huquqiy AI ni bir platformada birlashtiradi.",
    "view_project_btn": "Loyihani ko'rish",
    "channel_spotlight": "Diqqat markazida bo'lgan Tahlil kanali",
    "tahlil_desc": "Chuqur huquqiy tahlil, davlat nazariyasi va ambitsiyali o'quvchilar uchun shaxsiy rivojlanish bo'yicha Telegram kanal.",
    "join_channel": "Kanalga qo'shilish / So'nggi maqolalar",
    "journey_badge": "Yo'l xaritasi",
    "journey_heading": "Huquqiy mantiq va AI mahorati bo'yicha ikki yo'nalish",
    "journey_period_present": "Hozir",
    "journey_period_focus": "Fokus",
    "journey_student_title": "TDYUda birinchi bosqich huquq talabasi",
    "journey_student_desc": "Huquqshunoslik, davlat nazariyasi va analitik fikrlashni chuqur o'rganish.",
    "journey_founder_title": "Dasturchi va founder",
    "journey_founder_desc": "Alloma AI ustida ishlash: huquqiy algoritmlar va sun'iy intellektni birlashtirgan shaxsiy mentor platformasi.",
    "journey_focus_title": "Huquq, AI va jamiyatni bog'lash",
    "journey_focus_desc": "Huquqiy tafakkur va intellektual tizimlarni foydali, etik va inson markazida bo'lgan mahsulotlarga aylantirish.",
  },
  en: {
    "latest_from_blog": "Latest from the blog",
    "schedule_call": "Schedule a call",
    "page_not_found": "Page Not Found",
    "page_not_found_desc": "The page you are looking for does not exist.",
    "blog": "Blog",
    "recent_posts": "Recent posts",
    "earlier_posts": "Earlier posts",
    "projects": "Projects",
    "related_projects": "Related projects",
    "share_post": "Share this post:",
    "link_copied": "Link copied to clipboard",
    "copy_failed": "Failed to copy link",
    "read_case_study": "Read case study",
    "view_project": "View project",
    "featured_endeavors": "Featured Endeavors",
    "featured_heading": "Startup execution meets analytical depth",
    "startup_spotlight": "Startup Spotlight",
    "alloma_desc": "Alloma AI</strong> is a personalized AI mentor built for students in Uzbekistan. It bridges EdTech, custom algorithms, and Legal AI into one focused learning engine, helping students move from passive reading to practical mastery.",
    "view_project_btn": "View Project",
    "channel_spotlight": "Analytical Channel Spotlight",
    "tahlil_desc": "A premier Telegram hub for deep legal analysis, state theory, and personal development for ambitious learners and future leaders.",
    "join_channel": "Join Channel / Read Latest",
    "journey_badge": "About Journey",
    "journey_heading": "A dual track in legal depth and AI craftsmanship",
    "journey_period_present": "Present",
    "journey_period_focus": "Focus",
    "journey_student_title": "First-year Law Student at TSUL",
    "journey_student_desc": "Deep diving into Jurisprudence, State Theory, and analytical problem-solving.",
    "journey_founder_title": "AI Developer & Founder",
    "journey_founder_desc": "Architecting Alloma AI, a personalized AI mentor blending legal algorithms with artificial intelligence.",
    "journey_focus_title": "Bridging Law, AI, and Society",
    "journey_focus_desc": "Designing products and ideas that make legal reasoning and intelligent systems useful, ethical, and human-centered.",
  },
  ru: {
    "latest_from_blog": "Последние из блога",
    "schedule_call": "Запланировать звонок",
    "page_not_found": "Страница не найдена",
    "page_not_found_desc": "Страница, которую вы ищете, не существует.",
    "blog": "Блог",
    "recent_posts": "Последние статьи",
    "earlier_posts": "Ранние статьи",
    "projects": "Проекты",
    "related_projects": "Связанные проекты",
    "share_post": "Поделиться этой статьёй:",
    "link_copied": "Ссылка скопирована",
    "copy_failed": "Не удалось скопировать ссылку",
    "read_case_study": "Читать кейс",
    "view_project": "Смотреть проект",
    "featured_endeavors": "Избранные достижения",
    "featured_heading": "Стартап-исполнение и аналитическая глубина",
    "startup_spotlight": "В центре внимания: стартап",
    "alloma_desc": "Alloma AI</strong> — персонализированный AI-наставник для студентов Узбекистана. Объединяет EdTech, алгоритмы и юридический AI в единую обучающую платформу.",
    "view_project_btn": "Смотреть проект",
    "channel_spotlight": "В центре внимания: аналитический канал",
    "tahlil_desc": "Премиальный Telegram-хаб для глубокого правового анализа, теории государства и личного развития.",
    "join_channel": "Подписаться / Читать последние",
    "journey_badge": "Путь развития",
    "journey_heading": "Два вектора: юридическая глубина и AI-мастерство",
    "journey_period_present": "Сейчас",
    "journey_period_focus": "Фокус",
    "journey_student_title": "Студент 1-курса ТГЮУ",
    "journey_student_desc": "Углубленное изучение юриспруденции, теории государства и аналитического мышления.",
    "journey_founder_title": "AI-разработчик и founder",
    "journey_founder_desc": "Развитие Alloma AI: персональный наставник, объединяющий юридические алгоритмы и искусственный интеллект.",
    "journey_focus_title": "Связь права, AI и общества",
    "journey_focus_desc": "Проектирование продуктов, где юридическая логика и интеллектуальные системы остаются полезными, этичными и человекоцентричными.",
  },
};

// ====== MAIN EXPORT ======

export interface LocalizedContent {
  person: Person;
  social: Social;
  newsletter: Newsletter;
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
  gallery: Gallery;
  ui: Record<string, string>;
}

export function getContentByLocale(locale: Locale): LocalizedContent {
  return {
    person: personByLocale[locale],
    social: socialLinks,
    newsletter: newsletterByLocale[locale],
    home: homeByLocale[locale],
    about: aboutByLocale[locale],
    blog: blogByLocale[locale],
    work: workByLocale[locale],
    gallery: galleryByLocale[locale],
    ui: uiStrings[locale],
  };
}

// Default export for backwards compatibility (English)
export const defaultContent = getContentByLocale("en");
