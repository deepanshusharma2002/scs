import { HubPage, hubMetadata } from "@/components/templates/hub-page";
import { solutions } from "@/content/sitemap";

export const metadata = hubMetadata(solutions);

export default function SolutionsPage() {
  return <HubPage section={solutions} />;
}
