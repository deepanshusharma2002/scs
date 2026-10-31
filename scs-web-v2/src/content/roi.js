/**
 * Indicative ROI model. Ranges come from 3SC's published customer outcomes
 * (10-15% less inventory, 8-15% lower freight, 20-35% planner productivity, 8-10% less carbon).
 */
export const roiInputs = [
  {
    id: "inventory",
    label: "Average inventory value",
    prefix: "$",
    suffix: "M",
    min: 5,
    max: 1000,
    step: 5,
    defaultValue: 120,
  },
  {
    id: "freight",
    label: "Annual freight spend",
    prefix: "$",
    suffix: "M",
    min: 1,
    max: 400,
    step: 1,
    defaultValue: 30,
  },
  {
    id: "planners",
    label: "Planners & schedulers",
    suffix: " people",
    min: 2,
    max: 300,
    step: 1,
    defaultValue: 25,
  },
];

export const roiAssumptions = {
  inventoryReduction: [0.1, 0.15],
  carryingCostRate: 0.2,
  freightReduction: [0.08, 0.15],
  productivityGain: [0.2, 0.35],
  hoursPerPlannerYear: 1800,
  carbonReduction: [0.08, 0.1],
};

export function estimateRoi({ inventory, freight, planners }) {
  const a = roiAssumptions;
  const range = ([low, high], base) => [low * base, high * base];
  const workingCapital = range(a.inventoryReduction, inventory);
  const carrying = workingCapital.map((value) => value * a.carryingCostRate);
  const freightSaving = range(a.freightReduction, freight);
  const hours = range(a.productivityGain, planners * a.hoursPerPlannerYear);
  const annual = [carrying[0] + freightSaving[0], carrying[1] + freightSaving[1]];
  return { workingCapital, carrying, freightSaving, hours, annual };
}

export function formatMoney(millions) {
  if (millions >= 1) return `$${millions >= 100 ? Math.round(millions) : millions.toFixed(1)}M`;
  return `$${Math.round(millions * 1000)}K`;
}

export function formatRange([low, high], format) {
  return `${format(low)} – ${format(high)}`;
}
