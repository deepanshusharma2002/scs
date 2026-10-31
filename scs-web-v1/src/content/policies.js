const contact = "For any questions about this policy, contact us at contact@3scsolution.com.";

/** Placeholder legal copy; final text must come from 3SC's legal team. */
export const policies = [
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "How 3SC uses cookies and similar technologies on this website.",
    icon: "cookie",
    updated: "2026-10-01",
    sections: [
      {
        heading: "What are cookies?",
        body: [
          "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how it is used.",
        ],
      },
      {
        heading: "Cookies we use",
        body: [
          "Strictly necessary cookies enable core functionality such as security and consent preferences.",
          "Analytics cookies help us understand how visitors use the site so we can improve it.",
          "Marketing cookies may be used to deliver relevant content and measure campaign effectiveness.",
        ],
      },
      {
        heading: "Managing your preferences",
        body: [
          "You can change your cookie preferences at any time through the consent banner or your browser settings. Blocking some cookies may affect site functionality.",
        ],
      },
      { heading: "Contact", body: [contact] },
    ],
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    summary:
      "The principles that guide how 3SC people work with each other, customers and partners.",
    icon: "scale",
    updated: "2026-10-01",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "3SC is committed to conducting business with integrity, fairness and respect, in line with our values: Customer First, Enable Action, Take Ownership, Forward Together and Sustainable Tomorrow.",
        ],
      },
      {
        heading: "Integrity and compliance",
        body: [
          "We comply with all applicable laws and regulations, avoid conflicts of interest and do not tolerate bribery or corruption in any form.",
        ],
      },
      {
        heading: "Respect and inclusion",
        body: [
          "We treat one another with respect, openness and inclusion, and maintain a workplace free from harassment and discrimination.",
        ],
      },
      {
        heading: "Protecting information",
        body: [
          "We safeguard customer, partner and company information and handle personal data responsibly and securely.",
        ],
      },
      { heading: "Contact", body: [contact] },
    ],
  },
  {
    slug: "customer-and-partner",
    title: "Customer & Partner Policy",
    summary: "The standards 3SC upholds, and expects, in every customer and partner relationship.",
    icon: "handshake",
    updated: "2026-10-01",
    sections: [
      {
        heading: "Partnership principles",
        body: [
          "We invest in long-term relationships built on transparency, accountability and shared success.",
        ],
      },
      {
        heading: "Responsible sourcing",
        body: [
          "We expect partners to uphold ethical labour practices, environmental responsibility and compliance with applicable laws.",
        ],
      },
      {
        heading: "Data and security",
        body: [
          "Customer data is handled in line with our ISO 27001 aligned information security management system and contractual obligations.",
        ],
      },
      { heading: "Contact", body: [contact] },
    ],
  },
  {
    slug: "vulnerability-disclosure-policy",
    title: "Vulnerability Disclosure Policy",
    summary: "How to responsibly report a security vulnerability in 3SC systems.",
    icon: "shieldCheck",
    updated: "2026-10-01",
    sections: [
      {
        heading: "Scope",
        body: [
          "This policy applies to 3SC websites, platforms and services. Testing must not degrade services or access data that does not belong to you.",
        ],
      },
      {
        heading: "How to report",
        body: [
          "Email a description of the vulnerability, steps to reproduce and potential impact to contact@3scsolution.com with the subject line 'Security Disclosure'.",
        ],
      },
      {
        heading: "Our commitment",
        body: [
          "We will acknowledge your report, keep you informed of progress and will not pursue legal action against good-faith research that follows this policy.",
        ],
      },
    ],
  },
  {
    slug: "report-a-concern",
    title: "Report a Concern",
    summary: "Raise an ethics, compliance or conduct concern confidentially.",
    icon: "flag",
    updated: "2026-10-01",
    sections: [
      {
        heading: "When to raise a concern",
        body: [
          "If you witness or suspect conduct that breaches our Code of Conduct, the law or our policies, we encourage you to speak up.",
        ],
      },
      {
        heading: "How to report",
        body: [
          "Reports can be made to contact@3scsolution.com. You may choose to report anonymously; all reports are handled confidentially.",
        ],
      },
      {
        heading: "Non-retaliation",
        body: [
          "3SC does not tolerate retaliation against anyone who raises a concern in good faith.",
        ],
      },
    ],
  },
];

export function findPolicy(slug) {
  return policies.find((policy) => policy.slug === slug);
}
