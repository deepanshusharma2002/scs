"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBER = /\d+(?:\.\d+)?/g;

/** Animates every number inside a value such as "15-25%" or "20K+"; years and ratios stay static. */
export function CountUp({ value, className, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const animatable = /\d/.test(value) && !/\/|^(19|20)\d\d$/.test(value);
  // Server HTML and no-JS visitors get the real value; the count-up starts once it scrolls into view.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!inView || !animatable || reduce) return;
    const controls = animate(0, 1, { duration, ease: [0.2, 0.7, 0.2, 1], onUpdate: setProgress });
    return () => controls.stop();
  }, [inView, animatable, reduce, duration]);

  const display =
    reduce || !animatable || progress >= 1
      ? value
      : value.replace(NUMBER, (match) => {
          const decimals = match.includes(".") ? match.split(".")[1].length : 0;
          return (Number(match) * progress).toFixed(decimals);
        });

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
