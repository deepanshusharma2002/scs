import { cn } from "@/lib/utils";

export function Logo({ variant = "dark", className }) {
  const ink = variant === "dark" ? "#252425" : "#ffffff";

  return (
    <svg viewBox="0 0 104 32" role="img" aria-label="3SC" className={cn("h-8 w-auto", className)}>
      <rect x="5" y="0" width="31" height="27" fill={ink} />
      <rect x="0" y="20" width="24" height="12" fill={ink} />
      <path d="M3 11h21v18h-9V19H3z" fill="#e94f1c" />
      <text
        x="44"
        y="26"
        fill={ink}
        fontFamily="var(--font-poppins), sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="0.5"
      >
        3SC
      </text>
    </svg>
  );
}
