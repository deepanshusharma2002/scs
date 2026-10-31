"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, CircleCheck, Factory, TriangleAlert, Truck, Users } from "lucide-react";
import { decisionCard } from "@/content/home";
import { cn } from "@/lib/utils";

const nodeIcons = [Truck, Factory, Users];

const STAGES = 4;

export function HeroDecisionCard() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? STAGES - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setStage((current) => (current + 1) % (STAGES + 1)), 1800);
    return () => clearInterval(timer);
  }, [reduce]);
  const shown = Math.min(stage, STAGES - 1);

  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-brand-500/30 via-transparent to-ink-400/20 blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand-500" />
            </span>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
              {decisionCard.title}
            </p>
          </div>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50">
            Live
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4">
          <TriangleAlert className="size-5 shrink-0 text-brand-400" aria-hidden />
          <p className="text-sm font-medium text-white">{decisionCard.alert}</p>
        </div>

        <ol className="mt-5 grid grid-cols-3 gap-2">
          {decisionCard.chain.map((item, index) => {
            const NodeIcon = nodeIcons[index];
            const active = index < shown;

            return (
              <li
                key={item.label}
                className={cn(
                  "relative rounded-2xl border p-3 text-center transition-all duration-500",
                  active
                    ? "border-brand-500/40 bg-brand-500/10"
                    : "border-white/10 bg-white/[0.03]",
                )}
              >
                <NodeIcon
                  className={cn(
                    "mx-auto size-5 transition-colors duration-500",
                    active ? "text-brand-400" : "text-white/40",
                  )}
                  aria-hidden
                />
                <p className="mt-2 text-xs font-semibold text-white">{item.label}</p>
                <p
                  className={cn(
                    "mt-0.5 text-[11px] transition-colors duration-500",
                    active ? "text-brand-300" : "text-white/40",
                  )}
                >
                  {active ? item.status : "Monitoring"}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 min-h-[11.5rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <AnimatePresence mode="wait">
            {shown >= 3 ? (
              <motion.div
                key="recommendation"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-emerald-300 uppercase">
                  <Bot className="size-4" aria-hidden /> Recommended next step
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white">
                  {decisionCard.recommendation}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {decisionCard.checks.map((check) => (
                    <li key={check} className="flex items-center gap-2 text-xs text-white/70">
                      <CircleCheck className="size-3.5 text-emerald-400" aria-hidden />
                      {check}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="analysing"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[10rem] flex-col justify-center gap-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
                  <Bot className="size-4 animate-pulse" aria-hidden /> Agents analysing impact
                </div>
                {[80, 64, 72].map((width, index) => (
                  <div key={index} className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-brand-500 to-brand-300"
                      initial={{ width: "0%" }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 1.4, delay: index * 0.15 }}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
