import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { InlineAd } from "@/components/ads/inline-ad";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ResourceCards } from "@/components/sections/resource-cards";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button";
import {
  findResource,
  formatDate,
  resources,
  resourcesOf,
  resourceTypes,
} from "@/content/resources";
import { siteConfig } from "@/content/site";
import { PageSkeleton } from "@/components/layout/page-skeleton";

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
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      images: item.image,
    },
  };
}

export default function ResourceDetailPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResourceDetailPageContent params={params} />
    </Suspense>
  );
}

async function ResourceDetailPageContent({ params }) {
  const { type, slug } = await params;
  const item = findResource(type, slug);
  const resourceType = resourceTypes.find((entry) => entry.slug === type);
  if (!item || !resourceType) notFound();
  const related = resourcesOf(type)
    .filter((entry) => entry.slug !== slug)
    .slice(0, 3);
  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-ink-900/5 bg-white">
          <div className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(60%_80%_at_80%_30%,black,transparent)]" aria-hidden />
          <div className="absolute -top-40 right-[-10%] -z-10 size-[40rem] bg-glow" aria-hidden />
          <div className="container-x max-w-4xl py-16 md:py-20">
            <Breadcrumbs
              items={[
                { title: "Resources", href: "/resources" },
                { title: resourceType.title, href: `/resources/${type}` },
                { title: item.title, href: `/resources/${type}/${slug}` },
              ]}
            />
            <p className="eyebrow mt-10">{resourceType.singular}</p>
            <h1 className="mt-4 text-display font-bold text-balance text-ink-950">{item.title}</h1>
            <p className="mt-5 text-lg text-ink-600">{item.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-ink-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" aria-hidden />
                {formatDate(item.date)}
              </span>
              {item.readTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4" aria-hidden />
                  {item.readTime}
                </span>
              )}
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <div className="container-x max-w-4xl">
          {item.image && (
            <div className="relative -mt-0 aspect-[16/8] overflow-hidden rounded-b-3xl bg-ink-100 md:mt-10 md:rounded-3xl">
              <Image
                src={item.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="py-14 text-lg leading-relaxed text-ink-700 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_p]:mt-5">
            <p>{item.excerpt}</p>
            <h2>Why it matters</h2>
            <p>
              Supply chains are under pressure from volatile demand, fragile supply and rising
              cost-to-serve. Leaders who connect planning with execution, and use AI to sense change
              early, consistently outperform on service, cost and working capital.
            </p>
            <h2>How 3SC approaches it</h2>
            <p>
              3SC combines AI/ML-driven planning, agentic AI and intelligent transport execution on
              one platform. Plans are tested against real constraints before they are committed, and
              execution teams get early warnings and recommended actions when reality diverges from
              the plan.
            </p>
            <InlineAd variant={type === "webinars" ? "webinar" : "whitepaper"} compact className="not-prose my-12" />
            <h2>Key takeaways</h2>
            <ul className="mt-5 list-disc space-y-2 pl-6">
              <li>Start where the problem costs you most, then scale across the platform.</li>
              <li>Unify data across ERP, WMS and TMS before optimising decisions.</li>
              <li>Use scenario planning to make trade-offs explicit and fast.</li>
            </ul>
          </div>

          <div className="mb-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-50 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-xl font-semibold text-ink-900">Want to see this on your data?</p>
              <p className="mt-1 text-ink-600/80">
                Get a personalised walkthrough from our experts.
              </p>
            </div>
            <ButtonLink href={siteConfig.demoHref}>
              Request a Demo <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-x">
            <SectionHeading
              eyebrow="Keep reading"
              title={`More *${resourceType.title.toLowerCase()}*`}
            />
            <div className="mt-12">
              <ResourceCards items={related} />
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}
