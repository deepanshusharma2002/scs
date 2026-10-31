import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { IsoStack } from "@/components/visuals/iso-stack";
import { SpotlightCard } from "@/components/visuals/spotlight-card";
import { cn } from "@/lib/utils";

export function CardGrid({ items, columns = 3, tone = "light", featureFirst = false }) {
  const cols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];
  const light = tone === "light";

  return (
    <ul className={cn("grid gap-5", cols)}>
      {items.map((item, index) => {
        const featured = featureFirst && index === 0;
        return (
          <Reveal
            as="li"
            key={item.href}
            delay={(index % 4) * 0.06}
            className={cn(featured && "md:col-span-2 lg:row-span-2")}
          >
            <SpotlightCard
              href={item.href}
              tone={tone}
              className={cn("flex h-full flex-col p-7", featured && "md:p-10")}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl transition-all duration-300 group-hover:rotate-[-6deg]",
                    light
                      ? "bg-ink-950 text-white group-hover:bg-brand-500"
                      : "bg-white/10 text-brand-300 group-hover:bg-brand-500 group-hover:text-white",
                  )}
                >
                  <Icon name={item.icon} className="size-6" />
                </span>
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white",
                    light ? "border-ink-900/10 text-ink-400" : "border-white/15 text-white/40",
                  )}
                  aria-hidden
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              {featured && <IsoStack icon={item.icon} className="mx-auto my-6 max-w-64" />}
              {item.meta && (
                <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-brand-500 uppercase">
                  {item.meta}
                </p>
              )}
              <h3
                className={cn(
                  "font-semibold",
                  featured ? "mt-auto text-3xl" : "text-lg",
                  !featured && (item.meta ? "mt-2" : "mt-6"),
                  light ? "text-ink-950" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  featured && "text-base",
                  light ? "text-ink-600" : "text-white/60",
                )}
              >
                {item.description}
              </p>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </ul>
  );
}
