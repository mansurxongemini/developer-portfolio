"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PublicHeadingReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    const headings = Array.from(document.querySelectorAll<HTMLElement>("h1, h2"));
    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    for (const heading of headings) {
      heading.classList.add("public-heading-reveal");
      if (heading.getBoundingClientRect().top <= window.innerHeight * 0.85) {
        heading.classList.add("is-visible");
      } else {
        observer.observe(heading);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
