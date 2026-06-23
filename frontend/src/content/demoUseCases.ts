export type DemoCapability = "agents" | "sidekick" | "vibe" | "aiWorkflows" | "aiBlocks";

export interface DemoUseCaseHighlight {
  capability: DemoCapability;
  text: string;
}

export interface DemoUseCase {
  id: string;
  title: string;
  realLife: string;
  highlights: DemoUseCaseHighlight[];
  /** Keywords matched against Gong themes, pains, board names, industry */
  matchKeywords: string[];
}

export const demoUseCases: DemoUseCase[] = [
  {
    id: "content-creation",
    title: "Content creation",
    realLife:
      "Content requests flow in through a structured intake form and route to the right writer or team. More content ships faster, with fewer missed deadlines and less time on status checks and chasing approvals.",
    highlights: [
      { capability: "agents", text: "Drafts initial content from the brief, brand guidelines, and past campaign context" },
      { capability: "agents", text: "Monitors the pipeline, flags delays, and sends reminders before deadlines slip" },
      { capability: "vibe", text: "Gives content leads a real-time view of production by channel, stage, or owner" },
    ],
    matchKeywords: ["content", "creative", "writer", "campaign", "approval", "marketing", "deadline", "pipeline"],
  },
  {
    id: "campaign-management",
    title: "Campaign management",
    realLife:
      "Full campaign lifecycle lives in one place, from strategy to post-campaign analysis. Campaigns launch faster with every team aligned, every dependency visible, and bottlenecks caught before they become missed deadlines.",
    highlights: [
      { capability: "sidekick", text: "Turns a campaign brief into a structured project plan with milestones and dependencies" },
      { capability: "agents", text: "Monitors progress across workstreams, flags delays, and generates assets as needed" },
      { capability: "aiWorkflows", text: "Automates handoffs and keeps work moving between teams" },
    ],
    matchKeywords: ["campaign", "launch", "milestone", "workstream", "marketing", "program", "cross-team", "handoff"],
  },
  {
    id: "competitor-monitoring",
    title: "Competitor monitoring",
    realLife:
      "Track competitor messaging shifts, product launches, and campaign activity continuously so the team responds at market speed.",
    highlights: [
      { capability: "agents", text: "Monitors competitive signals (web, press, social, reviews) and surfaces relevant updates" },
      { capability: "agents", text: "Synthesizes new intel against existing context and flags shifts for current campaigns" },
      { capability: "aiWorkflows", text: "Triggers response: brief the marketer, update the battlecard, notify sales" },
      { capability: "vibe", text: "Houses battlecards so they stay accessible and up to date" },
    ],
    matchKeywords: ["competitive", "competitor", "copilot", "evaluating", "battlecard", "market", "point tool"],
  },
  {
    id: "asset-generation",
    title: "Asset generation",
    realLife:
      "Deliver on-brand assets across formats, channels, and regions. The pipeline moves faster and scales with campaign volume without proportional production effort.",
    highlights: [
      { capability: "sidekick", text: "Generates asset briefs with creative direction from previous campaign context" },
      { capability: "agents", text: "Produces copy and variations grounded in brand guidelines; routes for approval" },
      { capability: "vibe", text: "Visibility across active asset requests by campaign, format, or deadline" },
    ],
    matchKeywords: ["asset", "creative", "brand", "copy", "production", "marketing", "variation"],
  },
  {
    id: "campaign-setup",
    title: "Campaign setup",
    realLife:
      "Campaign setup goes from manual and error-prone to repeatable and largely automated.",
    highlights: [
      { capability: "sidekick", text: "Generates a setup checklist from the brief with tasks, owners, and deadlines" },
      { capability: "agents", text: "Handles operational tasks: resize by platform, ad copy fields, meta tags" },
      { capability: "vibe", text: "Shows setup stage and outstanding steps per campaign" },
    ],
    matchKeywords: ["setup", "checklist", "automation", "workflow", "operational", "campaign", "manual"],
  },
  {
    id: "launch-program-planning",
    title: "Launch & program planning",
    realLife:
      "Programs are planned as living structures with campaign tracks, milestones, and performance checkpoints from the start — always knowing what's running, working, and needs to change.",
    highlights: [
      { capability: "sidekick", text: "Creates the brief from goals and audience, mapping campaigns and channels" },
      { capability: "agents", text: "Monitors launch progress, sends reminders, flags delays, adjusts timelines" },
      { capability: "agents", text: "Tracks program performance vs targets and flags when to pivot" },
      { capability: "vibe", text: "Program command center: status, performance, upcoming milestones" },
    ],
    matchKeywords: ["launch", "program", "executive", "roi", "strategy", "milestone", "performance", "capacity"],
  },
  {
    id: "brief-intake",
    title: "Brief intake & routing",
    realLife:
      "Structured intake captures every request consistently and routes it into the right workflow — full context, clear ownership, and a plan in motion before anyone chases status.",
    highlights: [
      { capability: "sidekick", text: "Reads the brief, flags gaps, suggests owners, builds an initial project plan" },
      { capability: "agents", text: "Monitors incoming requests, prioritizes against capacity, notifies team leads" },
      { capability: "aiBlocks", text: "Extract fields and auto-route from unstructured intake" },
    ],
    matchKeywords: ["intake", "triage", "routing", "brief", "request", "ticket", "form", "assignment", "clinical", "vendor", "service"],
  },
  {
    id: "agency-vendor-management",
    title: "Agency & vendor management",
    realLife:
      "Agencies and vendors work inside the same platform with scoped access. External relationships run with the same visibility and accountability as internal teams.",
    highlights: [
      { capability: "agents", text: "Tracks deliverable deadlines, reminds external partners, flags at-risk items" },
      { capability: "agents", text: "Summarizes agency submissions against the brief for faster internal review" },
      { capability: "aiWorkflows", text: "Keeps feedback loops and approvals moving automatically" },
    ],
    matchKeywords: ["agency", "vendor", "external", "partner", "deliverable", "review", "approval"],
  },
  {
    id: "team-onboarding",
    title: "Onboarding new team members & partners",
    realLife:
      "New hires and agency partners become productive faster with structured onboarding — tasks, resources, and context assigned when someone joins.",
    highlights: [
      { capability: "sidekick", text: "Surfaces campaign history, brand guidelines, and processes on demand" },
      { capability: "agents", text: "Monitors onboarding progress, nudges overdue steps, notifies when ready for first project" },
      { capability: "aiWorkflows", text: "Governance scopes partner access with the context they need day one" },
    ],
    matchKeywords: ["onboarding", "adopt", "change fatigue", "still adopting", "new team", "training", "knowledge"],
  },
  {
    id: "event-planning",
    title: "Event planning & execution",
    realLife:
      "The full event plan lives in one place — venue, speakers, content, promotion, registration, post-event follow-up — with every workstream connected.",
    highlights: [
      { capability: "sidekick", text: "Generates the event plan from the brief: tasks, owners, deadlines across functions" },
      { capability: "agents", text: "Monitors readiness, escalates risks, triggers post-event workflows when the event ends" },
      { capability: "vibe", text: "Real-time command center across the event program" },
    ],
    matchKeywords: ["event", "speaker", "registration", "promotion", "conference", "execution"],
  },
];

const CAPABILITY_LABELS: Record<DemoCapability, string> = {
  agents: "monday agents",
  sidekick: "monday sidekick",
  vibe: "monday vibe",
  aiWorkflows: "monday AI workflows",
  aiBlocks: "AI blocks",
};

export function getCapabilityLabel(cap: DemoCapability) {
  return CAPABILITY_LABELS[cap];
}

export function getDemoUseCase(id: string) {
  return demoUseCases.find((u) => u.id === id);
}
