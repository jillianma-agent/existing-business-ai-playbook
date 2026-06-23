import { aiWorkCapabilities, pmmDoDont } from "../content/aiCapabilities";
import { demoScenarios } from "../content/demoScenarios";
import { demoUseCases } from "../content/demoUseCases";
import { discoveryQuestions } from "../content/discoveryQuestions";
import { featureLadder } from "../content/featureLadder";
import { migrationPaths } from "../content/migrationPaths";
import { comparisons, messagingRules, vocabulary } from "../content/messaging";
import { objections } from "../content/objections";
import { pitchPillars, proofPoints } from "../content/proofPoints";
import { talkTracks } from "../content/talkTracks";
import { DEMO_USE_CASE_BOOST } from "../signals/demoRecommendations";
import {
  PILLAR_ORDER,
  RULES_BY_TALK,
  VOCAB_BY_TALK,
} from "../signals/messagingRecommendations";

export interface ContentModule {
  id: string;
  title: string;
  description: string;
  sourceFile: string;
  exportName: string;
  items: unknown[];
}

export interface RuleModule {
  id: string;
  title: string;
  description: string;
  sourceFile: string;
  functionName: string;
  logic: string[];
  maps?: Record<string, unknown>;
}

export const BRAIN_PIPELINE = [
  {
    step: 0,
    title: "Persona library",
    detail:
      "Department JSON exports in frontend/personas/ — pains, use cases, proof, agents, vocabulary per ICP.",
    files: ["personas/*.json", "src/personas/registry.ts"],
  },
  {
    step: 1,
    title: "Account ingestion",
    detail:
      "Mock slug IDs load from mockAccounts.ts. Numeric pulse IDs fetch Snowflake via vibeWebhook → mapVibeToAccountSignals.",
    files: ["signals/mockAccounts.ts", "signals/vibeWebhook.ts", "signals/mapVibeToAccountSignals.ts"],
  },
  {
    step: 2,
    title: "Readiness scoring",
    detail:
      "scoreReadiness() enriches account with level (high / medium / not_yet), score 0–100, and reasons.",
    files: ["signals/recommendations.ts"],
  },
  {
    step: 3,
    title: "Core picks",
    detail:
      "pickTalkTrack → pickDemo → pickPilotPath → pickFeatureTier. Rank proof, objections, discovery.",
    files: ["signals/recommendations.ts"],
  },
  {
    step: 4,
    title: "Narrative layers",
    detail:
      "buildDemoWalkthrough and buildMessagingBrief turn picks into demo script + messaging brief.",
    files: ["signals/demoRecommendations.ts", "signals/messagingRecommendations.ts"],
  },
  {
    step: 5,
    title: "Page render",
    detail:
      "AccountContext serves playbook to pages. Content library resolved by ID at render time.",
    files: ["context/AccountContext.tsx", "pages/*", "components/*"],
  },
];

