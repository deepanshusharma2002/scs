import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { executionServices } from "@/content/sitemap";
import { resolveNode } from "@/lib/sitemap";

const resolved = resolveNode(executionServices, []);

export const metadata = nodeMetadata(resolved);

export default function ExecutionServicesPage() {
  return <NodePage resolved={resolved} />;
}
