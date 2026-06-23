import { discoveryQuestions } from "../content/discoveryQuestions";
import { proofPoints } from "../content/proofPoints";
import { buildDemoWalkthrough } from "./demoRecommendations";
import { buildMessagingBrief } from "./messagingRecommendations";
import { buildWhyNowBrief } from "./whyNowBrief";
import type { AccountSignals, PlaybookRecommendations, ReadinessLevel } from "./types";
import type { PilotPathId } from "../content/migrationPaths";

function hasTheme(account: AccountSignals, ...keywords: string[]) {
  const haystack = [
    ...account.gong.recentThemes,
    ...account.pains,
    ...account.signals.map((s) => s.label),
  ]
    .join(" ")
    .toLowerCase();
  return keywords.some((k) => haystack.includes(k.toLowerCase()));
}

function hasProduct(account: AccountSignals, product: string) {
  return account.products.some((p) => p.toLowerCase().includes(product.toLowerCase()));
}

function scoreReadiness(account: AccountSignals): {
  level: ReadinessLevel;
  score: number;
  reasons: string[];
} {
  let score = 30;
  const reasons: string[] = [];

  if (account.sponsors.length > 0) {
    score += 25;
    reasons.push(`Named sponsor: ${account.sponsors[0].name} (${account.sponsors[0].role})`);
  }
  if (account.pains.length >= 2) {
    score += 15;
    reasons.push("Multiple workflow pains identified");
  }
  if (account.usage.topBoardByVolume) {
    score += 10;
    reasons.push(`Pilot target: ${account.usage.topBoardByVolume}`);
  }
  if (hasTheme(account, "ai strategy", "roi", "capacity")) {
    score += 15;
    reasons.push("Executive AI or ROI themes in recent calls");
  }
  if (hasTheme(account, "change fatigue", "just rolled out", "still adopting")) {
    score -= 20;
    reasons.push("Change fatigue — start with tier-one AI only");
  }
  if (account.sponsors.length === 0) {
    score -= 10;
    reasons.push("No exec sponsor yet — discovery homework first");
  }

  score = Math.max(0, Math.min(100, score));
  const level: ReadinessLevel =
    score >= 70 ? "high" : score >= 45 ? "medium" : "not_yet";

  return { level, score, reasons };
}

function pickTalkTrack(account: AccountSignals): { id: string; reasons: string[] } {
  const reasons: string[] = [];

  if (account.vibe?.aiStatus === "Disabled") {
    reasons.push("AI disabled on account");
    return { id: "were-fine", reasons };
  }

  if (account.vibe && account.vibe.serviceSeats > 0) {
    reasons.push("monday service seats on account");
    return { id: "service-crm", reasons };
  }

  if (account.vibe && account.vibe.crmSeats > 0 && !account.vibe.creditsByProduct.some((p) => p.key === "AGENTS" && p.credits > 0)) {
    reasons.push("CRM seats with low agents credit usage");
    return { id: "service-crm", reasons };
  }

  const agentsCredits = account.vibe?.creditsByProduct.find((p) => p.key === "AGENTS");
  if (account.vibe && agentsCredits?.credits === 0 && (account.vibe.creditsTotal ?? 0) > 0) {
    reasons.push("AI credits used but zero agents — expansion play");
    return { id: "executive-sponsor", reasons };
  }

  if (hasProduct(account, "service") || hasProduct(account, "crm")) {
    reasons.push("monday service or CRM on account");
    return { id: "service-crm", reasons };
  }
  if (hasTheme(account, "copilot", "competitive", "other ai", "evaluating")) {
    reasons.push("Competitive AI evaluation detected");
    return { id: "competitive", reasons };
  }
  if (hasTheme(account, "governance", "security", "it ", "data residency")) {
    reasons.push("IT / security themes in Gong");
    return { id: "it-security", reasons };
  }
  if (account.sponsors.length > 0 && hasTheme(account, "ai strategy", "roi", "executive")) {
    reasons.push("Executive sponsor + AI/ROI themes");
    return { id: "executive-sponsor", reasons };
  }
  if (hasTheme(account, "automation", "change fatigue", "still adopting")) {
    reasons.push("Automation ceiling or change fatigue");
    return { id: "power-user", reasons };
  }
  if (account.readiness === "not_yet" || hasTheme(account, "we're fine", "stable")) {
    reasons.push("Low urgency — advisory mode");
    return { id: "were-fine", reasons };
  }

  reasons.push("Default: power user / automation path");
  return { id: "power-user", reasons };
}

