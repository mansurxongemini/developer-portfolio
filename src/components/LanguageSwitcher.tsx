"use client";

import { Row, ToggleButton } from "@once-ui-system/core";
import { useI18n, locales, localeNames, type Locale } from "./I18nProvider";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <Row gap="2" vertical="center">
      {locales.map((loc) => (
        <ToggleButton
          key={loc}
          label={loc.toUpperCase()}
          selected={locale === loc}
          onClick={() => setLocale(loc as Locale)}
          size="s"
        />
      ))}
    </Row>
  );
};
