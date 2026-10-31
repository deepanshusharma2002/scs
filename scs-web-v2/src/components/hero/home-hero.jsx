import { ArrowDown, ArrowRight } from "lucide-react";
import { ControlTowerMock } from "@/components/hero/control-tower-mock";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { LiveDot } from "@/components/ui/chip";
import { clients, outcomeStats } from "@/content/home";
import { siteConfig } from "@/content/site";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div
        className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(80%_70%_at_70%_30%,black,transparent)]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-sky" aria-hidden />

      <div className="container-x grid items-center gap-14 pt-10 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-navy-900/10 bg-white/80 py-1.5 pr-4 pl-3 text-xs font-medium text-navy-700 shadow-card backdrop-blur">
              <LiveDot /> AI-powered supply chain intelligence, since 2012
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-hero font-extrabold text-balance text-navy-950">
              From forecast to final delivery, every decision{" "}
              <span className="text-accent">connected.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-navy-600">
              3SC unifies AI planning, agentic AI and intelligent execution on one platform, so the
              plan you sign off on Monday still holds on Friday.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.demoHref} size="lg">
              Book a 30-min diagnostic <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#challenges" variant="outline" size="lg">
              Find your starting point <ArrowDown />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="font-mono text-[0.6875rem] tracking-wider text-navy-500 uppercase">
              Trusted by 75+ enterprise brands
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {clients.map((client) => (
                <li key={client} className="font-display text-lg font-extrabold tracking-tight text-navy-900/45">
                  {client}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 xl:col-span-7 xl:pl-6">
          <ControlTowerMock />
        </div>
      </div>

      <div className="border-t border-navy-900/8 bg-white/70 backdrop-blur">
        <dl className="container-x grid grid-cols-2 divide-navy-900/8 lg:grid-cols-4 lg:divide-x">
          {outcomeStats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col-reverse px-1 py-6 lg:px-8 lg:first:pl-0">
              <dt className="mt-1 text-sm text-navy-600">{stat.label}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-navy-950">
                <span className="mr-2 font-mono text-xs font-medium text-azure-600">0{index + 1}</span>
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
