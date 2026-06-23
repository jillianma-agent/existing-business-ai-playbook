import "./ObjectionsPage.css";

const objections = [
  {
    objection: "We just rolled out monday work management. We can't change again.",
    acknowledge:
      "You're right to protect the adoption you've built. This isn't another rollout.",
    reframe:
      "The monday AI work platform layers on workflows you already run. One board, one agent or AI block, no retraining the whole company.",
    response:
      "Start after your current adoption milestone. Pick the board that's already healthy. Demo AI filters or Updates assistant first, then expand.",
  },
  {
    objection: "AI feels risky. We can't have bots making decisions.",
    acknowledge:
      "That's the right instinct. Not everything should be automated.",
    reframe:
      "monday agents handle repetitive steps. Humans keep approval gates, exceptions, and anything that needs judgment.",
    response:
      "Scope the pilot with explicit human-in-the-loop checkpoints. Document what the agent can and cannot do.",
  },
  {
    objection: "Our team won't adopt another thing.",
    acknowledge:
      "Change fatigue is real, especially after a platform rollout.",
    reframe:
      "monday agents and sidekick reduce work inside the tool they already use. Less manual updating, not another login.",
    response:
      "Involve the board owner as co-designer. They define what the agent does. Adoption follows ownership.",
  },
  {
    objection: "What's the ROI? I need numbers.",
    acknowledge:
      "Fair ask. AI without metrics is just a demo.",
    reframe:
      "ROI shows up in cycle time, throughput, and cost of delay. Pick one metric you already track.",
    response:
      "Baseline this week: intake-to-resolution time on [workflow]. Target 20–30% improvement in 30 days. Report back with before/after data.",
  },
  {
    objection: "Can't we just add more automations?",
    acknowledge:
      "Automations work well for fixed rules. Many teams max them out.",
    reframe:
      "AI blocks and monday agents handle variation: unstructured requests, context from docs, routing that depends on content.",
    response:
      "List the steps your automations can't cover. That's the pilot scope for an AI block or monday agent.",
  },
  {
    objection: "What about AI credits and pricing?",
    acknowledge:
      "Fair question. You should understand cost before scaling.",
    reframe:
      "Start with a scoped pilot on one workflow. Prove throughput first, then align commercial terms to outcomes.",
    response:
      "Pricing guidance for existing business is being finalized. I'll follow up with confirmed details. Until then, let's scope the pilot and baseline metrics.",
  },
  {
    objection: "We're evaluating other AI tools.",
    acknowledge:
      "You should compare options on real work, not slide decks.",
    reframe:
      "Point tools add another system. monday keeps AI where your workflows and data already live.",
    response:
      "Run a head-to-head on one workflow. Compare setup time, context accuracy, handoffs, and cycle time.",
  },
  {
    objection: "IT won't approve this.",
    acknowledge:
      "Security and compliance aren't blockers to ignore. They're design inputs.",
    reframe:
      "monday agents inherit board permissions. Audit trails stay in monday. AI governance controls access by role on Enterprise.",
    response:
      "Bring IT into the scoping call, not the sales call. Address data residency, access, and approval workflows before build.",
  },
];

export default function ObjectionsPage() {
  return (
    <div className="page">
      <span className="page-eyebrow">Handle pushback</span>
      <h1 className="page-title">Common objections and responses</h1>
      <p className="page-subtitle">
        Use the ARC pattern: Acknowledge, Reframe, Respond. Never argue. Move
        back to one workflow and measurable outcomes.
      </p>

      <section className="section">
        <div className="arc-legend">
          <div className="arc-item">
            <span className="arc-letter arc-letter--a">A</span>
            <span>Acknowledge the concern</span>
          </div>
          <div className="arc-item">
            <span className="arc-letter arc-letter--r">R</span>
            <span>Reframe around outcomes</span>
          </div>
          <div className="arc-item">
            <span className="arc-letter arc-letter--c">C</span>
            <span>Respond with a concrete next step</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="faq-list">
          {objections.map((o) => (
            <details className="faq-item objection-item" key={o.objection}>
              <summary>{o.objection}</summary>
              <div className="objection-body">
                <div className="objection-block">
                  <span className="objection-label">Acknowledge</span>
                  <p>{o.acknowledge}</p>
                </div>
                <div className="objection-block">
                  <span className="objection-label">Reframe</span>
                  <p>{o.reframe}</p>
                </div>
                <div className="objection-block">
                  <span className="objection-label">Respond</span>
                  <p>{o.response}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">When to pause</h2>
        <p className="section-desc">
          Some objections mean "not now," not "never." Recognize when to stop
          selling and stay trusted.
        </p>
        <div className="grid">
          <div className="card">
            <h3>Pause if</h3>
            <ul className="signal-list">
              <li>Active ERP or core system migration in progress</li>
              <li>No sponsor after two discovery conversations</li>
              <li>IT explicitly blocks AI pending policy review</li>
              <li>Customer is in litigation or regulatory freeze</li>
            </ul>
          </div>
          <div className="card">
            <h3>Stay engaged by</h3>
            <ul className="signal-list">
              <li>Sharing relevant customer stories (anonymized)</li>
              <li>Offering to join when IT policy is ready</li>
              <li>Tracking their workflow metrics over time</li>
              <li>Checking in at next planning cycle (QBR, budget season)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
