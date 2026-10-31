import { resources } from "@/content/resources";

const STOP = new Set(["and", "the", "for", "with", "planning", "management", "&"]);

export function keywordsFrom(...texts) {
  return [
    ...new Set(
      texts
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .split(/[^a-z0-9&-]+/)
        .filter((word) => word.length > 2 && !STOP.has(word)),
    ),
  ];
}

/** Resources ranked by keyword overlap with tags and titles, newest first, padded with the latest. */
export function relatedResources(keywords, limit = 5) {
  const scored = resources
    .map((item) => {
      const haystack = `${item.tags.join(" ")} ${item.title}`.toLowerCase();
      const score = keywords.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date));
  const matched = scored.filter((entry) => entry.score > 0).map((entry) => entry.item);
  const latest = scored.map((entry) => entry.item);
  return [...new Set([...matched, ...latest])].slice(0, limit);
}
