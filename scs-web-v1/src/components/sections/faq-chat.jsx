"use client";

import { motion } from "motion/react";
import { Brain, Headset, Truck } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];
const experts = [Headset, Brain, Truck];

const bubble = (delay) => ({
  initial: { opacity: 0, y: 12, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease },
});

export function FaqChat() {
  const question = "Can we start with just one module?";
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {experts.map((Expert, index) => (
              <span
                key={index}
                className="grid size-9 place-items-center rounded-full border-2 border-ink-950 bg-linear-to-br from-brand-300 to-brand-600"
                style={{ zIndex: experts.length - index }}
              >
                <Expert className="size-4" aria-hidden />
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold">Still curious?</p>
            <p className="text-xs text-white/60">Our experts reply within 24 hours</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Online
        </span>
      </div>

      <div className="mt-6 space-y-3" aria-hidden>
        <motion.p
          {...bubble(0.2)}
          className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm text-ink-900"
        >
          {question}
        </motion.p>
        <motion.div
          {...bubble(0.7)}
          className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3"
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-1.5 animate-bounce rounded-full bg-white/70"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </motion.div>
        <motion.p
          {...bubble(1.4)}
          className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur"
        >
          Absolutely. Most teams start with the decision that costs them most, then scale across the platform.
        </motion.p>
      </div>
    </div>
  );
}
