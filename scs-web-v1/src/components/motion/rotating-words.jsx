"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function RotatingWords({ words, className }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, [reduce, words.length]);

  return (
    <span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="relative inline-grid">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-0.4em" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn("col-start-1 row-start-1", className)}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
