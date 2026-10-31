import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font-size tokens from globals.css; without this they are mistaken for text colours and dropped.
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["hero", "display", "headline", "title"] } },
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

/** Splits "Plain *accent* text" into parts so the starred words can be styled. */
export function accentParts(text) {
  return String(text)
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

export function pad(index) {
  return String(index + 1).padStart(2, "0");
}
