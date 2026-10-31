import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/visuals/spotlight-card";

export function CaseStudyCards({ items }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item.label} delay={index * 0.1}>
          <SpotlightCard href="/resources/case-studies" className="flex h-full flex-col p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700">
                {item.industry}
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-ink-900/10 text-ink-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <CountUp
              value={item.metric}
              className="mt-12 block text-7xl font-bold tracking-tighter text-gradient"
            />
            <p className="mt-2 text-lg font-semibold text-ink-950">{item.label}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{item.summary}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </ul>
  );
}
