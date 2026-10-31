"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** A connector that draws itself as its container scrolls through the viewport. */
export function DrawLine({ className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={cn("h-0.5 overflow-hidden rounded-full bg-ink-900/10", className)} aria-hidden>
      <motion.div
        className="h-full origin-left rounded-full bg-linear-to-r from-brand-600 via-brand-500 to-brand-300"
        style={{ scaleX: reduce ? 1 : scale }}
      />
    </div>
  );
}
