export interface ProofPoint {
  id: string;
  company: string;
  industry: string;
  segment: string;
  metric: string;
  headline: string;
  quote: string;
  attribution: string;
  products: string[];
  aiRelevant: boolean;
  storyUrl?: string;
  tags: string[];
}

export const proofPoints: ProofPoint[] = [
  {
    id: "arcaise",
    company: "Arcaise",
    industry: "Construction",
    segment: "Mid-market",
    metric: "10x company growth",
    headline: "Brought AI to their data, not the other way around",
    quote:
      "For years everyone tried bringing data to the AI. monday.com flipped it and brought the AI to our data, and that changed everything.",
    attribution: "Alex Boulder, Director of Operations",
    products: ["monday work management", "monday agents"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/arcaise",
    tags: ["construction", "mid-market", "agents", "operations"],
  },
  {
    id: "zopa-bank",
    company: "Zopa Bank",
    industry: "Financial services",
    segment: "Mid-market",
    metric: "98% of HR tickets auto-triaged",
    headline: "From manual to AI-first HR operations",
    quote:
      "The biggest value for us is speed and flexibility. You can get up and running in days, change anything instantly, and see everything in real time.",
    attribution: "Clive Camilleri, Head of People Tech & Operations",
    products: ["monday service", "monday work management"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/zopabank",
    tags: ["financial-services", "mid-market", "service", "hr", "triage"],
  },
  {
    id: "agora",
    company: "Agora",
    industry: "Real estate",
    segment: "Mid-market",
    metric: "30 hours saved per quarter",
    headline: "Execution and visibility in the same system",
    quote:
      "monday frees up senior leadership to focus on driving more business.",
    attribution: "Asaf Goldstof, Director of AI Operations",
    products: ["monday vibe"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/agora",
    tags: ["real-estate", "mid-market", "vibe", "executive"],
  },
  {
    id: "athenahealth",
    company: "athenahealth",
    industry: "Healthcare",
    segment: "Enterprise",
    metric: "$60K+ saved retiring legacy plug-ins",
    headline: "Visible, accountable, scalable across the org",
    quote:
      "monday.com gave us more than a platform. It gave us a better way of working, one that's visible, accountable, and scalable across the entire organization.",
    attribution: "Karin Traina, Director, Process Improvement & Change Management",
    products: ["monday work management"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/athenahealth",
    tags: ["healthcare", "enterprise", "operations"],
  },
  {
    id: "cape-union-mart",
    company: "Cape Union Mart",
    industry: "Retail and CPG",
    segment: "Enterprise",
    metric: "50% reduction in open IT tickets",
    headline: "When IT runs well, the business runs well",
    quote: "When IT runs well, the business runs well. monday service helps us do both.",
    attribution: "Grant De Waal-Dubla, Group CIO",
    products: ["monday service", "monday dev"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/cape-union-mart",
    tags: ["retail", "enterprise", "service", "it"],
  },
  {
    id: "canva",
    company: "Canva",
    industry: "Technology",
    segment: "Enterprise",
    metric: "60K ads · 3x creative output",
    headline: "Creative operations at scale",
    quote: "We found a best friend in monday.com.",
    attribution: "Vic Diesta, Creative Operations Lead",
    products: ["monday work management"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/canva",
    tags: ["technology", "enterprise", "marketing", "creative"],
  },
  {
    id: "eag",
    company: "EAG",
    industry: "Professional services",
    segment: "Mid-market",
    metric: "700+ hours saved on prospect outreach",
    headline: "Quality data unlocks confident AI use",
    quote:
      "Now we have a lot less data, but it's quality data. That change allows us to use AI confidently, without second-guessing the outputs.",
    attribution: "Elizabeth Gerbel, CEO",
    products: ["monday CRM", "monday work management"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/eag",
    tags: ["professional-services", "mid-market", "crm", "data-quality"],
  },
  {
    id: "unilever",
    company: "Unilever International",
    industry: "Retail and CPG",
    segment: "Enterprise",
    metric: "4x ROI · 1,830 hours saved annually",
    headline: "Collective intelligence across 120+ countries",
    quote:
      "monday.com isn't just about managing work. It's how we protect team health, move at speed, and scale purpose across 120+ countries.",
    attribution: "Dany Krivoshey, Chief Digital & Technology Officer",
    products: ["monday work management"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/unilever-international",
    tags: ["retail", "enterprise", "operations", "global"],
  },
  {
    id: "biopak",
    company: "BioPak",
    industry: "Retail and CPG",
    segment: "Enterprise",
    metric: "12x ROI · 900+ active projects",
    headline: "The operating system that powers growth",
    quote:
      "If it's not in monday.com, it didn't happen. We couldn't do what we do today without monday.com.",
    attribution: "Trevor Rumble, Product & Innovation Director",
    products: ["monday work management", "monday CRM"],
    aiRelevant: true,
    storyUrl: "https://monday.com/w/customer-stories/biopak",
    tags: ["retail", "enterprise", "crm", "operations"],
  },
  {
    id: "nutrition-warehouse",
    company: "Nutrition Warehouse",
    industry: "Retail and CPG",
    segment: "Enterprise",
    metric: "43,000+ hours saved annually",
    headline: "Connecting stores and HQ with revenue clarity",
    quote:
      "monday.com is the link that holds our business together, connecting our support office and stores with the visibility to move fast.",
    attribution: "Duncan McHugh, Chief Operations Officer",
    products: ["monday work management"],
    aiRelevant: false,
    storyUrl: "https://monday.com/w/customer-stories/nutrition-warehouse",
    tags: ["retail", "enterprise", "operations"],
  },
  {
    id: "nespresso",
    company: "Nespresso France",
    industry: "Retail and CPG",
    segment: "Enterprise",
    metric: "50% of time reclaimed for higher-value work",
    headline: "Unified operations at enterprise scale",
    quote:
      "Whether through its intuitive interface, its ease of adoption, or its ability to adapt precisely to our needs, monday.com truly stood out.",
    attribution: "Sonia Vasseur, Head of Strategic Management and Operational Excellence",
    products: ["monday work management"],
    aiRelevant: false,
    storyUrl: "https://monday.com/w/customer-stories/nespresso",
    tags: ["retail", "enterprise", "adoption"],
  },
];

export const pitchPillars = [
  {
    name: "Execution",
    tagline: "People lead, agents deliver",
    description:
      "Your team sets the direction. monday agents handle execution: running tasks, moving work forward, and flagging what needs a human call.",
    csmLine:
      "Deploy in days, not months. Scale impact without scaling headcount.",
  },
  {
    name: "Orchestration",
    tagline: "Manage work the way you work",
    description:
      "Boards, timelines, dashboards, and docs built for people and agents in the same place. No more handoff gaps.",
    csmLine:
      "People and agents share the same context, visibility, and system of record.",
  },
  {
    name: "Control",
    tagline: "Control stays with you",
    description:
      "Permissions, access controls, and AI governance built in. Full visibility into what agents are doing.",
    csmLine:
      "Every action is logged and reversible. Compliance guardrails travel with the work.",
  },
  {
    name: "Context layer",
    tagline: "All your work, fully connected",
    description:
      "Agents operate inside workflows with cross-team data, so every action is informed by the full picture.",
    csmLine:
      "200+ integrations and monday MCP keep work context in sync across your stack.",
  },
];

export function getProofPoint(id: string) {
  return proofPoints.find((p) => p.id === id);
}

export const CUSTOMER_STORIES_URL = "https://monday.com/w/customer-stories";
