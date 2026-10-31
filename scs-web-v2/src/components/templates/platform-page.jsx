import { CircleCheck } from "lucide-react";
import { Mock, mockFor } from "@/components/mocks/mini-mocks";
import { Reveal } from "@/components/motion/reveal";
import { ModuleExplorer } from "@/components/platform/module-explorer";
import { ModuleMap } from "@/components/platform/module-map";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { EditorialResources } from "@/components/sections/editorial-resources";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureGrid, OutcomesBand } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHero } from "@/components/sections/page-hero";
import { StickySubnav } from "@/components/sections/sticky-subnav";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqsFor, themeFeatures, themeStats } from "@/content/defaults";
import { breadcrumbsFor, childHref } from "@/lib/sitemap";
import { keywordsFrom, relatedResources } from "@/lib/related";

const subnav = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "Modules" },
  { id: "capabilities", label: "Capabilities" },
  { id: "how-it-works", label: "How it works" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faq", label: "FAQ" },
];

export function PlatformPage({ resolved }) {
  const { node, href, theme } = resolved;
  const parent = resolved.ancestors.at(-1) ?? resolved.section;
  const name = node.menuTitle ?? node.title;
  const children = node.children ?? [];
  const features = node.features ?? themeFeatures[theme] ?? themeFeatures.planning;
  const stats = node.stats ?? themeStats[theme] ?? themeStats.planning;

  const modules = children.map((child) => {
    const base = childHref(href, child);
    return {
      id: child.slug,
      label: child.menuTitle ?? child.title,
      title: child.title,
      description: child.summary,
      href: base,
      icon: child.icon,
      modules: (child.children ?? []).map((grandchild) => ({
        title: grandchild.menuTitle ?? grandchild.title,
        href: childHref(base, grandchild),
        icon: grandchild.icon,
      })),
      visual: <Mock kind={mockFor(child, child.theme ?? theme)} title={`${child.menuTitle ?? child.title}`} />,
    };
  });

  const outcomes = [
    `${children.length} modules that work alone or together`,
    "One governed data foundation shared across planning and execution",
    "Connects to SAP, Oracle, Microsoft Dynamics, WMS and TMS",
  ];

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbsFor(resolved)}
        kicker={parent.menuTitle ?? parent.title}
        title={node.title}
        description={node.summary}
        secondaryCta={{ label: "Explore modules", href: "#modules" }}
        visual={
          <ModuleMap
            title={name}
            icon={node.icon}
            items={children.map((child) => ({ title: child.menuTitle ?? child.title, icon: child.icon }))}
          />
        }
      />
      <StickySubnav items={subnav} title={name} />

      <section id="overview" className="section-y scroll-mt-28 bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading index="01" kicker="Overview" title={`What *${name}* does for you`} />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-navy-600">
              <p>{node.summary}</p>
              <p>
                As part of {parent.title}, it shares one data foundation and AI engine with the rest of
                the 3SC platform, so decisions made in planning hold up in execution.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-navy-800">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Mock kind={mockFor(node, theme)} title={`${name} · live view`} />
          </Reveal>
        </div>
      </section>

      <section id="modules" className="section-y scroll-mt-28 bg-paper">
        <div className="container-x">
          <SectionHeading
            index="02"
            kicker={`Inside ${name}`}
            title={`${children.length} modules, *one connected* platform`}
            description="Pick a module to see what it does, what's inside and how it looks in the product."
          />
          <div className="mt-12">
            <ModuleExplorer items={modules} />
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-y scroll-mt-28 bg-white">
        <div className="container-x">
          <SectionHeading index="03" kicker="Capabilities" title={`Why enterprises choose *${name}*`} />
          <div className="mt-12">
            <FeatureGrid features={features} columns={features.length % 3 === 0 ? 3 : 2} />
          </div>
        </div>
      </section>

      <HowItWorks index="04" />
      <OutcomesBand stats={stats} index="05" title={`What *${name}* delivers`} />
      <EditorialResources
        items={relatedResources(keywordsFrom(node.title, name, theme), 5)}
        kicker="Related insights"
        title={`Go deeper on *${name}*`}
      />
      <FaqSection faqs={faqsFor(node, parent)} index="06" className="section-y bg-paper" />
      <CtaDiagnostic title={`See ${name} on your data in 30 minutes`} />
    </>
  );
}
