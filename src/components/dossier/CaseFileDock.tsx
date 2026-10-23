"use client";

import { useI18n } from "@/components/I18nProvider";

interface TabItem {
  id: string;
  num: string;
  labels: Record<"uz" | "en" | "ru", string>;
}

const tabs: TabItem[] = [
  { id: "about", num: "01", labels: { uz: "Men haqimda", en: "About", ru: "Обо мне" } },
  { id: "capabilities", num: "02", labels: { uz: "Yo'nalishlar", en: "Focus", ru: "Направления" } },
  { id: "work", num: "03", labels: { uz: "Loyihalar", en: "Projects", ru: "Проекты" } },
  { id: "timeline", num: "04", labels: { uz: "Yo'l", en: "Path", ru: "Путь" } },
  { id: "briefs", num: "05", labels: { uz: "Maqolalar", en: "Articles", ru: "Статьи" } },
  { id: "contact", num: "06", labels: { uz: "Aloqa", en: "Contact", ru: "Контакты" } },
];

const navLabels = { uz: "Bo'limlar", en: "Sections", ru: "Разделы" } as const;

export function CaseFileDock() {
  const { locale } = useI18n();

  return (
    <nav className="tabs" aria-label={navLabels[locale]} data-tabs>
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className="tabs__tab"
          data-tab={tab.id}
          aria-label={`${tab.num} ${tab.labels[locale]}`}
        >
          <span className="tabs__num font-mono text-[10px]">{tab.num}</span>
          <span className="tabs__label font-mono" data-n={`${tab.num} `}>
            {tab.labels[locale]}
          </span>
        </a>
      ))}
    </nav>
  );
}
