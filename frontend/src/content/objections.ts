export interface Objection {
  id: string;
  objection: string;
  acknowledge: string;
  reframe: string;
  response: string;
  tags: string[];
}

export const objections: Objection[] = [
  {
    id: "just-rolled-out",
    objection: "We just rolled out monday work management. We can't change again.",
    acknowledge: "You're right to protect the adoption you've built. This isn't another rollout.",
    reframe: "The monday AI work platform layers on workflows you already run. One board, one agent or AI block, no retraining the whole company.",
    response: "Start after your current adoption milestone. Pick the board that's already healthy. Demo AI filters or Updates assistant first, then expand.",
    tags: ["change-fatigue", "adoption"],
  },
  {
    id: "ai-risky",
    objection: "AI feels risky. We can't have bots making decisions.",
    acknowledge: "That's the right instinct. Not everything should be automated.",
    reframe: "monday agents handle repetitive steps. Humans keep approval gates, exceptions, and anything that needs judgment.",
    response: "Scope the pilot with explicit human-in-the-loop checkpoints. Document what the agent can and cannot do.",
    tags: ["security", "governance"],
  },
  {
    id: "wont-adopt",
    objection: "Our team won't adopt another thing.",
    acknowledge: "Change fatigue is real, especially after a platform rollout.",
    reframe: "monday agents and sidekick reduce work inside the tool they already use. Less manual updating, not another login.",
    response: "Involve the board owner as co-designer. They define what the agent does. Adoption follows ownership.",
    tags: ["change-fatigue", "adoption"],
  },
  {
    id: "need-roi",
    objection: "What's the ROI? I need numbers.",
    acknowledge: "Fair ask. AI without metrics is just a demo.",
    reframe: "ROI shows up in cycle time, throughput, and cost of delay. Pick one metric you already track.",
    response: "Baseline this week: intake-to-resolution time on [workflow]. Target 20–30% improvement in 30 days. Report back with before/after data.",
    tags: ["roi", "executive"],
  },
  {
    id: "more-automations",
    objection: "Can't we just add more automations?",
    acknowledge: "Automations work well for fixed rules. Many teams max them out.",
    reframe: "AI blocks and monday agents handle variation: unstructured requests, context from docs, routing that depends on content.",
    response: "List the steps your automations can't cover. That's the pilot scope for an AI block or monday agent.",
    tags: ["automation-ceiling"],
  },
  {
    id: "credits-pricing",
    objection: "What about AI credits and pricing?",
    acknowledge: "Fair question. You should understand cost before scaling.",
    reframe: "Start with a scoped pilot on one workflow. Prove throughput first, then align commercial terms to outcomes.",
    response: "Pricing guidance for existing business is being finalized. I'll follow up with confirmed details. Until then, let's scope the pilot and baseline metrics.",
    tags: ["pricing"],
  },
  {
    id: "competitive-tools",
    objection: "We're evaluating other AI tools.",
    acknowledge: "You should compare options on real work, not slide decks.",
    reframe: "Point tools add another system. monday keeps AI where your workflows and data already live.",
    response: "Run a head-to-head on one workflow. Compare setup time, context accuracy, handoffs, and cycle time.",
    tags: ["competitive"],
  },
  {
    id: "it-wont-approve",
    objection: "IT won't approve this.",
    acknowledge: "Security and compliance aren't blockers to ignore. They're design inputs.",
    reframe: "monday agents inherit board permissions. Audit trails stay in monday. AI governance controls access by role on Enterprise.",
    response: "Bring IT into the scoping call, not the sales call. Address data residency, access, and approval workflows before build.",
    tags: ["it", "security"],
  },
];

export function getObjection(id: string) {
  return objections.find((o) => o.id === id);
}
