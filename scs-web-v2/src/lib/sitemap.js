export function resolveNode(section, slugs) {
  const ancestors = [];
  let current = section;
  let theme = section.theme ?? "planning";
  for (const slug of slugs) {
    const next = current.children?.find((child) => child.slug === slug);
    if (!next) return undefined;
    ancestors.push(current);
    current = next;
    if (current.theme) theme = current.theme;
  }
  return {
    node: current,
    section,
    ancestors: ancestors.slice(1),
    href: hrefFor(section, slugs),
    theme,
  };
}

export function hrefFor(section, slugs) {
  return slugs.length ? `${section.basePath}/${slugs.join("/")}` : section.basePath;
}

export function childHref(parentHref, child) {
  return `${parentHref}/${child.slug}`;
}

/** Every descendant path (as slug arrays) below the section root. */
export function allPaths(section) {
  const paths = [];
  const walk = (node, trail) => {
    for (const child of node.children ?? []) {
      const path = [...trail, child.slug];
      paths.push(path);
      walk(child, path);
    }
  };
  walk(section, []);
  return paths;
}

export function breadcrumbsFor(resolved) {
  const { section, ancestors, node } = resolved;
  const crumbs = [{ title: section.menuTitle ?? section.title, href: section.basePath }];
  let href = section.basePath;
  for (const ancestor of ancestors) {
    href = `${href}/${ancestor.slug}`;
    crumbs.push({ title: ancestor.menuTitle ?? ancestor.title, href });
  }
  crumbs.push({ title: node.menuTitle ?? node.title, href: resolved.href });
  return crumbs;
}
