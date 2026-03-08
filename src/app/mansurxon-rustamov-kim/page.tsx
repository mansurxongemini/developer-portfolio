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
        text: "Mansurxon Rustamov - Law Student, AI Developer va Independent Analyst. U huquq, sun'iy intellekt va texnologik tahlil yo'nalishida ishlaydi.",
      },
    },
    {
      "@type": "Question",
      name: "Mansurxon Rustamovning loyihalari qayerda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Loyihalar rasmiy ravishda /work sahifasida berilgan. Eng asosiy yo'nalishlar: Alloma AI va Tahlil.",
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
    <section style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <Script id="who-is-faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <header style={{ marginBottom: "1.5rem" }}>
        <p style={{ opacity: 0.75, margin: 0 }}>Official Profile</p>
        <h1 style={{ margin: "0.5rem 0 0" }}>{pageTitle}</h1>
        <p style={{ marginTop: "0.75rem", lineHeight: 1.6 }}>{pageDescription}</p>
      </header>

      <article style={{ display: "grid", gap: "1.25rem" }}>
        <section>
          <h2>Qisqacha ma'lumot</h2>
          <p>
            Mansurxon Rustamov - huquq sohasida ta'lim olayotgan, bir vaqtning o'zida AI
            va analitik yo'nalishda amaliy loyihalar yuritayotgan mutaxassis.
          </p>
        </section>

        <section>
          <h2>Asosiy yo'nalishlar</h2>
          <ul>
            <li>Huquq va texnologiya kesishmasi</li>
            <li>AI mahsulotlari va tahliliy workflow</li>
            <li>Next.js va Python asosidagi amaliy loyihalar</li>
            <li>Kiberxavfsizlik va mnemonika bo'yicha izlanishlar</li>
          </ul>
        </section>

        <section>
          <h2>Muhim havolalar</h2>
          <ul>
            <li><a href="/about">About / Biografiya</a></li>
            <li><a href="/work">Loyihalar</a></li>
            <li><a href="/gallery">Rasmlar</a></li>
            <li><a href="/blog">Maqolalar</a></li>
          </ul>
        </section>
      </article>
    </section>
  );
}
