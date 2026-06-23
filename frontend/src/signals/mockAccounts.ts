import type { AccountSignals } from "./types";
import { getMockAccountOverrides } from "../editor/mockAccountOverrides";

/** Mock accounts simulating Salesforce + Snowflake + Gong. Replace with API. */
export const mockAccounts: Record<string, AccountSignals> = {
  "meridian-health": {
    accountId: "meridian-health",
    accountName: "Meridian Health Systems",
    segment: "Enterprise",
    industry: "Healthcare",
    products: ["monday work management"],
    renewalDate: "2026-09-15",
    nextCallDate: "2026-06-26",
    readiness: "high",
    readinessScore: 82,
    readinessReasons: [
      "VP Operations asked about AI strategy on last QBR (Gong)",
      "High board volume with measurable cycle time (Snowflake)",
      "Named sponsor: VP Operations (Salesforce)",
    ],
    signals: [
      { id: "s1", label: "Executive AI strategy ask", source: "gong", strength: "high" },
      { id: "s2", label: "847 active users, 12% MoM request growth", source: "snowflake", strength: "high" },
      { id: "s3", label: "Renewal in 87 days", source: "salesforce", strength: "medium" },
      { id: "s4", label: "ROI mentioned 4x in last 2 calls", source: "gong", strength: "high" },
    ],
    pains: [
      "Clinical ops intake board: 6hr avg assignment time",
      "Manual status updates across 4 departments",
      "Headcount flat while request volume up 12%",
    ],
    sponsors: [{ name: "Dr. Elena Vasquez", role: "VP Operations", source: "salesforce" }],
    champions: [{ name: "Marcus Chen", role: "monday Admin, Clinical Ops", source: "salesforce" }],
    usage: {
      seats: 920,
      activeUsers30d: 847,
      boards: 156,
      automations: 34,
      aiFeaturesUsed: ["AI Updates assistant", "text-to-filter"],
      topBoardByVolume: "Clinical Ops Intake",
      avgCycleTimeHours: 6.2,
    },
    gong: {
      recentThemes: ["AI strategy", "ROI proof", "capacity constraints"],
      competitorMentions: [],
      lastCallSummary:
        "VP asked for a concrete AI plan tied to intake cycle time. Open to 30-day pilot on Clinical Ops board.",
    },
    pilotDraft: {
      workflow: "Clinical Ops Intake board",
      sponsor: "Dr. Elena Vasquez, VP Operations",
      champion: "Marcus Chen, monday Admin",
      baselineMetric: "Intake-to-assignment: 6.2 hours avg",
      targetMetric: "Reduce to under 4 hours (35%) in 30 days",
      aiCapability: "monday agent for intake triage and routing",
    },
  },

  "bridgeport-logistics": {
    accountId: "bridgeport-logistics",
    accountName: "Bridgeport Logistics",
    segment: "Mid-market",
    industry: "Professional services",
    products: ["monday work management"],
    renewalDate: "2027-01-20",
    nextCallDate: "2026-07-02",
    readiness: "medium",
    readinessScore: 58,
    readinessReasons: [
      "Automations maxed on vendor onboarding (Snowflake: 47 automations)",
      "Change fatigue theme in Gong — recent WM rollout",
      "No named exec sponsor yet",
    ],
    signals: [
      { id: "s1", label: "Automation ceiling on vendor onboarding", source: "snowflake", strength: "high" },
      { id: "s2", label: "Change fatigue in 3 recent calls", source: "gong", strength: "high" },
      { id: "s3", label: "Power user champion active (Salesforce)", source: "salesforce", strength: "medium" },
    ],
    pains: [
      "Vendor onboarding: rules break on unstructured attachments",
      "Ops lead still manually routes 40% of requests",
    ],
    sponsors: [],
    champions: [{ name: "Priya Nair", role: "Ops Board Owner", source: "salesforce" }],
    usage: {
      seats: 180,
      activeUsers30d: 142,
      boards: 38,
      automations: 47,
      aiFeaturesUsed: [],
      topBoardByVolume: "Vendor Onboarding",
      avgCycleTimeHours: 18,
    },
    gong: {
      recentThemes: ["change fatigue", "automation limits", "we're still adopting"],
      competitorMentions: [],
      lastCallSummary:
        "Champion interested in AI blocks but nervous about another rollout. Start small, no agent pitch yet.",
    },
    pilotDraft: {
      workflow: "Vendor Onboarding board",
      sponsor: "[Identify sponsor — homework]",
      champion: "Priya Nair, Ops Board Owner",
      baselineMetric: "Manual routing rate: ~40% of items",
      targetMetric: "Reduce manual routing to under 15% with AI blocks",
      aiCapability: "AI blocks for extract + assign labels",
    },
  },

  "summit-financial": {
    accountId: "summit-financial",
    accountName: "Summit Financial Group",
    segment: "Enterprise",
    industry: "Financial services",
    products: ["monday service", "monday work management"],
    renewalDate: "2026-11-01",
    nextCallDate: "2026-06-24",
    readiness: "high",
    readinessScore: 76,
    readinessReasons: [
      "monday service customer with high ticket volume (Snowflake)",
      "IT security raised governance questions (Gong)",
      "CIO engaged on last call (Salesforce)",
    ],
    signals: [
      { id: "s1", label: "2,400 tickets/month, 38% manual triage", source: "snowflake", strength: "high" },
      { id: "s2", label: "IT governance / data residency themes", source: "gong", strength: "high" },
      { id: "s3", label: "Evaluating Microsoft Copilot separately", source: "gong", strength: "medium" },
      { id: "s4", label: "Group CIO on last call", source: "salesforce", strength: "high" },
    ],
    pains: [
      "IT ticket triage consumes 2 FTE equivalent",
      "Security team blocking external AI tools",
      "Copilot POC running outside monday",
    ],
    sponsors: [{ name: "James Okonkwo", role: "Group CIO", source: "salesforce" }],
    champions: [{ name: "Sarah Kim", role: "IT Service Manager", source: "salesforce" }],
    usage: {
      seats: 640,
      activeUsers30d: 512,
      boards: 72,
      automations: 28,
      aiFeaturesUsed: ["AI ticket triage (service)"],
      topBoardByVolume: "IT Service Desk",
      avgCycleTimeHours: 4.5,
    },
    gong: {
      recentThemes: ["IT governance", "data residency", "competitive Copilot", "ticket triage"],
      competitorMentions: ["Microsoft Copilot"],
      lastCallSummary:
        "CIO wants AI triage inside monday service, not another tool. IT needs governance doc before pilot.",
    },
    pilotDraft: {
      workflow: "IT Service Desk (monday service)",
      sponsor: "James Okonkwo, Group CIO",
      champion: "Sarah Kim, IT Service Manager",
      baselineMetric: "Manual triage: 38% of tickets",
      targetMetric: "Auto-triage 80%+ (Zopa benchmark: 98%)",
      aiCapability: "monday service AI triage + auto-assign",
    },
  },
};

export function listAccounts() {
  return Object.values(mockAccounts).map((a) => ({
    accountId: a.accountId,
    accountName: a.accountName,
    segment: a.segment,
    industry: a.industry,
    readiness: a.readiness,
    readinessScore: a.readinessScore,
  }));
}

export function getAccountSignals(accountId: string): AccountSignals | null {
  const override = getMockAccountOverrides()[accountId];
  if (override) return override;
  return mockAccounts[accountId] ?? null;
}
