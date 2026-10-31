import { CardGrid } from "@/components/sections/card-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ResourceList } from "@/components/templates/resource-list";
import { resources, resourceTypes } from "@/content/resources";

export const metadata = {
  title: "Resources",
  description: "Blogs, case studies, videos, whitepapers, use cases and webinars from 3SC.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Insights for smarter supply chains"
        description="Research, stories and practical guidance from 3SC's data scientists and supply chain experts."
        breadcrumbs={[{ title: "Resources", href: "/resources" }]}
        primaryCta={{ label: "Subscribe to insights", href: "/contact-us" }}
      />
      <section className="bg-ink-50 py-16">
        <div className="container-x">
          <CardGrid
            columns={3}
            items={resourceTypes.map((type) => ({
              title: type.title,
              description: type.summary,
              href: `/resources/${type.slug}`,
              icon: type.icon,
            }))}
          />
        </div>
      </section>
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Latest" title="Everything in one place" className="mb-10" />
          <ResourceList items={resources} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
