import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { solutions } from "@/content/sitemap";
import { resolveNode } from "@/lib/sitemap";

const resolved = resolveNode(solutions, []);

export const metadata = nodeMetadata(resolved);

export default function SolutionsPage() {
  return <NodePage resolved={resolved} />;
}
