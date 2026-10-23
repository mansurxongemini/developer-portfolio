import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import classNames from "classnames";
import Script from "next/script";

import { Providers, RouteGuard } from "@/components";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { SiteShell } from "@/components/SiteShell";
import { baseURL, dataStyle, fonts, home, style } from "@/resources";
import { Column, Flex, Meta } from "@once-ui-system/core";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseURL}#person`,
  name: "Mansurxon Rustamov",
  jobTitle: "Law Student at TSUL, Full-Stack and AI Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tashkent State University of Law (TSUL)",
  },
  knowsAbout: ["Law", "Legal technology", "Artificial Intelligence", "Next.js", "React", "Python", "Django"],
  url: baseURL,
  image: `${baseURL}/images/avatar.jpg`,
  sameAs: [
    "https://github.com/mansurxongemini",
    "https://www.linkedin.com/in/mansurxon-rustamov/",
    "https://t.me/mansurxonrustamov",
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
    verification: {
      google: "_3QI2AMbeGC9VTJy_GWQxaYgVDi9xJp35_zCAbWzHMc",
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/images/avatar.jpg?v=20261023",
      shortcut: "/images/avatar.jpg?v=20261023",
      apple: "/images/avatar.jpg?v=20261023",
    },
  } as Metadata;
}

export const viewport: Viewport = {
  themeColor: "#f2eee3",
  colorScheme: "light",
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
      data-theme="light"
      data-neutral="sand"
      data-brand="orange"
      data-border="rounded"
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("has-js");`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700,900,301,401,501,701,901&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/avatar.jpg?v=20261023" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/avatar.jpg?v=20261023" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/avatar.jpg?v=20261023" />
        <Script id="person-jsonld" type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script id="dossier-style-defaults" strategy="beforeInteractive">
          {`
              (function() {
                try {
                  const root = document.documentElement;
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
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                } catch (e) {}
              })();
            `}
        </Script>
      </head>
      <Providers>
        <Column
          suppressHydrationWarning
          as="body"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          {/*
            Dossier body theme, applied synchronously before first paint:
            home routes start on ink-deep, every other page on bone paper.
            No localStorage theme toggle on public pages — one theme system.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var p=window.location.pathname;var home=/^\\/(uz|en|ru)?\\/?$/.test(p);document.body.setAttribute('data-theme',home?'ink-deep':'bone');}catch(e){}})();`,
            }}
          />
          <AnalyticsTracker />
          <Flex zIndex={0} fillWidth padding="0" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <SiteShell>
                <RouteGuard>{children}</RouteGuard>
              </SiteShell>
            </Flex>
          </Flex>
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
