import { clients, integrations } from "@/content/home";
import { cn } from "@/lib/utils";

/** Text wordmarks until approved logo artwork is supplied. */
export function LogoMarquee({ items = clients, className }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={cn("relative overflow-hidden mask-fade-x", className)}>
      <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
        {[...row, ...row].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="font-display text-2xl font-extrabold tracking-tight whitespace-nowrap text-navy-900/35"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntegrationsRow({ className, tone = "light" }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Integrations">
      {integrations.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-md border px-3 py-1.5 font-mono text-xs",
            tone === "dark" ? "border-white/15 text-white/70" : "border-navy-900/10 bg-white text-navy-600",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