function pickDemo(account: AccountSignals, talkTrackId: string): { id: string; reasons: string[] } {
  const reasons: string[] = [];

  if (talkTrackId === "service-crm") {
    return { id: "service-crm-demo", reasons: ["Matches service/CRM talk track"] };
  }
  if (talkTrackId === "executive-sponsor") {
    return { id: "exec-outcomes", reasons: ["Executive expects ROI demo"] };
  }
  if (hasTheme(account, "automation") || account.usage.automations > 30) {
    reasons.push(`High automation count (${account.usage.automations})`);
    return { id: "automation-ceiling", reasons };
  }
  if (account.readiness === "not_yet" || hasTheme(account, "change fatigue")) {
    return { id: "first-ai-call", reasons: ["Low readiness — tier-one demo only"] };
  }

  return { id: "exec-outcomes", reasons: ["Qualified account — agent demo"] };
}

function pickPilotPath(account: AccountSignals): { id: PilotPathId; reasons: string[] } {
  if (hasProduct(account, "service") || hasTheme(account, "triage", "ticket", "intake")) {
    return { id: "intake-first", reasons: ["High-volume intake / service workflow"] };
  }
  if (hasTheme(account, "document", "contract", "draft", "legal")) {
    return { id: "draft-first", reasons: ["Document-heavy workflow signals"] };
  }
  if (hasTheme(account, "handoff", "stall", "cross-team")) {
    return { id: "status-first", reasons: ["Handoff / stall pain"] };
  }
  return { id: "intake-first", reasons: ["Default for ops-heavy accounts"] };
}

function rankProofStories(
  account: AccountSignals,
  talkTrackId: string
): { ids: string[]; reasons: Record<string, string[]> } {
  const reasons: Record<string, string[]> = {};
  const talkTrackBonus: Record<string, { ids: string[]; reason: string }> = {
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

  const talkBonus = talkTrackBonus[talkTrackId];

  const scored = proofPoints.map((p) => {
    let score = 0;
    const matchReasons: string[] = [];

    if (talkBonus?.ids.includes(p.id)) {
      const rank = talkBonus.ids.indexOf(p.id);
      score += 6 - rank;
      matchReasons.push(talkBonus.reason);
    }

    const accountIndustry = account.industry.toLowerCase();
    const storyIndustry = p.industry.toLowerCase();
    if (
      storyIndustry === accountIndustry ||
      accountIndustry.includes(storyIndustry.split(" ")[0]) ||
      storyIndustry.includes(accountIndustry.split(" ")[0])
    ) {
      score += 3;
      matchReasons.push(`Same industry: ${account.industry}`);
    }

    const accountSegment = account.segment.toLowerCase();
    if (p.segment.toLowerCase() === accountSegment) {
      score += 2;
      matchReasons.push(`Same segment: ${account.segment}`);
    }

    if (hasProduct(account, "service") && p.tags.includes("service")) {
      score += 4;
      matchReasons.push("Uses monday service — service story");
    }
    if (hasProduct(account, "crm") && p.tags.includes("crm")) {
      score += 4;
      matchReasons.push("Uses monday CRM — CRM story");
    }
    if (hasProduct(account, "dev") && p.id === "cape-union-mart") {
      score += 3;
      matchReasons.push("Dev product on account");
    }

    if (account.vibe?.serviceSeats && account.vibe.serviceSeats > 0 && p.tags.includes("service")) {
      score += 3;
      matchReasons.push("Service seats on account");
    }

    if (
      account.vibe?.creditsByProduct.some((c) => c.key === "AGENTS" && c.credits === 0) &&
      p.id === "arcaise"
    ) {
      score += 3;
      matchReasons.push("Agents expansion play — strong agent execution story");
    }

    if (hasTheme(account, "triage", "hr", "ticket") && p.id === "zopa-bank") {
      score += 5;
      matchReasons.push("Triage / volume pain — Zopa HR story");
    }
    if (hasTheme(account, "it", "ticket") && p.id === "cape-union-mart") {
      score += 5;
      matchReasons.push("IT ticket pain — Cape Union Mart");
    }
    if (hasTheme(account, "roi", "executive", "capacity") && p.tags.includes("executive")) {
      score += 2;
      matchReasons.push("Executive ROI theme on recent calls");
    }

    if (matchReasons.length === 0) {
      matchReasons.push(p.aiRelevant ? "AI-relevant customer proof" : "Platform adoption reference");
    }

    reasons[p.id] = [...new Set(matchReasons)];
    return { id: p.id, score, aiRelevant: p.aiRelevant };
  })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.aiRelevant !== b.aiRelevant) return a.aiRelevant ? -1 : 1;
      return 0;
    });

  return { ids: scored.slice(0, 3).map((s) => s.id), reasons };
}

