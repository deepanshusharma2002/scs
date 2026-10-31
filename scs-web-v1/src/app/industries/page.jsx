import { CtaBanner } from "@/components/sections/cta-banner";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { LogoStrip } from "@/components/sections/logo-strip";
import { PageHero } from "@/components/sections/page-hero";
import { StatsBand } from "@/components/sections/stats-band";
import { outcomeStats } from "@/content/home";
import { industries } from "@/content/sitemap";

export const metadata = {
  title: "Industries",
  description: industries.summary,
  alternates: { canonical: industries.basePath },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for the industries where supply chains are hardest"
        description={industries.summary}
        breadcrumbs={[{ title: "Industries", href: industries.basePath }]}
      />
      <section className="section-y bg-white">
        <div className="container-x">
          <IndustryGrid />
        </div>
      </section>
      <StatsBand stats={outcomeStats} />
      <LogoStrip />
      <CtaBanner />
    </>
  );
}
