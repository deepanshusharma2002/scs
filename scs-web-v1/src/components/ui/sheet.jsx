"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;

export const SheetTrigger = DialogPrimitive.Trigger;

export const SheetClose = DialogPrimitive.Close;

export const SheetTitle = DialogPrimitive.Title;

export function SheetContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl outline-none data-[state=open]:animate-[slide-in-right_250ms_ease-out]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-5 right-5 grid size-10 cursor-pointer place-items-center rounded-full text-ink-900 hover:bg-ink-50"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