function rankObjections(account: AccountSignals): string[] {
  const ids: string[] = [];
  if (hasTheme(account, "change fatigue", "just rolled", "still adopting")) ids.push("just-rolled-out", "wont-adopt");
  if (hasTheme(account, "roi", "numbers", "business case")) ids.push("need-roi");
  if (hasTheme(account, "automation")) ids.push("more-automations");
  if (hasTheme(account, "copilot", "competitive", "evaluating")) ids.push("competitive-tools");
  if (hasTheme(account, "governance", "security", "it ")) ids.push("it-wont-approve", "ai-risky");
  ids.push("credits-pricing");
  return [...new Set(ids)].slice(0, 5);
}

function rankDiscoveryQuestions(account: AccountSignals): string[] {
  const priority: string[] = [];

  if (account.sponsors.length === 0) priority.push("q-sponsor", "q-bottleneck-team");
  if (account.usage.topBoardByVolume) priority.push("q-board-volume", "q-stall-time");
  if (hasTheme(account, "automation")) priority.push("q-automation-breaks", "q-repetitive");
  if (hasTheme(account, "roi", "executive")) priority.push("q-improvement-worth", "q-throughput-metric");
  if (hasTheme(account, "security", "governance")) priority.push("q-compliance-gates");
  priority.push("q-remove-step", "q-agent-data");

  const unique = [...new Set(priority)];
  return unique
    .filter((id) => discoveryQuestions.some((q) => q.id === id))
    .slice(0, 6);
}

function pickFeatureTier(account: AccountSignals, talkTrackId: string): number {
  if (account.readiness === "not_yet" || talkTrackId === "were-fine") return 1;
  if (hasTheme(account, "change fatigue") || talkTrackId === "power-user") return 2;
  if (talkTrackId === "executive-sponsor" || account.readiness === "high") return 4;
  return 3;
}

/** Rules engine: maps account signals → playbook element IDs */
export function buildRecommendations(account: AccountSignals): PlaybookRecommendations {
  const talk = pickTalkTrack(account);
  const demo = pickDemo(account, talk.id);
  const pilot = pickPilotPath(account);
  const proof = rankProofStories(account, talk.id);
  const featureTier = pickFeatureTier(account, talk.id);
  const demoWalkthrough = buildDemoWalkthrough(account, talk.id, featureTier, demo.id);
  const messagingBrief = buildMessagingBrief(account, talk.id, featureTier, demoWalkthrough);
  const whyNowBrief = buildWhyNowBrief(account, talk.id, demoWalkthrough);

  const allReasons: Record<string, string[]> = {
    talkTrack: talk.reasons,
    demo: demo.reasons,
    pilotPath: pilot.reasons,
    ...proof.reasons,
    ...demoWalkthrough.useCaseReasons,
  };

  return {
    reasons: allReasons,
    talkTrackId: talk.id,
    demoScenarioId: demo.id,
    pilotPathId: pilot.id,
    proofStoryIds: proof.ids,
    discoveryQuestionIds: rankDiscoveryQuestions(account),
    objectionIds: rankObjections(account),
    featureLadderTier: featureTier,
    demoUseCaseIds: demoWalkthrough.useCaseIds,
    demoWalkthrough,
    messagingBrief,
    whyNowBrief,
  };
}

export function buildPersonalizedPlaybook(account: AccountSignals) {
  const scored = scoreReadiness(account);
  const enriched: AccountSignals = {
    ...account,
    readiness: scored.level,
    readinessScore: scored.score,
    readinessReasons: scored.reasons,
  };
  return {
    account: enriched,
    recommendations: buildRecommendations(enriched),
  };
}
