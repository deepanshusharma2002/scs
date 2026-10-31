import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function FeatureGrid({ features, columns = 2 }) {
  return (
    <ul className={cn("grid gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {features.map((feature, index) => (
        <Reveal as="li" key={feature.title} delay={(index % 3) * 0.06} className="bg-white p-6 md:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-azure-50 text-azure-600">
              <Icon name={feature.icon} className="size-5" />
            </span>
            <span className="font-mono text-xs text-navy-400">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">{feature.description}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function ProblemGrid({ problems }) {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {problems.map((problem, index) => (
        <Reveal as="li" key={problem.title} delay={index * 0.08} className="relative rounded-xl border border-navy-900/10 bg-white p-6">
          <span className="absolute top-6 right-6 font-mono text-xs text-signal-600">✕ 0{index + 1}</span>
          <span className="grid size-10 place-items-center rounded-lg bg-signal-50 text-signal-600">
            <Icon name={problem.icon} className="size-5" />
          </span>
          <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{problem.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">{problem.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function OutcomesBand({ stats, index, id = "outcomes", title = "Outcomes customers *measure*" }) {
  return (
    <section id={id} className="relative isolate scroll-mt-28 overflow-hidden bg-navy-950 py-20 text-white md:py-24">
      <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />
      <div className="container-x">
        <SectionHeading index={index} kicker="Outcomes" title={title} tone="dark" />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-navy-950/60 p-8">
              <dt className="mt-2 text-white/65">{stat.label}</dt>
              <dd className="font-display text-5xl font-extrabold tracking-tight text-accent-light">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-mono text-[0.6875rem] text-white/40 uppercase">
          Typical ranges observed across 3SC deployments
        </p>
      </div>
    </section>
  );
}

export function LinkCards({ items, columns = 3 }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", columns === 4 && "lg:grid-cols-4")}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.href} delay={(index % columns) * 0.05}>
          <Link
            href={item.href}
            className="group flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-float"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-10 place-items-center rounded-lg border border-navy-900/8 bg-paper text-navy-700 transition-colors group-hover:border-azure-500/30 group-hover:bg-azure-50 group-hover:text-azure-600">
                <Icon name={item.icon} className="size-5" />
              </span>
              {item.badge && (
                <span className="rounded-md bg-navy-50 px-2 py-0.5 font-mono text-[0.625rem] tracking-wide text-navy-500 uppercase">
                  {item.badge}
                </span>
              )}
            </div>
            {item.context && <p className="mt-5 font-mono text-[0.6875rem] text-navy-400 uppercase">{item.context}</p>}
            <h3 className={cn("font-display text-lg font-bold text-navy-950 group-hover:text-azure-700", item.context ? "mt-1" : "mt-5")}>
              {item.title}
            </h3>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>}
            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-azure-600">
              Explore
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
