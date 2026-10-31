import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { platforms } from "@/content/sitemap";
import { resolveNode } from "@/lib/sitemap";

const resolved = resolveNode(platforms, []);

export const metadata = nodeMetadata(resolved);

export default function PlatformsPage() {
  return <NodePage resolved={resolved} />;
}
