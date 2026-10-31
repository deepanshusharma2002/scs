export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page" className="bg-paper">
      <div className="container-x grid gap-10 py-20 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="h-3 w-40 animate-pulse rounded bg-navy-100" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-navy-100" />
          <div className="h-12 w-3/4 animate-pulse rounded-lg bg-navy-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-navy-100" />
          <div className="flex gap-3 pt-4">
            <div className="h-11 w-36 animate-pulse rounded-lg bg-navy-100" />
            <div className="h-11 w-36 animate-pulse rounded-lg bg-navy-100" />
          </div>
        </div>
        <div className="h-80 animate-pulse rounded-xl bg-navy-100" />
      </div>
    </div>
  );
}
