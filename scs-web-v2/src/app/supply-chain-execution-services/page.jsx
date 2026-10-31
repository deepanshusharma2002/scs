import { HubPage, hubMetadata } from "@/components/templates/hub-page";
import { executionServices } from "@/content/sitemap";

export const metadata = hubMetadata(executionServices);

export default function ExecutionServicesPage() {
  return <HubPage section={executionServices} />;
}
