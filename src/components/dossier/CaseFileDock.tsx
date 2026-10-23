"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

interface SectionNav {
  id: string;
  num: string;
  labels: Record<"uz" | "en" | "ru", string>;
}

const sections: SectionNav[] = [
  { id: "hero", num: "01", labels: { uz: "Boshlang'ich", en: "Identity", ru: "Инициация" } },
  { id: "about", num: "02", labels: { uz: "Dosye", en: "The Dossier", ru: "Досье" } },
  { id: "capabilities", num: "03", labels: { uz: "Usullar", en: "Modus Operandi", ru: "Методы" } },
  { id: "work", num: "04", labels: { uz: "Dalillar", en: "The Evidence", ru: "Улики / Код" } },
  { id: "timeline", num: "05", labels: { uz: "Xronologiya", en: "The Record", ru: "Хронология" } },
  { id: "briefs", num: "06", labels: { uz: "Tahlilnomalar", en: "The Briefs", ru: "Аналитика" } },
  { id: "contact", num: "07", labels: { uz: "Bog'lanish", en: "Subpoena", ru: "Контакты" } },
];

export function CaseFileDock() {
  const { locale } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Case File Navigation"
      className="jopecuro-tabs hidden lg:flex"
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            aria-current={isActive ? "true" : undefined}
            className="jopecuro-tab group"
            title={sec.labels[locale]}
          >
            <span>{sec.num}</span>

            {/* Hover Tooltip on Left */}
            <span className="jopecuro-tab-label border border-white/20 bg-[#0b0a06]/95 px-2.5 py-1 text-white shadow-xl">
              № {sec.num} · {sec.labels[locale]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
