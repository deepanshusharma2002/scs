"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {items.map((item, index) => (
            <li
              key={item.quote}
              className="min-w-0 shrink-0 grow-0 basis-full pr-5 md:basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              <figure className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-8 shadow-[0_20px_50px_-35px_rgb(10_10_10/0.4)]">
                <Quote className="size-8 text-brand-500" aria-hidden />
                <blockquote className="mt-6 flex-1 text-xl leading-relaxed text-ink-800">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-ink-900/10 pt-6">
                  <p className="font-semibold text-ink-950">{item.name}</p>
                  <p className="text-sm text-ink-500">{item.company}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink-900/15 text-ink-950 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink-900/15 text-ink-950 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-5" />
        </button>
        <div className="ml-4 flex gap-2" aria-hidden>
          {items.map((item, index) => (
            <span
              key={item.quote}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === selected ? "w-8 bg-brand-500" : "w-1.5 bg-ink-900/20",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
