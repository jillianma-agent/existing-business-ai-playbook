import { Link, Navigate } from "react-router-dom";
import { getMigrationPath } from "../content/migrationPaths";
import { useAccount } from "../context/AccountContext";
import "./AccountPilotPage.css";

export default function AccountPilotPage() {
  const { accountId, playbook, status, error, retry } = useAccount();

  if (!accountId) {
    return <Navigate to="/" replace />;
  }

  if (status === "loading") {
    return (
      <div className="page">
        <span className="page-eyebrow">Account workspace</span>
        <h1 className="page-title">Loading pilot plan…</h1>
        <p className="page-subtitle">Pulling account signals (3–30 seconds).</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="page">
        <h1 className="page-title">Couldn't load data</h1>
        <p className="page-subtitle">{error}</p>
        <button type="button" className="retry-btn" onClick={retry}>Retry</button>
      </div>
    );
  }

  if (status === "not_found" || !playbook) {
    return <Navigate to="/" replace />;
  }

  const { account, recommendations: rec } = playbook;
  const path = getMigrationPath(rec.pilotPathId);
  const draft = account.pilotDraft;

  const fields = [
    { label: "Account", value: account.accountName },
    { label: "Workflow / board", value: draft.workflow },
    { label: "Sponsor", value: draft.sponsor },
    { label: "Champion (day-to-day)", value: draft.champion },
    { label: "Baseline metric", value: draft.baselineMetric },
    { label: "30-day target", value: draft.targetMetric },
    { label: "AI capability", value: draft.aiCapability },
    { label: "Pilot path", value: path?.title },
    { label: "Human gates (define with customer)", value: "[Document approval checkpoints]" },
    {
      label: "Readout date",
      value: account.nextCallDate ? `30 days from ${account.nextCallDate}` : "[Set date]",
    },
  ];

  return (
    <div className="page">
      <span className="page-eyebrow">Account workspace</span>
      <h1 className="page-title">Pilot plan · {account.accountName}</h1>
      <p className="page-subtitle">
        Pre-filled from account signals. Edit with the customer before Phase 1 starts.
      </p>

      <div className="pilot-source-note">
        <span className="tag tag--purple">Auto-filled</span>
        <p>
          Fields marked below pull from account signals. Override anything that
          doesn't match what you know.
        </p>
      </div>

      <div className="pilot-template pilot-template--filled">
        {fields.map((f) => (
          <div className="pilot-field" key={f.label}>
            <span className="pilot-label">{f.label}</span>
            <span className="pilot-value">{f.value ?? "—"}</span>
          </div>
        ))}
      </div>

      {path && (
        <section className="section">
          <h2 className="section-title">Recommended path: {path.title}</h2>
          <p className="section-desc">{path.bestFor}</p>
          <ol className="path-steps">
            {path.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      <div className="pilot-actions">
        <Link to={`/account/${account.accountId}`} className="pilot-back">
          ← Back to account prep
        </Link>
      </div>
    </div>
  );
}
