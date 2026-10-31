import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { StageFlow } from "@/components/journey/stage-flow";
import { StackDiagram } from "@/components/platform/stack-diagram";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { FaqSection } from "@/components/sections/faq-section";
import { OutcomesBand } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { HubExplorer } from "@/components/sections/hub-explorer";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqsFor, themeStats } from "@/content/defaults";
import { stagesFor } from "@/content/journey";

const heroTitles = {
  solutions: "Purpose-built for *every* supply chain decision",
  platforms: "Two platform families. *One* connected brain.",
  "supply-chain-execution-services": "Managed logistics, *run on intelligence*",
};

export function hubMetadata(section) {
  return {
    title: section.title,
    description: section.summary,
    alternates: { canonical: section.basePath },
    openGraph: { title: section.title, description: section.summary, url: section.basePath },
  };
}

function catalogItems(section) {
  const items = [];
  const walk = (node, href, trail) => {
    for (const child of node.children ?? []) {
      const childHref = `${href}/${child.slug}`;
      items.push({
        title: child.title,
        description: child.summary,
        href: childHref,
        icon: child.icon,
        context: trail.join(" › ") || undefined,
        stages: stagesFor(child.slug),
      });
      walk(child, childHref, [...trail, child.menuTitle ?? child.title]);
    }
  };
  walk(section, section.basePath, []);
  return items;
}

export function HubPage({ section }) {
  const items = catalogItems(section);
  const counts = {};
  for (const item of items) for (const stage of item.stages) counts[stage] = (counts[stage] ?? 0) + 1;
  const families = (section.children ?? []).filter((child) => child.children?.length);
  const isPlatforms = section.slug === "platforms";
  const order = [
    families.length > 0 && "families",
    "catalogue",
    isPlatforms && "architecture",
    "how",
    "outcomes",
    "faq",
  ].filter(Boolean);
  const next = (key) => String(order.indexOf(key) + 1).padStart(2, "0");

  return (
    <>
      <PageHero
        breadcrumbs={[{ title: section.menuTitle ?? section.title, href: section.basePath }]}
        kicker={`3SC ${section.title}`}
        title={heroTitles[section.slug] ?? section.title}
        description={section.summary}
        chips={[`${items.length} modules`, "One data foundation", "Start with one, scale to all"]}
        secondaryCta={{ label: "Browse the catalogue", href: "#catalogue" }}
        visual={<StageFlow title={section.menuTitle ?? section.title} counts={counts} foundationCount={counts.foundation ?? 0} />}
      />

      {families.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-x">
            <SectionHeading
              index={next("families")}
              kicker={isPlatforms ? "Platform families" : "Service lines"}
              title={isPlatforms ? "Plan with SCAI. *Execute* with Outcome-as-a-Service." : "Run it with us, or *for* you"}
            />
            <div className={`mt-12 grid gap-4 ${families.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {families.map((family, position) => {
                const href = `${section.basePath}/${family.slug}`;
                return (
                  <Reveal key={family.slug} delay={position * 0.08}>
                    <article className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-navy-950 p-8 text-white md:p-10">
                      <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
                      <div className="absolute inset-0 -z-10 bg-blueprint-dark opacity-40" aria-hidden />
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-cyan-300">
                          <Icon name={family.icon} className="size-6" />
                        </span>
                        <h3 className="text-title font-bold">{family.title}</h3>
                      </div>
                      <p className="mt-5 text-white/70">{family.summary}</p>
                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {family.children.map((child) => (
                          <li key={child.slug}>
                            <Link
                              href={`${href}/${child.slug}`}
                              className="group flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white/85 transition-colors hover:border-cyan-300/50 hover:text-white"
                            >
                              <span className="flex items-center gap-2">
                                <Icon name={child.icon} className="size-4 text-cyan-300" />
                                {child.menuTitle ?? child.title}
                              </span>
                              <ArrowUpRight className="size-4 opacity-40 group-hover:opacity-100" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href={href} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                        Explore {family.title} <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section id="catalogue" className="section-y scroll-mt-20 bg-paper">
        <div className="container-x">
          <SectionHeading
            index={next("catalogue")}
            kicker="Catalogue"
            title="Find the module for *your* decision"
            description="Filter by where it sits in your value chain, or search by name."
          />
          <div className="mt-10">
            <HubExplorer items={items} />
          </div>
        </div>
      </section>

      {isPlatforms && (
        <section className="section-y relative isolate overflow-hidden bg-navy-950 text-white">
          <div className="absolute inset-0 -z-10 bg-deep" aria-hidden />
          <div className="container-x">
            <SectionHeading
              index={next("architecture")}
              kicker="Architecture"
              title="How the platforms *fit together*"
              tone="dark"
            />
            <div className="mt-12">
              <StackDiagram />
            </div>
          </div>
        </section>
      )}

      <HowItWorks index={next("how")} className="section-y bg-white" />
      <OutcomesBand stats={themeStats[section.theme] ?? themeStats.planning} index={next("outcomes")} />
      <FaqSection faqs={faqsFor(section)} index={next("faq")} />
      <CtaDiagnostic />
    </>
  );
}
