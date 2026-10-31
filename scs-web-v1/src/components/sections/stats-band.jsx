import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function StatsBand({ stats, tone = "ember", title, className }) {
  const cols =
    stats.length >= 4 ? "lg:grid-cols-4" : stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  const light = tone === "light";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        tone === "ember" && "bg-ember text-white",
        tone === "dark" && "bg-ink-950 text-white",
        tone === "brand" && "bg-brand-500 text-white",
        light && "bg-white",
        className,
      )}
    >
      {!light && <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden />}
      <div className="container-x py-16 md:py-24">
        {title && (
          <p
            className={cn(
              "mb-12 text-center text-sm font-semibold tracking-[0.16em] uppercase",
              light ? "text-ink-400" : "text-white/55",
            )}
          >
            {title}
          </p>
        )}
        <dl className={cn("grid grid-cols-2", cols)}>
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className={cn(
                "relative px-4 py-6 md:px-8",
                index > 0 && "lg:border-l",
                index % 2 === 1 && "border-l lg:border-l",
                index >= 2 && "border-t lg:border-t-0",
                light ? "border-ink-900/10" : "border-white/15",
              )}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className={cn(
                    "block text-5xl font-bold tracking-tighter md:text-6xl",
                    light ? "text-ink-950" : "text-white",
                  )}
                />
                <span
                  className={cn(
                    "mt-3 block max-w-[14rem] text-sm leading-snug md:text-base",
                    light ? "text-ink-600" : "text-white/70",
                  )}
                >
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
