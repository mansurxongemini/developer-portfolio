export default function BlogPostLoading() {
  const lineIds = ["line-1", "line-2", "line-3", "line-4", "line-5", "line-6", "line-7", "line-8"] as const;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-4 h-6 w-24 animate-pulse rounded bg-cyan-400/15" />
      <div className="mb-3 h-12 w-4/5 animate-pulse rounded bg-white/10" />
      <div className="mb-8 h-5 w-2/3 animate-pulse rounded bg-white/10" />

      <div className="mb-10 aspect-video w-full animate-pulse rounded-2xl bg-white/10" />

      <div className="space-y-3">
        {lineIds.map((id) => (
          <div key={id} className="h-5 w-full animate-pulse rounded bg-white/10" />
        ))}
      </div>
    </section>
  );
}
