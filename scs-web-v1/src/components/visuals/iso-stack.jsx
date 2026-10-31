import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const tones = {
  brand: {
    glow: "bg-brand-500/35",
    base: "border-2 border-brand-300/70 bg-white/50 backdrop-blur-sm",
    mid: "bg-linear-to-br from-brand-400 to-brand-700 shadow-[inset_0_0_0_6px_rgb(255_255_255/0.18)]",
    top: "bg-linear-to-br from-brand-300 via-brand-400 to-brand-600",
    icon: "text-white",
  },
  ink: {
    glow: "bg-ink-950/25",
    base: "border-2 border-ink-300 bg-white/60 backdrop-blur-sm",
    mid: "bg-linear-to-br from-ink-600 to-ink-950 shadow-[inset_0_0_0_6px_rgb(255_255_255/0.08)]",
    top: "bg-linear-to-br from-brand-300 via-brand-500 to-brand-700",
    icon: "text-white",
  },
  glass: {
    glow: "bg-brand-500/40",
    base: "border-2 border-white/30 bg-white/5",
    mid: "bg-linear-to-br from-white/25 to-white/5 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)]",
    top: "bg-linear-to-br from-brand-300 via-brand-500 to-brand-700",
    icon: "text-white",
  },
};

/** Isometric stack of floating layers echoing the 3SC brand art. Lifts apart on hover. */
export function IsoStack({ tone = "brand", icon, layers = 3, float = true, className }) {
  const palette = tones[tone] ?? tones.brand;
  const stack = [palette.base, ...Array.from({ length: Math.max(1, layers - 2) }, () => palette.mid), palette.top];

  return (
    <div
      className={cn(
        "group/iso relative aspect-square w-full [--gap:22px] hover:[--gap:40px]",
        className,
      )}
      aria-hidden
    >
      <div className={cn("absolute inset-0 grid place-items-center", float && "animate-float")}>
        <div
          className="relative size-[56%]"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-45deg)" }}
        >
          <div className={cn("absolute inset-[-8%] rounded-[22%] blur-2xl", palette.glow)} />
          {stack.map((layer, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-[18%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                layer,
              )}
              style={{ transform: `translateZ(calc(${index} * var(--gap)))` }}
            >
              {index === stack.length - 1 && (
                <>
                  <span className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-linear-to-r from-transparent via-white/45 to-transparent" />
                  <span className="absolute inset-[14%] rounded-[14%] border border-white/35" />
                  {icon && (
                    <span className="absolute inset-0 grid place-items-center">
                      <Icon name={icon} className={cn("size-[34%] rotate-45", palette.icon)} />
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <span className="absolute top-[18%] right-[16%] size-1.5 animate-pulse rounded-full bg-brand-400" />
      <span className="absolute bottom-[22%] left-[14%] size-1 animate-pulse rounded-full bg-brand-300 [animation-delay:700ms]" />
      <span className="absolute top-[40%] left-[8%] size-1 animate-pulse rounded-full bg-ink-400 [animation-delay:1400ms]" />
    </div>
  );
}
