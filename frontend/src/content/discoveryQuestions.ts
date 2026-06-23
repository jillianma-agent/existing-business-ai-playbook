export interface DiscoveryQuestion {
  id: string;
  text: string;
  group: string;
  tags: string[];
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  { id: "q-board-volume", group: "Pain and volume", text: "Which monday work management board generates the most inbound requests per week?", tags: ["pain", "workflow"] },
  { id: "q-stall-time", group: "Pain and volume", text: "Where do items sit longest before someone picks them up?", tags: ["pain", "cycle-time"] },
  { id: "q-repetitive", group: "Pain and volume", text: "What work gets repeated with small variations (routing, data entry, status updates)?", tags: ["pain", "automation-ceiling"] },
  { id: "q-remove-step", group: "Pain and volume", text: "If you could remove one manual step tomorrow, which would it be?", tags: ["pain", "pilot"] },
  { id: "q-workflow-owner", group: "People and ownership", text: "Who owns workflow design today? Who owns automation?", tags: ["sponsor", "champion"] },
  { id: "q-bottleneck-team", group: "People and ownership", text: "Which teams feel the bottleneck most acutely?", tags: ["pain", "sponsor"] },
  { id: "q-sponsor", group: "People and ownership", text: "Who would sponsor a 30-day pilot on one workflow?", tags: ["sponsor", "pilot"] },
  { id: "q-context-location", group: "Tools and data", text: "Where does context live when work moves between teams (boards, docs, email)?", tags: ["integration", "context"] },
  { id: "q-automation-breaks", group: "Tools and data", text: "What automations or AI blocks do you run today, and where do they break?", tags: ["automation-ceiling"] },
  { id: "q-agent-data", group: "Tools and data", text: "What data would a monday agent need to act, not just summarize?", tags: ["pilot", "agents"] },
  { id: "q-throughput-metric", group: "Success and risk", text: "How do you measure throughput today (cycle time, SLA, backlog size)?", tags: ["roi", "metrics"] },
  { id: "q-improvement-worth", group: "Success and risk", text: "What would a 20–30% improvement be worth to the business?", tags: ["roi", "executive"] },
  { id: "q-compliance-gates", group: "Success and risk", text: "What compliance or approval gates cannot be automated?", tags: ["security", "governance"] },
];

export function getDiscoveryQuestion(id: string) {
  return discoveryQuestions.find((q) => q.id === id);
}
