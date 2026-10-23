"use client";

export function DossierCursor() {
  return (
    <>
      {/* Film grain (static) + paper fibre (fades in on bone theme) */}
      <div className="grain" aria-hidden="true" />
      <div className="fibre" aria-hidden="true" />

      {/* Custom cursor: dot · paper tag · I-beam · crosshair */}
      <div className="cursor" aria-hidden="true">
        <div className="cursor__dot" />
        <div className="cursor__bar" />
        <div className="cursor__cross" />
        <span className="cursor__tag font-mono" />
      </div>
    </>
  );
}
