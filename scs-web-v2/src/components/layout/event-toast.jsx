"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { eventPromo, isLive, matchesPath } from "@/content/promotions";
import { useNow, useStored } from "@/lib/use-stored";

const SCROLL_DEPTH_PX = 900;

/**
 * Non-blocking event promotion that slides in from the corner instead of a modal popup, and only
 * after the visitor has started reading, so it never covers the hero.
 */
export function EventToast() {
  const pathname = usePathname();
  const now = useNow();
  const [dismissed, setDismissed] = useStored(`3sc-v2:event:${eventPromo.id}`);
  const [ready, setReady] = useState(false);
  const eligible =
    now != null && !dismissed && isLive(eventPromo, now) && matchesPath(pathname, eventPromo.excludePaths);

  useEffect(() => {
    if (!eligible) return;
    let waited = false;
    let scrolled = false;
    const check = () => {
      if (waited && scrolled) setReady(true);
    };
    const onScroll = () => {
      if (window.scrollY < SCROLL_DEPTH_PX) return;
      scrolled = true;
      window.removeEventListener("scroll", onScroll);
      check();
    };
    const id = setTimeout(() => {
      waited = true;
      check();
    }, eventPromo.openDelayMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible]);

  if (!eligible || !ready) return null;

  return (
    <aside
      aria-label={eventPromo.name}
      className="fixed right-4 bottom-4 z-40 w-[calc(100vw-2rem)] max-w-sm animate-slide-up overflow-hidden rounded-xl border border-navy-900/10 bg-white shadow-float"
    >
      <div className="flex items-center justify-between bg-navy-950 px-4 py-2">
        <span className="font-mono text-[0.6875rem] tracking-wider text-cyan-300 uppercase">
          {eventPromo.tab}
        </span>
        <button
          type="button"
          onClick={() => setDismissed("1")}
          className="grid size-6 cursor-pointer place-items-center rounded text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Dismiss event"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
      <div className="p-4">
        <p className="font-display text-base leading-snug font-bold text-navy-950">{eventPromo.title}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden /> {eventPromo.dates}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden /> {eventPromo.location}
          </span>
        </div>
        <Link
          href={eventPromo.href}
          onClick={() => setDismissed("1")}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-600 hover:text-signal-700"
        >
          {eventPromo.cta} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
