"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBER = /\d+(?:\.\d+)?/g;

/** Animates every number inside a value such as "15-25%" or "20K+". */
export function CountUp({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const animatable = !value.includes("/") && /\d/.test(value);
  const [progress, setProgress] = useState(animatable ? 0 : 1);
  useEffect(() => {
    if (!inView || !animatable || reduce) return;
    const controls = animate(0, 1, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [inView, animatable, reduce]);
  const display =
    reduce || progress >= 1
      ? value
      : value.replace(NUMBER, (match) => {
          const target = Number(match);
          const decimals = match.includes(".") ? match.split(".")[1].length : 0;
          return (target * progress).toFixed(decimals);
        });
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
