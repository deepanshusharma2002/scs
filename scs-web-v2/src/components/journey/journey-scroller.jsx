"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Pins the journey and scrolls its panels horizontally on large screens. On small screens or with
 * reduced motion the panels simply stack, so the content never depends on the animation.
 */
export function JourneyScroller({ stages, heading, children }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.round(self.progress * (stages.length - 1));
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
              }
            },
          },
        });
        triggerRef.current = tween.scrollTrigger;
        setPinned(true);
        return () => {
          triggerRef.current = null;
          setPinned(false);
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [stages.length] },
  );

  const jumpTo = (index) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      document.getElementById(`stage-${stages[index].id}`)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const top = trigger.start + ((trigger.end - trigger.start) * index) / (stages.length - 1);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-label="The supply chain journey"
      className="relative overflow-hidden bg-white lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <div className="absolute inset-0 -z-0 bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden />
      <div className="relative container-x pt-20 lg:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {heading}
          <ol className={cn("hidden items-center gap-1 rounded-xl border border-navy-900/10 bg-white p-1 shadow-card", pinned && "lg:flex")}>
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  aria-current={index === active ? "step" : undefined}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    index === active ? "bg-navy-900 text-white" : "text-navy-600 hover:bg-navy-50",
                  )}
                >
                  <Icon name={stage.icon} className="size-4" />
                  {stage.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className={cn("mt-6 hidden h-1 overflow-hidden rounded-full bg-navy-100", pinned && "lg:block")} aria-hidden>
          <div
            className="h-full rounded-full bg-gradient-to-r from-azure-600 to-cyan-400 transition-[width] duration-500"
            style={{ width: `${((active + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex flex-col gap-6 px-5 pt-10 pb-20 md:px-8 lg:w-max lg:flex-row lg:gap-8 lg:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))] lg:pt-8 lg:pb-12"
      >
        {children}
      </div>
    </section>
  );
}
