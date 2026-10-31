import { cn } from "@/lib/utils";

const tones = {
  navy: "border-navy-900/10 bg-white text-navy-700",
  azure: "border-azure-500/20 bg-azure-50 text-azure-700",
  cyan: "border-cyan-500/25 bg-cyan-50 text-cyan-800",
  signal: "border-signal-500/25 bg-signal-50 text-signal-700",
  green: "border-emerald-500/25 bg-emerald-50 text-emerald-700",
  amber: "border-amber-500/30 bg-amber-50 text-amber-800",
  dark: "border-white/15 bg-white/5 text-white/80",
};

export function Chip({ tone = "navy", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function LiveDot({ className }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden>
      <span className="absolute inset-0 animate-ping-soft rounded-full bg-signal-500" />
      <span className="relative inline-flex size-2 rounded-full bg-signal-500" />
    </span>
  );
}
