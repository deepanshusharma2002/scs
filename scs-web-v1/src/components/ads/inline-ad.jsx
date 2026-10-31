import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/visuals/accent-text";
import { IsoStack } from "@/components/visuals/iso-stack";
import { inlineAds } from "@/content/promotions";
import { cn } from "@/lib/utils";

export function InlineAd({ variant = "whitepaper", compact = false, className }) {
  const ad = inlineAds[variant];
  if (!ad) return null;

  return (
    <Reveal className={className}>
      <aside
        aria-label={ad.tag}
        className={cn(
          "group relative isolate overflow-hidden rounded-[2rem] bg-ember text-white",
          compact ? "p-7 md:p-9" : "p-8 md:p-12",
        )}
      >
        <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
        <span
          className="absolute inset-y-0 left-0 -z-10 w-1/3 animate-shine bg-linear-to-r from-transparent via-white/[0.07] to-transparent"
          aria-hidden
        />
        <div className={cn("grid items-center gap-8", !compact && "lg:grid-cols-12")}>
          <div className={cn(!compact && "lg:col-span-8")}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-300" />
              {ad.tag}
            </span>
            <h3 className={cn("mt-5 font-semibold text-balance", compact ? "text-2xl" : "text-headline")}>
              <AccentText text={ad.title} accentClassName="text-brand-300" />
            </h3>
            <p className="mt-4 max-w-2xl text-white/70">{ad.description}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {ad.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="size-4 text-brand-300" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={ad.href}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-950 transition-all hover:gap-3 hover:bg-brand-50"
            >
              {ad.cta} <ArrowRight className="size-4" />
            </Link>
          </div>
          {!compact && (
            <div className="hidden lg:col-span-4 lg:block">
              <IsoStack tone="glass" icon={ad.icon} className="mx-auto max-w-72" />
            </div>
          )}
        </div>
      </aside>
    </Reveal>
  );
}
