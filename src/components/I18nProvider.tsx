"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getContentByLocale, type LocalizedContent } from "@/lib/content-i18n";

export const locales = ["uz", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export const localeNames: Record<Locale, string> = {
  uz: "O'zbek",
  en: "English",
  ru: "Русский",
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: LocalizedContent;
};

const I18nContext = createContext<I18nContextType | null>(null);

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = getCookie("locale") as Locale | undefined;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
    }
    setReady(true);
    // Update html lang attribute
    const loc = saved && locales.includes(saved) ? saved : defaultLocale;
    document.documentElement.setAttribute("lang", loc);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie("locale", newLocale);
    document.documentElement.setAttribute("lang", newLocale);
  }, []);

  const content = useMemo(() => getContentByLocale(locale), [locale]);

  if (!ready) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, content }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    const fallback = getContentByLocale(defaultLocale);
    return {
      locale: defaultLocale as Locale,
      setLocale: (() => {}) as (locale: Locale) => void,
      content: fallback,
    };
  }
  return context;
}
