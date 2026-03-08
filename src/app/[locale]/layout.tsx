const supportedLocales = ["uz", "en", "ru"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

/** Validate the locale param — pass children through or 404 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  return <>{children}</>;
}

/** Pre-generate locale paths */
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}
