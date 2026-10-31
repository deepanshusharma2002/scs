"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { Icon } from "@/components/icon";
import { challenges } from "@/content/challenges";
import { buildSearchIndex, searchEntries } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const quickLinks = [
  { title: "SCAI platform", href: "/platforms/scai", group: "Popular", icon: "brain" },
  { title: "Agentic AI", href: "/platforms/outcome-as-a-service/agentic-ai", group: "Popular", icon: "bot" },
  { title: "iTMS", href: "/platforms/outcome-as-a-service/itms", group: "Popular", icon: "truck" },
  { title: "4PL services", href: "/supply-chain-execution-services/4pl", group: "Popular", icon: "handshake" },
  { title: "Book a demo", href: "/contact-us#form", group: "Popular", icon: "rocket" },
  ...challenges.map((challenge) => ({
    title: challenge.problem,
    href: challenge.links[0].href,
    group: "Start with a problem",
    icon: challenge.icon,
  })),
];

export function CommandSearch({ open, onOpenChange }) {
  const router = useRouter();
  const index = useMemo(() => buildSearchIndex(), []);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = query.trim() ? searchEntries(index, query) : quickLinks;

  const go = (entry) => {
    onOpenChange(false);
    setQuery("");
    router.push(entry.href);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex]);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) setQuery("");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] animate-fade-in bg-navy-950/40 backdrop-blur-sm" />
        <Dialog.Content
          data-lenis-prevent
          onKeyDown={onKeyDown}
          className="fixed top-[10vh] left-1/2 z-[61] flex max-h-[75vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 animate-panel-in flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-float"
        >
          <Dialog.Title className="sr-only">Search 3SC</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search solutions, platforms, services, industries and resources.
          </Dialog.Description>
          <div className="flex items-center gap-3 border-b border-navy-900/8 px-5">
            <Search className="size-5 shrink-0 text-navy-400" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search solutions, platforms, agents, resources…"
              className="h-16 flex-1 bg-transparent text-base text-navy-900 outline-none placeholder:text-navy-400"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-results"
              aria-activedescendant={results[activeIndex] ? `cmd-${activeIndex}` : undefined}
            />
            <Dialog.Close
              className="grid size-8 cursor-pointer place-items-center rounded-md text-navy-400 hover:bg-navy-50 hover:text-navy-700"
              aria-label="Close search"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

          <ul id="command-results" role="listbox" className="flex-1 overflow-y-auto p-2">
            {results.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-navy-500">
                No results for &ldquo;{query}&rdquo;. Try &ldquo;forecast&rdquo;, &ldquo;freight&rdquo; or
                &ldquo;agent&rdquo;.
              </li>
            )}
            {results.map((entry, position) => {
              const showGroup = entry.group !== results[position - 1]?.group;
              const active = position === activeIndex;
              return (
                <li key={`${entry.href}-${position}`} role="presentation">
                  {showGroup && (
                    <p className="kicker px-3 pt-3 pb-1.5 text-navy-400">{entry.group}</p>
                  )}
                  <button
                    id={`cmd-${position}`}
                    role="option"
                    aria-selected={active}
                    type="button"
                    onMouseMove={() => setActiveIndex(position)}
                    onClick={() => go(entry)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                      active ? "bg-azure-50" : "hover:bg-navy-50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-md border",
                        active
                          ? "border-azure-500/30 bg-white text-azure-600"
                          : "border-navy-900/8 text-navy-500",
                      )}
                    >
                      <Icon name={entry.icon} className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-900">{entry.title}</span>
                      {(entry.context || entry.summary) && (
                        <span className="block truncate text-xs text-navy-500">
                          {entry.context ? `${entry.context} · ` : ""}
                          {entry.summary}
                        </span>
                      )}
                    </span>
                    {active ? (
                      <CornerDownLeft className="size-4 shrink-0 text-azure-600" aria-hidden />
                    ) : (
                      <ArrowRight className="size-4 shrink-0 text-navy-300" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 border-t border-navy-900/8 bg-navy-50/60 px-5 py-2.5 font-mono text-[0.6875rem] text-navy-500">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>esc close</span>
            <span className="ml-auto">{index.length} pages indexed</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
