"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { challenges } from "@/content/challenges";
import { stageFilters } from "@/content/journey";
import { cn } from "@/lib/utils";

const stageLabel = Object.fromEntries(stageFilters.map((stage) => [stage.id, stage.label]));

export function ChallengePicker() {
  const [activeId, setActiveId] = useState(challenges[0].id);
  const active = challenges.find((challenge) => challenge.id === activeId);

  const onKeyDown = (event) => {
    const index = challenges.findIndex((challenge) => challenge.id === activeId);
    const next = { ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const target = challenges[(next + challenges.length) % challenges.length];
    setActiveId(target.id);
    document.getElementById(`challenge-${target.id}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div
        role="tablist"
        aria-label="Supply chain challenges"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex snap-x gap-2 overflow-x-auto pb-2 scrollbar-none lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {challenges.map((challenge, index) => {
          const selected = challenge.id === activeId;
          return (
            <button
              key={challenge.id}
              id={`challenge-${challenge.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="challenge-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(challenge.id)}
              className={cn(
                "group flex min-w-[16rem] shrink-0 snap-start cursor-pointer items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all lg:min-w-0",
                selected
                  ? "border-navy-900 bg-navy-900 text-white shadow-float"
                  : "border-navy-900/10 bg-white text-navy-800 hover:border-navy-900/25",
              )}
            >
              <span className={cn("font-mono text-xs", selected ? "text-cyan-300" : "text-navy-400")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg",
                  selected ? "bg-white/10 text-cyan-300" : "bg-navy-50 text-navy-600 group-hover:text-azure-600",
                )}
              >
                <Icon name={challenge.icon} className="size-4.5" />
              </span>
              <span className="font-display text-[0.9375rem] font-bold">{challenge.problem}</span>
              <ArrowRight
                className={cn(
                  "ml-auto hidden size-4 shrink-0 transition-all lg:block",
                  selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div
        id="challenge-panel"
        role="tabpanel"
        aria-labelledby={`challenge-${active.id}`}
        key={active.id}
        className="relative animate-slide-up overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card md:p-10 lg:col-span-7"
      >
        <div className="absolute inset-0 -z-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_100%_0%,black,transparent)]" aria-hidden />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="azure">Stage · {stageLabel[active.stage]}</Chip>
          </div>
          <div className="mt-6 flex gap-3">
            <Quote className="size-6 shrink-0 text-navy-200" aria-hidden />
            <p className="text-lg leading-relaxed text-navy-700">
              <span className="font-semibold text-navy-900">Sound familiar? </span>
              {active.symptom}
            </p>
          </div>

          <div className="mt-8 grid gap-6 border-t border-navy-900/8 pt-8 md:grid-cols-2">
            <div>
              <p className="kicker">How 3SC fixes it</p>
              <p className="mt-3 text-navy-700">{active.fix}</p>
            </div>
            <div className="rounded-xl bg-paper p-5">
              <p className="font-display text-5xl font-extrabold tracking-tight text-accent">{active.outcome.value}</p>
              <p className="mt-1 text-sm text-navy-600">{active.outcome.label}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="kicker text-navy-500">Start with</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {active.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-center justify-between gap-2 rounded-lg border border-navy-900/10 px-3.5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-azure-500/40 hover:bg-azure-50 hover:text-azure-700"
                  >
                    {item.title}
                    <ArrowUpRight className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ButtonLink href={active.links[0].href} variant="navy" className="mt-8">
            Explore {active.links[0].title} <ArrowRight />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
