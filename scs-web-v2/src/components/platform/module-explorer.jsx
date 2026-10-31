"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/** Module list on the left; the selected module's story, sub-modules and product view on the right. */
export function ModuleExplorer({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];
  if (!active) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="module-panel"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "flex min-w-[14rem] shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all lg:min-w-0",
                selected
                  ? "border-azure-500/40 bg-white shadow-card"
                  : "border-transparent hover:border-navy-900/10 hover:bg-white/60",
              )}
            >
              <span className={cn("font-mono text-xs", selected ? "text-azure-600" : "text-navy-400")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg",
                  selected ? "bg-azure-600 text-white" : "bg-white text-navy-600 ring-1 ring-navy-900/8",
                )}
              >
                <Icon name={item.icon} className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[0.9375rem] font-bold text-navy-950">{item.label}</span>
                {item.modules.length > 0 && (
                  <span className="block text-xs text-navy-500">{item.modules.length} modules</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="module-panel"
        role="tabpanel"
        key={active.id}
        className="grid animate-slide-up gap-8 rounded-2xl border border-navy-900/10 bg-white p-6 md:p-8 lg:col-span-8 xl:grid-cols-2"
      >
        <div>
          <h3 className="text-title font-bold text-navy-950">{active.title}</h3>
          <p className="mt-3 leading-relaxed text-navy-600">{active.description}</p>
          {active.modules.length > 0 && (
            <ul className="mt-6 space-y-1.5">
              {active.modules.map((module) => (
                <li key={module.href}>
                  <Link
                    href={module.href}
                    className="group flex items-center gap-3 rounded-lg border border-navy-900/8 px-3 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:border-azure-500/40 hover:bg-azure-50 hover:text-azure-700"
                  >
                    <Icon name={module.icon} className="size-4 shrink-0 text-navy-400 group-hover:text-azure-600" />
                    {module.title}
                    <ArrowUpRight className="ml-auto size-4 opacity-40 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={active.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 hover:text-azure-800"
          >
            Explore {active.label} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="self-center">{active.visual}</div>
      </div>
    </div>
  );
}
