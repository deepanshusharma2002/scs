import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "light", className }) {
  const dark = tone === "dark";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ title: "Home", href: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 font-mono text-[0.75rem]",
          dark ? "text-white/55" : "text-navy-500",
        )}
      >
        <li>
          <Link
            href="/"
            aria-label="Home"
            className={cn("flex", dark ? "hover:text-white" : "hover:text-azure-700")}
          >
            <House className="size-3.5" aria-hidden />
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 opacity-50" aria-hidden />
              {last ? (
                <span aria-current="page" className={dark ? "text-white" : "text-navy-900"}>
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={dark ? "hover:text-white" : "hover:text-azure-700"}
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