export const CONTENT_MODULES: ContentModule[] = [
  {
    id: "ai-capabilities",
    title: "AI work capabilities (PMM)",
    description: "AI overview deck — approved capability value props, say/avoid, and highlight guidance.",
    sourceFile: "src/content/aiCapabilities.ts",
    exportName: "aiWorkCapabilities, pmmDoDont",
    items: [...aiWorkCapabilities, { _type: "pmmDoDont", ...pmmDoDont }],
  },
  {
    id: "talk-tracks",
    title: "Talk tracks",
    description: "Conversation scripts by audience type. Drives talkTrackId pick.",
    sourceFile: "src/content/talkTracks.ts",
    exportName: "talkTracks",
    items: talkTracks,
  },
  {
    id: "proof",
    title: "Proof points & pillars",
    description: "Customer stories and positioning pillars. Ranked per account.",
    sourceFile: "src/content/proofPoints.ts",
    exportName: "proofPoints, pitchPillars",
    items: [...proofPoints, ...pitchPillars.map((p) => ({ ...p, _type: "pillar" }))],
  },
  {
    id: "demo-scenarios",
    title: "Demo scenarios",
    description: "Say / don't-show scripts paired with talk track demo picks.",
    sourceFile: "src/content/demoScenarios.ts",
    exportName: "demoScenarios",
    items: demoScenarios,
  },
  {
    id: "demo-use-cases",
    title: "Demo use cases",
    description: "Workflow stories with matchKeywords for Gong/signal matching.",
    sourceFile: "src/content/demoUseCases.ts",
    exportName: "demoUseCases",
    items: demoUseCases,
  },
  {
    id: "messaging",
    title: "Messaging vocabulary & rules",
    description: "Terms, do's/don'ts, and competitive comparisons.",
    sourceFile: "src/content/messaging.ts",
    exportName: "vocabulary, messagingRules, comparisons",
    items: [...vocabulary, ...messagingRules, ...comparisons.map((c) => ({ ...c, _type: "comparison" }))],
  },
  {
    id: "feature-ladder",
    title: "AI readiness ladder",
    description: "Tier 1–4 depth guide. Controls demo depth and vocab safety.",
    sourceFile: "src/content/featureLadder.ts",
    exportName: "featureLadder",
    items: featureLadder,
  },
  {
    id: "discovery",
    title: "Discovery questions",
    description: "Prioritized by missing sponsor, board, automation, ROI themes.",
    sourceFile: "src/content/discoveryQuestions.ts",
    exportName: "discoveryQuestions",
    items: discoveryQuestions,
  },
  {
    id: "objections",
    title: "Objections",
    description: "Theme-triggered responses. credits-pricing always included.",
    sourceFile: "src/content/objections.ts",
    exportName: "objections",
    items: objections,
  },
  {
    id: "migration",
    title: "Migration / pilot paths",
    description: "intake-first, draft-first, status-first pilot framing.",
    sourceFile: "src/content/migrationPaths.ts",
    exportName: "migrationPaths",
    items: migrationPaths,
  },
];

export const PROOF_STORY_BOOST: Record<string, { ids: string[]; reason: string }> = {
  "executive-sponsor": {
    ids: ["agora", "unilever", "arcaise"],
    reason: "Executive sponsor conversation — ROI and scale stories",
  },
  "power-user": {
    ids: ["arcaise", "eag", "canva"],
    reason: "Power user call — AI on existing boards without disruption",
  },
  "it-security": {
    ids: ["athenahealth", "cape-union-mart", "arcaise"],
    reason: "IT / security call — governance and accountable rollout",
  },
  "were-fine": {
    ids: ["canva", "biopak", "nespresso"],
    reason: "Stable account — light-touch adoption before agents",
  },
  competitive: {
    ids: ["arcaise", "eag", "unilever"],
    reason: "Competitive eval — platform-native AI vs point tools",
  },
  "service-crm": {
    ids: ["zopa-bank", "cape-union-mart", "eag"],
    reason: "Service / CRM call — product-native AI and triage",
  },
};

