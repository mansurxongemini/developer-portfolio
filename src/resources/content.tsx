import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mansurxon",
  lastName: "Rustamov",
  name: "Mansurxon Rustamov",
  role: "Law Student, AI Developer & Independent Analyst",
  avatar: "/images/avatar.jpg",
  email: "r.mansurxon01@gmail.com",
  location: "Asia/Tashkent",
  languages: ["Uzbek", "English", "Russian"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Weekly insights on Law, AI, and Societal Analysis</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mansurxon-rustamov",
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
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/og-image.jpg",
  label: "Home",
  title: "Mansurxon Rustamov | Portfolio",
  description: "Huquqshunoslik, Sun'iy Intellekt va Jamiyat mavzusiga oid tahlillar va loyihalar.",
  headline: <>Bridging Jurisprudence, Artificial Intelligence, and Society</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">TSUL & AI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    I'm Mansurxon, a first-year Law Student at <Text as="span" size="xl" weight="strong">TSUL</Text>, AI Developer, and Independent Analyst <br /> bridging the gap between Jurisprudence, Artificial Intelligence, and Society.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://t.me/rustamovmansurxon",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Mansurxon is a Tashkent-based first-year Law student at Tashkent State University of Law (TSUL),
        AI Developer, and Independent Analyst. His work lies at the intersection of Jurisprudence,
        Artificial Intelligence, and societal impact — analyzing political, economic, and technological
        trends to bridge the gap between law and innovation.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Independent AI Development",
        timeframe: "2024 - Present",
        role: "AI Developer & Analyst",
        achievements: [
          "Building AI-powered tools and analytical platforms that combine legal research with machine learning for automated document analysis and insights.",
          "Publishing independent analyses on political, economic, and technological topics, reaching a growing audience across Central Asia.",
        ],
        images: [],
      },
      {
        company: "Freelance Projects",
        timeframe: "2023 - 2024",
        role: "Full-Stack Developer",
        achievements: [
          "Developed web applications and automation tools for clients using Next.js, Python, and modern AI frameworks.",
          "Created data visualization dashboards for analytical reporting on socioeconomic trends.",
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
        description: <>First-year Law student, focusing on the intersection of jurisprudence and technology.</>,
      },
      {
        name: "Self-directed AI & CS Education",
        description: <>Deep study of artificial intelligence, machine learning, and computer science fundamentals.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "AI & Machine Learning",
        description: (
          <>Building intelligent systems with Python, TensorFlow, and modern LLM frameworks.</>
        ),
        tags: [
          {
            name: "Python",
          },
          {
            name: "AI/ML",
          },
        ],
        images: [],
      },
      {
        title: "Next.js & Full-Stack Development",
        description: (
          <>Creating modern web applications with Next.js, TypeScript, and Firebase.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
        ],
        images: [],
      },
      {
        title: "Legal Research & Analysis",
        description: (
          <>Independent analytical writing on law, politics, economics, and their intersection with technology.</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about Law, AI & Society...",
  description: `Read what ${person.name} has been analyzing recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects and analyses by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Professional Gallery – ${person.name}`,
  description: `A capability-first visual dossier by ${person.name}`,
  headline: "Documented trajectory in law and legal technology",
  intro:
    "A curated visual dossier of legal education, analytical work, certifications, and professional development milestones.",
  assets: [
    {
      id: "degree-llb",
      src: "/images/gallery/professional/certificate-tsul.svg",
      alt: "TSUL degree certificate placeholder",
      title: "Degree: Bachelor of Laws (LL.B.)",
      description: "Tashkent State University of Law, Graduating 2029",
      date: "2025 - 2029",
      category: "certificate",
      ratio: "landscape",
      featured: true,
    },
    {
      id: "certificate-aiml",
      src: "/images/gallery/professional/certificate-ai-ml.svg",
      alt: "AI and machine learning certificate placeholder",
      title: "Certificate: Applied AI and ML Foundations",
      description: "Professional coursework in machine learning, automation, and legal analytics",
      date: "Issued 2025",
      category: "certificate",
      ratio: "landscape",
    },
    {
      id: "portrait-main",
      src: "/images/gallery/professional/portrait-formal.svg",
      alt: "Formal professional portrait placeholder",
      title: "Professional Portrait",
      description: "Official portrait for legal-tech speaking profiles and conference bios",
      date: "Updated 2026",
      category: "portrait",
      ratio: "portrait",
    },
    {
      id: "courthouse-study",
      src: "/images/gallery/professional/courthouse-exterior.svg",
      alt: "Courthouse exterior placeholder",
      title: "Courthouse Study Visit",
      description: "Field observation of judicial institutions and legal process environments",
      date: "Spring 2026",
      category: "legal-work",
      ratio: "landscape",
    },
    {
      id: "negotiation-simulation",
      src: "/images/gallery/professional/negotiation-room.svg",
      alt: "Negotiation room placeholder",
      title: "Negotiation and Mediation Simulation",
      description: "Practical legal communication and argument-structuring exercises",
      date: "2026",
      category: "legal-work",
      ratio: "landscape",
    },
    {
      id: "office-research",
      src: "/images/gallery/professional/office-research.svg",
      alt: "Legal office research placeholder",
      title: "Legal Research Workspace",
      description: "Case analysis, policy review, and drafting practice in professional settings",
      date: "Ongoing",
      category: "legal-work",
      ratio: "landscape",
    },
    {
      id: "event-legaltech",
      src: "/images/gallery/professional/legal-tech-event.svg",
      alt: "Legal-tech event placeholder",
      title: "Legal-Tech Conference Session",
      description: "Participation in discussions on AI compliance, governance, and digital law",
      date: "Conference 2026",
      category: "legal-tech-event",
      ratio: "landscape",
      featured: true,
    },
    {
      id: "event-hackathon",
      src: "/images/gallery/professional/legal-hackathon.svg",
      alt: "Legal hackathon placeholder",
      title: "Legal AI Product Sprint",
      description: "Collaborative ideation and prototype testing for legal workflow automation",
      date: "Hackathon 2026",
      category: "legal-tech-event",
      ratio: "landscape",
    },
    {
      id: "award-academic",
      src: "/images/gallery/professional/award-academic.svg",
      alt: "Academic award placeholder",
      title: "Academic Recognition Award",
      description: "Merit-based achievement for analytical excellence and disciplined study",
      date: "Awarded 2026",
      category: "award",
      ratio: "portrait",
    },
    {
      id: "portrait-speaking",
      src: "/images/gallery/professional/portrait-speaking.svg",
      alt: "Public speaking portrait placeholder",
      title: "Public Speaking and Presentation",
      description: "Panel and workshop communication for law, AI, and social impact topics",
      date: "2026",
      category: "portrait",
      ratio: "portrait",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
