import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { Reveal } from "@/components/motion/reveal";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { PageHero } from "@/components/sections/page-hero";
import { ResourceCard } from "@/components/sections/resource-card";
import { resourcesOf, resourceTypes } from "@/content/resources";
import { cn } from "@/lib/utils";

const findType = (slug) => resourceTypes.find((type) => type.slug === slug);

export function generateStaticParams() {
  return resourceTypes.map((type) => ({ type: type.slug }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const entry = findType(type);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/resources/${type}` },
  };
}

export default function ResourceTypePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResourceTypeContent params={params} />
    </Suspense>
  );
}

async function ResourceTypeContent({ params }) {
  const { type } = await params;
  const entry = findType(type);
  if (!entry) notFound();
  const items = resourcesOf(type).sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = items;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { title: "Resources", href: "/resources" },
          { title: entry.title, href: `/resources/${type}` },
        ]}
        kicker={`${items.length} ${items.length === 1 ? entry.singular : entry.title}`.toLowerCase()}
        title={entry.title}
        description={entry.summary}
        primaryCta={null}
      />

      <nav aria-label="Resource formats" className="border-b border-navy-900/8 bg-white">
        <ul className="container-x flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {resourceTypes.map((option) => (
            <li key={option.slug}>
              <Link
                href={`/resources/${option.slug}`}
                aria-current={option.slug === type ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  option.slug === type ? "bg-navy-900 text-white" : "text-navy-600 hover:bg-navy-50",
                )}
              >
                <Icon name={option.icon} className="size-4" />
                {option.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section-y bg-paper">
        <div className="container-x">
          {lead && (
            <Reveal>
              <ResourceCard item={lead} featured className="lg:grid lg:grid-cols-2 [&>div:first-child]:lg:aspect-auto [&>div:first-child]:lg:min-h-80" />
            </Reveal>
          )}
          {rest.length > 0 && (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={(index % 3) * 0.05}>
                  <ResourceCard item={item} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaDiagnostic />
    </>
  );
}
