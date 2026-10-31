"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { announcements, isLive } from "@/content/promotions";
import { useNow, useStored } from "@/lib/use-stored";
import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  const now = useNow();
  const [dismissed, setDismissed] = useStored(`3sc-v2:announcement:${announcements.id}`);
  const messages = announcements.messages.filter((message) => isLive(message, now));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = setInterval(() => setIndex((value) => (value + 1) % messages.length), 6000);
    return () => clearInterval(id);
  }, [messages.length]);

  if (!isLive(announcements, now) || dismissed || !messages.length) {
    return null;
  }

  const current = messages[index % messages.length];

  return (
    <div className="relative z-[51] bg-navy-950 text-white">
      <div className="container-x flex h-10 items-center justify-center gap-3 text-[0.8125rem]">
        <div className="flex min-w-0 items-center gap-3" aria-live="polite">
          <span className="hidden shrink-0 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wider text-cyan-300 uppercase sm:inline">
            {current.tag}
          </span>
          <p key={current.id} className="animate-fade-in truncate text-white/85">
            {current.text}
          </p>
          <Link
            href={current.href}
            className="hidden shrink-0 items-center gap-1 font-semibold text-white hover:text-cyan-200 sm:inline-flex"
          >
            {current.cta} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
        {messages.length > 1 && (
          <div className="ml-2 hidden items-center gap-1 md:flex" aria-hidden>
            {messages.map((message, position) => (
              <span
                key={message.id}
                className={cn(
                  "h-1 rounded-full transition-all",
                  position === index % messages.length ? "w-4 bg-cyan-300" : "w-1 bg-white/30",
                )}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setDismissed("1")}
          className="absolute right-3 grid size-7 cursor-pointer place-items-center rounded text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
