import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import Script from "next/script";

const pagePath = "/mansurxon-rustamov-kim";
const pageTitle = "Mansurxon Rustamov kim?";
const pageDescription =
  "Mansurxon Rustamov haqida rasmiy sahifa: biografiya, loyihalar, yo'nalishlar, rasmlar va kontakt ma'lumotlari.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Mansurxon Rustamov kim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mansurxon Rustamov — Toshkent davlat yuridik universiteti (TDYU) Jinoiy odil sudlov fakulteti talabasi, Full-Stack dasturchi. HuquqPlus volontyori.",
      },
    },
    {
      "@type": "Question",
      name: "Mansurxon Rustamovning loyihalari qayerda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Loyihalar /work sahifasida ko'rsatilgan: Inclusive Legal RAG va boshqalar.",
      },
    },
    {
      "@type": "Question",
      name: "Mansurxon Rustamovning rasmlari qayerda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rasm va media kontent /gallery sahifasida jamlangan.",
      },
    },
  ],
};

export async function generateMetadata() {
  return Meta.generate({
    title: pageTitle,
    description: pageDescription,
    baseURL,
    path: pagePath,
    image: "/images/avatar.jpg",
  });
}

export default function WhoIsMansurxonPage() {
  return (
    <section className="sec whois" data-theme-trigger="bone">
      <Script id="who-is-faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            № 00
          </span>
          <h1 className="sec-head__title">
            <span data-redact>Mansurxon kim?</span>
          </h1>
        </div>
        <p className="sec-head__field"></p>
      </header>

      <p className="manifesto whois__body" data-redact data-redact-mode="scrub">
        Huquq talabasi. Full-Stack va AI dasturchi.
      </p>

      <dl className="field whois__field">
        <div>
          <dt>Ism</dt>
          <dd>Mansurxon Rustamov</dd>
        </div>
        <div>
          <dt>Soha</dt>
          <dd>Huquq · AI · Veb</dd>
        </div>
        <div>
          <dt>O&apos;qish</dt>
          <dd>TDYU · 2025—2029</dd>
        </div>
        <div>
          <dt>Aloqa</dt>
          <dd>
            <a href="/#contact">Aloqa →</a>
          </dd>
        </div>
      </dl>

      <nav className="whois__links" aria-label="Profil havolalari">
        <a href="/about" className="brief-row" data-cursor="Ochish">
          <span className="brief-row__index font-mono">01</span>
          <span className="brief-row__title font-display">Men haqimda</span>
          <span className="brief-row__arrow" aria-hidden="true">→</span>
        </a>
        <a href="/work" className="brief-row" data-cursor="Ochish">
          <span className="brief-row__index font-mono">02</span>
          <span className="brief-row__title font-display">Loyihalar</span>
          <span className="brief-row__arrow" aria-hidden="true">→</span>
        </a>
        <a href="/blog" className="brief-row" data-cursor="Ochish">
          <span className="brief-row__index font-mono">03</span>
          <span className="brief-row__title font-display">Maqolalar</span>
          <span className="brief-row__arrow" aria-hidden="true">→</span>
        </a>
      </nav>
    </section>
  );
}
