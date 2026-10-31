import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/ui/chip";

/** Product-UI frame used by every mockup so they read as one product family. */
export function AppWindow({ title, meta, live, className, bodyClassName, children }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-navy-900/10 bg-white shadow-float",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-navy-900/8 bg-navy-50/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-navy-200" />
          <span className="size-2.5 rounded-full bg-navy-200" />
          <span className="size-2.5 rounded-full bg-navy-200" />
        </span>
        <span className="truncate font-mono text-[0.6875rem] tracking-wide text-navy-500 uppercase">
          {title}
        </span>
        {(meta || live) && (
          <span className="ml-auto flex items-center gap-2 font-mono text-[0.6875rem] text-navy-500">
            {live && <LiveDot />}
            {meta}
          </span>
        )}
      </div>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
}
