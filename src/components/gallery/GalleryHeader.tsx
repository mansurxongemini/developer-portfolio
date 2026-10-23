type GalleryHeaderProps = {
  title: string;
  description: string;
  headline?: string;
  intro?: string;
};

export default function GalleryHeader({ title, description, headline, intro }: GalleryHeaderProps) {
  return (
    <header className="space-y-6 border-b border-[#E7E5E4] pb-10">
      <div className="inline-flex items-center rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92400E]">
        Professional Dossier
      </div>
      <div className="space-y-3">
        <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#1C1917] sm:text-4xl">
          {headline ?? title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[#57534E]">{intro ?? description}</p>
      </div>
    </header>
  );
}
