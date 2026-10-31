import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { IndustryPage } from "@/components/templates/industry-page";
import { industryDetails } from "@/content/industries";
import { industries } from "@/content/sitemap";

const findIndustry = (slug) => industries.children.find((item) => item.slug === slug);

export function generateStaticParams() {
  return industries.children.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return {};
  const title = `${industry.title} supply chain solutions`;
  const description = industryDetails[slug]?.headline
    ? `${industryDetails[slug].headline}. ${industry.summary}`
    : industry.summary;
  return {
    title,
    description,
    alternates: { canonical: `${industries.basePath}/${slug}` },
    openGraph: { title, description, images: industry.image },
  };
}

export default function IndustryDetailPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IndustryDetailContent params={params} />
    </Suspense>
  );
}

async function IndustryDetailContent({ params }) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();
  return <IndustryPage industry={industry} />;
}
