"use client";

import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { estimateRoi, formatMoney, formatRange, roiInputs } from "@/content/roi";
import { siteConfig } from "@/content/site";

const formatHours = (hours) =>
  hours >= 1000 ? `${(hours / 1000).toFixed(hours >= 10000 ? 0 : 1)}K hrs` : `${Math.round(hours)} hrs`;

export function RoiEstimator() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(roiInputs.map((input) => [input.id, input.defaultValue])),
  );
  const result = estimateRoi(values);

  const rows = [
    { label: "Working capital released (one-off)", value: formatRange(result.workingCapital, formatMoney) },
    { label: "Inventory carrying-cost savings / yr", value: formatRange(result.carrying, formatMoney) },
    { label: "Freight savings / yr", value: formatRange(result.freightSaving, formatMoney) },
    { label: "Planner time freed / yr", value: formatRange(result.hours, formatHours) },
  ];

  return (
    <div className="grid overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card lg:grid-cols-12">
      <div className="p-6 md:p-10 lg:col-span-6">
        <p className="kicker text-navy-500">Your numbers</p>
        <div className="mt-6 space-y-8">
          {roiInputs.map((input) => {
            const value = values[input.id];
            const percent = ((value - input.min) / (input.max - input.min)) * 100;
            return (
              <div key={input.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`roi-${input.id}`} className="text-sm font-medium text-navy-800">
                    {input.label}
                  </label>
                  <output htmlFor={`roi-${input.id}`} className="font-mono text-lg font-medium text-navy-950">
                    {input.prefix}
                    {value.toLocaleString("en-US")}
                    {input.suffix}
                  </output>
                </div>
                <input
                  id={`roi-${input.id}`}
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={value}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [input.id]: Number(event.target.value) }))
                  }
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-azure-600 [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-azure-600 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-azure-600 [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgb(31_82_224/0.4),0_4px_10px_rgb(11_21_48/0.25)]"
                  style={{
                    background: `linear-gradient(to right, var(--color-azure-600) ${percent}%, var(--color-navy-100) ${percent}%)`,
                  }}
                />
                <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-navy-400">
                  <span>
                    {input.prefix}
                    {input.min}
                    {input.suffix}
                  </span>
                  <span>
                    {input.prefix}
                    {input.max.toLocaleString("en-US")}
                    {input.suffix}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 flex gap-2 text-xs leading-relaxed text-navy-500">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          Indicative only. Ranges apply 3SC&apos;s published customer outcomes (10-15% less inventory,
          20% carrying cost, 8-15% lower freight, 20-35% planner productivity). Not a quote.
        </p>
      </div>

      <div className="relative isolate bg-navy-950 p-6 text-white md:p-10 lg:col-span-6" aria-live="polite">
        <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />
        <p className="kicker text-cyan-300">Estimated annual value</p>
        <p className="mt-4 font-display text-[clamp(2.25rem,1.5rem+2.5vw,3.5rem)] leading-none font-extrabold tracking-tight text-accent-light">
          {formatRange(result.annual, formatMoney)}
        </p>
        <p className="mt-2 text-sm text-white/60">Recurring savings per year, before productivity gains</p>
        <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3.5">
              <dt className="text-sm text-white/70">{row.label}</dt>
              <dd className="font-mono text-sm font-medium whitespace-nowrap text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href={siteConfig.demoHref} variant="light" className="mt-8">
          Get your detailed assessment <ArrowRight />
        </ButtonLink>
      </div>
    </div>
  );
}
