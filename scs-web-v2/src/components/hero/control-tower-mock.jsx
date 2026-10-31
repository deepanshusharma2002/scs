"use client";

import { motion, useReducedMotion } from "motion/react";
import { Bot, CircleAlert, Sparkles } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { ChartLegend, ForecastChart } from "@/components/mocks/forecast-chart";
import { AppWindow } from "@/components/ui/app-window";
import { Chip } from "@/components/ui/chip";

const kpis = [
  { label: "Forecast accuracy", value: "87.4%", delta: "+6.2 pts", good: true },
  { label: "OTIF", value: "96.2%", delta: "+2.1 pts", good: true },
  { label: "Inventory cover", value: "31 d", delta: "−4 d", good: true },
  { label: "Freight / unit", value: "$1.82", delta: "−9%", good: true },
];

const shipments = [
  { id: "SH-20418", lane: "BOM → DEL", status: "On time", tone: "green" },
  { id: "SH-20422", lane: "MAA → BLR", status: "At risk", tone: "amber" },
  { id: "SH-20431", lane: "DXB → RUH", status: "On time", tone: "green" },
  { id: "SH-20437", lane: "PNQ → HYD", status: "Delivered", tone: "azure" },
];

const ease = [0.2, 0.7, 0.2, 1];

export function ControlTowerMock() {
  const reduce = useReducedMotion();
  const enter = (delay, y = 12) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <div className="relative sm:pb-24">
      <motion.div {...enter(0.1, 24)}>
        <AppWindow title="3SC · Control tower" meta="Live · All regions" live bodyClassName="p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                {...enter(0.3 + index * 0.08)}
                className="rounded-lg border border-navy-900/8 bg-white p-2.5"
              >
                <p className="truncate font-mono text-[0.625rem] tracking-wide text-navy-500 uppercase">
                  {kpi.label}
                </p>
                <p className="mt-1 font-display text-lg font-extrabold text-navy-950 sm:text-xl">
                  <CountUp value={kpi.value} />
                </p>
                <p className="font-mono text-[0.625rem] text-emerald-700">{kpi.delta}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-12">
            <motion.div
              {...enter(0.6)}
              className="rounded-lg border border-navy-900/8 bg-white p-3 sm:col-span-7"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-navy-900">Demand · North region</p>
                <ChartLegend className="hidden 2xl:flex" />
              </div>
              <ForecastChart />
            </motion.div>
            <motion.div
              {...enter(0.75)}
              className="rounded-lg border border-navy-900/8 bg-white p-3 sm:col-span-5"
            >
              <p className="text-xs font-semibold text-navy-900">Shipments</p>
              <ul className="mt-2 divide-y divide-navy-900/6">
                {shipments.map((shipment, index) => (
                  <motion.li
                    key={shipment.id}
                    {...enter(0.9 + index * 0.12, 6)}
                    className="flex items-center justify-between gap-2 py-1.5"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.625rem] text-navy-400">{shipment.id}</span>
                      <span className="block truncate text-xs font-medium text-navy-800">{shipment.lane}</span>
                    </span>
                    <Chip tone={shipment.tone}>{shipment.status}</Chip>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </AppWindow>
      </motion.div>

      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 20, scale: 0.96 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: { duration: 0.6, delay: 1.7, ease },
            })}
        className="relative z-10 mx-3 -mt-10 rounded-xl border border-navy-900/10 bg-white p-4 shadow-float sm:absolute sm:right-6 sm:bottom-0 sm:mx-0 sm:mt-0 sm:w-[22rem] xl:-right-4"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-signal-50 text-signal-600">
            <CircleAlert className="size-4" aria-hidden />
          </span>
          <p className="text-xs font-semibold text-navy-900">Supply Sentinel · Resin shortage</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-navy-600">
          Supplier B risks Plant 2 · Line 3 on Thursday. 38 orders affected.
        </p>
        <div className="mt-3 rounded-lg bg-azure-50 p-2.5">
          <p className="flex items-center gap-1 text-[0.6875rem] font-semibold text-azure-700">
            <Sparkles className="size-3" aria-hidden /> Recommended
          </p>
          <p className="mt-0.5 text-xs text-navy-700">Pull forward PO 4471 from Supplier C · 0 orders missed</p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-navy-900 px-2.5 py-1 text-[0.6875rem] font-semibold text-white">Approve</span>
          <span className="rounded-md border border-navy-900/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-navy-700">
            Compare options
          </span>
        </div>
      </motion.div>

      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 2.2, ease },
            })}
        className="absolute -top-5 left-6 hidden items-center gap-2 rounded-full border border-navy-900/10 bg-white py-1.5 pr-3.5 pl-1.5 shadow-card sm:flex"
      >
        <span className="grid size-6 place-items-center rounded-full bg-azure-600 text-white">
          <Bot className="size-3.5" aria-hidden />
        </span>
        <span className="text-xs font-semibold text-navy-800">Gauri: 3 decisions ready</span>
      </motion.div>
    </div>
  );
}