export const RULE_MODULES: RuleModule[] = [
  {
    id: "readiness",
    title: "Readiness scoring",
    description: "Base 30. Adds sponsors, pains, board, AI themes. Penalizes change fatigue and missing sponsor.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "scoreReadiness",
    logic: [
      "Start at 30 points",
      "+25 named sponsor",
      "+15 two or more pains",
      "+10 top board by volume set",
      "+15 Gong themes: ai strategy, roi, capacity",
      "−20 change fatigue themes",
      "−10 no exec sponsor",
      "high ≥70 · medium ≥45 · not_yet below 45",
    ],
  },
  {
    id: "talk-track",
    title: "Talk track picker",
    description: "Priority chain — first match wins.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "pickTalkTrack",
    logic: [
      "AI disabled → were-fine",
      "Service seats or CRM without agents credits → service-crm",
      "AI credits but zero agents → executive-sponsor",
      "Service/CRM product → service-crm",
      "Competitive themes → competitive",
      "IT / governance themes → it-security",
      "Sponsor + executive AI themes → executive-sponsor",
      "Automation / change fatigue → power-user",
      "Low readiness or stable → were-fine",
      "Default → power-user",
    ],
  },
  {
    id: "demo-scenario",
    title: "Demo scenario picker",
    description: "Maps talk track + automation/readiness to demo scenario ID.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "pickDemo",
    logic: [
      "service-crm talk → service-crm-demo",
      "executive-sponsor talk → exec-outcomes",
      "High automation or automation theme → automation-ceiling",
      "Low readiness or change fatigue → first-ai-call",
      "Default → exec-outcomes",
    ],
  },
  {
    id: "ai-readiness",
    title: "AI readiness tier",
    description: "Controls demo depth, vocabulary safety, and capability gates.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "pickFeatureTier",
    logic: [
      "not_yet or were-fine talk → tier 1",
      "Change fatigue or power-user talk → tier 2",
      "Executive sponsor or high readiness → tier 4",
      "Default → tier 3",
    ],
  },
  {
    id: "proof-ranking",
    title: "Proof story ranking",
    description: "Scores all proof points; top 3 shown on Proof page.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "rankProofStories",
    logic: [
      "Talk track boost (see map)",
      "+3 industry match · +2 segment match",
      "+4 service/CRM product + tag match",
      "+3 service seats · +3 agents expansion (Arcaise)",
      "+5 triage/HR (Zopa) · +5 IT tickets (Cape Union Mart)",
      "+2 executive ROI theme",
    ],
    maps: PROOF_STORY_BOOST as Record<string, unknown>,
  },
  {
    id: "messaging-maps",
    title: "Messaging brief maps",
    description: "Per talk track: pillar order, vocabulary IDs, messaging rule IDs.",
    sourceFile: "src/signals/messagingRecommendations.ts",
    functionName: "buildMessagingBrief",
    logic: [
      "buildAnchorLine — Gong summary, sponsor, pain, competitor",
      "buildPositioningNote — products, usage, tier depth, talk tone",
      "Tier ≤1 overrides vocab to safer terms",
      "Sidekick in demo bumps sidekick vocab to front",
    ],
    maps: {
      PILLAR_ORDER,
      VOCAB_BY_TALK,
      RULES_BY_TALK,
    },
  },
  {
    id: "demo-walkthrough",
    title: "Demo walkthrough",
    description: "Use case ranking + capability show/skip + step script.",
    sourceFile: "src/signals/demoRecommendations.ts",
    functionName: "buildDemoWalkthrough",
    logic: [
      "Rank use cases: talk boost + keyword match + board name",
      "Score capabilities from use case highlights + vibe credits",
      "Gate agents on tier and change fatigue",
      "Gate vibe on credits usage",
      "Skip autonomous agents when IT governance themes",
      "Skip all AI when account AI disabled",
    ],
    maps: DEMO_USE_CASE_BOOST as Record<string, unknown>,
  },
  {
    id: "objections",
    title: "Objection ranking",
    description: "Theme-triggered IDs; credits-pricing always included.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "rankObjections",
    logic: [
      "Change fatigue → just-rolled-out, wont-adopt",
      "ROI themes → need-roi",
      "Automation → more-automations",
      "Competitive → competitive-tools",
      "Governance → it-wont-approve, ai-risky",
      "Always → credits-pricing (max 5)",
    ],
  },
  {
    id: "discovery",
    title: "Discovery question ranking",
    description: "Priority queue based on account gaps and themes.",
    sourceFile: "src/signals/recommendations.ts",
    functionName: "rankDiscoveryQuestions",
    logic: [
      "No sponsor → q-sponsor, q-bottleneck-team",
      "Top board → q-board-volume, q-stall-time",
      "Automation theme → q-automation-breaks, q-repetitive",
      "ROI/executive → q-improvement-worth, q-throughput-metric",
      "Security → q-compliance-gates",
      "Always fallback → q-remove-step, q-agent-data (max 6)",
    ],
  },
];
