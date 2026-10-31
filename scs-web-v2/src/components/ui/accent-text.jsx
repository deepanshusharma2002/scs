import { accentParts, cn } from "@/lib/utils";

/** Renders "*starred*" words in the accent gradient. */
export function AccentText({ text, tone = "light", className }) {
  return accentParts(text).map((part, index) =>
    part.accent ? (
      <span
        key={index}
        className={cn(tone === "dark" ? "text-accent-light" : "text-accent", className)}
      >
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

export function plainText(text) {
  return String(text).replaceAll("*", "");
}
