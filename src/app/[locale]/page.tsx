import { BentoGrid } from "@/components/ui/bento-grid";
import { HeroSection } from "@/components/ui/hero-section";
import { Timeline } from "@/components/ui/timeline";

const supportedLocales = ["uz", "en", "ru"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

type Messages = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
  };
  timeline: {
    badge: string;
    title: string;
    description: string;
    student_period: string;
    student_title: string;
    student_desc: string;
    founder_period: string;
    founder_title: string;
    founder_desc: string;
    focus_period: string;
    focus_title: string;
    focus_desc: string;
  };
  projects: {
    badge: string;
    title: string;
    description: string;
    tech_label: string;
    tech_title: string;
    tech_desc: string;
    soft_label: string;
    soft_title: string;
    soft_philosophy: string;
    soft_point_1: string;
    soft_point_2: string;
    soft_point_3: string;
    legal_label: string;
    legal_title: string;
    legal_desc: string;
    legal_point_1: string;
    legal_point_2: string;
    legal_point_3: string;
    legal_point_4: string;
  };
};

async function getMessages(locale: string): Promise<Messages> {
  if (locale === "uz") {
    return (await import("../../../messages/uz.json")).default as Messages;
  }
  if (locale === "ru") {
    return (await import("../../../messages/ru.json")).default as Messages;
  }
  return (await import("../../../messages/en.json")).default as Messages;
}

export default async function LocalizedLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale: SupportedLocale = isSupportedLocale(locale) ? locale : "en";
  const messages = await getMessages(normalizedLocale);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06090f] text-white">
      <HeroSection
        copy={{
          badge: messages.hero.badge,
          title: messages.hero.title,
          subtitle: messages.hero.subtitle,
          description: messages.hero.description,
          ctaPrimary: messages.hero.cta_primary,
          ctaSecondary: messages.hero.cta_secondary,
        }}
      />
      <Timeline
        copy={{
          badge: messages.timeline.badge,
          title: messages.timeline.title,
          description: messages.timeline.description,
          studentPeriod: messages.timeline.student_period,
          studentTitle: messages.timeline.student_title,
          studentDescription: messages.timeline.student_desc,
          founderPeriod: messages.timeline.founder_period,
          founderTitle: messages.timeline.founder_title,
          founderDescription: messages.timeline.founder_desc,
          focusPeriod: messages.timeline.focus_period,
          focusTitle: messages.timeline.focus_title,
          focusDescription: messages.timeline.focus_desc,
        }}
      />
      <BentoGrid
        copy={{
          badge: messages.projects.badge,
          title: messages.projects.title,
          description: messages.projects.description,
          techLabel: messages.projects.tech_label,
          techTitle: messages.projects.tech_title,
          techDescription: messages.projects.tech_desc,
          softLabel: messages.projects.soft_label,
          softTitle: messages.projects.soft_title,
          softPhilosophy: messages.projects.soft_philosophy,
          softPoint1: messages.projects.soft_point_1,
          softPoint2: messages.projects.soft_point_2,
          softPoint3: messages.projects.soft_point_3,
          legalLabel: messages.projects.legal_label,
          legalTitle: messages.projects.legal_title,
          legalDescription: messages.projects.legal_desc,
          legalPoint1: messages.projects.legal_point_1,
          legalPoint2: messages.projects.legal_point_2,
          legalPoint3: messages.projects.legal_point_3,
          legalPoint4: messages.projects.legal_point_4,
        }}
      />
    </main>
  );
}
