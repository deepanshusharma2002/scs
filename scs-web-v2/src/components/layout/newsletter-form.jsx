"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="mt-8 flex items-center gap-2 text-sm text-cyan-200" role="status">
        <CircleCheck className="size-4" aria-hidden /> You&apos;re subscribed to the 3SC brief.
      </p>
    );
  }

  return (
    <form
      className="mt-8 max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        // Submission is stubbed until a marketing automation endpoint is available.
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="kicker text-white/55">
        The monthly supply chain brief
      </label>
      <div className="mt-3 flex rounded-lg border border-white/15 bg-white/5 p-1 focus-within:border-cyan-300/60">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Work email"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md bg-white px-3 text-sm font-semibold text-navy-900 hover:bg-cyan-100"
        >
          Subscribe <ArrowRight className="size-3.5" aria-hidden />
        </button>
      </div>
    </form>
  );
}
