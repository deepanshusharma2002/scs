import { HubPage, hubMetadata } from "@/components/templates/hub-page";
import { platforms } from "@/content/sitemap";

export const metadata = hubMetadata(platforms);

export default function PlatformsPage() {
  return <HubPage section={platforms} />;
}
