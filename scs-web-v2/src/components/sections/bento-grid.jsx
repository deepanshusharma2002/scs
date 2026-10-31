import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { ForecastChart } from "@/components/mocks/forecast-chart";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/ui/chip";
import { stageFilters, stagesFor } from "@/content/journey";
import { solutions } from "@/content/sitemap";
import { cn } from "@/lib/utils";

const stageLabel = Object.fromEntries(stageFilters.map((stage) => [stage.id, stage.label]));

const layout = {
  "demand-planning": { span: "lg:col-span-2 lg:row-span-2", variant: "chart" },
  "s-and-op": { span: "lg:col-span-2" },
  "control-tower-and-digital-orchestration": { span: "lg:col-span-2", variant: "dark" },
};

const order = [
  "demand-planning",
  "supply-planning",
  "production-planning-and-detailed-scheduling",
  "material-requirement-planning",
  "s-and-oe",
  "s-and-op",
  "control-tower-and-digital-orchestration",
  "enterprise-data-management",
  "digital-twin",
  "scenario-simulation",
  "logistics-planning-and-orchestration",
];

export function BentoGrid() {
  const nodes = order
    .map((slug) => solutions.children.find((node) => node.slug === slug))
    .filter(Boolean);

  return (
    <div className="grid auto-rows-[minmax(13rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {nodes.map((node, index) => {
        const { span, variant } = layout[node.slug] ?? {};
        const dark = variant === "dark";
        const stage = stagesFor(node.slug)[0];
        return (
          <Reveal key={node.slug} delay={(index % 4) * 0.05} className={cn(span)}>
            <Link
              href={`${solutions.basePath}/${node.slug}`}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5",
                dark
                  ? "border-navy-900 bg-navy-950 text-white hover:shadow-float"
                  : "border-navy-900/10 bg-white hover:border-azure-500/40 hover:shadow-float",
              )}
            >
              {dark && <div className="absolute inset-0 bg-deep" aria-hidden />}
              {dark && <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden />}
              <div className="relative flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-lg border transition-colors",
                    dark
                      ? "border-white/15 bg-white/10 text-cyan-300"
                      : "border-navy-900/8 bg-paper text-navy-700 group-hover:border-azure-500/30 group-hover:bg-azure-50 group-hover:text-azure-600",
                  )}
                >
                  <Icon name={node.icon} className="size-5" />
                </span>
                {stage && (
                  <Chip tone={dark ? "dark" : "navy"}>{stageLabel[stage]}</Chip>
                )}
              </div>
              <h3
                className={cn(
                  "relative mt-5 font-display font-bold text-balance",
                  variant === "chart" ? "text-title" : "text-lg",
                  dark ? "text-white" : "text-navy-950",
                )}
              >
                {node.title}
              </h3>
              <p className={cn("relative mt-2 text-sm leading-relaxed", dark ? "text-white/65" : "text-navy-600")}>
                {node.summary}
              </p>
              {variant === "chart" && (
                <div className="relative mt-6 rounded-lg border border-navy-900/8 bg-paper p-3">
                  <ForecastChart />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(node.stats ?? []).map((stat) => (
                      <Chip key={stat.label} tone="azure" className="normal-case">
                        {stat.value} {stat.label.toLowerCase()}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
              <span
                className={cn(
                  "relative mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold",
                  dark ? "text-cyan-300" : "text-azure-600",
                )}
              >
                Explore
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
