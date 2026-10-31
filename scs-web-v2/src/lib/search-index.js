import { company, catalogSections } from "@/content/sitemap";
import { policies } from "@/content/policies";
import { resources, resourceTypes } from "@/content/resources";

/** Flat list of every navigable page for the command palette. */
export function buildSearchIndex() {
  const entries = [];
  const walk = (node, href, trail) => {
    for (const child of node.children ?? []) {
      const childHref = `${href}/${child.slug}`;
      entries.push({
        title: child.title,
        href: childHref,
        group: trail[0],
        context: trail.slice(1).join(" › "),
        summary: child.summary,
        icon: child.icon,
      });
      walk(child, childHref, [...trail, child.menuTitle ?? child.title]);
    }
  };
  for (const section of catalogSections) {
    entries.push({
      title: section.title,
      href: section.basePath,
      group: "Overview",
      summary: section.summary,
      icon: section.icon,
    });
    walk(section, section.basePath, [section.menuTitle ?? section.title]);
  }
  for (const type of resourceTypes) {
    entries.push({
      title: type.title,
      href: `/resources/${type.slug}`,
      group: "Resources",
      summary: type.summary,
      icon: type.icon,
    });
  }
  for (const item of resources) {
    const type = resourceTypes.find((entry) => entry.slug === item.type);
    entries.push({
      title: item.title,
      href: `/resources/${item.type}/${item.slug}`,
      group: "Resources",
      context: type?.singular,
      summary: item.excerpt,
      icon: type?.icon,
    });
  }
  for (const item of company.links) {
    entries.push({ title: item.title, href: item.href, group: "Company", summary: item.summary, icon: "building" });
  }
  for (const policy of policies) {
    entries.push({
      title: policy.title,
      href: `/policies/${policy.slug}`,
      group: "Policies",
      summary: policy.summary,
      icon: policy.icon,
    });
  }
  return entries;
}

export function searchEntries(entries, query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const haystack = `${title} ${entry.context ?? ""} ${entry.group} ${entry.summary ?? ""}`.toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return null;
      const score = terms.reduce(
        (total, term) => total + (title.startsWith(term) ? 6 : title.includes(term) ? 3 : 1),
        0,
      );
      return { entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ entry }) => entry);
}
