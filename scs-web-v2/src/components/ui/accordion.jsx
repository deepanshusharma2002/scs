"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion(props) {
  return <AccordionPrimitive.Root {...props} />;
}

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "rounded-xl border border-navy-900/10 bg-white transition-colors data-[state=open]:border-azure-500/40 data-[state=open]:shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-semibold text-navy-900 md:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-navy-50 text-navy-600 transition-all group-hover:bg-azure-50 group-hover:text-azure-600 group-data-[state=open]:rotate-180 group-data-[state=open]:bg-azure-600 group-data-[state=open]:text-white">
          <ChevronDown className="size-4" aria-hidden />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-navy-600 data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_200ms_ease-out]"
      {...props}
    >
      <div className={cn("px-6 pb-6 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
