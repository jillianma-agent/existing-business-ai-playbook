import { pitchPillars } from "../content/proofPoints";
import type { AccountSignals } from "./types";
import type { DemoWalkthrough } from "./demoRecommendations";

export interface MessagingBrief {
  anchorLine: string;
  positioningNote: string;
  leadPillarNames: string[];
  pillarReasons: Record<string, string>;
  vocabularyIds: string[];
  vocabReasons: Record<string, string>;
  messagingRuleIds: string[];
  ruleReasons: Record<string, string>;
  highlightCapabilities: Array<"automations" | "aiBlocks" | "sidekick" | "agents">;
  talkTrackId: string;
}

function haystack(account: AccountSignals): string {
  return [
    ...account.gong.recentThemes,
    ...account.pains,
    ...account.signals.map((s) => s.label),
    account.gong.lastCallSummary ?? "",
    account.usage.topBoardByVolume ?? "",
    account.pilotDraft.workflow ?? "",
    account.pilotDraft.aiCapability ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

function hasTheme(account: AccountSignals, ...keywords: string[]) {
  const text = haystack(account);
  return keywords.some((k) => text.includes(k.toLowerCase()));
}

/** Exported for editor mode — pillar priority per talk track */
export const PILLAR_ORDER: Record<string, string[]> = {
  "executive-sponsor": ["Execution", "Orchestration", "Context layer", "Control"],
  "power-user": ["Orchestration", "Execution", "Control", "Context layer"],
  "it-security": ["Control", "Orchestration", "Execution", "Context layer"],
  "were-fine": ["Orchestration", "Control", "Execution", "Context layer"],
  competitive: ["Context layer", "Execution", "Control", "Orchestration"],
  "service-crm": ["Execution", "Control", "Orchestration", "Context layer"],
};

/** Exported for editor mode — vocabulary term IDs per talk track */
export const VOCAB_BY_TALK: Record<string, string[]> = {
  "executive-sponsor": ["ai-platform", "agents", "agent-builder", "wm"],
  "power-user": ["ai-blocks", "wm", "agent-builder", "automations"],
  "it-security": ["agents", "ai-platform", "wm", "ai-blocks"],
  "were-fine": ["wm", "ai-blocks", "ai-platform", "automations"],
  competitive: ["ai-platform", "wm", "agents", "automations"],
  "service-crm": ["agents", "ai-platform", "wm", "ai-blocks"],
};

/** Exported for editor mode — messaging rule IDs per talk track */
export const RULES_BY_TALK: Record<string, string[]> = {
  "executive-sponsor": ["same-team", "start-small", "people-lead"],
  "power-user": ["no-new-system", "start-small", "people-lead"],
  "it-security": ["people-lead", "start-small", "no-new-system"],
  "were-fine": ["start-small", "no-new-system", "people-lead"],
  competitive: ["no-new-system", "people-lead", "start-small"],
  "service-crm": ["people-lead", "start-small", "same-team"],
};

function buildAnchorLine(account: AccountSignals, talkTrackId: string): string {
  const board =
    account.usage.topBoardByVolume ??
    account.pilotDraft.workflow ??
    "the workflows your team already runs";
  const pain = account.pains[0];
  const sponsor = account.sponsors[0];

  if (account.gong.lastCallSummary) {
    return `Pick up where you left off: "${account.gong.lastCallSummary}"`;
  }

  if (talkTrackId === "executive-sponsor" && sponsor) {
    return `For ${sponsor.role}: same boards, measurable execution — ${pain ?? "one workflow with clear ROI in 30 days"}.`;
  }

  if (talkTrackId === "it-security") {
    return `Lead with governance on ${board}. AI stays inside monday permissions — humans approve anything that crosses the line.`;
  }

  if (talkTrackId === "were-fine" || hasTheme(account, "change fatigue")) {
    return `Nothing they've built on ${board} goes away. Start with AI inside one board they already trust — no new rollout.`;
  }

  if (talkTrackId === "competitive") {
    const competitor = account.gong.competitorMentions[0];
    return competitor
      ? `Keep execution on monday — not in ${competitor}. Same context as ${board}, no sync layer.`
      : `Point tools help individuals. monday agents run on ${board} where the team already works.`;
  }

  if (talkTrackId === "service-crm") {
    return `AI is already in the products they bought — extend from ${account.pilotDraft.aiCapability ?? "product-native AI"} on ${board}.`;
  }

  if (pain) {
    return `Expand, don't replace: ${board} stays. AI addresses ${pain.toLowerCase()}.`;
  }

  return `We're not asking ${account.accountName} to change how they work. We're bringing AI into how they already work — starting with ${board}.`;
}

function buildPositioningNote(
  account: AccountSignals,
  talkTrackId: string,
  tier: number
): string {
  const products = account.products.join(", ") || "monday work management";
  const usage =
    account.usage.aiFeaturesUsed.length > 0
      ? `Already using: ${account.usage.aiFeaturesUsed.slice(0, 2).join(", ")}.`
      : account.vibe?.topProducts[0]
        ? `Top AI usage: ${account.vibe.topProducts[0].label} (${account.vibe.topProducts[0].sharePct}% of credits).`
        : "Light AI usage so far — lead with low-risk wins.";

  const tierNote =
    tier <= 1
      ? "Stay on tier-one language (filters, Updates assistant) until they ask for more."
      : tier >= 4
        ? "Qualified for monday agents — tie every message to one workflow metric."
        : `AI readiness level ${tier} — match depth to readiness, not the full catalog.`;

  const talkNote: Record<string, string> = {
    "executive-sponsor": "Frame around capacity and ROI, not features.",
    "power-user": "Champion owns the narrative — respect what they built.",
    "it-security": "Control and auditability before autonomy.",
    "were-fine": "Advisory tone — plant seeds, don't push a pilot.",
    competitive: "Contrast platform-native AI vs bolt-on tools.",
    "service-crm": "Product-native AI first, agents second.",
  };

  return `${products}. ${usage} ${talkNote[talkTrackId] ?? ""} ${tierNote}`.trim();
}

function pillarReason(name: string, talkTrackId: string, account: AccountSignals): string {
  if (name === "Control" && hasTheme(account, "governance", "security", "it ")) {
    return "Gong: IT / governance themes — lead with this pillar";
  }
  if (name === "Execution" && talkTrackId === "executive-sponsor") {
    return "Executive call — people lead, agents deliver";
  }
  if (name === "Context layer" && talkTrackId === "competitive") {
    return "Competitive eval — work stays connected, not scattered";
  }
  if (name === "Orchestration" && hasTheme(account, "change fatigue", "handoff")) {
    return "Same boards for people and agents — no new system";
  }
  return `Primary frame for ${talkTrackId.replace(/-/g, " ")} conversation`;
}

function vocabReason(id: string, account: AccountSignals, walk: DemoWalkthrough): string {
  if (id === "agents" && walk.showCapabilities.some((c) => c.capability === "agents")) {
    return walk.showCapabilities.find((c) => c.capability === "agents")!.reason;
  }
  if (id === "ai-blocks" && hasTheme(account, "automation")) {
    return "Automation ceiling — AI blocks handle variable input";
  }
  if (id === "wm") {
    return `Anchor on ${account.usage.topBoardByVolume ?? "boards they already use"}`;
  }
  if (id === "ai-platform" && account.vibe && account.vibe.creditsTotal > 0) {
    return "Expand from current AI usage into platform execution story";
  }
  return "Core vocabulary for this talk track";
}

function capabilitiesFromWalk(
  walk: DemoWalkthrough
): MessagingBrief["highlightCapabilities"] {
  const map: Record<string, MessagingBrief["highlightCapabilities"][number]> = {
    aiBlocks: "aiBlocks",
    agents: "agents",
    sidekick: "sidekick",
    aiWorkflows: "aiBlocks",
  };
  return walk.showCapabilities
    .map((c) => map[c.capability])
    .filter((c): c is MessagingBrief["highlightCapabilities"][number] => !!c)
    .filter((c, i, arr) => arr.indexOf(c) === i);
}

export function buildMessagingBrief(
  account: AccountSignals,
  talkTrackId: string,
  featureTier: number,
  demoWalkthrough: DemoWalkthrough
): MessagingBrief {
  const leadPillarNames =
    PILLAR_ORDER[talkTrackId] ?? pitchPillars.map((p) => p.name);

  const pillarReasons: Record<string, string> = {};
  for (const name of leadPillarNames.slice(0, 2)) {
    pillarReasons[name] = pillarReason(name, talkTrackId, account);
  }

  let vocabularyIds = [...(VOCAB_BY_TALK[talkTrackId] ?? ["wm", "ai-platform", "ai-blocks", "agents"])];
  if (featureTier <= 1) {
    vocabularyIds = ["wm", "ai-blocks", "ai-platform", "automations"];
  }
  if (demoWalkthrough.showCapabilities.some((c) => c.capability === "sidekick")) {
    vocabularyIds = ["sidekick", ...vocabularyIds.filter((id) => id !== "sidekick")].slice(0, 4);
  }

  const vocabReasons: Record<string, string> = {};
  for (const id of vocabularyIds) {
    vocabReasons[id] = vocabReason(id, account, demoWalkthrough);
  }

  const messagingRuleIds =
    RULES_BY_TALK[talkTrackId] ?? ["people-lead", "start-small", "no-new-system"];
  const ruleReasons: Record<string, string> = {};
  for (const id of messagingRuleIds) {
    if (id === "start-small" && account.pilotDraft.workflow) {
      ruleReasons[id] = `Pilot on ${account.pilotDraft.workflow}`;
    } else if (id === "no-new-system" && account.gong.competitorMentions.length > 0) {
      ruleReasons[id] = `Competitor in play: ${account.gong.competitorMentions.join(", ")}`;
    } else {
      ruleReasons[id] = "Priority for this call";
    }
  }

  return {
    anchorLine: buildAnchorLine(account, talkTrackId),
    positioningNote: buildPositioningNote(account, talkTrackId, featureTier),
    leadPillarNames,
    pillarReasons,
    vocabularyIds: vocabularyIds.slice(0, 4),
    vocabReasons,
    messagingRuleIds: messagingRuleIds.slice(0, 3),
    ruleReasons,
    highlightCapabilities: capabilitiesFromWalk(demoWalkthrough),
    talkTrackId,
  };
}
