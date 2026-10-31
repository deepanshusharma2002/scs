"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Icon } from "@/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const DURATION = 6;
const ease = [0.22, 1, 0.36, 1];
const bars = [38, 52, 46, 64, 58, 76, 70, 88];

export function RoleTabs({ roles }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(roles[0].id);
  const [hovered, setHovered] = useState(false);
  const running = inView && !hovered && !reduce;
  const index = roles.findIndex((role) => role.id === active);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Tabs value={active} onValueChange={setActive}>
        <TabsList
          className="mx-auto w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full border border-ink-900/10 bg-ink-50 p-1.5 [scrollbar-width:none]"
          aria-label="Roles"
        >
          {roles.map((role) => {
            const selected = role.id === active;
            return (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className={cn(
                  "relative shrink-0 overflow-hidden px-5 py-3 transition-colors duration-300",
                  selected ? "text-white" : "text-ink-600 hover:text-ink-950",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-full bg-ink-950"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name={role.icon} className="size-4" />
                  {role.label}
                </span>
                {selected && !reduce && (
                  <span
                    key={`${role.id}-${index}`}
                    className="absolute inset-x-5 bottom-1 z-10 h-0.5 origin-left rounded-full bg-brand-400"
                    style={{
                      animation: `grow ${DURATION}s linear forwards`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={() => setActive(roles[(index + 1) % roles.length].id)}
                    aria-hidden
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {roles.map((role) => (
          <TabsContent key={role.id} value={role.id} className="mt-10">
            <RolePanel role={role} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function RolePanel({ role }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white p-8 md:p-12 lg:col-span-7">
        <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(70%_70%_at_100%_0%,black,transparent)]" aria-hidden />
        <div className="relative">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="h-px w-6 bg-current" aria-hidden />
            {role.label}
          </motion.p>
          <motion.h3
            className="mt-4 text-title font-bold text-ink-950"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            {role.headline}
          </motion.h3>
          <motion.p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease }}
          >
            {role.description}
          </motion.p>
          <ul className="mt-8 space-y-3">
            {role.points.map((point, position) => (
              <motion.li
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-ink-50 px-4 py-3.5 text-sm font-medium text-ink-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + position * 0.12, ease }}
              >
                <motion.span
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.35 + position * 0.12 }}
                >
                  <Check className="size-3.5" aria-hidden />
                </motion.span>
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ember p-8 text-white md:p-10 lg:col-span-5">
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
        <div className="flex items-center gap-6">
          <div className="relative size-28 shrink-0">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="6" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#ff9f75"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.78 }}
                transition={{ duration: 1.4, ease }}
              />
            </svg>
            <motion.span
              className="absolute inset-0 grid place-items-center"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                <Icon name={role.icon} className="size-7 text-white" />
              </span>
            </motion.span>
          </div>
          <div>
            <CountUp value={role.metric.value} className="block text-5xl font-bold tracking-tighter" />
            <p className="mt-2 text-sm text-white/70">{role.metric.label}</p>
          </div>
        </div>

        <div className="mt-10 flex h-36 items-end gap-2" aria-hidden>
          {bars.map((height, position) => (
            <motion.span
              key={position}
              className={cn(
                "flex-1 origin-bottom rounded-t-lg",
                position === bars.length - 1 ? "bg-brand-300" : "bg-white/15",
              )}
              style={{ height: `${height}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.2 + position * 0.06, ease }}
            />
          ))}
        </div>
        <p className="mt-4 flex items-center justify-between text-xs text-white/50">
          <span>Before 3SC</span>
          <span className="font-semibold text-brand-200">With 3SC</span>
        </p>
      </div>
    </div>
  );
}
