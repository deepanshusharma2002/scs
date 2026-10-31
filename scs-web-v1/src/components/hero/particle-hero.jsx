"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IsoStack } from "@/components/visuals/iso-stack";
import { Magnetic } from "@/components/visuals/magnetic";
import { TextReveal } from "@/components/visuals/text-reveal";
import { hero } from "@/content/home";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ParticleField = dynamic(() => import("./particle-field"), { ssr: false });

let webglCache;
function detectWebGL() {
  if (webglCache === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglCache = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const noop = () => () => {};

/** Maps raw scroll progress to morph progress, leaving short holds at both ends. */
const toMorph = (scroll) => Math.min(1, Math.max(0, (scroll - 0.08) / 0.8));
const stageOf = (morph) => (morph < 0.25 ? 0 : morph < 0.75 ? 1 : 2);

export function ParticleHero() {
  const section = useRef(null);
  const progress = useRef(0);
  const [host, setHost] = useState(null);
  const attach = useCallback((node) => {
    section.current = node;
    setHost(node);
  }, []);
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(noop, detectWebGL, () => false);
  const immersive = webgl && !reduce;

  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!immersive || !section.current) return;
    let onScreen = true;
    const update = () => setActive(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(section.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [immersive]);

  useEffect(() => {
    if (immersive || reduce) return;
    const timer = setInterval(() => setStage((current) => (current + 1) % 3), 3200);
    return () => clearInterval(timer);
  }, [immersive, reduce]);

  useGSAP(
    () => {
      if (!immersive) return;
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const morph = toMorph(self.progress);
          progress.current = morph;
          section.current?.style.setProperty("--hero-p", morph.toFixed(4));
          const next = stageOf(morph);
          setStage((current) => (current === next ? current : next));
        },
      });
    },
    { dependencies: [immersive], scope: section },
  );

  const goToStage = (index) => {
    if (!immersive || !section.current) {
      setStage(index);
      return;
    }
    const el = section.current;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (0.08 + (index / 2) * 0.8) * travel + 2, behavior: "smooth" });
  };

  const shown = reduce ? 2 : stage;
  const current = hero.stages[shown];

  return (
    <section
      ref={attach}
      className={cn("relative bg-white", immersive ? "h-[260vh]" : "")}
      style={{ "--hero-p": 0 }}
      aria-label="3SC: Data to Intelligence to Business Insight"
    >
      <div className={cn("relative h-svh min-h-[640px] overflow-hidden", immersive && "sticky top-0")}>
        <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(70%_60%_at_70%_50%,black,transparent)]" aria-hidden />
        <div className="absolute top-1/2 right-[-10%] size-[60rem] -translate-y-1/2 bg-glow" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 h-[52%] lg:inset-y-0 lg:right-0 lg:left-[36%] lg:h-full">
          <div
            className={cn(
              "absolute inset-0 grid place-items-center transition-opacity duration-700",
              immersive && ready ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <IsoStack className="max-w-[26rem]" icon="brain" />
          </div>
          {immersive && host && (
            <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
              <ParticleField
                progressRef={progress}
                active={active}
                onReady={() => setReady(true)}
                eventSource={host}
              />
            </div>
          )}
        </div>

        <div className="container-x relative z-10 flex h-full flex-col justify-start pt-28 lg:justify-center lg:pt-18">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-current" aria-hidden />
              {hero.eyebrow}
            </p>
            <TextReveal
              as="h1"
              text={hero.title}
              className="mt-5 text-mega font-bold text-ink-950"
              accentClassName="text-gradient"
            />

            <div className="mt-8">
              <p className="text-lg font-semibold text-ink-900 md:text-xl">{hero.lead}</p>
              <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-lg md:text-2xl">
                {hero.stages.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToStage(index)}
                      aria-current={index === shown ? "step" : undefined}
                      className={cn(
                        "relative cursor-pointer rounded-full px-1 font-medium transition-colors duration-500",
                        index === shown ? "text-brand-500" : "text-ink-400 hover:text-ink-700",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-1 -bottom-1 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-500",
                          index === shown ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </button>
                    {index < hero.stages.length - 1 && (
                      <ArrowRight className="size-4 text-brand-500 md:size-5" aria-hidden />
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-4 min-h-[3.5rem] max-w-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="text-base leading-relaxed text-ink-600 md:text-lg"
                  >
                    {current.caption}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href={siteConfig.demoHref} size="lg">
                  Request a Demo <ArrowRight />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="/platforms" variant="outline" size="lg">
                  Explore Platform
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          <div className="pointer-events-none absolute right-5 bottom-8 z-10 hidden md:right-8 lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.stat.label}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-ink-900/10 bg-white/80 px-5 py-4 shadow-[0_20px_50px_-25px_rgb(10_10_10/0.35)] backdrop-blur-md"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                  {current.label}
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-ink-950">{current.stat.value}</p>
                <p className="text-sm text-ink-600">{current.stat.label}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {immersive && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 lg:bottom-8">
            <div className="flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((index) => (
                <span key={index} className="h-1 w-10 overflow-hidden rounded-full bg-ink-900/10">
                  <span
                    className="block h-full rounded-full bg-brand-500"
                    style={{ width: `calc(clamp(0, var(--hero-p) * 3 - ${index}, 1) * 100%)` }}
                  />
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] text-ink-500 uppercase">
              Scroll to transform <ChevronDown className="size-3.5 animate-bounce" aria-hidden />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
