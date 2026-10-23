"use client";

import { MotionEngine } from "@/components/dossier/MotionEngine";
import { DossierCursor } from "@/components/dossier/DossierCursor";
import { DossierHeader } from "@/components/dossier/DossierHeader";
import { DossierMenu } from "@/components/dossier/DossierMenu";
import { CaseFileDock } from "@/components/dossier/CaseFileDock";
import { DossierHero } from "@/components/dossier/DossierHero";
import { DossierAbout } from "@/components/dossier/DossierAbout";
import { DossierCapabilities } from "@/components/dossier/DossierCapabilities";
import { DossierWork } from "@/components/dossier/DossierWork";
import { DossierTimeline } from "@/components/dossier/DossierTimeline";
import { DossierBriefs } from "@/components/dossier/DossierBriefs";
import { DossierContact } from "@/components/dossier/DossierContact";

export function HomeContent() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#0b0a06]">
      {/* 00: Scroll motion engine (Lenis, GSAP ScrollTrigger, Scatter, Torch, etc.) */}
      <MotionEngine />

      {/* 00: Custom Magnetic & Blend Mode Cursor */}
      <DossierCursor />

      {/* 00: Top Dossier Header with Live Tashkent Clock & Brand */}
      <DossierHeader />

      {/* 00: Fullscreen Dossier Sheet Menu */}
      <DossierMenu />

      {/* Floating Right-Edge Case File Index Dock with ScrollSpy */}
      <CaseFileDock />

      {/* 01: Hero / Initiation */}
      <DossierHero />

      {/* 02: About / The Dossier */}
      <DossierAbout />

      {/* 03: Capabilities / Methods */}
      <DossierCapabilities />

      {/* 04: Work / The Evidence */}
      <DossierWork />

      {/* 05: Timeline / The Record */}
      <DossierTimeline />

      {/* 06: Briefs / The Analyses */}
      <DossierBriefs />

      {/* 07: Contact / Direct Dialogue */}
      <DossierContact />
    </div>
  );
}
