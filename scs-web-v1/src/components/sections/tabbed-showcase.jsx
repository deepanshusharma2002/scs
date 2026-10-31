"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function TabbedShowcase({ items, tone = "light" }) {
  const reduce = useReducedMotion();
  if (!items.length) return null;

  return (
    <Tabs defaultValue={items[0].id}>
      <TabsList
        className={cn(
          "w-fit max-w-full overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]",
          tone === "light" ? "bg-ink-50" : "bg-white/5",
          "flex-nowrap",
        )}
        aria-label="Showcase"
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className={cn(
              "shrink-0",
              tone === "light"
                ? "text-ink-600 hover:text-ink-900 data-[state=active]:bg-white data-[state=active]:text-ink-900 data-[state=active]:shadow-sm"
                : "text-white/60 hover:text-white data-[state=active]:bg-brand-500 data-[state=active]:text-white",
            )}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id} className="mt-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <h3
                className={cn(
                  "text-title font-semibold",
                  tone === "light" ? "text-ink-900" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-4 leading-relaxed",
                  tone === "light" ? "text-ink-600/80" : "text-white/65",
                )}
              >
                {item.description}
              </p>
              <ul className="mt-6 space-y-2">
                {item.modules.map((module) => (
                  <li key={module.href}>
                    <Link
                      href={module.href}
                      className={cn(
                        "group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                        tone === "light"
                          ? "border-ink-900/10 text-ink-800 hover:border-brand-500/40 hover:text-brand-600"
                          : "border-white/10 text-white/85 hover:border-brand-500/60 hover:text-white",
                      )}
                    >
                      {module.title}
                      <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600"
              >
                Explore {item.label} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <ModuleVisual item={item} />
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

const bars = [42, 58, 50, 66, 61, 74, 70, 86, 80, 92];

function ModuleVisual({ item }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ember p-6 shadow-2xl md:p-8">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="absolute -top-20 -right-20 size-72 rounded-full bg-brand-500/30 blur-[90px]"
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-500 text-white">
            <Icon name={item.icon} className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{item.label}</p>
            <p className="text-xs text-white/50">{item.modules.length} connected modules</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" /> In sync
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {item.modules.slice(0, 6).map((module, index) => (
            <div
              key={module.href}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <Icon name={module.icon ?? item.icon} className="size-4 text-brand-400" />
              <p className="mt-3 line-clamp-2 text-xs font-semibold text-white">{module.title}</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-brand-500 to-brand-300"
                  style={{ width: `${60 + ((index * 13) % 35)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Plan vs. actual</span>
            <span className="font-semibold text-emerald-300">+18% accuracy</span>
          </div>
          <div className="mt-4 flex h-24 items-end gap-1.5" aria-hidden>
            {bars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col justify-end gap-1">
                <div
                  className="rounded-t bg-linear-to-t from-brand-600 to-brand-400"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
