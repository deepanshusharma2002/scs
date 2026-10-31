import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font-size tokens from globals.css; without this they are mistaken for text colours and dropped.
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["mega", "display", "headline", "title"] } },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
