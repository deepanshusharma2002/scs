/**
 * Every on-site promotion is configured here. Dates are ISO strings (inclusive);
 * leave start/end empty to run indefinitely. Paths match by prefix.
 */

export const announcements = {
  id: "q4-2026",
  enabled: true,
  excludePaths: [],
  messages: [
    {
      id: "gartner",
      tag: "Recognition",
      text: "3SC is recognized by Gartner across supply chain planning and execution.",
      cta: "See why",
      href: "/about-us",
    },
    {
      id: "ceo",
      tag: "News",
      text: "3SC appoints Ashish Sikka as CEO to lead the AI-driven transformation.",
      cta: "Read the story",
      href: "/newsroom",
    },
    {
      // Placeholder campaign: confirm title and date with marketing.
      id: "webinar",
      tag: "Live webinar",
      text: "The future of S&OP in an agentic world. Save your seat.",
      cta: "Register free",
      href: "/resources/webinars/future-of-sop",
      end: "2026-12-31",
    },
  ],
};

export const inlineAds = {
  // Placeholder creative: confirm the whitepaper asset with marketing.
  whitepaper: {
    tag: "Free whitepaper",
    title: "Agentic AI in the supply chain: a *practical* framework",
    description: "Where autonomous agents add value, how to govern them, and the 90-day roadmap leaders are using.",
    points: ["24-page playbook", "Governance checklist", "Maturity benchmark"],
    cta: "Download the whitepaper",
    href: "/resources/whitepapers/agentic-ai-in-supply-chain",
    icon: "bot",
  },
  // Placeholder campaign: confirm title and date with marketing.
  webinar: {
    tag: "Live webinar",
    title: "The future of S&OP in an *agentic* world",
    description: "Practitioners and 3SC experts on how AI agents are changing the planning cycle.",
    points: ["45 minutes", "Live Q&A", "On-demand replay"],
    cta: "Save your seat",
    href: "/resources/webinars/future-of-sop",
    icon: "calendarClock",
  },
  demo: {
    tag: "See it live",
    title: "Your data. Our AI. *30 minutes.*",
    description: "Get a personalised walkthrough of SCAI, Agentic AI and iTMS built around your toughest challenges.",
    points: ["No commitment", "Tailored to your industry", "Expert-led"],
    cta: "Book a demo",
    href: "/contact-us#form",
    icon: "rocket",
  },
};

// Placeholder event: confirm name, city, dates and registration link with marketing.
export const eventPromo = {
  id: "summit-2026-india",
  enabled: true,
  presenter: "presents",
  name: "Supply Chain AI Summit",
  tab: "3SC Summit 2026",
  location: "Mumbai, India",
  dates: "Dec 10–11",
  title: "Join Supply Chain Leaders: 3SC Summit 2026 India",
  cta: "Register now!",
  href: "/contact-us#form",
  openDelayMs: 4000,
  end: "2026-12-11",
  excludePaths: ["/contact-us"],
};

export const popupCampaign = {
  id: "agentic-whitepaper-2026",
  enabled: true,
  delayMs: 25000,
  scrollDepth: 0.6,
  minDwellMs: 10000,
  frequencyDays: 7,
  excludePaths: ["/contact-us", "/policies"],
  // Placeholder creative: confirm the whitepaper asset with marketing.
  tag: "Free whitepaper",
  title: "Put *agentic AI* to work in your supply chain",
  description: "The practical framework 3SC uses with enterprise planning teams: where agents add value, how to govern them, and a 90-day roadmap.",
  points: ["Where agents beat rules-based automation", "A governance checklist for AI decisions", "A 90-day rollout roadmap"],
  cta: "Send me the whitepaper",
  success: "Check your inbox. The whitepaper is on its way.",
};

export function isLive(item, now) {
  if (!item) return false;
  if (item.enabled === false) return false;
  if (now == null) return true;
  if (item.start && now < Date.parse(item.start)) return false;
  if (item.end && now > Date.parse(item.end) + 86_400_000) return false;
  return true;
}

export function matchesPath(pathname, excludePaths = []) {
  return !excludePaths.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
