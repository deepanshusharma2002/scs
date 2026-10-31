import { CircleCheck } from "lucide-react";
import { InlineAd } from "@/components/ads/inline-ad";
import { Reveal } from "@/components/motion/reveal";
import { CardCarousel } from "@/components/sections/card-carousel";
import { CardGrid } from "@/components/sections/card-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FeatureList } from "@/components/sections/feature-list";
import { NodeVisual } from "@/components/sections/node-visual";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { TabbedShowcase } from "@/components/sections/tabbed-showcase";
import { faqsFor, themeFeatures, themeStats } from "@/content/defaults";
import { breadcrumbsFor, childHref } from "@/lib/sitemap";

const toneByTheme = {
  planning: "brand",
  risk: "ink",
  data: "ink",
  agentic: "brand",
  logistics: "ink",
  services: "brand",
};

const adByTheme = { agentic: "whitepaper", planning: "webinar" };

export function nodeMetadata(resolved) {
  const parent = resolved.ancestors.at(-1);
  const title =
    parent && parent.title !== resolved.node.title
      ? `${resolved.node.title} · ${parent.menuTitle ?? parent.title}`
      : resolved.node.title;
  return {
    title,
    description: resolved.node.summary,
    alternates: { canonical: resolved.href },
    openGraph: { title, description: resolved.node.summary, url: resolved.href },
  };
}

export function NodePage({ resolved }) {
  return resolved.node.children?.length ? (
    <SectionOverview resolved={resolved} />
  ) : (
    <DetailPage resolved={resolved} />
  );
}

function parentOf(resolved) {
  return resolved.ancestors.at(-1) ?? resolved.section;
}

function isSectionRoot(resolved) {
  return resolved.node === resolved.section;
}

function SectionOverview({ resolved }) {
  const { node, href, theme } = resolved;
  const children = node.children ?? [];
  const nested = children.some((child) => child.children?.length);
  const root = isSectionRoot(resolved);
  const showcase = children.map((child) => {
    const base = childHref(href, child);
    const modules = child.children?.length
      ? child.children.map((grandchild) => ({
          title: grandchild.title,
          href: childHref(base, grandchild),
          icon: grandchild.icon,
        }))
      : [{ title: child.title, href: base, icon: child.icon }];
    return {
      id: child.slug,
      label: child.menuTitle ?? child.title,
      title: child.title,
      description: child.summary,
      href: base,
      icon: child.icon,
      modules,
    };
  });
  const cards = children.map((child) => ({
    title: child.title,
    description: child.summary,
    href: childHref(href, child),
    icon: child.icon,
  }));

  return (
    <>
      <PageHero
        eyebrow={root ? "3SC" : (parentOf(resolved).menuTitle ?? parentOf(resolved).title)}
        title={node.title}
        description={node.summary}
        breadcrumbs={
          root ? [{ title: node.menuTitle ?? node.title, href }] : breadcrumbsFor(resolved)
        }
        secondaryCta={{ label: "Explore modules", href: "#modules" }}
        visual={
          <NodeVisual
            title={node.menuTitle ?? node.title}
            icon={node.icon}
            items={children.map((child) => ({ title: child.title, icon: child.icon }))}
            tone={toneByTheme[theme]}
          />
        }
      />

      <section id="modules" className="section-y scroll-mt-20 bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow={root ? node.title : `Inside ${node.menuTitle ?? node.title}`}
            title={
              nested
                ? `Explore the *${node.menuTitle ?? node.title}* portfolio`
                : `${children.length} capabilities, *one connected platform*`
            }
            description="Each capability delivers value on its own and shares data, models and workflows with the rest of the platform as you scale."
          />
          <div className="mt-12">
            {nested ? (
              <TabbedShowcase items={showcase} />
            ) : (
              <CardGrid items={cards} columns={children.length % 4 === 0 ? 4 : 3} />
            )}
          </div>
        </div>
      </section>

      {nested && (
        <section className="bg-ink-50 py-20">
          <div className="container-x">
            <CardGrid
              items={cards}
              columns={cards.length % 3 === 0 ? 3 : cards.length === 4 ? 4 : 2}
            />
          </div>
        </section>
      )}

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Key capabilities"
            title={`Why enterprises choose *${node.menuTitle ?? node.title}*`}
          />
          <div className="mt-12">
            <FeatureList features={node.features ?? themeFeatures[theme]} />
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container-x">
          <InlineAd variant={adByTheme[theme] ?? "demo"} />
        </div>
      </section>

      <StatsBand stats={node.stats ?? themeStats[theme]} />
      <ProcessSteps />
      <FaqAccordion faqs={faqsFor(node, root ? undefined : parentOf(resolved))} />
      <CtaBanner />
    </>
  );
}

function DetailPage({ resolved }) {
  const { node, theme } = resolved;
  const parent = parentOf(resolved);
  const parentHref = resolved.href.slice(0, resolved.href.lastIndexOf("/"));
  const features = node.features ?? themeFeatures[theme];
  const stats = node.stats ?? themeStats[theme];
  const siblings = (parent.children ?? [])
    .filter((child) => child.slug !== node.slug)
    .map((child) => ({
      title: child.title,
      description: child.summary,
      href: childHref(parentHref, child),
      icon: child.icon,
    }));
  const outcomes = [
    `Decisions backed by explainable AI/ML models`,
    `Works with your existing ERP, WMS and TMS`,
    `Live in weeks, scalable across the 3SC platform`,
  ];

  return (
    <>
      <PageHero
        eyebrow={parent.menuTitle ?? parent.title}
        title={node.title}
        description={node.summary}
        breadcrumbs={breadcrumbsFor(resolved)}
        secondaryCta={{ label: `Explore ${parent.menuTitle ?? parent.title}`, href: parentHref }}
        visual={
          <NodeVisual
            title={node.menuTitle ?? node.title}
            icon={node.icon}
            items={features.map((feature) => ({ title: feature.title, icon: feature.icon }))}
            tone={toneByTheme[theme]}
          />
        }
      />

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Overview"
              title={`What ${node.menuTitle ?? node.title} does *for you*`}
            />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>{node.description ?? node.summary}</p>
              <p>
                As part of {parent.title}, it shares one governed data foundation and AI engine with
                the rest of the 3SC platform, so decisions made in planning hold up in execution,
                and every team works from the same version of the truth.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-ink-800">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="relative isolate h-full overflow-hidden rounded-3xl bg-ember p-8 text-white md:p-10">
              <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
              <p className="text-sm font-semibold tracking-[0.14em] text-brand-300 uppercase">
                Typical outcomes
              </p>
              <dl className="mt-8 space-y-8">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="border-l-2 border-brand-500 pl-5">
                    <dt className="text-sm text-white/65">{stat.label}</dt>
                    <dd className="text-4xl font-bold tracking-tight">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ink-50">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="Everything you need, *built in*" />
          <div className="mt-12">
            <FeatureList features={features} columns={features.length % 3 === 0 ? 3 : 2} />
          </div>
        </div>
      </section>

      <section className="bg-ink-50 pb-20">
        <div className="container-x">
          <InlineAd variant={adByTheme[theme] ?? "demo"} />
        </div>
      </section>

      <ProcessSteps />

      {siblings.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-x">
            <SectionHeading
              eyebrow="Related"
              title={`More from *${parent.menuTitle ?? parent.title}*`}
            />
            <div className="mt-8">
              <CardCarousel items={siblings} />
            </div>
          </div>
        </section>
      )}

      <FaqAccordion faqs={faqsFor(node, parent)} />
      <CtaBanner />
    </>
  );
}
