import { getDemoUseCase } from "../content/demoUseCases";
import { pitchPillars } from "../content/proofPoints";
import { getProofPoint } from "../content/proofPoints";
import type { PersonalizedPlaybook } from "./types";

export interface CustomerTeeUpContent {
  headline: string;
  intro: string;
  pillars: Array<{ name: string; tagline: string; customerLine: string }>;
  demoSections: Array<{ title: string; summary: string }>;
  proofStories: Array<{ company: string; metric: string; headline: string }>;
  callAgenda: string[];
  plainText: string;
}

function customerIntro(playbook: PersonalizedPlaybook): string {
  const { account, recommendations: rec } = playbook;
  const brief = rec.messagingBrief;
  const board =
    account.usage.topBoardByVolume ??
    account.pilotDraft.workflow ??
    "the workflows you already run on monday";

  if (brief.anchorLine.startsWith("Pick up where you left off:")) {
    return `Your teams already work in monday work management. On our upcoming call, we'll explore how the monday AI work platform adds execution on ${board} — without replacing what you've built or asking your team to adopt another tool.`;
  }

  if (brief.anchorLine.includes("change how they work")) {
    return brief.anchorLine;
  }

  return `On our upcoming call, we'll explore how ${account.accountName} can extend monday work management into the AI work platform — people and agents working together on ${board}, with a focused path to measurable results in 30 days.`;
}

export function buildCustomerTeeUpContent(playbook: PersonalizedPlaybook): CustomerTeeUpContent {
  const { account, recommendations: rec } = playbook;
  const brief = rec.messagingBrief;

  const pillars = brief.leadPillarNames.slice(0, 2).map((name) => {
    const p = pitchPillars.find((x) => x.name === name)!;
    return {
      name: p.name,
      tagline: p.tagline,
      customerLine: p.csmLine,
    };
  });

  const demoSections = rec.demoUseCaseIds.slice(0, 2).map((id) => {
    const uc = getDemoUseCase(id)!;
    return { title: uc.title, summary: uc.realLife };
  });

  const proofStories = rec.proofStoryIds.slice(0, 2).map((id) => {
    const p = getProofPoint(id)!;
    return { company: p.company, metric: p.metric, headline: p.headline };
  });

  const callAgenda = [
    `Where ${account.accountName} is today on monday work management`,
    pillars[0] ? `How ${pillars[0].tagline.toLowerCase()} applies to your team` : "The shift to the AI work platform",
    demoSections[0]
      ? `Live look: ${demoSections[0].title.toLowerCase()} on a workflow you already run`
      : "Focused demo on one high-value workflow",
    "Align on a 30-day pilot: one workflow, one metric",
  ];

  const headline = `The AI work platform for ${account.accountName}`;
  const intro = customerIntro(playbook);

  const plainText = [
    headline,
    "",
    intro,
    "",
    "What we'll cover",
    ...callAgenda.map((item, i) => `${i + 1}. ${item}`),
    "",
    pillars.length > 0 && "Why monday AI",
    ...pillars.flatMap((p) => [`${p.name}: ${p.tagline}`, p.customerLine, ""]),
    demoSections.length > 0 && "What this can look like",
    ...demoSections.flatMap((d) => [`${d.title}: ${d.summary}`, ""]),
    proofStories.length > 0 && "Customers like you",
    ...proofStories.map((p) => `${p.company} — ${p.metric}: ${p.headline}`),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    headline,
    intro,
    pillars,
    demoSections,
    proofStories,
    callAgenda,
    plainText,
  };
}
