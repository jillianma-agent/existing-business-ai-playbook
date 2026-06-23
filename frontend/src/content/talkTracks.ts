export interface TalkTrack {
  id: string;
  title: string;
  /** Short label for the jump menu — who's on the other side of the call */
  audience: string;
  context: string;
  open: string;
  probe: string[];
  close: string;
  demo: string;
  tags: string[];
}

export const talkTracks: TalkTrack[] = [
  {
    id: "executive-sponsor",
    title: "Executive sponsor",
    audience: "CFO, COO, VP — AI strategy",
    context: "CFO, COO, or VP asks: 'What's our AI strategy on monday?'",
    open: "Your teams already run on monday work management. The monday AI work platform adds execution: monday agents that handle repetitive steps on those same workflows, under your governance.",
    probe: [
      "Which function feels capacity-constrained right now?",
      "Where does work wait on people, not decisions?",
      "What would 20% faster cycle time mean for your Q targets?",
    ],
    close: "Let's identify one workflow with clear ROI and run a 30-day monday agent pilot. You'll see measurable throughput before any broad rollout.",
    demo: "monday agent on one high-volume workflow + one success metric. Skip the full AI catalog.",
    tags: ["executive", "ai-strategy", "roi"],
  },
  {
    id: "power-user",
    title: "Power user / admin",
    audience: "Board owner, workspace admin",
    context: "Board owner loves their setup. Worried AI will break what they built.",
    open: "Nothing you've built goes away. monday agents and AI blocks work on the same boards, columns, and permissions your team trusts today.",
    probe: [
      "Which steps do you still do manually after automations?",
      "Where do requests need context from docs or past items?",
      "What would you automate if it didn't require writing rules for every edge case?",
    ],
    close: "Pick one high-volume item type. We'll add an AI block or agent for intake and routing. You keep approval gates and override anything.",
    demo: "Broken automation → same step with an AI block. Then show Agent builder on that board.",
    tags: ["admin", "automation-ceiling", "change-fatigue"],
  },
  {
    id: "it-security",
    title: "IT / security",
    audience: "CISO, IT lead, security review",
    context: "CISO or IT lead asks about data, access, and control.",
    open: "monday agents operate inside your existing monday permissions and AI governance. They use the context you define. Humans approve anything that crosses a threshold.",
    probe: [
      "Which data classes cannot leave certain boards or regions?",
      "What approval workflows are non-negotiable?",
      "How do you audit actions today?",
    ],
    close: "We scope the pilot to one board with your security constraints documented upfront. Enterprise admins control AI access by role in AI governance.",
    demo: "Admin AI governance view + agent scoped to one board with human approval gates.",
    tags: ["it", "security", "compliance"],
  },
  {
    id: "were-fine",
    title: "'We're fine with work management'",
    audience: "Stable account, no burning pain",
    context: "Account is stable on monday work management. No burning pain yet.",
    open: "That's a good sign. Your teams adopted the platform. The question is whether manual coordination is still the limit on how much they can handle.",
    probe: [
      "Has request volume grown faster than headcount in the last year?",
      "Where do your best people spend time on admin instead of judgment work?",
      "What would leadership ask you to deliver with the same team next quarter?",
    ],
    close: "No rush to change. When you're ready, we'll start with one workflow. For now, try AI text-to-filter or the Updates assistant on a board you already use.",
    demo: "5-minute tier-one demo only: AI filters + Updates assistant. No agent build.",
    tags: ["stable", "low-urgency"],
  },
  {
    id: "competitive",
    title: "Competitive evaluation",
    audience: "Evaluating point AI or other platforms",
    context: "Customer is comparing point AI tools or another platform.",
    open: "Standalone AI tools create another place work lives. monday keeps execution where your teams already work, with full context from your boards and docs.",
    probe: [
      "How would a separate AI tool connect to your current monday workflows?",
      "Who would maintain integrations and data sync?",
      "What happens when the AI tool and the board disagree on status?",
    ],
    close: "Run the comparison on one real workflow. Measure setup time, context accuracy, and cycle time. The platform that reduces handoffs wins.",
    demo: "Side-by-side on one workflow: external tool setup vs monday agent on existing board.",
    tags: ["competitive", "point-tools"],
  },
  {
    id: "service-crm",
    title: "monday service or CRM account",
    audience: "Service, sales, or CRM power users",
    context: "Customer uses monday service or monday CRM and asks about AI.",
    open: "AI is already built into the product you bought: ticket triage, sentiment, lead agents, deal insights. Same permissions, same audit trail.",
    probe: [
      "Which service or sales workflow has the highest volume?",
      "Where do reps or agents still do manual triage or data entry?",
      "What SLA or pipeline metric would improve if that step ran automatically?",
    ],
    close: "Enable product-native AI on your entity boards first. Expand to monday agents for cross-team workflows once that's proven.",
    demo: "Service: AI ticket triage + auto-assign. CRM: lead agent or deal insights widget.",
    tags: ["service", "crm", "product-native"],
  },
];

export function getTalkTrack(id: string) {
  return talkTracks.find((t) => t.id === id);
}
