export default function BlogListLoading() {
  const skeletonIds = ["card-1", "card-2", "card-3", "card-4", "card-5", "card-6"] as const;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-3 h-10 w-64 animate-pulse rounded bg-white/10" />
        <div className="mx-auto h-5 w-80 animate-pulse rounded bg-white/5" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonIds.map((id) => (
          <div
            key={id}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
          >
            <div className="mb-4 aspect-video w-full animate-pulse rounded-xl bg-white/10" />
            <div className="mb-3 h-5 w-24 animate-pulse rounded bg-cyan-400/15" />
            <div className="mb-2 h-6 w-4/5 animate-pulse rounded bg-white/10" />
            <div className="mb-1 h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
