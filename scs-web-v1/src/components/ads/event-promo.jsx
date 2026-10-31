"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { DottedMap } from "@/components/visuals/dotted-map";
import { eventPromo as event, isLive, matchesPath } from "@/content/promotions";
import { useNow } from "@/lib/use-stored";

const sessionKey = `3sc:event:${event.id}`;

function seenThisSession() {
  try {
    return window.sessionStorage.getItem(sessionKey) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(sessionKey, "1");
  } catch {
    // Without session storage the card may auto-open again on the next page, which is acceptable.
  }
}

/** Edge tab that slides out into an event card, in the style of a conference promo. */
export function EventPromo() {
  const pathname = usePathname();
  const now = useNow();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const live = isLive(event, now) && matchesPath(pathname, event.excludePaths);

  useEffect(() => {
    if (!live || seenThisSession()) return;
    const timer = setTimeout(() => {
      markSeen();
      setOpen(true);
    }, event.openDelayMs);
    return () => clearTimeout(timer);
  }, [live]);

  if (!live) return null;

  const close = () => {
    markSeen();
    setOpen(false);
  };

  return (
    <div className="fixed top-1/2 left-0 z-40 -translate-y-1/2">
      <AnimatePresence>
        {!open && (
          <motion.button
            key="tab"
            type="button"
            onClick={() => setOpen(true)}
            initial={reduce ? false : { x: -48 }}
            animate={{ x: 0 }}
            exit={{ x: -48 }}
            transition={{ duration: 0.3 }}
            className="group flex cursor-pointer items-center rounded-r-xl bg-brand-500 px-2 py-4 text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-600"
            aria-label={`Open: ${event.title}`}
          >
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase [writing-mode:vertical-rl] rotate-180">
              {event.tab}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="card"
            aria-label={event.title}
            initial={reduce ? { opacity: 0 } : { x: "-105%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "-105%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 w-[17rem] -translate-y-1/2 sm:w-[18rem]"
          >
            <div className="relative overflow-hidden rounded-r-2xl bg-white shadow-[0_30px_60px_-20px_rgb(10_10_10/0.45)] ring-1 ring-ink-900/10">
              <Link href={event.href} onClick={close} className="group block">
                <div className="relative isolate h-40 overflow-hidden bg-ember px-5 pt-5">
                  <DottedMap className="absolute inset-x-0 -bottom-6 -z-10 opacity-60" />
                  <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/80 via-ink-950/40 to-transparent" aria-hidden />
                  <p className="text-[11px] font-semibold tracking-wide text-white/80">
                    <span className="font-extrabold text-brand-300">3SC</span> {event.presenter}
                  </p>
                  <p className="mt-1 text-[1.65rem] leading-[1.05] font-extrabold tracking-tight text-white">
                    {event.name}
                  </p>
                  <p className="absolute inset-x-0 bottom-0 bg-ink-950/70 px-5 py-2 text-[10px] font-semibold tracking-[0.2em] text-brand-200 uppercase backdrop-blur">
                    {event.location} | {event.dates}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-lg leading-snug font-semibold text-ink-950 transition-colors group-hover:text-brand-600">
                    {event.title}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-brand-500 uppercase">
                    {event.cta}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
            <button
              type="button"
              onClick={close}
              className="absolute -top-3 -right-3 grid size-8 cursor-pointer place-items-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-ink-900/10 transition-colors hover:text-ink-950"
              aria-label="Close event promotion"
            >
              <X className="size-4" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
