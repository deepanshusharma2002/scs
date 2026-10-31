import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CardGrid } from "@/components/sections/card-grid";
import { CaseStudyCards } from "@/components/sections/case-study-cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FeatureList } from "@/components/sections/feature-list";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { NodeVisual } from "@/components/sections/node-visual";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { faqsFor } from "@/content/defaults";
import { caseStudies, outcomeStats } from "@/content/home";
import { industryDetails } from "@/content/industries";
import { industries, solutions } from "@/content/sitemap";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { breadcrumbsFor, resolveNode } from "@/lib/sitemap";

export function generateStaticParams() {
  return (industries.children ?? []).map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(industries, [slug]);
  if (!resolved) return {};
  return {
    title: `${resolved.node.title} Supply Chain Solutions`,
    description: resolved.node.summary,
    alternates: { canonical: resolved.href },
  };
}

export default function IndustryPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IndustryPageContent params={params} />
    </Suspense>
  );
}

async function IndustryPageContent({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(industries, [slug]);
  const detail = industryDetails[slug];
  if (!resolved || !detail) notFound();
  const { node } = resolved;
  const recommended = detail.solutions
    .map((solutionSlug) => solutions.children?.find((item) => item.slug === solutionSlug))
    .filter((item) => item !== undefined)
    .map((item) => ({
      title: item.title,
      description: item.summary,
      href: `${solutions.basePath}/${item.slug}`,
      icon: item.icon,
    }));
  return (
    <>
      <PageHero
        eyebrow={`${node.title} industry`}
        title={detail.headline}
        description={node.summary}
        breadcrumbs={breadcrumbsFor(resolved)}
        secondaryCta={{ label: "See solutions", href: "#solutions" }}
        visual={
          <NodeVisual
            title={node.title}
            icon={node.icon}
            items={recommended.map((item) => ({ title: item.title, icon: item.icon }))}
            caption="Industry model pre-configured"
          />
        }
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="The challenge"
            title={`What makes ${node.title} supply chains hard`}
          />
          <div className="mt-12">
            <FeatureList features={detail.challenges} />
          </div>
        </div>
      </section>

      <section id="solutions" className="section-y scroll-mt-20 bg-ink-50">
        <div className="container-x">
          <SectionHeading
            eyebrow="How 3SC helps"
            title="Solutions configured for your industry"
            description="Pre-built industry models, KPIs and best practices mean faster time to value."
          />
          <div className="mt-12">
            <CardGrid items={recommended} columns={4} />
          </div>
        </div>
      </section>

      <StatsBand stats={outcomeStats} />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Proof" title="Results our customers achieve" />
          <div className="mt-12">
            <CaseStudyCards items={caseStudies} />
          </div>
        </div>
      </section>

      <FaqAccordion faqs={faqsFor(node)} />

      <section className="section-y bg-ink-50">
        <div className="container-x">
          <SectionHeading eyebrow="Industries" title="Explore other industries" />
          <div className="mt-12">
            <IndustryGrid exclude={slug} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
