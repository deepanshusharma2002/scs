export function PageSkeleton() {
  return (
    <section className="relative overflow-hidden border-b border-ink-900/5 bg-white" aria-busy="true">
      <div className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <div className="h-4 w-48 animate-pulse rounded-full bg-ink-100" />
          <div className="h-3 w-32 animate-pulse rounded-full bg-brand-100" />
          <div className="h-14 w-full max-w-xl animate-pulse rounded-2xl bg-ink-100" />
          <div className="h-14 w-2/3 animate-pulse rounded-2xl bg-ink-100" />
          <div className="h-5 w-full max-w-lg animate-pulse rounded-full bg-ink-50" />
          <div className="flex gap-3 pt-4">
            <div className="h-13 w-44 animate-pulse rounded-full bg-brand-100" />
            <div className="h-13 w-40 animate-pulse rounded-full bg-ink-100" />
          </div>
        </div>
        <div className="hidden aspect-square animate-pulse rounded-[2rem] bg-ink-50 lg:col-span-5 lg:block" />
      </div>
    </section>
  );
}
