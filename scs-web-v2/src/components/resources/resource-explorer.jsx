"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Icon } from "@/components/icon";
import { ResourceCard } from "@/components/sections/resource-card";
import { resources, resourceTypes } from "@/content/resources";
import { cn } from "@/lib/utils";

/** Library view: filter by format and topic, or search across everything. */
export function ResourceExplorer() {
  const [type, setType] = useState("all");
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => [...resources].sort((a, b) => b.date.localeCompare(a.date)), []);
  const tags = useMemo(() => {
    const counts = new Map();
    for (const item of resources) for (const value of item.tags) counts.set(value, (counts.get(value) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([value]) => value);
  }, []);

  const terms = query.toLowerCase().trim();
  const visible = sorted.filter(
    (item) =>
      (type === "all" || item.type === type) &&
      (!tag || item.tags.includes(tag)) &&
      (!terms || `${item.title} ${item.excerpt} ${item.tags.join(" ")}`.toLowerCase().includes(terms)),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 scrollbar-none" role="group" aria-label="Filter by format">
          {[{ slug: "all", title: "All", icon: "layers" }, ...resourceTypes].map((entry) => (
            <button
              key={entry.slug}
              type="button"
              aria-pressed={type === entry.slug}
              onClick={() => setType(entry.slug)}
              className={cn(
                "inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg border px-3.5 text-sm font-medium transition-colors",
                type === entry.slug
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/25",
              )}
            >
              <Icon name={entry.icon} className="size-4" />
              {entry.title}
            </button>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded-lg border border-navy-900/10 bg-white px-3 focus-within:border-azure-500 lg:w-72">
          <Search className="size-4 text-navy-400" aria-hidden />
          <span className="sr-only">Search resources</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search resources"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-navy-400"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
        <span className="kicker mr-1 text-navy-400">Topics</span>
        {tags.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={tag === value}
            onClick={() => setTag(tag === value ? null : value)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              tag === value
                ? "border-azure-600 bg-azure-600 text-white"
                : "border-navy-900/10 bg-white text-navy-600 hover:border-azure-500/40",
            )}
          >
            {value}
            {tag === value && <X className="size-3" aria-hidden />}
          </button>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-navy-500" aria-live="polite">
        {visible.length} {visible.length === 1 ? "resource" : "resources"}
      </p>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={`${item.type}-${item.slug}`} className="animate-rise">
            <ResourceCard item={item} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-navy-900/15 p-10 text-center text-navy-500">
          Nothing matches those filters yet.
        </p>
      )}
    </div>
  );
}
