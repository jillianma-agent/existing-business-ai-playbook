import "./DiscoveryPage.css";

const questionGroups = [
  {
    title: "Pain and volume",
    questions: [
      "Which monday work management board generates the most inbound requests per week?",
      "Where do items sit longest before someone picks them up?",
      "What work gets repeated with small variations (routing, data entry, status updates)?",
      "If you could remove one manual step tomorrow, which would it be?",
    ],
  },
  {
    title: "People and ownership",
    questions: [
      "Who owns workflow design today? Who owns automation?",
      "Which teams feel the bottleneck most acutely?",
      "Who would sponsor a 30-day pilot on one workflow?",
      "What happens when that person leaves or gets reassigned?",
    ],
  },
  {
    title: "Tools and data",
    questions: [
      "Where does context live when work moves between teams (boards, docs, email)?",
      "What automations or AI blocks do you run today, and where do they break?",
      "Which integrations matter most for this workflow?",
      "What data would a monday agent need to act, not just summarize?",
    ],
  },
  {
    title: "Success and risk",
    questions: [
      "How do you measure throughput today (cycle time, SLA, backlog size)?",
      "What would a 20–30% improvement be worth to the business?",
      "What would make this a failure in the customer's eyes?",
      "What compliance or approval gates cannot be automated?",
    ],
  },
];

const readinessSignals = [
  {
    label: "High readiness",
    tag: "green",
    signals: [
      "Named executive sponsor asking about AI outcomes",
      "Clear workflow with measurable cycle time",
      "Champion with admin access and change authority",
      "Budget or headcount pressure to do more with less",
    ],
  },
  {
    label: "Medium readiness",
    tag: "yellow",
    signals: [
      "Interest in AI but no defined workflow",
      "Automations exist but are brittle",
      "Multiple stakeholders, no single owner",
      "Success metrics are vague or inconsistent",
    ],
  },
  {
    label: "Not yet",
    tag: "purple",
    signals: [
      "No acute pain; account is stable on boards",
      "Recent rollout still in adoption phase",
      "No sponsor; exploration only",
      "Data or integration gaps block any agent action",
    ],
  },
];

export default function DiscoveryPage() {
  return (
    <div className="page">
      <span className="page-eyebrow">Before you pitch</span>
      <h1 className="page-title">Discovery questions that qualify the shift</h1>
      <p className="page-subtitle">
        Run these in QBRs, check-ins, and renewal conversations. You're
        looking for pain, sponsor, and a workflow worth piloting. If all three
        are missing, demo tier-one AI only (see Messaging) and stay advisory.
      </p>

      <section className="section">
        <h2 className="section-title">The qualification checklist</h2>
        <div className="qualify-grid">
          <div className="qualify-item">
            <span className="qualify-label">Pain</span>
            <p>A specific workflow with manual steps that slow the business</p>
          </div>
          <div className="qualify-item">
            <span className="qualify-label">Sponsor</span>
            <p>Someone who owns the outcome and can approve a pilot</p>
          </div>
          <div className="qualify-item">
            <span className="qualify-label">Pilot target</span>
            <p>One board or process you can measure in 30 days</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Question bank</h2>
        <div className="question-groups">
          {questionGroups.map((group) => (
            <div className="feature-box" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Readiness signals</h2>
        <div className="grid">
          {readinessSignals.map((r) => (
            <div className="card" key={r.label}>
              <span className={`tag tag--${r.tag}`}>{r.label}</span>
              <ul className="signal-list">
                {r.signals.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">After discovery: next move</h2>
        <div className="steps-list">
          <div className="step-item">
            <span className="step-number">✓</span>
            <div className="step-body">
              <h3>All three qualified</h3>
              <p>
                Move to talk tracks. Propose a 30-day pilot on the workflow
                they named. Bring a one-page success plan to the next call.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">~</span>
            <div className="step-body">
              <h3>Partial qualification</h3>
              <p>
                Assign homework: document the workflow, baseline cycle time, and
                identify a sponsor. Revisit in 30 days with data.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">—</span>
            <div className="step-body">
              <h3>Not qualified</h3>
              <p>
                Stay trusted. Share the "why now" narrative lightly. Focus on
                their current success metrics. Revisit when signals change.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
