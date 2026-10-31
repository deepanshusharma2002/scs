"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { announcements, isLive } from "@/content/promotions";
import { useNow, useStored } from "@/lib/use-stored";

export function AnnouncementBar() {
  const now = useNow();
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useStored(`3sc:announce:${announcements.id}`);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const messages = isLive(announcements, now)
    ? announcements.messages.filter((message) => isLive(message, now))
    : [];

  useEffect(() => {
    if (reduce || paused || messages.length < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % messages.length), 5000);
    return () => clearInterval(timer);
  }, [reduce, paused, messages.length]);

  if (dismissed || messages.length === 0) return null;
  const message = messages[index % messages.length];

  return (
    <div
      className="relative z-50 overflow-hidden bg-ember text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Announcements"
    >
      <span className="absolute inset-y-0 left-0 w-1/4 animate-shine bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden />
      <div className="container-x relative flex h-10 items-center justify-center gap-3 pr-10 text-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={message.id}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="hidden shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase sm:inline">
              {message.tag}
            </span>
            <span className="truncate text-white/90">{message.text}</span>
            <Link
              href={message.href}
              className="group inline-flex shrink-0 items-center gap-1 font-semibold text-brand-200 hover:text-white"
            >
              {message.cta}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </AnimatePresence>
        {messages.length > 1 && (
          <div className="absolute left-5 hidden gap-1 md:flex" aria-hidden>
            {messages.map((item, position) => (
              <span
                key={item.id}
                className={`h-1 rounded-full transition-all ${position === index % messages.length ? "w-4 bg-brand-400" : "w-1 bg-white/30"}`}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setDismissed("1")}
          className="absolute right-3 grid size-7 cursor-pointer place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcements"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
