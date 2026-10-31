import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { executionServices } from "@/content/sitemap";
import { allPaths, resolveNode } from "@/lib/sitemap";

export function generateStaticParams() {
  return allPaths(executionServices).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(executionServices, slug);
  return resolved ? nodeMetadata(resolved) : {};
}

export default function ExecutionServiceNodePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ExecutionServiceNodePageContent params={params} />
    </Suspense>
  );
}

async function ExecutionServiceNodePageContent({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(executionServices, slug);
  if (!resolved) notFound();
  return <NodePage resolved={resolved} />;
}
