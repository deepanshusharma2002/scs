"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { parseAccent, stripAccent } from "./accent-text";

/** Word-by-word masked reveal; "*word*" renders as a serif accent. */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  accentClassName = "text-brand-500",
  delay = 0,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Observe the heading itself: each word starts clipped by its mask, which an observer on the word would never see.
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const shown = reduce || inView;

  const words = parseAccent(text).flatMap((part) =>
    part.text
      .split(/(\s+)/)
      .filter((word) => word.length)
      .map((word) => ({ word, accent: part.accent })),
  );
  let index = 0;

  return (
    <Tag ref={ref} className={className} aria-label={stripAccent(text)}>
      {words.map((item, position) => {
        if (/^\s+$/.test(item.word)) return <span key={position}> </span>;
        const order = index++;
        return (
          <span
            key={position}
            aria-hidden
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={cn("inline-block", item.accent && cn("accent pr-[0.06em]", accentClassName))}
              initial={reduce ? false : { y: "110%" }}
              animate={shown ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.7, delay: delay + order * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
