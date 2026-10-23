# ✨ Mansur Rustamov — Official Developer Portfolio & Research Showcase

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Bridging Jurisprudence, Artificial Intelligence, and Society"**  
> Interactive personal developer portfolio, engineering showcase, and research CV for **Mansur Rustamov** (Law Student at Tashkent State University of Law & AI/Software Engineer).

Built using **Next.js 14**, **TypeScript**, **Once UI**, and tailored to the warm cream editorial aesthetic of **James Clear's Atoms** (`#FAF8F5`).

---

## 🎯 Codebase Purpose & Vision

The core purpose of this codebase is to serve as the authentic, authoritative digital presence for Mansur Rustamov's interdisciplinary work combining statutory jurisprudence with cutting-edge artificial intelligence systems:

1. **Interdisciplinary Authority**: Establishing the bridge between legal analysis (statutory interpretation, human rights treaties) and modern AI architectures (Hybrid RAG, LanceDB, Multi-Agent Deliberation).
2. **Tri-lingual Publication Engine**: Native support for **Uzbek (`uz`)**, **English (`en`)**, and **Russian (`ru`)** across all interface elements and technical project deep-dives.
3. **High-Performance Resilient Platform**: Zero-downtime static and SSR generation with offline-first local fallbacks for 100% uptime and sub-second page transitions.
4. **Curated Research Catalog**: Direct integration with real open-source GitHub repositories without generic templates or placeholder copy.

---

## 🏛️ Critical Files & Architecture

| Critical Path | Component / Layer | Responsibility |
| :--- | :--- | :--- |
| [`src/lib/projects-data.ts`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/lib/projects-data.ts) | Ground Truth Data Store | Contains verified metadata, tags, and full tri-lingual technical writeups for all 7 flagship projects. |
| [`src/lib/firestore-server.ts`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/lib/firestore-server.ts) | Resilient Data Layer | Provides offline-first fallback to local static data when Firebase credentials are not provisioned. |
| [`src/resources/content.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/resources/content.tsx) | Identity & Profile Config | Sets author metadata, academic affiliation (TSUL), social endpoints, and hero copy. |
| [`src/lib/content-i18n.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/lib/content-i18n.tsx) | Internationalization | Dynamic dictionaries managing real-time language switching across `uz`, `en`, and `ru`. |
| [`src/resources/once-ui.config.ts`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/resources/once-ui.config.ts) | Design Tokens & System | Configures system typography (Geist/Geist Mono), light theme, sand neutral tokens, and route rules. |
| [`src/resources/custom.css`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/resources/custom.css) | Atoms Visual Theme | Implements the warm cream palette (`#FAF8F5`), white cards (`#FFFFFF`), and charcoal typography (`#1C1917`). |
| [`src/components/ui/hero-section.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/components/ui/hero-section.tsx) | Primary Visual Anchor | Dominant top-of-funnel layout establishing TSUL law student & AI developer identity. |
| [`src/components/FeaturedWorks.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/components/FeaturedWorks.tsx) | Featured Showcase | Homepage feature anchoring the dominant flagship: *Inclusive Legal AI & Statutory RAG Platform*. |
| [`src/components/work/ProjectBentoGrid.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/components/work/ProjectBentoGrid.tsx) | Projects Bento Grid | Responsive card grid with interactive preview modals, tech stack badges, and GitHub links. |
| [`src/app/work/[slug]/page.tsx`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/src/app/work/[slug]/page.tsx) | Dynamic Case Studies | Generates full architectural deep-dives for each project in the selected language. |
| [`CODEBASE.md`](file:///home/mansurxon/Desktop/Loyihalar/Portfolio/CODEBASE.md) | Technical Specification | Exhaustive architectural manual, design token catalog, and native data shape blueprint. |

---

## ⚡ Primary Engineering Goals

- **100% Deterministic Builds**: All 57 static routes pre-generated at build time without build failures or hanging network calls.
- **Strict Factual Accuracy**: Nothing invented, nothing placeholder. Every project maps directly to an active GitHub repository.
- **Editorial Visual Calm**: Warm cream tones (`#FAF8F5`) and charcoal typography (`#1C1917`) replacing generic dark neon presets.
- **Zero-Latency Language Switching**: Client-side seamless translation across Uzbek, English, and Russian with instantaneous state updates.

---

## 🚀 Flagship Projects Featured

1. **Inclusive Legal AI & Statutory RAG Platform** — Hybrid RAG engine (LanceDB + SQLite FTS5 + RRF) analyzing disability rights and UN CRPD alignment in Uzbekistan.
2. **Alloma AI Cognitive Engine** — Personalized LLM pedagogical architecture and reasoning mentor for adaptive learning workflows.
3. **Multi-Agent AI Roundtable System** — Deliberation system using LangGraph and multi-agent peer reviews with consensus synthesis.
4. **Huquqplus.uz Legal Portal** — Citizen legal advisory portal with interactive contract generators and rights guides.
5. **Mahalla Management & Civic Automation Suite** — Municipal automation platform for neighborhood registries and social assistance routing.
6. **KitobPlus & Mutolaa Reading Platform** — Digital reading ecosystem with synchronized audio for Uzbek literature.
7. **Uzbekistan Regional Map Puzzle** — Interactive SVG pedagogical canvas teaching regional geography and administration.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/mansurxongemini/developer-portfolio.git
cd developer-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Compile production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License
Distributed under the **MIT License**.