import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot } from "lucide-react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { EditorialResources } from "@/components/sections/editorial-resources";
import { FaqSection } from "@/components/sections/faq-section";
import { LinkCards, OutcomesBand } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ResourceCard } from "@/components/sections/resource-card";
import { StickySubnav } from "@/components/sections/sticky-subnav";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { themeStats } from "@/content/defaults";
import { industryDetails } from "@/content/industries";
import { stageFilters, stagesFor } from "@/content/journey";
import { resourcesOf } from "@/content/resources";
import { industries, solutions } from "@/content/sitemap";
import { keywordsFrom, relatedResources } from "@/lib/related";

const stageLabel = Object.fromEntries(stageFilters.map((stage) => [stage.id, stage.label]));

const subnav = [
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "outcomes", label: "Outcomes" },
  { id: "proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
];

export function industryFaqs(industry) {
  return [
    {
      question: `Does 3SC have experience in ${industry.title}?`,
      answer: `Yes. 3SC works with enterprise ${industry.title} brands across Europe, APAC, the Middle East and North America, with pre-configured models and playbooks for the sector.`,
    },
    {
      question: "Where do most companies in this industry start?",
      answer: `Most start with the decision that costs them most today, typically ${industryDetails[industry.slug]?.solutions
        ?.slice(0, 2)
        .map((slug) => solutions.children.find((node) => node.slug === slug)?.title.toLowerCase())
        .join(" or ")}, and expand once value is proven.`,
    },
    {
      question: "How long does implementation take?",
      answer: "Most customers go live with a first module in 8 to 12 weeks, then expand capability by capability.",
    },
  ];
}

export function IndustryPage({ industry }) {
  const detail = industryDetails[industry.slug] ?? { challenges: [], solutions: [] };
  const recommended = detail.solutions
    .map((slug) => solutions.children.find((node) => node.slug === slug))
    .filter(Boolean);
  const keywords = keywordsFrom(industry.title);
  const caseStudy = relatedResources(keywords, 10).find((item) => item.type === "case-studies") ?? resourcesOf("case-studies")[0];
  const others = industries.children.filter((entry) => entry.slug !== industry.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { title: industries.title, href: industries.basePath },
          { title: industry.menuTitle ?? industry.title, href: `${industries.basePath}/${industry.slug}` },
        ]}
        kicker={industry.title}
        title={detail.headline ?? industry.title}
        description={industry.summary}
        secondaryCta={{ label: "See recommended solutions", href: "#solutions" }}
        visual={
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 shadow-float">
              <Image src={industry.image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 backdrop-blur">
                <Icon name={industry.icon} className="size-4 text-azure-600" />
                <span className="text-sm font-semibold text-navy-900">{industry.title}</span>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-6 hidden rounded-xl border border-navy-900/10 bg-white p-4 shadow-float sm:block">
              <p className="font-mono text-[0.625rem] text-navy-500 uppercase">Typical result</p>
              <p className="font-display text-2xl font-extrabold text-accent">{themeStats.planning[0].value}</p>
              <p className="text-xs text-navy-600">{themeStats.planning[0].label}</p>
            </div>
          </div>
        }
      />
      <StickySubnav items={subnav} title={industry.menuTitle ?? industry.title} />

      <section id="challenges" className="section-y scroll-mt-28 bg-white">
        <div className="container-x">
          <SectionHeading index="01" kicker="Challenges" title={`What makes ${industry.menuTitle ?? industry.title} *hard*`} />
          <ul className="mt-12 grid gap-3 md:grid-cols-3">
            {detail.challenges.map((challenge, position) => (
              <Reveal as="li" key={challenge.title} delay={position * 0.08} className="rounded-xl border border-navy-900/10 bg-paper p-7">
                <span className="grid size-11 place-items-center rounded-lg bg-white text-azure-600 ring-1 ring-navy-900/8">
                  <Icon name={challenge.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{challenge.title}</h3>
                <p className="mt-2 text-navy-600">{challenge.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="solutions" className="section-y scroll-mt-28 bg-paper">
        <div className="container-x">
          <SectionHeading
            index="02"
            kicker="Recommended"
            title="Where industry leaders *start*"
            description="The solutions we most often deploy first in this sector, in the order teams usually adopt them."
          />
          <ol className="mt-12 grid gap-3 md:grid-cols-2">
            {recommended.map((node, position) => (
              <Reveal as="li" key={node.slug} delay={(position % 2) * 0.08}>
                <Link
                  href={`${solutions.basePath}/${node.slug}`}
                  className="group flex h-full gap-5 rounded-xl border border-navy-900/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-float"
                >
                  <span className="font-display text-3xl font-extrabold text-navy-200 group-hover:text-azure-500">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <Icon name={node.icon} className="size-4 text-azure-600" />
                      <span className="font-display text-lg font-bold text-navy-950 group-hover:text-azure-700">{node.title}</span>
                      {stagesFor(node.slug).map((stage) => (
                        <Chip key={stage}>{stageLabel[stage]}</Chip>
                      ))}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-navy-600">{node.summary}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-navy-300 group-hover:text-azure-600" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-azure-500/20 bg-azure-50 p-5 text-sm text-navy-700">
            <Bot className="size-5 shrink-0 text-azure-600" aria-hidden />
            Every solution comes with agents pre-trained on {industry.title} patterns, and Gauri for natural-language questions.
          </div>
        </div>
      </section>

      <OutcomesBand stats={themeStats.planning} index="03" title={`Results in *${industry.menuTitle ?? industry.title}*`} />

      <section id="proof" className="section-y scroll-mt-28 bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading index="04" kicker="Proof" title="A customer story worth *reading*" />
            <p className="mt-5 text-lg text-navy-600">
              How an enterprise with similar challenges turned them into measurable results with 3SC.
            </p>
            <Link href="/resources/case-studies" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 hover:text-azure-800">
              All case studies <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            {caseStudy && <ResourceCard item={caseStudy} featured />}
          </Reveal>
        </div>
      </section>

      <EditorialResources
        items={relatedResources(keywords, 5)}
        kicker="Insights"
        title={`Thinking on *${industry.menuTitle ?? industry.title}*`}
        className="section-y bg-paper"
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading kicker="More industries" title="Explore other *industries*" />
          <div className="mt-10">
            <LinkCards
              columns={3}
              items={others.map((entry) => ({
                title: entry.title,
                description: entry.summary,
                href: `${industries.basePath}/${entry.slug}`,
                icon: entry.icon,
              }))}
            />
          </div>
        </div>
      </section>

      <FaqSection faqs={industryFaqs(industry)} index="05" className="section-y bg-paper" />
      <CtaDiagnostic title={`Book a ${industry.menuTitle ?? industry.title} supply chain diagnostic`} />
    </>
  );
}
