import { CircleCheck } from "lucide-react";
import { Mock, mockFor } from "@/components/mocks/mini-mocks";
import { Reveal } from "@/components/motion/reveal";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureGrid, LinkCards, OutcomesBand, ProblemGrid } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHero } from "@/components/sections/page-hero";
import { StickySubnav } from "@/components/sections/sticky-subnav";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { problemsByTheme } from "@/content/challenges";
import { faqsFor, themeFeatures, themeStats } from "@/content/defaults";
import { stageFilters, stagesFor } from "@/content/journey";
import { breadcrumbsFor, childHref } from "@/lib/sitemap";

const stageLabel = Object.fromEntries(stageFilters.map((stage) => [stage.id, stage.label]));

export function CapabilityPage({ resolved }) {
  const { node, theme } = resolved;
  const parent = resolved.ancestors.at(-1) ?? resolved.section;
  const parentHref = resolved.href.slice(0, resolved.href.lastIndexOf("/"));
  const name = node.menuTitle ?? node.title;
  const features = node.features ?? themeFeatures[theme] ?? themeFeatures.planning;
  const stats = node.stats ?? themeStats[theme] ?? themeStats.planning;
  const problems = problemsByTheme[theme] ?? problemsByTheme.planning;
  const stages = stagesFor(node.slug);
  const heroMock = mockFor(node, theme);
  const siblings = (parent.children ?? [])
    .filter((child) => child.slug !== node.slug)
    .map((child) => ({
      title: child.title,
      description: child.summary,
      href: childHref(parentHref, child),
      icon: child.icon,
    }));

  const subnav = [
    { id: "problem", label: "The problem" },
    { id: "approach", label: "Our approach" },
    { id: "how-it-works", label: "How it works" },
    { id: "outcomes", label: "Outcomes" },
    siblings.length > 0 && { id: "related", label: "Related" },
    { id: "faq", label: "FAQ" },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbsFor(resolved)}
        kicker={parent.menuTitle ?? parent.title}
        title={node.title}
        description={node.summary}
        chips={stages.map((stage) => `Stage · ${stageLabel[stage]}`)}
        secondaryCta={{ label: `About ${parent.menuTitle ?? parent.title}`, href: parentHref }}
        visual={<Mock kind={heroMock} title={`${name} · live view`} />}
      />
      <StickySubnav items={subnav} title={name} />

      <section id="problem" className="section-y scroll-mt-28 bg-white">
        <div className="container-x">
          <SectionHeading
            index="01"
            kicker="The problem"
            title={`Why ${name} is *harder* than it looks`}
            description="Three patterns we see in almost every organisation before they work with 3SC."
          />
          <div className="mt-12">
            <ProblemGrid problems={problems} />
          </div>
        </div>
      </section>

      <section id="approach" className="section-y scroll-mt-28 bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index="02" kicker="Our approach" title={`How 3SC does *${name}*`} />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-navy-600">
              <p>{node.description ?? node.summary}</p>
              <p>
                As part of {parent.title}, it shares one governed data foundation and AI engine with
                the rest of the platform, so every team works from the same version of the truth.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {[
                "Explainable AI/ML recommendations",
                "Works with your existing ERP, WMS and TMS",
                "Live in weeks, scalable across the platform",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-navy-800">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <FeatureGrid features={features} />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <Mock kind="agent" title={`Gauri · ${name}`} />
          </Reveal>
          <div className="lg:col-span-5">
            <Chip tone="azure">Agentic AI built in</Chip>
            <h2 className="mt-4 text-headline font-bold text-balance text-navy-950">
              Ask about {name} in plain language
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              Gauri and the 3SC agents explain what changed, why it matters and what to do next, and
              act inside the guardrails you set.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks index="03" />
      <OutcomesBand stats={stats} index="04" title={`What *${name}* delivers`} />

      {siblings.length > 0 && (
        <section id="related" className="section-y scroll-mt-28 bg-white">
          <div className="container-x">
            <SectionHeading index="05" kicker="Related" title={`More from *${parent.menuTitle ?? parent.title}*`} />
            <div className="mt-12">
              <LinkCards items={siblings.slice(0, 6)} />
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={faqsFor(node, parent)} index={siblings.length ? "06" : "05"} className="section-y bg-paper" />
      <CtaDiagnostic title={`See ${name} on your data in 30 minutes`} />
    </>
  );
}
