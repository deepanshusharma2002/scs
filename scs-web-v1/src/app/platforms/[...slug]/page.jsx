import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NodePage, nodeMetadata } from "@/components/templates/node-page";
import { platforms } from "@/content/sitemap";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { allPaths, resolveNode } from "@/lib/sitemap";

export function generateStaticParams() {
  return allPaths(platforms).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(platforms, slug);
  return resolved ? nodeMetadata(resolved) : {};
}

export default function PlatformNodePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PlatformNodePageContent params={params} />
    </Suspense>
  );
}

async function PlatformNodePageContent({ params }) {
  const { slug } = await params;
  const resolved = resolveNode(platforms, slug);
  if (!resolved) notFound();
  return <NodePage resolved={resolved} />;
}
