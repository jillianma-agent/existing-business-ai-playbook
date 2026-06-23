export type PilotPathId = "intake-first" | "draft-first" | "status-first";

export interface MigrationPath {
  id: PilotPathId;
  title: string;
  bestFor: string;
  steps: string[];
  tags: string[];
}

export const migrationPaths: MigrationPath[] = [
  {
    id: "intake-first",
    title: "Intake-first",
    bestFor: "High-volume request queues (support, ops, HR, legal intake)",
    steps: ["Agent triages incoming items and assigns owners on the existing board", "Human approves edge cases", "Measure: time from request to assignment"],
    tags: ["service", "hr", "high-volume", "triage"],
  },
  {
    id: "draft-first",
    title: "Draft-first",
    bestFor: "Document-heavy workflows (contracts, proposals, reports)",
    steps: ["Agent drafts from templates and monday doc context", "Human reviews and edits", "Measure: time from request to first draft"],
    tags: ["legal", "marketing", "documents"],
  },
  {
    id: "status-first",
    title: "Status-first",
    bestFor: "Cross-team handoffs with chronic delays",
    steps: ["Agent monitors stalled items and nudges owners", "Surfaces blockers to managers", "Measure: reduction in average stall time"],
    tags: ["handoffs", "pmo", "operations"],
  },
];

export function getMigrationPath(id: PilotPathId) {
  return migrationPaths.find((p) => p.id === id);
}
