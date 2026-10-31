import { Icon } from "@/components/icon";
import { AppWindow } from "@/components/ui/app-window";
import { stages } from "@/content/journey";
import { cn } from "@/lib/utils";

/** Compact Plan → Deliver infographic showing how many modules a section offers per stage. */
export function StageFlow({ title, counts, foundationCount = 0 }) {
  return (
    <AppWindow title={`${title} · coverage`} meta="Plan → Deliver">
      <ol className="grid grid-cols-5 gap-1.5">
        {stages.map((stage, index) => {
          const count = counts[stage.id] ?? 0;
          return (
            <li key={stage.id} className="relative">
              <div
                className={cn(
                  "flex h-full flex-col items-center rounded-lg border px-1 py-3 text-center",
                  count ? "border-azure-500/30 bg-azure-50" : "border-navy-900/8 bg-navy-50/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-md",
                    count ? "bg-azure-600 text-white" : "bg-white text-navy-400",
                  )}
                >
                  <Icon name={stage.icon} className="size-4" />
                </span>
                <span className="mt-2 text-[0.6875rem] font-semibold text-navy-800">{stage.label}</span>
                <span className="font-display text-xl font-extrabold text-navy-950">{count}</span>
                <span className="font-mono text-[0.5625rem] text-navy-400 uppercase">modules</span>
              </div>
              {index < stages.length - 1 && (
                <span className="absolute top-7 -right-1.5 z-10 h-px w-1.5 bg-azure-500" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-navy-900 px-3 py-2.5 text-white">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <Icon name="database" className="size-4 text-cyan-300" /> Shared data & AI foundation
        </span>
        <span className="font-mono text-xs text-white/70">{foundationCount} modules</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-100" aria-hidden>
        <div className="h-full w-full origin-left animate-grow-x rounded-full bg-gradient-to-r from-azure-600 via-azure-400 to-cyan-400" />
      </div>
    </AppWindow>
  );
}
