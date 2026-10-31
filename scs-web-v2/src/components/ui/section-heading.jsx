import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/ui/accent-text";
import { cn } from "@/lib/utils";

/**
 * Numbered kicker + title + description. `index` renders as "01 /" so long pages read like a
 * guided journey.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <p className={cn("kicker", dark && "text-cyan-300", align === "center" && "justify-center")}>
          {index && <span className={dark ? "text-white/40" : "text-navy-400"}>{index} /</span>}
          {kicker}
        </p>
      )}
      <Tag
        className={cn(
          "mt-4 text-headline font-bold text-balance",
          dark ? "text-white" : "text-navy-950",
        )}
      >
        <AccentText text={title} tone={tone} />
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            dark ? "text-white/70" : "text-navy-600",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
