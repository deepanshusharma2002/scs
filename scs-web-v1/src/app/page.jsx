import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InlineAd } from "@/components/ads/inline-ad";
import { ParticleHero } from "@/components/hero/particle-hero";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { CardGrid } from "@/components/sections/card-grid";
import { CaseStudyCards } from "@/components/sections/case-study-cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { IntegrationsSection } from "@/components/sections/integrations-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { PlatformExplorer } from "@/components/sections/platform-explorer";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RecognitionBand } from "@/components/sections/recognition-band";
import { ResourceCards } from "@/components/sections/resource-cards";
import { RoleTabs } from "@/components/sections/role-tabs";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ButtonLink } from "@/components/ui/button";
import { DottedMap } from "@/components/visuals/dotted-map";
import { SpotlightCard } from "@/components/visuals/spotlight-card";
import {
  caseStudies,
  companyStats,
  homeFaqs,
  outcomeStats,
  platformTabs,
  roleTabs,
  testimonials,
} from "@/content/home";
import { resourcesOf } from "@/content/resources";
import { executionServices, solutions } from "@/content/sitemap";

export default function HomePage() {
  const solutionCards = (solutions.children ?? []).slice(0, 9).map((node) => ({
    title: node.title,
    description: node.summary,
    href: `${solutions.basePath}/${node.slug}`,
    icon: node.icon,
  }));

  return (
    <>
      <ParticleHero />
      <LogoStrip />
      <StatsBand stats={outcomeStats} title="Measurable outcomes our customers achieve" />

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Platforms"
              title="One platform to connect, plan and *execute*"
              description="Start with planning, execution or both. Each platform delivers value on its own and gets stronger together."
            />
            <ButtonLink href="/platforms" variant="outline">
              All platforms <ArrowRight />
            </ButtonLink>
          </div>
          <PlatformExplorer items={platformTabs} />
        </div>
      </section>

      <ProcessSteps />

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Solutions"
              title="Purpose-built for *every* supply chain decision"
              description="From demand sensing to logistics orchestration: start with the decision that costs you most today."
            />
            <ButtonLink href={solutions.basePath} variant="outline">
              All solutions <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <CardGrid items={solutionCards} columns={4} featureFirst />
          </div>
        </div>
      </section>

      <ExecutionServicesSection />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Built for every team"
            title="A platform that helps *every team* hit its KPIs"
            align="center"
          />
          <div className="mt-14">
            <RoleTabs roles={roleTabs} />
          </div>
        </div>
      </section>

      <section className="section-y bg-ink-50">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Industries"
              title="Where supply chains are *hardest*, we go deepest"
            />
            <ButtonLink href="/industries" variant="outline">
              All industries <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <IndustryGrid />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Proven at scale"
            title="Leading enterprises plan and ship with *3SC*"
            description="Results from deployments across FMCG, consumer durables, pharma and manufacturing."
          />
          <div className="mt-14">
            <CaseStudyCards items={caseStudies} />
          </div>
        </div>
      </section>

      <StatsBand stats={companyStats} tone="light" className="border-y border-ink-900/5 bg-ink-50" />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Testimonials" title="What our *customers* say" />
          <div className="mt-12">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      <RecognitionBand />

      <section className="bg-white pb-10">
        <div className="container-x">
          <InlineAd variant="whitepaper" />
        </div>
      </section>

      <IntegrationsSection />

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Resources" title="Latest *insights* from our experts" />
            <ButtonLink href="/resources" variant="outline">
              All resources <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ResourceCards items={resourcesOf("blogs").slice(0, 3)} />
          </div>
        </div>
      </section>

      <FaqAccordion faqs={homeFaqs} />
      <CtaBanner />
    </>
  );
}

function ExecutionServicesSection() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-ember text-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Supply chain execution services"
              title="Managed logistics and 4PL, *orchestrated globally*"
              description={executionServices.summary}
              tone="dark"
            />
          </div>
          <Reveal className="lg:col-span-7" delay={0.15}>
            <DottedMap />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {(executionServices.children ?? []).map((service, index) => {
            const href = `${executionServices.basePath}/${service.slug}`;
            return (
              <Reveal key={service.slug} delay={index * 0.1}>
                <SpotlightCard tone="dark" className="flex h-full flex-col p-8 backdrop-blur-sm md:p-10">
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-500 text-white">
                      <Icon name={service.icon} className="size-7" />
                    </span>
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="mt-5 text-white/65">{service.summary}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {(service.children ?? []).map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`${href}/${child.slug}`}
                          className="group/link flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 transition-colors hover:border-brand-400/60 hover:bg-white/[0.06] hover:text-white"
                        >
                          {child.title}
                          <ArrowUpRight className="size-4 shrink-0 opacity-40 transition-all group-hover/link:rotate-45 group-hover/link:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
                  >
                    Explore {service.title} <ArrowRight className="size-4" />
                  </Link>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
