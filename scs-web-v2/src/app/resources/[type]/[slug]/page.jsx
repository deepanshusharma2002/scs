import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { ReadingProgress } from "@/components/resources/reading-progress";
import { ShareButtons } from "@/components/resources/share-buttons";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { EditorialResources } from "@/components/sections/editorial-resources";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { inlineAds } from "@/content/promotions";
import { findResource, formatDate, resources, resourcesOf, resourceTypes } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { plainText } from "@/components/ui/accent-text";

export function generateStaticParams() {
  return resources.map((item) => ({ type: item.type, slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { type, slug } = await params;
  const item = findResource(type, slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/resources/${type}/${slug}` },
    openGraph: { type: "article", title: item.title, description: item.excerpt, images: item.image },
  };
}

export default function ResourceDetailPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResourceDetailContent params={params} />
    </Suspense>
  );
}

const toc = [
  { id: "summary", label: "Summary" },
  { id: "why-it-matters", label: "Why it matters" },
  { id: "approach", label: "How 3SC approaches it" },
  { id: "takeaways", label: "Key takeaways" },
];

async function ResourceDetailContent({ params }) {
  const { type, slug } = await params;
  const item = findResource(type, slug);
  const resourceType = resourceTypes.find((entry) => entry.slug === type);
  if (!item || !resourceType) notFound();
  const url = `${siteConfig.url}/resources/${type}/${slug}`;
  const related = resourcesOf(type)
    .filter((entry) => entry.slug !== slug)
    .concat(resources.filter((entry) => entry.type !== type && entry.tags.some((tag) => item.tags.includes(tag))))
    .slice(0, 5);
  const ad = type === "webinars" ? inlineAds.webinar : inlineAds.whitepaper;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    image: `${siteConfig.url}${item.image}`,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <ReadingProgress targetId="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article id="article">
        <header className="relative isolate overflow-hidden border-b border-navy-900/8 bg-paper">
          <div className="absolute inset-0 -z-10 bg-blueprint [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)]" aria-hidden />
          <div className="container-x max-w-5xl pt-8 pb-14">
            <Breadcrumbs
              items={[
                { title: "Resources", href: "/resources" },
                { title: resourceType.title, href: `/resources/${type}` },
                { title: item.title, href: `/resources/${type}/${slug}` },
              ]}
            />
            <p className="kicker mt-10">{resourceType.singular}</p>
            <h1 className="mt-4 text-display font-extrabold text-balance text-navy-950">{item.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-navy-600">{item.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" aria-hidden /> {formatDate(item.date)}
              </span>
              {item.readTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4" aria-hidden /> {item.readTime}
                </span>
              )}
              <span className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </span>
              <span className="ml-auto">
                <ShareButtons url={url} title={item.title} />
              </span>
            </div>
          </div>
        </header>

        <div className="container-x grid max-w-6xl gap-12 py-14 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Table of contents" className="sticky top-28">
              <p className="kicker text-navy-500">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-navy-900/10">
                {toc.map((entry, index) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-navy-600 hover:border-azure-600 hover:text-navy-950">
                      <span className="mr-2 font-mono text-xs text-navy-400">0{index + 1}</span>
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-9">
            {item.image && (
              <div className="relative aspect-[16/8] overflow-hidden rounded-xl bg-navy-100">
                <Image src={item.image} alt="" fill priority sizes="(min-width: 1024px) 860px, 100vw" className="object-cover" />
              </div>
            )}
            <div className="mt-10 max-w-3xl text-lg leading-relaxed text-navy-700 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-950 [&_p]:mt-5">
              <h2 id="summary">Summary</h2>
              <p>{item.excerpt}</p>
              <h2 id="why-it-matters">Why it matters</h2>
              <p>
                Supply chains are under pressure from volatile demand, fragile supply and rising
                cost-to-serve. Leaders who connect planning with execution, and use AI to sense change
                early, consistently outperform on service, cost and working capital.
              </p>
              <h2 id="approach">How 3SC approaches it</h2>
              <p>
                3SC combines AI/ML-driven planning, agentic AI and intelligent transport execution on
                one platform. Plans are tested against real constraints before they are committed, and
                execution teams get early warnings and recommended actions when reality diverges from
                the plan.
              </p>

              <aside className="not-prose my-10 rounded-xl border border-azure-500/20 bg-azure-50 p-6">
                <p className="kicker">{ad.tag}</p>
                <p className="mt-2 font-display text-xl font-bold text-navy-950">{plainText(ad.title)}</p>
                <p className="mt-1 text-base text-navy-600">{ad.description}</p>
                <ButtonLink href={ad.href} variant="blue" size="sm" className="mt-4">
                  {ad.cta} <ArrowRight />
                </ButtonLink>
              </aside>

              <h2 id="takeaways">Key takeaways</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Start where the problem costs you most, then scale across the platform.",
                  "Unify data across ERP, WMS and TMS before optimising decisions.",
                  "Use scenario planning to make trade-offs explicit and fast.",
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <Lightbulb className="mt-1 size-5 shrink-0 text-azure-600" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl bg-navy-950 p-8 text-white md:flex-row md:items-center">
              <div>
                <p className="font-display text-xl font-bold">Want to see this on your data?</p>
                <p className="mt-1 text-white/65">Get a 30-minute diagnostic with a 3SC expert.</p>
              </div>
              <ButtonLink href={siteConfig.demoHref} variant="light">
                Book a diagnostic <ArrowRight />
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <EditorialResources items={related} kicker="Keep reading" title="More from the *library*" className="section-y bg-paper" />
      )}
      <CtaDiagnostic />
    </>
  );
}
