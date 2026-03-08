type GalleryHeaderProps = {
  title: string;
  description: string;
  headline?: string;
  intro?: string;
};

export default function GalleryHeader({ title, description, headline, intro }: GalleryHeaderProps) {
  return (
    <header className="space-y-6 border-b border-white/[0.06] pb-10">
      <div className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 backdrop-blur-sm">
        Professional Dossier
      </div>
      <div className="space-y-3">
        <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          {headline ?? title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-white/45">{intro ?? description}</p>
      </div>
    </header>
  );
}
