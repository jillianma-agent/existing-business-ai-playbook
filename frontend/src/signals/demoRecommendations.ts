import { getFeatureTier } from "../content/featureLadder";
import {
  demoUseCases,
  getCapabilityLabel,
  type DemoCapability,
  type DemoUseCase,
} from "../content/demoUseCases";
import { getDemoScenario } from "../content/demoScenarios";
import type { AccountSignals } from "./types";

export interface DemoCapabilityPick {
  capability: DemoCapability;
  label: string;
  reason: string;
}

export interface DemoWalkthrough {
  gongAnchor?: string;
  featureTier: number;
  featureTierTitle: string;
  steps: string[];
  showCapabilities: DemoCapabilityPick[];
  skipCapabilities: Array<{ label: string; reason: string }>;
  useCaseIds: string[];
  useCaseReasons: Record<string, string[]>;
  scenarioId: string;
}

function signalHaystack(account: AccountSignals): string {
  return [
    ...account.gong.recentThemes,
    ...account.pains,
    ...account.signals.map((s) => s.label),
    account.gong.lastCallSummary ?? "",
    account.usage.topBoardByVolume ?? "",
    account.industry,
    account.pilotDraft.workflow ?? "",
    account.pilotDraft.aiCapability ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

function matchesKeyword(haystack: string, keyword: string) {
  return haystack.includes(keyword.toLowerCase());
}

function hasTheme(account: AccountSignals, ...keywords: string[]) {
  const haystack = signalHaystack(account);
  return keywords.some((k) => matchesKeyword(haystack, k));
}

/** Exported for editor mode — demo use case boost per talk track */
export const DEMO_USE_CASE_BOOST: Record<string, { ids: string[]; reason: string }> = {
  "executive-sponsor": {
    ids: ["launch-program-planning", "campaign-management", "brief-intake"],
    reason: "Executive call — program ROI and structured execution",
  },
  "power-user": {
    ids: ["campaign-setup", "brief-intake", "content-creation"],
    reason: "Power user — expand AI on boards they already own",
  },
  "it-security": {
    ids: ["agency-vendor-management", "brief-intake", "team-onboarding"],
    reason: "IT / security — governance, scoped access, auditability",
  },
  "were-fine": {
    ids: ["team-onboarding", "brief-intake", "campaign-setup"],
    reason: "Stable account — low-risk workflow wins first",
  },
  competitive: {
    ids: ["competitor-monitoring", "launch-program-planning", "brief-intake"],
    reason: "Competitive eval — platform-native AI vs point tools",
  },
  "service-crm": {
    ids: ["brief-intake", "agency-vendor-management", "campaign-setup"],
    reason: "Service / CRM — intake, triage, and routing on entity boards",
  },
};

function rankDemoUseCases(
  account: AccountSignals,
  talkTrackId: string
): { ids: string[]; reasons: Record<string, string[]> } {
  const haystack = signalHaystack(account);
  const reasons: Record<string, string[]> = {};
  const boost = DEMO_USE_CASE_BOOST[talkTrackId];

  const scored = demoUseCases.map((uc) => {
    let score = 0;
    const matchReasons: string[] = [];

    if (boost?.ids.includes(uc.id)) {
      score += 8 - boost.ids.indexOf(uc.id) * 2;
      matchReasons.push(boost.reason);
    }

    for (const kw of uc.matchKeywords) {
      if (matchesKeyword(haystack, kw)) {
        score += 3;
        matchReasons.push(`Gong / signals mention "${kw}"`);
      }
    }

    if (account.usage.topBoardByVolume) {
      const board = account.usage.topBoardByVolume.toLowerCase();
      if (uc.matchKeywords.some((kw) => board.includes(kw))) {
        score += 5;
        matchReasons.push(`Maps to board: ${account.usage.topBoardByVolume}`);
      }
    }

    if (hasTheme(account, "marketing", "creative") && uc.matchKeywords.includes("marketing")) {
      score += 2;
    }

    if (matchReasons.length === 0) {
      matchReasons.push("General AI work platform pattern for ops-heavy teams");
    }

    reasons[uc.id] = [...new Set(matchReasons)].slice(0, 3);
    return { id: uc.id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return { ids: scored.slice(0, 3).map((s) => s.id), reasons };
}

function pickCapabilities(
  account: AccountSignals,
  featureTier: number,
  useCases: DemoUseCase[]
): { show: DemoCapabilityPick[]; skip: Array<{ label: string; reason: string }> } {
  const show: DemoCapabilityPick[] = [];
  const skip: Array<{ label: string; reason: string }> = [];

  const capScores = new Map<DemoCapability, { score: number; reasons: string[] }>();
  for (const cap of ["agents", "sidekick", "vibe", "aiWorkflows", "aiBlocks"] as DemoCapability[]) {
    capScores.set(cap, { score: 0, reasons: [] });
  }

  for (const uc of useCases) {
    for (const h of uc.highlights) {
      const entry = capScores.get(h.capability)!;
      entry.score += 2;
      if (entry.reasons.length < 2) entry.reasons.push(h.text.slice(0, 80) + "…");
    }
  }

  const vibe = account.vibe;
  const agentsUsed = vibe?.creditsByProduct.find((p) => p.key === "AGENTS")?.credits ?? 0;
  const sidekickUsed = vibe?.creditsByProduct.find((p) => p.key === "SIDEKICK")?.credits ?? 0;
  const vibeUsed = vibe?.creditsByProduct.find((p) => p.key === "VIBE")?.credits ?? 0;
  const blocksUsed =
    (vibe?.creditsByProduct.find((p) => p.key === "AI_BLOCKS_COLUMNS")?.credits ?? 0) +
    (vibe?.creditsByProduct.find((p) => p.key === "AI_BLOCKS_WORKFLOWS")?.credits ?? 0);

  if (featureTier >= 4 && !hasTheme(account, "change fatigue", "still adopting")) {
    capScores.get("agents")!.score += 5;
    capScores.get("agents")!.reasons.unshift("Readiness supports agent execution demo");
  } else if (featureTier <= 1 || hasTheme(account, "change fatigue")) {
    skip.push({
      label: "monday agents",
      reason: hasTheme(account, "change fatigue")
        ? "Gong: change fatigue — don't lead with agents on this call"
        : "Low AI readiness — prove value with AI blocks and filters first",
    });
    capScores.get("agents")!.score -= 10;
  }

  if (agentsUsed === 0 && (vibe?.creditsTotal ?? 0) > 0) {
    capScores.get("agents")!.score += 3;
    capScores.get("agents")!.reasons.push("Snowflake: AI credits used but zero agents — expansion moment");
  } else if (agentsUsed > 0) {
    capScores.get("agents")!.reasons.push("Already using agents — go deeper on one workflow, not a catalog tour");
  }

  if (featureTier >= 3) {
    capScores.get("sidekick")!.score += 3;
  }
  if (sidekickUsed === 0 && featureTier >= 2) {
    capScores.get("sidekick")!.score += 2;
    capScores.get("sidekick")!.reasons.push("Sidekick not yet adopted — quick individual productivity win");
  }

  if (vibeUsed > 0 || hasTheme(account, "marketing", "program", "executive")) {
    capScores.get("vibe")!.score += 3;
  } else if (featureTier <= 2) {
    skip.push({
      label: "Vibe app",
      reason: "Not yet using monday vibe credits — mention concept; don't build an app live unless they ask",
    });
    capScores.get("vibe")!.score -= 3;
  }

  if (blocksUsed > 0 || hasTheme(account, "automation") || account.usage.automations > 25) {
    capScores.get("aiBlocks")!.score += 4;
    capScores.get("aiWorkflows")!.score += 3;
  } else if (featureTier <= 1) {
    capScores.get("aiBlocks")!.score += 5;
  }

  if (hasTheme(account, "governance", "security", "data residency")) {
    skip.push({
      label: "Autonomous agents without gates",
      reason: "Gong: IT / governance themes — always show human approval and AI governance",
    });
  }

  if (account.vibe?.aiStatus === "Disabled") {
    skip.push({
      label: "Any AI capability",
      reason: "AI disabled on account — address admin opt-out before demoing",
    });
  }

  const sorted = [...capScores.entries()]
    .filter(([cap]) => !skip.some((s) => s.label.toLowerCase().includes(getCapabilityLabel(cap).toLowerCase())))
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4);

  for (const [cap, { reasons }] of sorted) {
    if (capScores.get(cap)!.score <= 0) continue;
    show.push({
      capability: cap,
      label: getCapabilityLabel(cap),
      reason: reasons[0] ?? "Relevant to selected use cases",
    });
  }

  if (featureTier >= 4 && show.every((s) => s.capability !== "agents")) {
    skip.push({
      label: "Full AI catalog tour",
      reason: "Stay on one workflow — agents, sidekick, or blocks only as the story requires",
    });
  }

  return { show, skip };
}

function buildWalkthroughSteps(
  account: AccountSignals,
  featureTier: number,
  useCases: DemoUseCase[],
  showCaps: DemoCapabilityPick[],
  scenarioId: string
): string[] {
  const scenario = getDemoScenario(scenarioId);
  const board = account.usage.topBoardByVolume ?? account.pilotDraft.workflow ?? "a board they already run daily";
  const steps: string[] = [];

  if (account.gong.lastCallSummary) {
    steps.push(`Open with Gong: "${account.gong.lastCallSummary.slice(0, 140)}${account.gong.lastCallSummary.length > 140 ? "…" : ""}"`);
  } else if (account.gong.recentThemes.length > 0) {
    steps.push(`Anchor on recent call themes: ${account.gong.recentThemes.slice(0, 3).join(", ")}`);
  } else if (account.vibe) {
    steps.push(
      `Anchor on usage: ${account.vibe.topProducts[0]?.label ?? "AI"} at ${account.vibe.topProducts[0]?.sharePct ?? 0}% of credits — expand from what they already use`
    );
  }

  steps.push(`Walk ${board} — not a product tour. One workflow, one outcome.`);

  if (useCases.length > 0) {
    steps.push(
      `Story arc: "${useCases[0].title}" — ${useCases[0].realLife.slice(0, 100)}…`
    );
  }

  if (showCaps.length > 0) {
    steps.push(
      `Feature only: ${showCaps.map((c) => c.label).join(" → ")} (match ${getFeatureTier(featureTier)?.title ?? "tier " + featureTier})`
    );
  }

  if (scenario) {
    steps.push(`Close: ${scenario.say}`);
    steps.push(`Skip: ${scenario.dontShow}`);
  }

  return steps;
}

export function buildDemoWalkthrough(
  account: AccountSignals,
  talkTrackId: string,
  featureTier: number,
  scenarioId: string
): DemoWalkthrough {
  const ranked = rankDemoUseCases(account, talkTrackId);
  const useCases = ranked.ids
    .map((id) => demoUseCases.find((u) => u.id === id))
    .filter((u): u is DemoUseCase => !!u);

  const { show, skip } = pickCapabilities(account, featureTier, useCases);
  const tierMeta = getFeatureTier(featureTier);

  let gongAnchor: string | undefined;
  if (account.gong.lastCallSummary) {
    gongAnchor = account.gong.lastCallSummary;
  } else if (account.gong.recentThemes.length > 0) {
    gongAnchor = `Recent themes: ${account.gong.recentThemes.join(" · ")}`;
  }

  return {
    gongAnchor,
    featureTier,
    featureTierTitle: tierMeta?.title ?? `Tier ${featureTier}`,
    steps: buildWalkthroughSteps(account, featureTier, useCases, show, scenarioId),
    showCapabilities: show,
    skipCapabilities: skip,
    useCaseIds: ranked.ids,
    useCaseReasons: ranked.reasons,
    scenarioId,
  };
}
