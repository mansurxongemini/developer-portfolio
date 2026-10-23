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
    <aside
      aria-label="Case File Navigation"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 md:flex"
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`group relative flex h-7 w-7 items-center justify-center rounded-[3px] border font-mono text-[10px] font-semibold transition-all duration-200 ${
              isActive
                ? "border-[#ff5100] bg-[#ff5100] text-white shadow-[0_0_14px_rgba(255,81,0,0.45)]"
                : "border-[#d9d2c0]/60 bg-[#fbf9f4]/90 text-[#57534e] hover:border-[#ff5100] hover:text-[#ff5100]"
            }`}
            title={sec.labels[locale]}
          >
            <span>{sec.num}</span>

            {/* Hover Tooltip on Left */}
            <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-[2px] border border-[#ff5100]/40 bg-[#131108] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#f2eee3] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
              № {sec.num} · {sec.labels[locale]}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
