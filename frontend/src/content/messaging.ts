export interface VocabTerm {
  id: string;
  term: string;
  say: string;
  avoid: string;
  tags: string[];
}

export const vocabulary: VocabTerm[] = [
  {
    id: "wm",
    term: "monday work management",
    say: "The product they know today: boards, projects, tasks, visibility.",
    avoid: "Calling it 'legacy' or 'old monday.'",
    tags: ["baseline", "stable", "change-fatigue"],
  },
  {
    id: "ai-platform",
    term: "monday AI work platform",
    say: "The AI layer on the work they already run — sidekick, agents, AI workflows, and vibe on the same boards and data.",
    avoid: "'Switch products,' 'migration,' or 'new rollout.' Talk about capabilities and outcomes, not a platform change.",
    tags: ["executive", "competitive", "expansion"],
  },
  {
    id: "agents",
    term: "monday agents",
    say: "Agents that monitor boards and execute: triage, draft, route, qualify, process requests. Built with prompts, no code.",
    avoid: "'Bots that replace your team.' Always: people lead, agents deliver.",
    tags: ["executive", "agents", "service", "high-readiness"],
  },
  {
    id: "agent-builder",
    term: "Agent builder",
    say: "How anyone can build monday agents with prompts — no code required.",
    avoid: "'Custom development project' or 'Agent Factory.' Use Agent builder.",
    tags: ["power-user", "champion", "agents"],
  },
  {
    id: "sidekick",
    term: "monday sidekick",
    say: "Intelligent assistant that understands their work — plans, researches, and executes with them, always in their control.",
    avoid: "Positioning sidekick as a substitute for agents on workflow execution.",
    tags: ["individual", "tier-three"],
  },
  {
    id: "vibe",
    term: "monday vibe",
    say: "Turn a business need into a tailored app with a prompt — consolidate tools on monday.com infrastructure.",
    avoid: "'Custom dev project' or promising live app builds without readiness.",
    tags: ["marketing", "portal", "vibe"],
  },
  {
    id: "workflows",
    term: "monday AI workflows",
    say: "Orchestrate business processes with AI — E2E workflows, agent orchestration, and AI blocks in one no-code flow.",
    avoid: "Calling AI workflows a separate product from what they already use on boards.",
    tags: ["automation", "orchestration", "ai-blocks"],
  },
  {
    id: "governance",
    term: "AI governance",
    say: "Trusted. Controlled. Clear. — permissions and guardrails so people and AI use the right context safely.",
    avoid: "Skipping governance on IT calls or implying agents run without approval gates.",
    tags: ["it-security", "governance"],
  },
  {
    id: "ai-blocks",
    term: "AI blocks",
    say: "AI actions inside automations and workflows: summarize, extract, assign, prioritize.",
    avoid: "Calling them 'agents.' Blocks run on triggers; agents monitor and act autonomously.",
    tags: ["automation", "change-fatigue", "tier-one", "tier-two"],
  },
  {
    id: "automations",
    term: "Automations",
    say: "Rule-based if/then logic. Still the right tool for fixed, predictable steps.",
    avoid: "Suggesting agents replace automations that already work.",
    tags: ["power-user", "baseline"],
  },
];

export interface MessagingRule {
  id: string;
  headline: string;
  do: string;
  dont: string;
  tags: string[];
}

export const messagingRules: MessagingRule[] = [
  {
    id: "value-first",
    headline: "Value before platform",
    do: "Lead with the outcome (speed, capacity, control) and the capability that delivers it — sidekick, agents, AI workflows, or vibe.",
    dont: "Open with 'switch to the AI work platform' or a full product migration story.",
    tags: ["baseline", "pmm", "executive"],
  },
  {
    id: "pmm-names",
    headline: "Use PMM-approved names",
    do: "monday sidekick, monday vibe, monday agents, monday AI workflows, Agent builder, AI blocks.",
    dont: "Invent names, say 'Agent Factory,' or commit to roadmap items not yet shipped.",
    tags: ["baseline", "pmm"],
  },
  {
    id: "people-lead",
    headline: "People lead, agents deliver",
    do: "Your team sets direction. monday agents handle execution: running tasks, moving work forward, flagging what needs a human call.",
    dont: "AI replaces your team / cuts headcount.",
    tags: ["baseline", "governance", "executive"],
  },
  {
    id: "same-team",
    headline: "Same team, more output",
    do: "Agents work 24/7 on high-volume work your team shouldn't have to touch. Scale impact without scaling headcount.",
    dont: "AI will transform your business overnight.",
    tags: ["executive", "roi", "capacity"],
  },
  {
    id: "no-new-system",
    headline: "No new system",
    do: "Agents plug into what teams already do. No consultants, no learning curve, no separate tool.",
    dont: "You need a separate AI tool or data pipeline.",
    tags: ["competitive", "change-fatigue", "stable"],
  },
  {
    id: "start-small",
    headline: "Start small",
    do: "One workflow, one agent or AI block, measured in 30 days.",
    dont: "Roll out agents account-wide before proof.",
    tags: ["baseline", "change-fatigue", "power-user"],
  },
];

export const comparisons = [
  {
    dimension: "What it does",
    automations: "Runs fixed rules when conditions match",
    aiBlocks: "Adds AI judgment to automation steps",
    sidekick: "Helps one person draft, summarize, analyze",
    agents: "Monitors boards and executes multi-step work",
  },
  {
    dimension: "Best for",
    automations: "Status changes, notifications, simple routing",
    aiBlocks: "Extracting data, summarizing, labeling variable content",
    sidekick: "Individual speed on tasks they already own",
    agents: "High-volume workflows with repetitive execution",
  },
  {
    dimension: "Who configures",
    automations: "Admin or power user",
    aiBlocks: "Admin or power user in Workflow Builder",
    sidekick: "Any user, no setup",
    agents: "Anyone via Agent builder (prompts, no code)",
  },
  {
    dimension: "How to talk about it",
    automations: "Keep what works. Don't rip these out.",
    aiBlocks: "AI inside the automations you already trust",
    sidekick: "Every person gets an assistant in context",
    agents: "An always-on teammate on the workflows you define",
  },
];

export function getVocabTerm(id: string) {
  return vocabulary.find((v) => v.id === id);
}

export function getMessagingRule(id: string) {
  return messagingRules.find((r) => r.id === id);
}
