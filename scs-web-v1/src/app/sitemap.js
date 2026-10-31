import { policies } from "@/content/policies";
import { resources, resourceTypes } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { catalogSections } from "@/content/sitemap";
import { allPaths, hrefFor } from "@/lib/sitemap";

export default function sitemap() {
  const paths = [
    "/",
    ...catalogSections.flatMap((section) => [
      section.basePath,
      ...allPaths(section).map((slugs) => hrefFor(section, slugs)),
    ]),
    "/resources",
    ...resourceTypes.map((type) => `/resources/${type.slug}`),
    ...resources.map((item) => `/resources/${item.type}/${item.slug}`),
    "/about-us",
    "/careers",
    "/newsroom",
    "/contact-us",
    "/policies",
    ...policies.map((policy) => `/policies/${policy.slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
