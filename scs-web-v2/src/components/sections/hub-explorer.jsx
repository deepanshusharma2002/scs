"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Icon } from "@/components/icon";
import { stageFilters } from "@/content/journey";
import { cn } from "@/lib/utils";

const stageLabel = Object.fromEntries(stageFilters.map((stage) => [stage.id, stage.label]));

/** Filterable module catalogue: narrow by value-chain stage, or type to search. */
export function HubExplorer({ items }) {
  const [stage, setStage] = useState("all");
  const [query, setQuery] = useState("");
  const counts = Object.fromEntries(
    stageFilters.map((filter) => [filter.id, items.filter((item) => item.stages.includes(filter.id)).length]),
  );
  const filters = stageFilters.filter((filter) => counts[filter.id] > 0);
  const terms = query.toLowerCase().trim();
  const visible = items.filter(
    (item) =>
      (stage === "all" || item.stages.includes(stage)) &&
      (!terms || `${item.title} ${item.description} ${item.context ?? ""}`.toLowerCase().includes(terms)),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by value-chain stage">
          <FilterButton active={stage === "all"} onClick={() => setStage("all")} count={items.length}>
            All
          </FilterButton>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              active={stage === filter.id}
              onClick={() => setStage(filter.id)}
              count={counts[filter.id]}
              icon={filter.icon}
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded-lg border border-navy-900/10 bg-white px-3 focus-within:border-azure-500 lg:w-72">
          <Search className="size-4 text-navy-400" aria-hidden />
          <span className="sr-only">Search modules</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search modules"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-navy-400"
          />
        </label>
      </div>

      <p className="mt-6 font-mono text-xs text-navy-500" aria-live="polite">
        Showing {visible.length} of {items.length}
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.href} className="animate-rise">
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-float"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-navy-900/8 bg-paper text-navy-700 transition-colors group-hover:border-azure-500/30 group-hover:bg-azure-50 group-hover:text-azure-600">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span className="flex flex-wrap justify-end gap-1">
                  {item.stages.map((id) => (
                    <span key={id} className="rounded-md bg-navy-50 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wide text-navy-500 uppercase">
                      {stageLabel[id]}
                    </span>
                  ))}
                </span>
              </div>
              {item.context && <p className="mt-5 font-mono text-[0.6875rem] text-navy-400 uppercase">{item.context}</p>}
              <h3 className={cn("font-display text-lg font-bold text-navy-950 group-hover:text-azure-700", item.context ? "mt-1" : "mt-5")}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-azure-600">
                Explore
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-navy-900/15 p-10 text-center text-navy-500">
          No modules match &ldquo;{query}&rdquo;.
        </p>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, count, icon, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-3.5 text-sm font-medium transition-colors",
        active ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/25",
      )}
    >
      {icon && <Icon name={icon} className="size-4" />}
      {children}
      <span className={cn("font-mono text-xs", active ? "text-white/60" : "text-navy-400")}>{count}</span>
    </button>
  );
}
