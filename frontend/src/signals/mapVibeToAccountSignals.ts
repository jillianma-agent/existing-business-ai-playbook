import type { AccountSignals, Signal } from "./types";
import type { ParsedVibeAccount } from "./vibeWebhook";

function mapCompanySize(size: string): AccountSignals["segment"] {
  switch (size?.toUpperCase()) {
    case "ENT":
      return "Enterprise";
    case "MM":
      return "Mid-market";
    case "SMB":
    case "S":
      return "SMB";
    default:
      return "Mid-market";
  }
}

function mapProducts(products: string[]): string[] {
  return products.map((p) => {
    const lower = p.toLowerCase();
    if (lower.includes("work management")) return "monday work management";
    if (lower.includes("crm")) return "monday CRM";
    if (lower.includes("service")) return "monday service";
    if (lower.includes("dev")) return "monday dev";
    if (lower.includes("vibe")) return "monday vibe";
    if (lower.includes("ai credit")) return "AI credits";
    return p;
  });
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function buildSignals(v: ParsedVibeAccount): Signal[] {
  const signals: Signal[] = [];

  signals.push({
    id: "sf-renewal",
    label: v.renewalDate
      ? `Renewal ${v.renewalDate} · $${Math.round(v.arrToRenew).toLocaleString()} ARR (${v.renewalStage ?? "—"})`
      : "No active renewal contract in Salesforce",
    source: "salesforce",
    strength: v.renewalDate ? "high" : "low",
  });

  signals.push({
    id: "sf-plan",
    label: `${v.planTier} · ${v.region} · ${v.industry}`,
    source: "salesforce",
    strength: "medium",
  });

  signals.push({
    id: "snowflake-credits",
    label: `AI credits: ${v.aiCreditsUsed.toLocaleString()} / ${v.aiCreditsLimit.toLocaleString()} (${v.aiCreditsPct}% of limit)`,
    source: "snowflake",
    strength: v.aiCreditsPct > 50 ? "high" : v.aiCreditsPct > 10 ? "medium" : "low",
  });

  if (v.topProducts.length > 0) {
    const top = v.topProducts[0];
    signals.push({
      id: "snowflake-credit-mix",
      label: `Top AI usage: ${top.label} (${top.sharePct}% of credits)`,
      source: "snowflake",
      strength: "high",
    });
  }

  const agentProduct = v.creditsByProduct.find((p) => p.key === "AGENTS");
  if (agentProduct && agentProduct.credits === 0 && v.creditsTotal > 0) {
    signals.push({
      id: "snowflake-agents-gap",
      label: "Using AI credits but zero monday agents usage — expansion opportunity",
      source: "snowflake",
      strength: "high",
    });
  }

  signals.push({
    id: "snowflake-workflows",
    label: `AI workflows: ${v.workflowsUsed} active / ${v.workflowsLimit} limit (${v.workflowsPct}%)`,
    source: "snowflake",
    strength: v.workflowsPct > 50 ? "high" : "medium",
  });

  if (v.aiStatus === "Disabled") {
    signals.push({
      id: "snowflake-ai-off",
      label: "AI disabled on account — re-enable before agent conversation",
      source: "snowflake",
      strength: "high",
    });
  }

  if (v.champions.length > 0) {
    signals.push({
      id: "snowflake-champion",
      label: `AI champion: ${v.champions[0].name} (${v.champions[0].persona ?? "—"}) · ${v.champions[0].creditsUsed.toLocaleString()} credits`,
      source: "snowflake",
      strength: "high",
    });
  }

  return signals;
}

function buildPains(v: ParsedVibeAccount): string[] {
  const pains: string[] = [];

  const agents = v.creditsByProduct.find((p) => p.key === "AGENTS");
  const columns = v.creditsByProduct.find((p) => p.key === "AI_BLOCKS_COLUMNS");

  if (columns && columns.sharePct > 80 && (!agents || agents.credits === 0)) {
    pains.push("AI usage concentrated in column blocks — ready to expand to monday agents");
  }
  if (v.workflowsUsed > 0 && v.workflowsPct < 10) {
    pains.push(`Only ${v.workflowsUsed} active workflows despite ${v.wmSeats} WM seats — room to scale automation`);
  }
  if (v.aiCreditsPct < 15 && v.aiCreditsLimit > 0) {
    pains.push(`Low AI credit utilization (${v.aiCreditsPct}%) — capacity to run agent pilots without cost concern`);
  }
  if (v.aiStatus === "Disabled") {
    pains.push("AI is disabled — address admin opt-out before pitching agents");
  }

  const renewalDays = daysUntil(v.renewalDate);
  if (renewalDays !== null && renewalDays <= 90 && renewalDays >= 0) {
    pains.push(`Renewal in ${renewalDays} days — tie AI expansion to renewal value story`);
  }

  if (pains.length === 0) {
    pains.push("Review credit mix and champion personas to identify first agent workflow");
  }

  return pains;
}

function buildGongThemes(v: ParsedVibeAccount): string[] {
  const themes: string[] = [];
  if (v.aiStatus === "Disabled") themes.push("AI disabled");
  if (v.creditsByProduct.some((p) => p.key === "AGENTS" && p.credits === 0)) {
    themes.push("agents expansion opportunity");
  }
  if (daysUntil(v.renewalDate) !== null && daysUntil(v.renewalDate)! <= 90) {
    themes.push("renewal timing");
  }
  if (v.champions[0]?.persona === "Power Builder") themes.push("power user ready");
  return themes;
}

function buildPilotDraft(v: ParsedVibeAccount): AccountSignals["pilotDraft"] {
  const topProduct = v.topProducts[0];
  const champion = v.champions[0];
  const agents = v.creditsByProduct.find((p) => p.key === "AGENTS");

  let aiCapability = "monday agents on highest-volume workflow";
  if (agents && agents.credits === 0 && topProduct?.key === "AI_BLOCKS_COLUMNS") {
    aiCapability = "monday agents — expand from AI blocks on columns to workflow execution";
  } else if (v.serviceSeats > 0) {
    aiCapability = "monday service AI triage + auto-assign";
  } else if (v.crmSeats > 0 && v.creditsByProduct.some((p) => p.key === "CRM")) {
    aiCapability = "monday CRM lead agent or deal insights";
  }

  return {
    workflow: `[Identify board with ${champion?.team ?? "ops"} team — ${v.wmSeats} WM seats]`,
    sponsor: "[Identify exec sponsor — renewal stakeholder]",
    champion: champion
      ? `${champion.name}${champion.title ? `, ${champion.title}` : ""} (${champion.persona ?? "AI champion"})`
      : undefined,
    baselineMetric: `AI credits: ${v.aiCreditsPct}% of ${v.aiCreditsLimit.toLocaleString()} limit · ${topProduct?.label ?? "AI"} at ${topProduct?.sharePct ?? 0}% share`,
    targetMetric: agents?.credits === 0
      ? "Launch monday agents pilot; target measurable workflow cycle time improvement in 30 days"
      : "Increase agents share of AI credits from current baseline",
    aiCapability,
  };
}

/** Map BigBrain webhook row → AccountSignals for rules engine + UI */
export function mapVibeToAccountSignals(v: ParsedVibeAccount): AccountSignals {
  const champion = v.champions[0];

  return {
    accountId: String(v.pulseAccountId),
    accountName: v.companyName,
    segment: mapCompanySize(v.companySize),
    industry: v.industry,
    products: mapProducts(v.products),
    renewalDate: v.renewalDate ?? undefined,
    signals: buildSignals(v),
    pains: buildPains(v),
    sponsors: [],
    champions: champion
      ? [{ name: champion.name, role: champion.title ?? champion.persona ?? "AI champion", source: "snowflake" }]
      : [],
    usage: {
      seats: v.wmSeats + v.crmSeats + v.devSeats + v.serviceSeats,
      activeUsers30d: v.wmSeats,
      boards: 0,
      automations: v.workflowsUsed,
      aiFeaturesUsed: v.topProducts.map((p) => p.label),
      topBoardByVolume: undefined,
      avgCycleTimeHours: undefined,
    },
    gong: {
      recentThemes: buildGongThemes(v),
      competitorMentions: [],
      lastCallSummary: undefined,
    },
    pilotDraft: buildPilotDraft(v),
    vibe: v,
    dataSources: ["snowflake", "salesforce"],
    readiness: "medium",
    readinessScore: 0,
    readinessReasons: [],
  };
}
