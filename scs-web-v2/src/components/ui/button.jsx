import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  {
    variants: {
      variant: {
        primary:
          "bg-signal-600 text-white shadow-[0_8px_20px_-8px_rgb(201_61_16/0.6)] hover:bg-signal-700 [&_svg:last-child]:hover:translate-x-0.5",
        navy: "bg-navy-900 text-white hover:bg-navy-800 [&_svg:last-child]:hover:translate-x-0.5",
        blue: "bg-azure-600 text-white hover:bg-azure-700 [&_svg:last-child]:hover:translate-x-0.5",
        outline:
          "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-navy-50 [&_svg:last-child]:hover:translate-x-0.5",
        ghost: "text-navy-800 hover:bg-navy-900/5",
        light: "bg-white text-navy-900 hover:bg-azure-50 [&_svg:last-child]:hover:translate-x-0.5",
        "outline-light":
          "border border-white/25 text-white hover:border-white/50 hover:bg-white/10 [&_svg:last-child]:hover:translate-x-0.5",
        link: "px-0 text-azure-600 hover:text-azure-800 [&_svg:last-child]:hover:translate-x-0.5",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-6 text-base",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, href, ...props }) {
  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
