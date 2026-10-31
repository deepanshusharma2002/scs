"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircleCheck,
  Compass,
  ShieldAlert,
  Sparkles,
  Telescope,
  Truck,
} from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const DURATION = 7;

export function PlatformExplorer({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const running = inView && !hovered && !reduce;
  const current = items[active];

  return (
    <div
      ref={ref}
      className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="lg:col-span-5" role="tablist" aria-label="Platforms" aria-orientation="vertical">
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <div key={item.id} className="border-t border-ink-900/10 last:border-b">
              <button
                type="button"
                role="tab"
                id={`platform-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="platform-panel"
                onClick={() => setActive(index)}
                className="group flex w-full cursor-pointer items-start gap-5 py-7 text-left"
              >
                <span
                  className={cn(
                    "font-serif text-3xl leading-none italic transition-colors duration-500",
                    selected ? "text-brand-500" : "text-ink-300 group-hover:text-ink-500",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "text-3xl font-bold tracking-tight transition-colors duration-500 md:text-4xl",
                        selected ? "text-ink-950" : "text-ink-400 group-hover:text-ink-700",
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        selected
                          ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                          : "border-ink-900/10 text-ink-400",
                      )}
                      aria-hidden
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">{item.title.split(":")[1]?.trim()}</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 pl-14">
                      <p className="leading-relaxed text-ink-600">{item.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.modules.map((module) => (
                          <li key={module.href}>
                            <Link
                              href={module.href}
                              className="inline-flex rounded-full border border-ink-900/10 bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-brand-500/40 hover:bg-brand-50 hover:text-brand-700"
                            >
                              {module.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={item.href}
                        className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600"
                      >
                        Explore {item.label}
                        <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {selected && !reduce && (
                <span className="-mt-px block h-0.5 bg-ink-900/5" aria-hidden>
                  <span
                    key={`${item.id}-${active}`}
                    className="block h-full origin-left bg-brand-500"
                    style={{
                      animation: `grow ${DURATION}s linear forwards`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={() => setActive((value) => (value + 1) % items.length)}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-28">
          <div
            id="platform-panel"
            role="tabpanel"
            aria-labelledby={`platform-tab-${current.id}`}
            className="relative isolate overflow-hidden rounded-[2rem] bg-ink-950 p-3 shadow-[0_50px_100px_-40px_rgb(233_79_28/0.55)]"
          >
            <div className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-brand-500/35 blur-[90px]" aria-hidden />
            <div className="absolute -bottom-32 -left-20 -z-10 size-72 rounded-full bg-brand-700/30 blur-[90px]" aria-hidden />
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="ml-3 flex-1 truncate rounded-full bg-white/5 px-4 py-1 text-center text-xs text-white/45">
                app.3scsolution.com/{current.id}
              </span>
            </div>
            <div className="relative min-h-[27rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.id === "scai" && <ScaiMock />}
                  {current.id === "agentic" && <AgenticMock />}
                  {current.id === "itms" && <ItmsMock />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockHeader({ icon, title, meta }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-white">
          <Icon name={icon} className="size-4" />
        </span>
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <div className="flex gap-2">
        {meta.map((chip) => (
          <span key={chip} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/55">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

const actual = "M0 120 C 30 110, 50 130, 80 105 S 130 80, 160 95 S 210 70, 240 78";
const forecast = "M240 78 C 270 70, 290 52, 320 58 S 370 40, 400 30";
const band = "M240 70 C 270 58, 290 38, 320 42 S 370 22, 400 10 L 400 52 C 370 60, 340 74, 320 76 S 270 86, 240 86 Z";

function ScaiMock() {
  return (
    <div>
      <MockHeader icon="lineChart" title="Demand forecast · Beverages, GCC" meta={["Weekly", "Ensemble ML"]} />
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-4 text-[11px] text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-white/50" /> Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-brand-400" /> AI forecast
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-brand-500/25" /> Confidence
          </span>
        </div>
        <svg viewBox="0 0 400 150" className="mt-3 h-44 w-full" aria-hidden>
          {[30, 60, 90, 120].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />
          ))}
          <line x1="240" x2="240" y1="0" y2="150" stroke="rgb(255 255 255 / 0.15)" strokeDasharray="3 4" />
          <motion.path
            d={band}
            fill="rgb(233 79 28 / 0.18)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />
          <motion.path
            d={actual}
            fill="none"
            stroke="rgb(255 255 255 / 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d={forecast}
            fill="none"
            stroke="#ff6b35"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
          />
          <motion.circle
            cx="400"
            cy="30"
            r="5"
            fill="#ff6b35"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ delay: 2.1, duration: 0.5 }}
          />
          <text x="246" y="146" className="fill-white/40 text-[9px]">
            Today
          </text>
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { value: "92.4%", label: "Forecast accuracy" },
          { value: "12%", label: "Less inventory", prefix: "−" },
          { value: "98.1%", label: "Service level" },
        ].map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.12 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <p className="text-2xl font-bold tracking-tight text-white">
              {kpi.prefix}
              <CountUp value={kpi.value} />
            </p>
            <p className="mt-1 text-[11px] text-white/50">{kpi.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const agentFeed = [
  { agent: "Demand Scout", icon: Telescope, text: "Demand spike detected for SKU-2291 in the Gulf region: +34% vs plan.", time: "09:41" },
  { agent: "Supply Sentinel", icon: ShieldAlert, text: "Supplier lead time risk rising for 2 inbound POs. Delay probability 72%.", time: "09:42" },
  { agent: "Mitigation Planner", icon: Compass, text: "3 options simulated. Best: reallocate 1,200 units from DC Pune and expedite PO-8812.", time: "09:42" },
];

function AgenticMock() {
  return (
    <div>
      <MockHeader icon="bot" title="Agent workspace · Planning agents" meta={["Live", "Human in the loop"]} />
      <ul className="mt-6 space-y-3">
        {agentFeed.map((message, index) => (
          <motion.li
            key={message.agent}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + index * 0.75, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300">
              <message.icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-semibold text-white">
                {message.agent}
                <span className="font-normal text-white/35">{message.time}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">{message.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 text-brand-300" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-white">Recommended action ready</p>
            <p className="text-xs text-white/60">Service 98% protected · cost-to-serve −4%</p>
          </div>
        </div>
        <span className="relative inline-flex">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/50" />
          <span className="relative rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white">
            Approve
          </span>
        </span>
      </motion.div>
      <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
        <Bot className="size-3.5" aria-hidden />
        Gauri is typing
        <span className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-1 animate-bounce rounded-full bg-white/50" style={{ animationDelay: `${dot * 150}ms` }} />
          ))}
        </span>
      </div>
    </div>
  );
}

const routes = [
  "M40 150 Q 100 80 180 92",
  "M180 92 Q 260 30 335 42",
  "M180 92 Q 270 110 340 150",
  "M180 92 Q 210 160 255 172",
];

const shipments = [
  { id: "SHP-48211", lane: "Pune → Dubai", eta: "On time", tone: "bg-emerald-400/15 text-emerald-300" },
  { id: "SHP-48219", lane: "Chennai → Riyadh", eta: "+2h risk", tone: "bg-amber-400/15 text-amber-300" },
  { id: "SHP-48226", lane: "Mumbai → Doha", eta: "Delivered", tone: "bg-white/10 text-white/70" },
];

function ItmsMock() {
  return (
    <div>
      <MockHeader icon="truck" title="Live shipments · Middle East lanes" meta={["126 active", "ETA AI"]} />
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <svg viewBox="0 0 400 200" className="h-48 w-full" aria-hidden>
          <defs>
            <pattern id="itms-dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgb(255 255 255 / 0.08)" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#itms-dots)" />
          {routes.map((d, index) => (
            <g key={d}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgb(255 107 53 / 0.55)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.2, duration: 0.9 }}
              />
              <circle
                r="4"
                fill="#ff6b35"
                style={{ offsetPath: `path("${d}")`, animation: `travel 3.4s ${0.8 + index * 0.5}s ease-in-out infinite` }}
              />
            </g>
          ))}
          {[
            [40, 150, "Plant"],
            [180, 92, "DC"],
            [335, 42, "Dubai"],
            [340, 150, "Riyadh"],
            [255, 172, "Doha"],
          ].map(([x, y, label]) => (
            <g key={label}>
              <circle cx={x} cy={y} r="9" fill="rgb(233 79 28 / 0.2)" className="animate-pulse" />
              <circle cx={x} cy={y} r="4" fill="#fff" />
              <text x={x} y={y - 13} textAnchor="middle" className="fill-white/70 text-[10px] font-semibold">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <ul className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/[0.03]">
        {shipments.map((shipment, index) => (
          <motion.li
            key={shipment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.15 }}
            className="flex items-center gap-3 px-4 py-3 text-sm"
          >
            <Truck className="size-4 text-brand-300" aria-hidden />
            <span className="font-mono text-xs text-white/50">{shipment.id}</span>
            <span className="flex-1 truncate text-white/85">{shipment.lane}</span>
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", shipment.tone)}>
              {shipment.eta === "Delivered" ? (
                <span className="inline-flex items-center gap-1">
                  <CircleCheck className="size-3" aria-hidden /> Delivered
                </span>
              ) : (
                shipment.eta
              )}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
