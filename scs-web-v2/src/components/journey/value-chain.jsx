import Link from "next/link";
import { ArrowUpRight, Bot } from "lucide-react";
import { Icon } from "@/components/icon";
import { JourneyScroller } from "@/components/journey/journey-scroller";
import { Mock } from "@/components/mocks/mini-mocks";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { stages } from "@/content/journey";

export function ValueChain({ index = "02" }) {
  return (
    <JourneyScroller
      stages={stages.map(({ id, label, icon }) => ({ id, label, icon }))}
      heading={
        <SectionHeading
          index={index}
          kicker="The journey"
          title="One connected flow, from *plan to proof of delivery*"
          description="Follow a single decision through your value chain. Every stage shares the same data, models and agents, so nothing is lost in the hand-off."
          className="max-w-2xl"
        />
      }
    >
      {stages.map((stage, position) => (
        <article
          key={stage.id}
          id={`stage-${stage.id}`}
          className="grid scroll-mt-24 gap-8 rounded-2xl border border-navy-900/10 bg-paper p-6 md:p-10 lg:w-[min(80vw,66rem)] lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-navy-400">0{position + 1} / 05</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1 text-sm font-semibold text-white">
                <Icon name={stage.icon} className="size-4" />
                {stage.label}
              </span>
            </div>
            <h3 className="mt-6 text-title font-bold text-balance text-navy-950 md:text-[2rem] md:leading-tight">
              {stage.title}
            </h3>
            <p className="mt-4 leading-relaxed text-navy-600">{stage.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-4xl font-extrabold tracking-tight text-accent">{stage.metric.value}</p>
                <p className="text-sm text-navy-600">{stage.metric.label}</p>
              </div>
              <Chip tone="azure" className="normal-case">
                <Bot className="size-3" aria-hidden /> {stage.agent}
              </Chip>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {stage.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-2 rounded-lg border border-navy-900/10 bg-white px-3 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:border-azure-500/40 hover:text-azure-700"
                  >
                    {item.title}
                    <ArrowUpRight className="size-3.5 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <Mock kind={stage.mock} />
          </div>
        </article>
      ))}
    </JourneyScroller>
  );
}
