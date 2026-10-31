import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ResourceList } from "@/components/templates/resource-list";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { resourcesOf, resourceTypes } from "@/content/resources";

export function generateStaticParams() {
  return resourceTypes.map((type) => ({ type: type.slug }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const resourceType = resourceTypes.find((entry) => entry.slug === type);
  if (!resourceType) return {};
  return {
    title: resourceType.title,
    description: resourceType.summary,
    alternates: { canonical: `/resources/${type}` },
  };
}

export default function ResourceTypePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResourceTypePageContent params={params} />
    </Suspense>
  );
}

async function ResourceTypePageContent({ params }) {
  const { type } = await params;
  const resourceType = resourceTypes.find((entry) => entry.slug === type);
  if (!resourceType) notFound();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={resourceType.title}
        description={resourceType.summary}
        breadcrumbs={[
          { title: "Resources", href: "/resources" },
          { title: resourceType.title, href: `/resources/${type}` },
        ]}
        primaryCta={{ label: "Talk to an expert", href: "/contact-us" }}
      />
      <section className="section-y bg-white">
        <div className="container-x">
          <ResourceList items={resourcesOf(type)} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
