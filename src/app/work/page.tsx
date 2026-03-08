import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { WorkContent } from "@/components/WorkContent";
import { Projects } from "@/components/work/Projects";
import Script from "next/script";

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Alloma AI",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      creator: {
        "@type": "Person",
        name: "Mansurxon Rustamov",
        url: `${baseURL}/about`,
      },
      url: `${baseURL}/work`,
      description:
        "Alloma AI is a personalized AI mentor project focused on education, legal reasoning support, and practical learning workflows.",
    },
    {
      "@type": "CreativeWork",
      name: "Tahlil",
      creator: {
        "@type": "Person",
        name: "Mansurxon Rustamov",
        url: `${baseURL}/about`,
      },
      url: "https://t.me/tahlil",
      inLanguage: ["uz", "en", "ru"],
      description:
        "Tahlil is an analytical content initiative focused on law, policy, economics, and social impact.",
    },
  ],
};

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <>
      <Script id="work-projects-jsonld" type="application/ld+json">
        {JSON.stringify(projectsJsonLd)}
      </Script>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <WorkContent projects={<Projects />} />
    </>
  );
}
