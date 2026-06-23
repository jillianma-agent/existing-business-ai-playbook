/** PMM-approved AI work capabilities — sourced from AI overview deck */

export interface AiWorkCapability {
  id: string;
  name: string;
  deckHeadline: string;
  valueSummary: string;
  benefits: string[];
  pmmSay: string;
  pmmAvoid: string;
  highlightWhen: string;
}

export const pmmPositioningAnchor =
  "Lead with the outcome your customer cares about. Match the AI capability to their workflow — use PMM-approved names and value language, not a platform migration pitch.";

export const pmmDoDont = {
  do: [
    "Name the business outcome first (speed, capacity, visibility, control).",
    "Use approved product names: monday sidekick, monday vibe, monday agents, monday AI workflows.",
    "Show one capability on a workflow they already run — same boards, same context.",
    "Emphasize control: humans orchestrate, AI executes within permissions.",
  ],
  dont: [
    "Don't lead with 'switch to the AI work platform' or 'new product rollout'.",
    "Don't demo the full AI catalog — depth follows readiness, not enthusiasm.",
    "Don't say AI replaces the team or makes automations obsolete overnight.",
    "Don't invent feature names or roadmap commitments beyond what's shipped.",
  ],
};

export const aiWorkCapabilities: AiWorkCapability[] = [
  {
    id: "sidekick",
    name: "monday sidekick",
    deckHeadline: "Your intelligent AI assistant that understands your work",
    valueSummary:
      "Personal AI that knows role, goals, and active work — accelerates planning through execution while keeping the user in control.",
    benefits: [
      "Knows you and your business — role, goals, and work across monday.com and connected apps",
      "Accelerates work at every level — planning, research, and execution from start to finish",
      "Works the way you do — learns workflows, preferences, and style over time",
      "Keeps you in total control — transparent, adjustable actions; you orchestrate, Sidekick executes",
      "Delivers up-to-date answers — securely connected to the web with advanced LLMs",
    ],
    pmmSay:
      "Sidekick is the intelligent assistant for any team member — draft, analyze, and move work forward in context, without building an agent.",
    pmmAvoid:
      "Don't position Sidekick as a replacement for monday agents on high-volume workflow execution.",
    highlightWhen:
      "Individual productivity pain, champion wants quick wins, or tier 3 readiness before agents.",
  },
  {
    id: "vibe",
    name: "monday vibe",
    deckHeadline: "Turn any business need into a complete solution",
    valueSummary:
      "Build tailored work apps with a prompt — consolidate point tools on monday.com's trusted infrastructure.",
    benefits: [
      "Build any work app tailored to team needs",
      "Consolidate the stack by replacing tools with tailored apps",
      "Natively connect to data, workflows, and integrations",
      "Customize to perfection — secure and enterprise-ready",
      "Every app runs on monday.com's trusted infrastructure",
    ],
    pmmSay:
      "Vibe turns a business need into a complete app — consolidate scattered tools without a dev project.",
    pmmAvoid:
      "Don't promise custom app builds live on a first call unless they've already used Vibe credits.",
    highlightWhen:
      "Marketing/program teams, portal or intake needs, or customer already using Vibe credits.",
  },
  {
    id: "agents",
    name: "monday agents",
    deckHeadline: "Unlimited resources of expert agents doing the work for you",
    valueSummary:
      "Expert or custom agents via Agent builder — autonomous execution on boards with enterprise guardrails.",
    benefits: [
      "Start with expert agents or build your own with Agent builder for end-to-end workflows",
      "Scale execution with autonomous, always-on action across workflows",
      "Plan, assign, and route automatically while flagging bottlenecks",
      "Customize skills and terminology native to boards and context",
      "Acts where you work — steps in only when and where you decide",
      "Full control with guardrails, security, and permissions",
    ],
    pmmSay:
      "Agents monitor boards and execute repetitive work — triage, draft, route, qualify — built with prompts, no code.",
    pmmAvoid:
      "Don't say 'bots replace your team.' Always: people lead, agents deliver.",
    highlightWhen:
      "High-volume workflow, exec ROI conversation, tier 4 readiness, or zero agents credit usage with AI adoption elsewhere.",
  },
  {
    id: "workflows",
    name: "monday AI workflows",
    deckHeadline: "Orchestrate your work and business processes with AI",
    valueSummary:
      "End-to-end business workflows with natural language — AI blocks and agent orchestration embedded in your data and structure.",
    benefits: [
      "Build E2E business workflows using natural language prompts",
      "Orchestrate AI agents with structured logic and no-code simplicity",
      "Automate anything from simple tasks to complex business processes",
      "Fully embedded in your data, context, and structure",
      "Enterprise-grade permissions, privacy, and governance from day one",
    ],
    pmmSay:
      "AI workflows orchestrate people and AI on the same process — AI blocks for judgment steps, agents for always-on execution.",
    pmmAvoid:
      "Don't call AI blocks 'agents' — blocks run on triggers; agents monitor and act autonomously.",
    highlightWhen:
      "Automation ceiling, handoffs between teams, or customer already using AI blocks in Workflow Builder.",
  },
  {
    id: "governance",
    name: "AI governance",
    deckHeadline: "Trusted. Controlled. Clear.",
    valueSummary:
      "Enterprise-grade governance on the shared data foundation — the right context for people and AI, safely at scale.",
    benefits: [
      "Flexible SCIM platform and roles & permissions",
      "AI Governance controls for safe AI adoption",
      "Account Grid and enterprise access patterns",
      "People and AI operate on the right business context, consistently",
    ],
    pmmSay:
      "AI stays inside monday permissions — humans approve anything that crosses the line. Governance is built in, not bolted on.",
    pmmAvoid:
      "Don't skip governance on IT or security calls — lead with control before autonomy.",
    highlightWhen:
      "IT/security on the call, data residency themes, or customer asks who approves agent actions.",
  },
];

export function getAiCapability(id: string) {
  return aiWorkCapabilities.find((c) => c.id === id);
}

/** Map demo engine capability keys to AI overview capability ids */
export function demoCapabilityToAiId(
  cap: "agents" | "sidekick" | "vibe" | "aiWorkflows" | "aiBlocks"
): string {
  if (cap === "aiWorkflows" || cap === "aiBlocks") return "workflows";
  return cap;
}
