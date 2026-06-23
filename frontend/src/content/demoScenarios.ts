export interface DemoScenario {
  id: string;
  scenario: string;
  duration: string;
  show: string[];
  say: string;
  dontShow: string;
  tags: string[];
}

export const demoScenarios: DemoScenario[] = [
  {
    id: "first-ai-call",
    scenario: "First AI conversation on a healthy account",
    duration: "15 min",
    show: ["AI text-to-filter on a board they use daily", "AI Updates assistant on a real item", "One AI block in Workflow Builder (summarize or extract)"],
    say: "This is AI inside the platform you already run. No new system, no migration.",
    dontShow: "Full agent build on call one. Pricing before value is clear.",
    tags: ["stable", "low-urgency", "tier-one"],
  },
  {
    id: "automation-ceiling",
    scenario: "Customer hit the automation ceiling",
    duration: "20 min",
    show: ["The automation that breaks on unstructured input", "Same step rebuilt with an AI block (extract or assign labels)", "Before/after on one item type"],
    say: "Automations handle rules. AI blocks handle variation. Your board stays the same.",
    dontShow: "Replacing their entire automation library.",
    tags: ["automation-ceiling", "ai-blocks"],
  },
  {
    id: "exec-outcomes",
    scenario: "Executive wants AI outcomes",
    duration: "25 min",
    show: ["monday agent on a high-volume workflow (triage, qualify, or draft)", "Live board: agent monitors, acts, human approves", "One metric: cycle time or throughput on that workflow"],
    say: "Your teams track work here today. Agents execute the repetitive steps on that same data.",
    dontShow: "Feature tour of every AI product. Stay on one workflow with ROI.",
    tags: ["executive", "agents", "roi"],
  },
  {
    id: "service-crm-demo",
    scenario: "monday service or CRM customer",
    duration: "20 min",
    show: ["Product-native AI: ticket triage, sentiment, auto-assign (service)", "Or CRM lead agent, deal insights, email assistant (CRM)", "How it connects to boards they already use"],
    say: "AI is built into the product you bought. Same permissions, same audit trail.",
    dontShow: "Generic agent demo when product-specific AI is the stronger story.",
    tags: ["service", "crm", "product-native"],
  },
];

export function getDemoScenario(id: string) {
  return demoScenarios.find((d) => d.id === id);
}
