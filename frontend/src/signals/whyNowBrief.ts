import { demoCapabilityToAiId, getAiCapability } from "../content/aiCapabilities";
import { getTalkTrack } from "../content/talkTracks";
import type { DemoWalkthrough } from "./demoRecommendations";
import type { AccountSignals, SignalSource } from "./types";

export interface CustomerInsight {
  text: string;
  source: SignalSource;
}

export interface WhyNowValueAngle {
  fromPain: string;
  valueForThem: string;
  leadCapability: string;
  whyThisCapability: string;
}

export interface WhyNowConversationStep {
  title: string;
  script: string;
  rationale: string;
}

export interface WhyNowBrief {
  headline: string;
  customerLens: string;
  insights: CustomerInsight[];
  valueAngles: WhyNowValueAngle[];
  timingDrivers: string[];
  conversationPath: WhyNowConversationStep[];
  personalizedGuardrails: string[];
  talkTrackId: string;
}

function hasTheme(account: AccountSignals, ...keywords: string[]) {
  const haystack = [
    ...account.gong.recentThemes,
    ...account.pains,
    ...account.signals.map((s) => s.label),
    account.gong.lastCallSummary ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return keywords.some((k) => haystack.includes(k.toLowerCase()));
}

function buildHeadline(account: AccountSignals, talkTrackId: string): string {
  if (account.gong.lastCallSummary) {
    return "Pick up the thread from your last call — they're ready to talk outcomes, not platform change";
  }
  if (hasTheme(account, "change fatigue", "still adopting", "just rolled")) {
    return "Prove value on one board before they hear 'another rollout'";
  }
  if (talkTrackId === "executive-sponsor" || hasTheme(account, "roi", "executive", "capacity")) {
    return "Lead with capacity and ROI on a workflow they already measure";
  }
  if (talkTrackId === "it-security" || hasTheme(account, "governance", "security")) {
    return "Address control and governance before you go deep on autonomy";
  }
  if (talkTrackId === "were-fine" || account.readiness === "not_yet") {
    return "Plant seeds with low-risk AI wins — no platform story required";
  }
  if (hasTheme(account, "automation")) {
    return "Their automations are maxed — AI is the next step on the same boards";
  }
  return `Why AI capabilities matter for ${account.accountName} right now`;
}

function buildCustomerLens(account: AccountSignals, talkTrackId: string): string {
  const board =
    account.usage.topBoardByVolume ??
    account.pilotDraft.workflow ??
    "the workflows they already run";
  const sponsor = account.sponsors[0];
  const products = account.products.join(" and ") || "monday work management";

  if (account.gong.lastCallSummary) {
    return `${account.accountName} runs on ${products}, centered on ${board}. Their last Gong conversation: "${account.gong.lastCallSummary}" Your job is to connect AI capability to that thread — not reopen a platform decision.`;
  }

  if (sponsor && talkTrackId === "executive-sponsor") {
    return `${sponsor.name} (${sponsor.role}) is engaged. ${account.accountName} uses ${products} with high volume on ${board}. Frame AI as execution on that workflow — measurable in 30 days, not a new initiative.`;
  }

  if (hasTheme(account, "change fatigue")) {
    return `${account.accountName} is still adopting what they built on ${board}. They won't respond to a migration pitch. They will respond to one AI win inside a board they already trust.`;
  }

  const topPain = account.pains[0];
  if (topPain) {
    return `On ${board}, ${account.accountName}'s team feels "${topPain.toLowerCase()}." AI capabilities should answer that pain directly — same permissions, same board, less manual work.`;
  }

  return `${account.accountName} (${account.industry}, ${account.segment}) runs ${products}. Start from ${board} and the manual steps their team still owns after automations.`;
}

function buildInsights(account: AccountSignals): CustomerInsight[] {
  const insights: CustomerInsight[] = [];

  for (const s of account.signals.slice(0, 5)) {
    insights.push({ text: s.label, source: s.source });
  }

  for (const theme of account.gong.recentThemes.slice(0, 3)) {
    if (!insights.some((i) => i.text.toLowerCase().includes(theme.toLowerCase()))) {
      insights.push({ text: `Gong theme: ${theme}`, source: "gong" });
    }
  }

  if (account.gong.competitorMentions.length > 0) {
    insights.push({
      text: `Evaluating: ${account.gong.competitorMentions.join(", ")}`,
      source: "gong",
    });
  }

  if (account.vibe?.topProducts[0]) {
    const p = account.vibe.topProducts[0];
    insights.push({
      text: `Top AI usage: ${p.label} (${p.sharePct}% of credits)`,
      source: "snowflake",
    });
  }

  return insights.slice(0, 6);
}

function buildValueAngles(
  account: AccountSignals,
  demoWalkthrough: DemoWalkthrough
): WhyNowValueAngle[] {
  const caps = demoWalkthrough.showCapabilities;
  const pains = account.pains.length > 0 ? account.pains : account.gong.recentThemes;

  return pains.slice(0, 3).map((pain, i) => {
    const cap = caps[i] ?? caps[0];
    const capMeta = cap ? getAiCapability(demoCapabilityToAiId(cap.capability)) : null;

    return {
      fromPain: pain,
      valueForThem: capMeta?.valueSummary ?? "Remove manual steps on the board they already use.",
      leadCapability: cap?.label ?? "AI blocks",
      whyThisCapability: cap?.reason ?? capMeta?.highlightWhen ?? "Matches current readiness and usage.",
    };
  });
}

function buildTimingDrivers(account: AccountSignals): string[] {
  const drivers = [...account.readinessReasons];

  if (account.renewalDate) {
    const days = Math.ceil(
      (new Date(account.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (days > 0 && days < 120) {
      drivers.unshift(`Renewal in ${days} days — window to prove AI value before commercial conversation`);
    }
  }

  if (account.nextCallDate) {
    drivers.push(`Next call scheduled: ${account.nextCallDate}`);
  }

  if (account.vibe?.aiCreditsPct && account.vibe.aiCreditsPct > 50) {
    drivers.push(
      `${account.vibe.aiCreditsPct}% of AI credit limit used — expansion or deeper adoption conversation is timely`
    );
  }

  return [...new Set(drivers)].slice(0, 5);
}

function buildConversationPath(
  account: AccountSignals,
  talkTrackId: string,
  demoWalkthrough: DemoWalkthrough
): WhyNowConversationStep[] {
  const board =
    account.usage.topBoardByVolume ??
    account.pilotDraft.workflow ??
    "their highest-volume board";
  const cap = demoWalkthrough.showCapabilities[0]?.label ?? "AI blocks";
  const metric = account.pilotDraft.targetMetric ?? "one workflow metric in 30 days";
  const talk = getTalkTrack(talkTrackId);

  const paths: Record<string, WhyNowConversationStep[]> = {
    "executive-sponsor": [
      {
        title: "Anchor on their metric",
        script: `"You asked about measurable impact. On ${board}, what's the one number you'd want to move in 30 days?"`,
        rationale: "Executive sponsor talk track — ROI before features",
      },
      {
        title: "Name the capability",
        script: `"For that workflow, we'd start with ${cap} — same board, clear before/after on ${metric}."`,
        rationale: demoWalkthrough.showCapabilities[0]?.reason ?? "From demo walkthrough ranking",
      },
      {
        title: "Scope the pilot",
        script: `"One workflow, one sponsor, 30 days. No account-wide rollout until you see the number move."`,
        rationale: "De-risks exec skepticism about 'another AI program'",
      },
    ],
    "were-fine": [
      {
        title: "Validate their setup",
        script: `"${board} is working. We're not here to change it — just to remove the manual steps your team still owns."`,
        rationale: "Stable account — advisory tone, no urgency pressure",
      },
      {
        title: "Offer one low-risk win",
        script: `"Would it help if ${cap} handled the repetitive part of intake — with your team approving anything non-routine?"`,
        rationale: "Tier-one safe entry aligned to readiness",
      },
      {
        title: "Leave the door open",
        script: `"If it works on one board, you decide when to expand. No rollout calendar from us."`,
        rationale: "Respects change fatigue signals",
      },
    ],
    "it-security": [
      {
        title: "Lead with control",
        script: `"Before any demo: AI stays inside monday permissions. Humans approve anything that crosses your line."`,
        rationale: "Gong IT/governance themes on account",
      },
      {
        title: "Scope on one board",
        script: `"We'd pilot ${cap} on ${board} with explicit approval gates — full audit trail."`,
        rationale: "Governance-first path before autonomy",
      },
      {
        title: "Bring IT into scoping",
        script: `"Happy to run a 30-minute scoping session with your security team before build."`,
        rationale: "Matches it-security talk track close",
      },
    ],
    "power-user": [
      {
        title: "Champion their work",
        script: `"You've built a lot on ${board}. AI blocks and agents extend what you automated — they don't replace it."`,
        rationale: "Power user — respect what they built",
      },
      {
        title: "Find the manual gap",
        script: `"Where do automations still break — unstructured input, routing, exceptions?"`,
        rationale: account.usage.automations > 25 ? "High automation count on account" : "Discovery on automation ceiling",
      },
      {
        title: "Co-design the pilot",
        script: `"You pick the workflow. We help you wire ${cap} with the guardrails you want."`,
        rationale: "Champion owns narrative",
      },
    ],
    competitive: [
      {
        title: "Keep work on monday",
        script: `"Point tools help individuals. ${cap} runs on ${board} where your data already lives — no sync layer."`,
        rationale: `Competitor in play: ${account.gong.competitorMentions.join(", ") || "evaluating alternatives"}`,
      },
      {
        title: "Contrast on context",
        script: `"When work stays connected on monday, agents and AI workflows see the full picture — not a export."`,
        rationale: "Competitive talk track — platform-native AI",
      },
      {
        title: "Prove on their board",
        script: `"Let's compare on ${board} with ${metric} — same team, same process, less manual work."`,
        rationale: "Outcome proof beats feature checklist",
      },
    ],
    "service-crm": [
      {
        title: "Start product-native",
        script: `"You already bought AI in monday service/CRM. Let's extend what's native on ${board} first."`,
        rationale: "Service/CRM product on account",
      },
      {
        title: "Triage the pain",
        script: `"${account.pains[0] ?? "Manual triage"} — ${cap} can handle the repetitive routing while your team handles exceptions."`,
        rationale: "Maps to service workflow pains",
      },
      {
        title: "Expand to agents",
        script: `"Once triage is proven, we can go deeper with monday agents on the same entity boards."`,
        rationale: "Phased depth for service customers",
      },
    ],
  };

  return (
    paths[talkTrackId] ?? [
      {
        title: "Start from their workflow",
        script: `"Walk me through ${board} — where does work wait on people today?"`,
        rationale: talk ? `Default path for ${talk.title} talk track` : "Discovery-first",
      },
      {
        title: "Match one capability",
        script: `"For that step, ${cap} is the PMM-approved starting point — on the board you already use."`,
        rationale: demoWalkthrough.showCapabilities[0]?.reason ?? "Demo walkthrough pick",
      },
      {
        title: "Prove in 30 days",
        script: `"One workflow, ${metric}. You decide what happens after."`,
        rationale: "Standard existing-business pilot frame",
      },
    ]
  );
}

function buildGuardrails(account: AccountSignals, talkTrackId: string): string[] {
  const rules: string[] = [];

  if (hasTheme(account, "change fatigue", "still adopting")) {
    rules.push("Don't lead with monday agents or a full AI tour — start with AI blocks or Sidekick");
  }
  if (account.readiness === "not_yet") {
    rules.push("Don't imply they're behind — plant one win, don't push a platform narrative");
  }
  if (talkTrackId === "it-security") {
    rules.push("Don't demo autonomous agents without showing approval gates and permissions");
  }
  if (account.gong.competitorMentions.length > 0) {
    rules.push(`Don't dismiss ${account.gong.competitorMentions[0]} — contrast on connected workflow, not features`);
  }
  if (account.vibe?.aiStatus === "Disabled") {
    rules.push("Don't demo AI until admin opt-out is addressed");
  }
  rules.push("Don't say 'switch to the AI work platform' — this is capability value on existing boards");

  return rules.slice(0, 4);
}

export function buildWhyNowBrief(
  account: AccountSignals,
  talkTrackId: string,
  demoWalkthrough: DemoWalkthrough
): WhyNowBrief {
  return {
    headline: buildHeadline(account, talkTrackId),
    customerLens: buildCustomerLens(account, talkTrackId),
    insights: buildInsights(account),
    valueAngles: buildValueAngles(account, demoWalkthrough),
    timingDrivers: buildTimingDrivers(account),
    conversationPath: buildConversationPath(account, talkTrackId, demoWalkthrough),
    personalizedGuardrails: buildGuardrails(account, talkTrackId),
    talkTrackId,
  };
}
