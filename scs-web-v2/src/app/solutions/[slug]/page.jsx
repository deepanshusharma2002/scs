import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { solutions } from "@/content/sitemap";
import { allPaths, resolveNode } from "@/lib/sitemap";

export function generateStaticParams() {
  return allPaths(solutions).map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(solutions, [slug]);
  return resolved ? nodeMetadata(resolved) : {};
}

export default function SolutionPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SolutionPageContent params={params} />
    </Suspense>
  );
}

async function SolutionPageContent({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(solutions, [slug]);
  if (!resolved) notFound();
  return <NodePage resolved={resolved} />;
}
