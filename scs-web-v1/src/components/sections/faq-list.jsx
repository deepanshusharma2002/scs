"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

export function FaqList({ faqs }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ul className="space-y-3">
      {faqs.map((faq, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <motion.li
            key={faq.question}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.07, ease }}
            className={cn(
              "relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300",
              expanded
                ? "border-brand-500/30 bg-white shadow-[0_30px_60px_-35px_rgb(233_79_28/0.5)]"
                : "border-ink-900/5 bg-ink-50 hover:border-ink-900/10 hover:bg-white",
            )}
          >
            <span
              className={cn(
                "absolute inset-y-0 left-0 w-1 origin-top bg-linear-to-b from-brand-400 to-brand-600 transition-transform duration-500",
                expanded ? "scale-y-100" : "scale-y-0",
              )}
              aria-hidden
            />
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="group flex w-full cursor-pointer items-center gap-5 px-6 py-5 text-left md:px-7"
              >
                <span
                  className={cn(
                    "w-9 shrink-0 font-serif text-2xl italic transition-colors duration-300",
                    expanded ? "text-brand-500" : "text-ink-300 group-hover:text-ink-500",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 text-base font-semibold transition-colors md:text-lg",
                    expanded ? "text-ink-950" : "text-ink-800 group-hover:text-ink-950",
                  )}
                >
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "relative grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    expanded
                      ? "rotate-180 border-brand-500 bg-brand-500 text-white"
                      : "border-ink-900/10 bg-white text-ink-700 group-hover:border-ink-900/25",
                  )}
                  aria-hidden
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span
                    className={cn(
                      "absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300",
                      expanded && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="pr-6 pb-6 pl-6 leading-relaxed text-ink-600 md:pr-16 md:pl-[5.25rem]"
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
