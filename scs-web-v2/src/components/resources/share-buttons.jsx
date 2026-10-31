"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const linkedin =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z";
const x =
  "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z";

export function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, path: linkedin },
    { label: "Share on X", href: `https://x.com/intent/post?url=${encoded}&text=${encodeURIComponent(title)}`, path: x },
  ];
  const button =
    "grid size-9 cursor-pointer place-items-center rounded-lg border border-navy-900/10 bg-white text-navy-600 transition-colors hover:border-azure-500/40 hover:text-azure-700";

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={button}>
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d={link.path} />
          </svg>
        </a>
      ))}
      <button
        type="button"
        className={button}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard can be blocked; the address bar still has the link.
          }
        }}
      >
        {copied ? <Check className="size-4 text-emerald-700" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
