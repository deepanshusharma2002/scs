"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Card with a cursor-following glow and a subtle 3D tilt. */
export function SpotlightCard({ href, className, children, tilt = true, tone = "light", ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (tilt && !reduce) {
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const classes = cn(
    "group relative isolate block overflow-hidden rounded-3xl border transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform",
    tone === "light"
      ? "border-ink-900/10 bg-white hover:border-brand-500/40 hover:shadow-[0_30px_60px_-30px_rgb(233_79_28/0.45)]"
      : "border-white/10 bg-white/[0.04] hover:border-brand-500/50",
    className,
  );

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            tone === "light"
              ? "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(233 79 28 / 0.12), transparent 45%)"
              : "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(233 79 28 / 0.28), transparent 45%)",
        }}
      />
      {children}
    </>
  );

  if (href) {
    return (
      <Link ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={classes} {...props}>
      {content}
    </div>
  );
}
