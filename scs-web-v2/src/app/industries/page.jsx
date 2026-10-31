import { IndustriesHub } from "@/components/templates/industries-hub";
import { industries } from "@/content/sitemap";

export const metadata = {
  title: industries.title,
  description: industries.summary,
  alternates: { canonical: industries.basePath },
};

export default function IndustriesPage() {
  return <IndustriesHub />;
}
