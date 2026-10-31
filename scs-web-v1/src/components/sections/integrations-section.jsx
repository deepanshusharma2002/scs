import { Plug, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { integrations } from "@/content/home";
import { SectionHeading } from "./section-heading";

const points = [
  {
    icon: Plug,
    title: "Pre-built connectors",
    body: "Plug into SAP, Oracle, Microsoft Dynamics and your WMS and TMS without replacing them.",
  },
  {
    icon: Zap,
    title: "Fast time to value",
    body: "Most customers go live with a first module in weeks, not years.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    body: "ISO 27001 and SOC 2 aligned controls with role-based access.",
  },
];

const syncLog = [
  ["SAP S/4HANA", "Sales orders", "2s"],
  ["Oracle EBS", "Inventory positions", "4s"],
  ["WMS", "Stock on hand", "6s"],
  ["Carrier APIs", "Shipment ETAs", "9s"],
  ["Microsoft Dynamics", "Purchase orders", "12s"],
  ["Data lake", "POS signals", "15s"],
];

const outer = integrations.slice(0, 6);
const inner = integrations.slice(6);

function Orbit({ items, radius, duration, reverse, offset = 0 }) {
  const spin = `spin ${duration}s linear infinite${reverse ? " reverse" : ""}`;
  const counter = `spin ${duration}s linear infinite${reverse ? "" : " reverse"}`;
  const nodes = items.map((name, index) => {
    const angle = (index / items.length) * Math.PI * 2 + offset;
    return { name, x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
  });

  return (
    <div
      className="absolute inset-0 group-hover:[animation-play-state:paused] group-hover:[&_*]:[animation-play-state:paused]"
      style={{ animation: spin }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        {nodes.map((node, index) => {
          const d = `M50 50 L${node.x.toFixed(2)} ${node.y.toFixed(2)}`;
          return (
            <g key={node.name}>
              <path d={d} stroke="rgb(233 79 28 / 0.25)" strokeWidth="0.25" strokeDasharray="1 1.2" className="animate-dash" />
              <circle
                r="0.7"
                fill="#e94f1c"
                style={{
                  offsetPath: `path("${d}")`,
                  animation: `travel 2.6s ${index * 0.45}s ease-in infinite reverse`,
                }}
              />
            </g>
          );
        })}
      </svg>
      {nodes.map((node) => (
        <span
          key={node.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            className="block rounded-full border border-ink-900/10 bg-white px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-ink-800 shadow-[0_10px_30px_-12px_rgb(10_10_10/0.35)] transition-colors hover:border-brand-500 hover:text-brand-600"
            style={{ animation: counter }}
          >
            {node.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section className="section-y relative overflow-hidden bg-ink-50">
      <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(50%_60%_at_75%_50%,black,transparent)]" aria-hidden />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Integrations"
            title="Point, click and *connect* to the stack you already run"
            description="One AI layer over your ERP, WMS, TMS and carriers, from forecast to final delivery."
          />
          <ul className="mt-10 space-y-3">
            {points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={0.1 + index * 0.12}>
                <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-ink-900/10 hover:bg-white hover:shadow-[0_20px_40px_-25px_rgb(10_10_10/0.3)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-500 shadow-sm transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-brand-500 group-hover:text-white">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-950">{point.title}</h3>
                    <p className="mt-1 text-sm text-ink-600">{point.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.45}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink-900/5 px-4 py-2.5 text-xs">
                <span className="flex items-center gap-2 font-semibold text-ink-800">
                  <RefreshCw className="size-3.5 animate-spin text-brand-500 [animation-duration:3s]" aria-hidden />
                  Live data sync
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> All systems healthy
                </span>
              </div>
              <div className="relative h-28 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                <ul className="animate-[marquee-y_14s_linear_infinite]" aria-hidden>
                  {[...syncLog, ...syncLog].map(([source, entity, ago], index) => (
                    <li key={index} className="flex items-center gap-3 px-4 py-2 text-xs">
                      <span className="size-1.5 rounded-full bg-brand-500" />
                      <span className="font-semibold text-ink-800">{source}</span>
                      <span className="text-ink-400">→</span>
                      <span className="flex-1 text-ink-600">{entity}</span>
                      <span className="text-ink-400">{ago} ago</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="group relative mx-auto aspect-square w-full max-w-xl" aria-label={`Integrates with ${integrations.join(", ")}`} role="img">
            <div className="absolute inset-[18%] rounded-full bg-glow" aria-hidden />
            <div className="absolute inset-[4%] rounded-full border border-dashed border-ink-900/15" aria-hidden />
            <div className="absolute inset-[24%] rounded-full border border-ink-900/10" aria-hidden />
            <Orbit items={outer} radius={46} duration={70} />
            <Orbit items={inner} radius={26} duration={45} reverse offset={Math.PI / 4} />
            <div className="absolute inset-0 m-auto grid size-28 place-items-center" aria-hidden>
              <span className="absolute inset-0 animate-pulse-ring rounded-3xl bg-brand-500/25" />
              <span className="absolute inset-0 animate-pulse-ring rounded-3xl bg-brand-500/20 [animation-delay:1.2s]" />
              <span className="relative grid size-28 place-items-center rounded-3xl bg-white shadow-[0_25px_60px_-20px_rgb(233_79_28/0.55)] ring-1 ring-ink-900/5">
                <Logo className="h-8" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
