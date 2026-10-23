"use client";

const year = new Date().getFullYear();

export function DossierFooter() {
  return (
    <footer className="site-foot" data-footer>
      <p className="font-mono">
        © <span data-year>{year}</span> Mansurxon Rustamov
      </p>
      <a
        href="#top"
        className="site-foot__top font-mono"
        data-to-top
        aria-label="Back to top"
      >
        Yuqoriga ↑
      </a>
    </footer>
  );
}
