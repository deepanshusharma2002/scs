"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

/** In-page anchor bar that tracks the section currently being read. */
export function StickySubnav({ items, title }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-16 z-40 border-b border-navy-900/8 bg-white/90 backdrop-blur-xl lg:top-18">
      <div className="container-x flex h-13 items-center gap-6">
        {title && (
          <p className="hidden shrink-0 font-display text-sm font-bold text-navy-950 xl:block">{title}</p>
        )}
        <nav aria-label="On this page" className="-mx-1 min-w-0 flex-1 overflow-x-auto scrollbar-none">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative flex h-13 items-center px-3 text-sm font-medium whitespace-nowrap transition-colors",
                    active === item.id ? "text-navy-950" : "text-navy-500 hover:text-navy-800",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-azure-600 transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={siteConfig.demoHref}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-signal-600 hover:text-signal-700 md:inline-flex"
        >
          Book a demo <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
