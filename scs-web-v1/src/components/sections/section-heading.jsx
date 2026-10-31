import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/visuals/text-reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  children,
}) {
  const dark = tone === "dark";
  const titleClass = cn(
    "mt-4 text-headline font-bold text-balance",
    dark ? "text-white" : "text-ink-950",
  );

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <p className={cn("eyebrow", dark && "text-brand-300")}>
            <span className="h-px w-6 bg-current" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      {typeof title === "string" ? (
        <TextReveal
          text={title}
          className={titleClass}
          accentClassName={dark ? "text-brand-300" : "text-brand-500"}
        />
      ) : (
        <Reveal>
          <h2 className={titleClass}>{title}</h2>
        </Reveal>
      )}
      {(description || children) && (
        <Reveal delay={0.1}>
          {description && (
            <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/65" : "text-ink-600")}>
              {description}
            </p>
          )}
          {children}
        </Reveal>
      )}
    </div>
  );
}
