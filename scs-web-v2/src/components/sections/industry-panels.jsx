"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { industryDetails } from "@/content/industries";
import { industries } from "@/content/sitemap";
import { cn } from "@/lib/utils";

/** Expanding image panels on desktop; a swipeable card row on mobile. */
export function IndustryPanels() {
  const items = industries.children ?? [];
  const [activeSlug, setActiveSlug] = useState(items[0].slug);

  return (
    <>
      <div className="hidden h-[34rem] gap-2 lg:flex">
        {items.map((industry) => {
          const active = industry.slug === activeSlug;
          const detail = industryDetails[industry.slug];
          return (
            <div
              key={industry.slug}
              onMouseEnter={() => setActiveSlug(industry.slug)}
              onFocusCapture={() => setActiveSlug(industry.slug)}
              className={cn(
                "group relative isolate overflow-hidden rounded-xl bg-navy-900 transition-[flex-grow] duration-500 ease-out",
                active ? "grow-[5]" : "grow",
              )}
              style={{ flexBasis: 0 }}
            >
              <Image
                src={industry.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn(
                  "-z-10 object-cover transition-all duration-700",
                  active ? "scale-100 opacity-70" : "scale-110 opacity-40 grayscale",
                )}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" aria-hidden />

              {!active && (
                <button
                  type="button"
                  onClick={() => setActiveSlug(industry.slug)}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-end gap-4 pb-8 text-white"
                  aria-label={`Show ${industry.title}`}
                >
                  <Icon name={industry.icon} className="size-5 text-cyan-300" />
                  <span className="font-display text-sm font-bold whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                    {industry.menuTitle ?? industry.title}
                  </span>
                </button>
              )}

              {active && (
                <div className="absolute inset-0 flex animate-fade-in flex-col justify-end p-8 text-white">
                  <span className="grid size-11 place-items-center rounded-lg bg-white/10 text-cyan-300 backdrop-blur">
                    <Icon name={industry.icon} className="size-5" />
                  </span>
                  <p className="kicker mt-5 text-cyan-300">{industry.title}</p>
                  <h3 className="mt-2 max-w-md text-title font-bold text-balance">{detail?.headline}</h3>
                  <ul className="mt-5 grid max-w-xl gap-2 sm:grid-cols-3">
                    {(detail?.challenges ?? []).map((challenge) => (
                      <li key={challenge.title} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm backdrop-blur">
                        <span className="font-semibold">{challenge.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${industries.basePath}/${industry.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-cyan-50"
                  >
                    Explore {industry.menuTitle ?? industry.title} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 scrollbar-none md:-mx-8 md:px-8 lg:hidden">
        {items.map((industry) => (
          <li key={industry.slug} className="w-[80%] shrink-0 snap-start sm:w-[45%]">
            <Link
              href={`${industries.basePath}/${industry.slug}`}
              className="relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-navy-900 p-5 text-white"
            >
              <Image src={industry.image} alt="" fill sizes="80vw" className="-z-10 object-cover opacity-60" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />
              <Icon name={industry.icon} className="size-5 text-cyan-300" />
              <p className="mt-3 font-display text-lg font-bold">{industry.title}</p>
              <p className="mt-1 text-sm text-white/70">{industryDetails[industry.slug]?.headline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
