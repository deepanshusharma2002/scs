"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { stackLayers } from "@/content/stack";
import { cn } from "@/lib/utils";

/** Layered architecture: hover, focus or tap a layer to see what it does and where it links. */
export function StackDiagram() {
  const [activeId, setActiveId] = useState("intelligence");
  const active = stackLayers.find((layer) => layer.id === activeId);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
      <div className="relative lg:col-span-7">
        <div className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/60 to-cyan-300/0" aria-hidden />
        <ul className="relative space-y-2.5" aria-label="3SC platform layers">
          {stackLayers.map((layer, index) => {
            const selected = layer.id === activeId;
            return (
              <li key={layer.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() => setActiveId(layer.id)}
                  onFocus={() => setActiveId(layer.id)}
                  onClick={() => setActiveId(layer.id)}
                  className={cn(
                    "group relative flex w-full cursor-pointer items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-300 md:px-5",
                    selected
                      ? "border-cyan-300/50 bg-white/10 shadow-[0_0_0_1px_rgb(103_232_249/0.2),0_20px_40px_-20px_rgb(34_211_238/0.4)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-8 shrink-0 place-items-center rounded-lg border transition-colors",
                      selected ? "border-cyan-300 bg-cyan-300 text-navy-950" : "border-white/15 bg-navy-900 text-white/70",
                    )}
                  >
                    <Icon name={layer.icon} className="size-4" />
                  </span>
                  <span className="w-24 shrink-0 font-mono text-[0.6875rem] tracking-wider text-white/55 uppercase">
                    L{stackLayers.length - index} · {layer.label}
                  </span>
                  <span className={cn("font-display text-base font-bold md:text-lg", selected ? "text-white" : "text-white/80")}>
                    {layer.title}
                  </span>
                  <span className="ml-auto hidden flex-wrap justify-end gap-1.5 xl:flex">
                    {layer.modules.slice(0, 3).map((module) => (
                      <span
                        key={module.href}
                        className={cn(
                          "rounded-md border px-2 py-0.5 text-[0.6875rem] transition-colors",
                          selected ? "border-white/20 text-white/80" : "border-white/10 text-white/55",
                        )}
                      >
                        {module.title}
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex items-center gap-2 pl-1 font-mono text-[0.6875rem] tracking-wider text-white/55 uppercase">
          <span className="inline-block h-px w-6 bg-cyan-300/60" aria-hidden />
          Signals flow up, decisions flow down
        </p>
      </div>

      <div
        key={active.id}
        className="animate-slide-up rounded-2xl border border-white/10 bg-white p-6 text-navy-900 md:p-8 lg:col-span-5"
        aria-live="polite"
      >
        <p className="kicker">
          <span className="text-navy-400">Layer {stackLayers.length - stackLayers.indexOf(active)} /</span>
          {active.label}
        </p>
        <h3 className="mt-3 text-title font-bold text-navy-950">{active.title}</h3>
        <p className="mt-3 leading-relaxed text-navy-600">{active.summary}</p>
        <div className="mt-6 rounded-xl bg-paper p-4">
          <p className="font-display text-3xl font-extrabold tracking-tight text-accent">{active.stat.value}</p>
          <p className="text-sm text-navy-600">{active.stat.label}</p>
        </div>
        <ul className="mt-6 space-y-1.5">
          {active.modules.map((module) => (
            <li key={module.href}>
              <Link
                href={module.href}
                className="group flex items-center justify-between rounded-lg border border-navy-900/8 px-3.5 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:border-azure-500/40 hover:bg-azure-50 hover:text-azure-700"
              >
                {module.title}
                <ArrowUpRight className="size-4 opacity-50 group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={active.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 hover:text-azure-800"
        >
          Explore {active.title} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
