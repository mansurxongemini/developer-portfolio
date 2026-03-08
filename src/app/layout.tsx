import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import type { SpacingToken, opacity } from "@once-ui-system/core";
import classNames from "classnames";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Footer, Header, Providers, RouteGuard } from "@/components";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { PublicHeadingReveal } from "@/components/PublicHeadingReveal";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { baseURL, dataStyle, effects, fonts, home, style } from "@/resources";
import { Background, Column, Flex, Meta, RevealFx } from "@once-ui-system/core";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseURL}#person`,
  name: "Mansurxon Rustamov",
  jobTitle: "Law Student, AI Developer & Independent Analyst",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tashkent State University of Law (TSUL)",
  },
  knowsAbout: [
    "Law",
    "Artificial Intelligence",
    "Next.js",
    "Python",
    "Cybersecurity",
    "Mnemonics",
  ],
  url: baseURL,
  image: `${baseURL}/images/avatar.jpg`,
  sameAs: [
    "https://github.com/<your-github-username>",
    "https://www.linkedin.com/in/<your-linkedin-username>/",
    "https://t.me/<tahlil_channel_username>",
  ],
};

export async function generateMetadata() {
  const metadata = await Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Mansurxon Rustamov",
      url: baseURL,
      title: home.title,
      description: home.description,
      images: [
        {
          url: `${baseURL}${home.image}`,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [`${baseURL}${home.image}`],
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/images/avatar.jpg?v=20260308",
      shortcut: "/images/avatar.jpg?v=20260308",
      apple: "/images/avatar.jpg?v=20260308",
    },
  } as Metadata;
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      data-scroll-behavior="smooth"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <link rel="icon" href="/images/avatar.jpg?v=20260308b" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/avatar.jpg?v=20260308b" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/avatar.jpg?v=20260308b" />
        <Script id="person-jsonld" type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Force dark theme
                  root.setAttribute('data-theme', 'dark');
                  localStorage.setItem('data-theme', 'dark');
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `}
        </Script>
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <ScrollProgressBar />
          <PublicHeadingReveal />
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <AnalyticsTracker />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
