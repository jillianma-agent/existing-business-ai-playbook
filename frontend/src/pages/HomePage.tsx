import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAccounts, TEST_PULSE_ACCOUNTS } from "../signals/accountService";
import "./HomePage.css";

const readinessLabel: Record<string, string> = {
  high: "High readiness",
  medium: "Medium readiness",
  not_yet: "Not yet",
};

const sections = [
  {
    to: "/messaging",
    title: "Messaging & demos",
    description:
      "Pitch deck language, vocabulary, feature ladder, and demo playbook.",
  },
  {
    to: "/tee-up",
    title: "Customer tee-up",
    description:
      "Pre-demo landing page personalized from your messaging brief.",
  },
  {
    to: "/proof",
    title: "Proof points",
    description:
      "Customer stories and metrics to cite in conversations.",
  },
  {
    to: "/why-now",
    title: "Why now",
    description:
      "Customer-specific urgency from Gong, usage, and pains — when AI capabilities matter for this account.",
  },
  {
    to: "/discovery",
    title: "Discovery",
    description: "Questions that uncover readiness, pain, and sponsorship.",
  },
  {
    to: "/talk-tracks",
    title: "Talk tracks",
    description: "Open / probe / close scripts by scenario.",
  },
  {
    to: "/objections",
    title: "Objections",
    description: "ARC responses for common pushback.",
  },
];

const principles = [
  {
    title: "Universal foundation",
    description:
      "Messaging, talk tracks, proof, and objections are static and shared. One source of truth for GTM.",
  },
  {
    title: "Account personalization",
    description:
      "Live Snowflake + Salesforce signals rank and pre-fill every element for each customer.",
  },
  {
    title: "PMM-approved AI language",
    description:
      "Lead with capability value — sidekick, agents, AI workflows, vibe — not a platform migration pitch.",
  },
  {
    title: "De-risk the first step",
    description:
      "One workflow, one metric, 30 days. You own the demo and the pilot motion.",
  },
];

export default function HomePage() {
  const accounts = listAccounts();
  const navigate = useNavigate();
  const [pulseId, setPulseId] = useState("");
  const [pulseError, setPulseError] = useState<string | null>(null);

  function handlePulseSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = pulseId.trim();
    if (!/^\d+$/.test(trimmed)) {
      setPulseError("Enter a numeric pulse account ID (digits only).");
      return;
    }
    setPulseError(null);
    navigate(`/account/${trimmed}`);
  }

  return (
    <div className="page home-page">
      <span className="page-eyebrow">Existing business</span>
      <h1 className="page-title">
        Personalize your AI playbook for your customer
      </h1>
      <p className="page-subtitle">
        Plan your next conversation with PMM-approved AI capability language —
        value and outcomes on workflows they already run.
      </p>

      <section className="section">
        <h2 className="section-title">Load a live account</h2>
        <p className="section-desc">
          Enter a monday pulse account ID to pull live data from BigBrain Snowflake
          (typically 3–30 seconds).
        </p>
        <form className="pulse-lookup-form" onSubmit={handlePulseSubmit}>
          <label htmlFor="pulse-id" className="pulse-lookup-label">
            Pulse account ID
          </label>
          <div className="pulse-lookup-row">
            <input
              id="pulse-id"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 15393079"
              value={pulseId}
              onChange={(e) => {
                setPulseId(e.target.value);
                if (pulseError) setPulseError(null);
              }}
              className="pulse-lookup-input"
            />
            <button type="submit" className="pulse-lookup-btn" disabled={!pulseId.trim()}>
              Load account
            </button>
          </div>
          {pulseError && <p className="pulse-lookup-error">{pulseError}</p>}
        </form>
        <div className="test-accounts">
          <span className="test-accounts-label">Quick test accounts:</span>
          {TEST_PULSE_ACCOUNTS.map((a) => (
            <Link
              key={a.id}
              to={`/account/${a.id}`}
              className="test-account-link"
            >
              {a.id} — {a.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Demo accounts (offline)</h2>
        <p className="section-desc">
          Mock data with Gong themes for testing personalization without the webhook.
        </p>
        <div className="account-picker-grid">
          {accounts.map((a) => (
            <Link
              to={`/account/${a.accountId}`}
              className="account-picker-card"
              key={a.accountId}
            >
              <div className="account-picker-header">
                <h3>{a.accountName}</h3>
                <span className={`readiness-pill readiness-pill--${a.readiness}`}>
                  {readinessLabel[a.readiness]} · {a.readinessScore}
                </span>
              </div>
              <p className="account-picker-meta">
                {a.segment} · {a.industry}
              </p>
              <span className="link-arrow">Open account prep →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Universal library (static)</h2>
        <p className="section-desc">
          Browse without an account selected, or open any section while an
          account is active to see personalized ranking and highlights.
        </p>
        <div className="grid home-grid">
          {sections.map((s) => (
            <Link to={s.to} className="card card-link" key={s.to}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="link-arrow">Open section →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How the two layers work</h2>
        <div className="grid">
          {principles.map((p) => (
            <div className="card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-section">
        <h2 className="section-title">Architecture</h2>
        <div className="feature-box">
          <ul>
            <li>
              <strong>content/</strong> — static playbook elements with IDs
              (talk tracks, objections, proof, demos)
            </li>
            <li>
              <strong>signals/</strong> — account data + rules engine →
              recommendations
            </li>
            <li>
              <strong>/account/:id</strong> — personalized workspace (numeric ID =
              live webhook)
            </li>
            <li>
              <strong>Library pages</strong> — same content, reordered and
              highlighted when <code>?account=</code> is set
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
