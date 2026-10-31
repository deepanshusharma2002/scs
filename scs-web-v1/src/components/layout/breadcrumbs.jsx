import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "light", className }) {
  const all = [{ title: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {all.map((crumb, index) => {
          const last = index === all.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", tone === "dark" ? "text-white" : "text-ink-900")}
                >
                  {crumb.title}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={cn(
                      "transition-colors",
                      tone === "dark"
                        ? "text-white/55 hover:text-white"
                        : "text-ink-500 hover:text-brand-500",
                    )}
                  >
                    {crumb.title}
                  </Link>
                  <ChevronRight
                    className={cn("size-3.5", tone === "dark" ? "text-white/30" : "text-ink-300")}
                    aria-hidden
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
