"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion(props) {
  return <AccordionPrimitive.Root {...props} />;
}

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item className={cn("border-b border-ink-900/10", className)} {...props} />
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink-900 transition-colors hover:text-brand-500",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-900/10 transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand-500 group-data-[state=open]:bg-brand-500 group-data-[state=open]:text-white">
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-ink-700/80 data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_200ms_ease-out]"
      {...props}
    >
      <div className={cn("pb-6 pr-14 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
