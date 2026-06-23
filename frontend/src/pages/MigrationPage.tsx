import "./MigrationPage.css";

const phases = [
  {
    phase: "Phase 1: Align",
    duration: "Week 1",
    tasks: [
      "Confirm sponsor, workflow, and success metric",
      "Document current cycle time baseline",
      "Identify human approval gates (non-negotiable)",
      "Loop in IT/security if data sensitivity exists",
    ],
    outcome: "Signed one-page pilot plan",
  },
  {
    phase: "Phase 2: Build",
    duration: "Weeks 2–3",
    tasks: [
      "Configure a monday agent on the existing board (intake, routing, or drafting)",
      "Connect context sources: monday docs, PDFs, linked boards",
      "Test with champion and 2–3 end users",
      "Define override and escalation paths",
    ],
    outcome: "monday agent live in controlled scope",
  },
  {
    phase: "Phase 3: Measure",
    duration: "Week 4",
    tasks: [
      "Compare cycle time and throughput vs baseline",
      "Collect qualitative feedback from users and sponsor",
      "Document failures and edge cases",
      "Present results to sponsor with expand / iterate / pause recommendation",
    ],
    outcome: "30-day readout with data",
  },
  {
    phase: "Phase 4: Expand",
    duration: "Month 2+",
    tasks: [
      "Add adjacent steps on same workflow (e.g. drafting after routing)",
      "Replicate pattern to one neighboring team",
      "Update internal playbooks and training",
      "Align commercial conversation to expanded scope",
    ],
    outcome: "Repeatable pattern across account",
  },
];

const paths = [
  {
    title: "Intake-first",
    bestFor: "High-volume request queues (support, ops, HR, legal intake)",
    steps: [
      "Agent triages incoming items and assigns owners on the existing board",
      "Human approves edge cases",
      "Measure: time from request to assignment",
    ],
  },
  {
    title: "Draft-first",
    bestFor: "Document-heavy workflows (contracts, proposals, reports)",
    steps: [
      "Agent drafts from templates and monday doc context",
      "Human reviews and edits",
      "Measure: time from request to first draft",
    ],
  },
  {
    title: "Status-first",
    bestFor: "Cross-team handoffs with chronic delays",
    steps: [
      "Agent monitors stalled items and nudges owners",
      "Surfaces blockers to managers",
      "Measure: reduction in average stall time",
    ],
  },
];

const metrics = [
  { metric: "Intake-to-assignment time", target: "20–40% reduction" },
  { metric: "Items past SLA", target: "15–25% reduction" },
  { metric: "Manual updates per item", target: "50%+ reduction" },
  { metric: "Throughput per FTE", target: "10–20% increase" },
];

export default function MigrationPage() {
  return (
    <div className="page">
      <span className="page-eyebrow">Make the switch</span>
      <h1 className="page-title">Pilot paths from work management to the AI work platform</h1>
      <p className="page-subtitle">
        Use these phased paths to co-create a pilot and scale from proof.
      </p>

      <section className="section">
        <h2 className="section-title">Four-phase pilot framework</h2>
        <div className="phase-timeline">
          {phases.map((p, i) => (
            <div className="phase-card" key={p.phase}>
              <div className="phase-header">
                <span className="phase-number">{i + 1}</span>
                <div>
                  <h3>{p.phase}</h3>
                  <span className="phase-duration">{p.duration}</span>
                </div>
              </div>
              <ul>
                {p.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="phase-outcome">
                <strong>Outcome:</strong> {p.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Choose a starting path</h2>
        <p className="section-desc">
          Match the first agent to the shape of the bottleneck. Don't try all
          three at once.
        </p>
        <div className="grid">
          {paths.map((p) => (
            <div className="card path-card" key={p.title}>
              <h3>{p.title}</h3>
              <p className="path-best-for">
                <strong>Best for:</strong> {p.bestFor}
              </p>
              <ol className="path-steps">
                {p.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Success metrics to track</h2>
        <div className="metrics-table-wrapper">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Typical 30-day target</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m.metric}>
                  <td>{m.metric}</td>
                  <td>{m.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Pilot plan one-pager</h2>
        <p className="section-desc">
          Fill this in with the customer before Phase 1 starts.
        </p>
        <div className="pilot-template">
          <div className="pilot-field">
            <span className="pilot-label">Workflow / board</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">Sponsor</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">Champion (day-to-day)</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">Baseline metric</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">30-day target</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">AI capability (agent, AI block, or sidekick)</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">Human gates (what it doesn't)</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
          <div className="pilot-field">
            <span className="pilot-label">Readout date</span>
            <span className="pilot-placeholder">_________________________</span>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <h2 className="section-title">After a successful pilot</h2>
        <div className="steps-list">
          <div className="step-item">
            <span className="step-number">1</span>
            <div className="step-body">
              <h3>Socialize internally</h3>
              <p>
                Sponsor presents results to peer leaders. Champion demos the
                workflow live. Peer teams ask "can we do that?"
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">2</span>
            <div className="step-body">
              <h3>Standardize the pattern</h3>
              <p>
                Document agent config, approval gates, and metrics. Replicate
                to the next workflow with minimal custom work.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">3</span>
            <div className="step-body">
              <h3>Align the commercial path</h3>
              <p>
                Connect expanded usage to the monday AI work platform. Frame
                as investment in proven throughput. Commercial and credit terms:
                placeholder — follow internal guidance when published.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
