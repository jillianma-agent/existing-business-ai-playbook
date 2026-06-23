export interface FeatureLadderTier {
  tier: number;
  title: string;
  subtitle: string;
  features: string[];
  showWhen: string;
}

export const featureLadder: FeatureLadderTier[] = [
  {
    tier: 1,
    title: "Start here",
    subtitle: "No AI credits. Low change risk.",
    features: [
      "AI Updates assistant (summarize or write updates)",
      "AI text-to-board filters",
      "AI Formula Builder",
      "Refine text with AI in columns",
      "Prompt to board / board views with AI",
    ],
    showWhen:
      "Customer is curious but cautious. Show value in 5 minutes on a board they already use.",
  },
  {
    tier: 2,
    title: "Build confidence",
    subtitle: "AI blocks · consumes AI credits",
    features: [
      "Summarize text, extract fields, assign labels or people",
      "Improve text, detect sentiment, prioritize with AI",
      "Workflow Builder AI blocks on existing boards",
    ],
    showWhen:
      "Customer has automations hitting limits on unstructured or variable input.",
  },
  {
    tier: 3,
    title: "Prove execution",
    subtitle: "monday sidekick",
    features: [
      "Context-aware assistant across boards and docs",
      "Draft content, analyze items, answer questions in workflow context",
      "Mobile: sidekick and agents together",
    ],
    showWhen:
      "Individual productivity is the pain. Champion wants help without building an agent yet.",
  },
  {
    tier: 4,
    title: "Scale the shift",
    subtitle: "monday agents",
    features: [
      "Prompt-built agents tailored to a workflow",
      "Monitor boards, detect what needs attention, take action",
      "Draft campaigns, qualify leads, triage tickets, process requests",
    ],
    showWhen:
      "Qualified pilot: named workflow, sponsor, baseline metric. Lead with agent value on one workflow.",
  },
];

export function getFeatureTier(tier: number) {
  return featureLadder.find((t) => t.tier === tier);
}
