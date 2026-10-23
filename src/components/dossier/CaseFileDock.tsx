"use client";

import { useI18n } from "@/components/I18nProvider";

interface TabItem {
  id: string;
  num: string;
  labels: Record<"uz" | "en" | "ru", string>;
}

const tabs: TabItem[] = [
  { id: "about", num: "01", labels: { uz: "Dosye", en: "About", ru: "Досье" } },
  { id: "capabilities", num: "02", labels: { uz: "Usullar", en: "Capabilities", ru: "Методы" } },
  { id: "work", num: "03", labels: { uz: "Dalillar", en: "Evidence", ru: "Улики" } },
  { id: "timeline", num: "04", labels: { uz: "Yozuv", en: "Record", ru: "Запись" } },
  { id: "briefs", num: "05", labels: { uz: "Xulosalar", en: "Briefs", ru: "Выводы" } },
  { id: "contact", num: "06", labels: { uz: "Murojaat", en: "Vault", ru: "Связь" } },
];

export function CaseFileDock() {
  const { locale } = useI18n();

  return (
    <nav className="tabs" aria-label="Case file index" data-tabs>
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
