"use client";

import { Mailchimp } from "@/components";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { useI18n } from "@/components/I18nProvider";
import { BentoGrid } from "@/components/ui/bento-grid";
import { HeroSection } from "@/components/ui/hero-section";
import { routes } from "@/resources";
import { Column } from "@once-ui-system/core";
import enMessages from "../../messages/en.json";
import ruMessages from "../../messages/ru.json";
import uzMessages from "../../messages/uz.json";

type SkillsLocaleMessages = {
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

const skillsMessagesByLocale: Record<"uz" | "en" | "ru", SkillsLocaleMessages> = {
  uz: uzMessages as SkillsLocaleMessages,
  en: enMessages as SkillsLocaleMessages,
  ru: ruMessages as SkillsLocaleMessages,
};

export function HomeContent() {
  const { locale } = useI18n();
  const skills = skillsMessagesByLocale[locale].projects;

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <HeroSection />
      <FeaturedWorks />
      {routes["/blog"] && (
        <Column fillWidth marginBottom="l">
          <BentoGrid
            copy={{
              badge: skills.badge,
              title: skills.title,
              description: skills.description,
              techLabel: skills.tech_label,
              techTitle: skills.tech_title,
              techDescription: skills.tech_desc,
              softLabel: skills.soft_label,
              softTitle: skills.soft_title,
              softPhilosophy: skills.soft_philosophy,
              softPoint1: skills.soft_point_1,
              softPoint2: skills.soft_point_2,
              softPoint3: skills.soft_point_3,
              legalLabel: skills.legal_label,
              legalTitle: skills.legal_title,
              legalDescription: skills.legal_desc,
              legalPoint1: skills.legal_point_1,
              legalPoint2: skills.legal_point_2,
              legalPoint3: skills.legal_point_3,
              legalPoint4: skills.legal_point_4,
            }}
          />
        </Column>
      )}
      <Mailchimp />
    </Column>
  );
}
