/** Splits "*word*" markers into serif-italic accent spans. */
export function parseAccent(text) {
  return String(text)
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

export function AccentText({ text, accentClassName = "text-brand-500" }) {
  return parseAccent(text).map((part, index) =>
    part.accent ? (
      <em key={index} className={`accent ${accentClassName}`}>
        {part.text}
      </em>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

export function stripAccent(text) {
  return String(text).replace(/\*/g, "");
}
