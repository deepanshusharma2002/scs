"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/icon";

export function CardCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink-900/15 text-ink-900 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink-900/15 text-ink-900 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {items.map((item) => (
            <li
              key={item.href}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pr-5 sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-ink-900/10 bg-white p-7 transition-colors hover:border-brand-500/40"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <ArrowUpRight className="size-5 text-ink-300 group-hover:text-brand-500" />
                </div>
                <h3 className="mt-6 font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
