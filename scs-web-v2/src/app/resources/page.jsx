import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { CtaDiagnostic } from "@/components/sections/cta-diagnostic";
import { PageHero } from "@/components/sections/page-hero";
import { ResourceCard, ResourceRow } from "@/components/sections/resource-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { resources, resourcesOf, resourceTypes } from "@/content/resources";

export const metadata = {
  title: "Resources",
  description: "Blogs, case studies, videos, whitepapers, use cases and webinars from 3SC's supply chain experts.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const latest = [...resources].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = latest;

  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Resources", href: "/resources" }]}
        kicker="Resource library"
        title="Insights for *smarter* supply chains"
        description="Research, customer stories and practical guidance from 3SC's data scientists and supply chain experts."
        primaryCta={{ label: "Browse the library", href: "#library" }}
        secondaryCta={{ label: "Get the monthly brief", href: "#newsletter-email" }}
      />

      <section className="section-y bg-white">
        <div className="container-x grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker mb-4">Featured</p>
            <ResourceCard item={lead} featured />
          </div>
          <div className="lg:col-span-5">
            <p className="kicker mb-4 text-navy-500">Latest</p>
            <ul className="divide-y divide-navy-900/8">
              {rest.slice(0, 4).map((item) => (
                <li key={`${item.type}-${item.slug}`} className="py-1.5 first:pt-0">
                  <ResourceRow item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/8 bg-paper py-14">
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {resourceTypes.map((type) => (
              <li key={type.slug}>
                <Link
                  href={`/resources/${type.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-card"
                >
                  <span className="flex items-center justify-between">
                    <Icon name={type.icon} className="size-5 text-azure-600" />
                    <span className="font-mono text-xs text-navy-400">{resourcesOf(type.slug).length}</span>
                  </span>
                  <span className="mt-4 font-display font-bold text-navy-950 group-hover:text-azure-700">{type.title}</span>
                  <span className="mt-1 line-clamp-2 text-xs text-navy-500">{type.summary}</span>
                  <ArrowUpRight className="mt-3 size-4 text-navy-300 group-hover:text-azure-600" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="library" className="section-y scroll-mt-20 bg-white">
        <div className="container-x">
          <SectionHeading kicker="Library" title="Everything, *searchable*" />
          <div className="mt-10">
            <ResourceExplorer />
          </div>
        </div>
      </section>

      <CtaDiagnostic />
    </>
  );
}
