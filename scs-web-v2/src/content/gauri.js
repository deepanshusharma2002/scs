/** Scripted, illustrative Gauri conversations for the agent demo. */
export const gauriScenarios = [
  {
    id: "forecast",
    label: "Forecast drop",
    agent: "Analyst Agent",
    prompt: "Why is the North region forecast down 12% next month?",
    reply: "Three drivers explain most of the drop:",
    bullets: [
      "Festive promotion lands 3 weeks earlier than last year (−7%)",
      "Quick-commerce orders shifting volume to West DC (−3%)",
      "Price change on 1L SKUs from 1 Nov (−2%)",
    ],
    card: {
      title: "Suggested action",
      body: "Rebalance 4,200 cases from North DC to West DC and protect promo stock in North.",
      impact: "Service 97.8% → 98.6%",
      actions: ["Apply to plan", "Open scenario"],
    },
  },
  {
    id: "supply",
    label: "Supplier risk",
    agent: "Supply Sentinel",
    prompt: "Supplier B flagged a resin shortage. What's the impact?",
    reply: "I traced the shortage through the network:",
    bullets: [
      "Plant 2 · Line 3 runs short on Thursday",
      "38 customer orders ($260K) at risk",
      "Supplier C has 60% spare capacity this week",
    ],
    card: {
      title: "Mitigation Planner · Option A",
      body: "Pull forward PO 4471 from Supplier C and resequence Line 3.",
      impact: "0 orders missed · +1.8% material cost",
      actions: ["Approve option A", "Compare options"],
    },
  },
  {
    id: "freight",
    label: "Freight overspend",
    agent: "Execution Agent",
    prompt: "Where are we overspending on freight this month?",
    reply: "Freight is 9% over plan, concentrated in two lanes:",
    bullets: [
      "Pune → Delhi: 31% of trips are part loads",
      "Chennai → Bengaluru: spot rates on 14 trips",
      "Carrier X on-time rate fell to 81%",
    ],
    card: {
      title: "Recommendation",
      body: "Consolidate 22 orders into 9 FTL loads and move lane 2 to a contracted carrier.",
      impact: "Est. saving $7.8K this month",
      actions: ["Create loads", "View lanes"],
    },
  },
];
