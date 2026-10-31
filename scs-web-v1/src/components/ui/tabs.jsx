"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function Tabs(props) {
  return <TabsPrimitive.Root {...props} />;
}

export function TabsList({ className, ...props }) {
  return <TabsPrimitive.List className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />;
}
