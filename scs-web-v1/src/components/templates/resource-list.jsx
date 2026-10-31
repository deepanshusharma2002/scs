"use client";

import { useMemo, useState } from "react";
import { InlineAd } from "@/components/ads/inline-ad";
import { ResourceCards } from "@/components/sections/resource-cards";
import { cn } from "@/lib/utils";

export function ResourceList({ items }) {
  const [tag, setTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(items.flatMap((item) => item.tags))).sort()],
    [items],
  );
  const filtered = tag === "All" ? items : items.filter((item) => item.tags.includes(tag));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {tags.map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setTag(entry)}
            aria-pressed={tag === entry}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tag === entry
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
            )}
          >
            {entry}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <>
          <ResourceCards items={filtered.slice(0, 3)} />
          <InlineAd variant="demo" className="my-10" />
          {filtered.length > 3 && <ResourceCards items={filtered.slice(3)} />}
        </>
      ) : (
        <p className="text-ink-500">No resources match this topic yet.</p>
      )}
    </div>
  );
}
