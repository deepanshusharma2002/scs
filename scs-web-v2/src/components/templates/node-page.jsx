import { CapabilityPage } from "@/components/templates/capability-page";
import { PlatformPage } from "@/components/templates/platform-page";

export function nodeMetadata(resolved) {
  const parent = resolved.ancestors.at(-1);
  const title =
    parent && parent.title !== resolved.node.title
      ? `${resolved.node.title} · ${parent.menuTitle ?? parent.title}`
      : resolved.node.title;
  return {
    title,
    description: resolved.node.summary,
    alternates: { canonical: resolved.href },
    openGraph: { title, description: resolved.node.summary, url: resolved.href },
  };
}

/** Nodes with children get the platform layout; leaves get the capability layout. */
export function NodePage({ resolved }) {
  return resolved.node.children?.length ? (
    <PlatformPage resolved={resolved} />
  ) : (
    <CapabilityPage resolved={resolved} />
  );
}
