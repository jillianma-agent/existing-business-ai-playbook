import { Link, Navigate } from "react-router-dom";
import { getDemoScenario } from "../content/demoScenarios";
import { discoveryQuestions } from "../content/discoveryQuestions";
import { getObjection } from "../content/objections";
import { getMigrationPath } from "../content/migrationPaths";
import { getProofPoint } from "../content/proofPoints";
import { getTalkTrack } from "../content/talkTracks";
import { useAccount } from "../context/AccountContext";
import type { ParsedVibeAccount } from "../signals/vibeWebhook";
import "./AccountPrepPage.css";

function SignalSourceBadge({ source }: { source: string }) {
  return <span className={`source-badge source-badge--${source}`}>{source}</span>;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function VibeCreditsBlock({ vibe }: { vibe: ParsedVibeAccount }) {
  if (vibe.creditsTotal <= 0) return null;

  return (
    <>
      <h3 className="prep-subtitle">Credits by product (top 3)</h3>
      <div className="credits-table-wrap">
        <table className="credits-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Credits</th>
              <th>Share</th>
              <th>Util vs limit</th>
            </tr>
          </thead>
          <tbody>
            {vibe.topProducts.map((p) => (
              <tr key={p.key}>
                <td>{p.label}</td>
                <td>{p.credits.toLocaleString()}</td>
                <td>{p.sharePct.toFixed(1)}%</td>
                <td>
                  <span className="util-bar-wrap">
                    <span
                      className="util-bar"
                      style={{ width: `${Math.min(p.utilPct, 100)}%` }}
                    />
                    <span className="util-label">{p.utilPct.toFixed(1)}%</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="credits-meta">
        {vibe.aiCreditsUsed.toLocaleString()} / {vibe.aiCreditsLimit.toLocaleString()} credits
        ({vibe.aiCreditsPct}% of limit) · {vibe.workflowsUsed} / {vibe.workflowsLimit} workflows
      </p>
    </>
  );
}

function VibeChampionsBlock({ vibe }: { vibe: ParsedVibeAccount }) {
  if (vibe.champions.length === 0) return null;

  return (
    <>
      <h3 className="prep-subtitle">AI champions</h3>
      <ul className="champion-list">
        {vibe.champions.map((c) => (
          <li key={c.rank}>
            <strong>#{c.rank} {c.name}</strong>
            <span className="champion-meta">
              {c.creditsUsed.toLocaleString()} credits
              {c.persona && ` · ${c.persona}`}
              {c.title && ` · ${c.title}`}
              {c.team && ` · ${c.team}`}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function VibeRenewalBlock({ vibe }: { vibe: ParsedVibeAccount }) {
  if (!vibe.renewalDate) return null;

  return (
    <div className="renewal-block">
      <h3 className="prep-subtitle">Renewal</h3>
      <dl className="usage-dl">
        <div>
          <dt>Date</dt>
          <dd>{vibe.renewalDate}</dd>
        </div>
        <div>
          <dt>ARR to renew</dt>
          <dd>{formatCurrency(vibe.arrToRenew)}</dd>
        </div>
        {vibe.renewalStage && (
          <div>
            <dt>Stage</dt>
            <dd>{vibe.renewalStage}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export default function AccountPrepPage() {
  const { accountId, playbook, status, error, retry } = useAccount();

  if (!accountId) {
    return <Navigate to="/" replace />;
  }

  if (status === "loading") {
    return (
      <div className="page account-prep">
        <span className="page-eyebrow">Account workspace</span>
        <h1 className="page-title">Loading account {accountId}…</h1>
        <p className="page-subtitle">
          Pulling live data from BigBrain Snowflake. This usually takes 3–30 seconds.
        </p>
        <div className="prep-loading">
          <div className="prep-loading-spinner" aria-hidden />
          <p>Fetching signals for pulse account {accountId}</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="page account-prep">
        <span className="page-eyebrow">Account workspace</span>
        <h1 className="page-title">Couldn't load data</h1>
        <p className="page-subtitle">{error ?? "Request failed or timed out."}</p>
        <div className="prep-error-actions">
          <button type="button" className="retry-btn" onClick={retry}>
            Retry
          </button>
          <Link to="/">← Back to home</Link>
        </div>
      </div>
    );
  }

  if (status === "not_found" || !playbook) {
    return (
      <div className="page account-prep">
        <span className="page-eyebrow">Account workspace</span>
        <h1 className="page-title">Account not found</h1>
        <p className="page-subtitle">
          No data returned for pulse account {accountId}. Check the ID and try again.
        </p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const { account, recommendations: rec } = playbook;
  const vibe = account.vibe;
  const talkTrack = getTalkTrack(rec.talkTrackId);
  const demo = getDemoScenario(rec.demoScenarioId);
  const pilotPath = getMigrationPath(rec.pilotPathId);
  const proofStories = rec.proofStoryIds.map(getProofPoint).filter(Boolean);
  const questions = rec.discoveryQuestionIds
    .map((id) => discoveryQuestions.find((q) => q.id === id))
    .filter(Boolean);
  const objectionList = rec.objectionIds.map(getObjection).filter(Boolean);

  const dataSourceLabel = vibe
    ? "Salesforce + Snowflake (live)"
    : "Salesforce, Snowflake, and Gong (demo)";

  return (
    <div className="page account-prep">
      <span className="page-eyebrow">Account workspace</span>
      <h1 className="page-title">{account.accountName}</h1>
      {vibe && (
        <p className="account-meta-line">
          Pulse {vibe.pulseAccountId} · {vibe.planTier} · {vibe.industry} · {vibe.region}
          {vibe.aiStatus !== "Unknown" && (
            <span className={`ai-status ai-status--${vibe.aiStatus.toLowerCase()}`}>
              AI {vibe.aiStatus}
            </span>
          )}
        </p>
      )}
      <p className="page-subtitle">
        Personalized call prep from {dataSourceLabel}. Every playbook element below
        is selected for this account.
      </p>

      <div className="prep-grid">
        <section className="prep-panel prep-panel--signals">
          <h2 className="prep-panel-title">Signals</h2>
          <div className={`readiness-block readiness-block--${account.readiness}`}>
            <span className="readiness-score">{account.readinessScore}</span>
            <div>
              <strong className="readiness-label">
                {account.readiness.replace("_", " ")} readiness
              </strong>
              <ul className="readiness-reasons">
                {account.readinessReasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="prep-subtitle">Data sources</h3>
          <ul className="signal-list">
            {account.signals.map((s) => (
              <li key={s.id}>
                <SignalSourceBadge source={s.source} />
                {s.label}
              </li>
            ))}
          </ul>

          {vibe ? (
            <>
              <h3 className="prep-subtitle">Products & seats</h3>
              <p className="products-line">{vibe.products.join(" · ")}</p>
              <dl className="usage-dl">
                <div><dt>WM seats</dt><dd>{vibe.wmSeats}</dd></div>
                <div><dt>CRM seats</dt><dd>{vibe.crmSeats}</dd></div>
                <div><dt>Dev seats</dt><dd>{vibe.devSeats}</dd></div>
                <div><dt>Service seats</dt><dd>{vibe.serviceSeats}</dd></div>
              </dl>

              <VibeRenewalBlock vibe={vibe} />
              <VibeCreditsBlock vibe={vibe} />
              <VibeChampionsBlock vibe={vibe} />
            </>
          ) : (
            <>
              {account.gong.lastCallSummary && (
                <>
                  <h3 className="prep-subtitle">Last call (Gong)</h3>
                  <p className="gong-summary">{account.gong.lastCallSummary}</p>
                  <div className="theme-tags">
                    {account.gong.recentThemes.map((t) => (
                      <span className="tag tag--purple" key={t}>{t}</span>
                    ))}
                  </div>
                </>
              )}

              <h3 className="prep-subtitle">Usage (Snowflake)</h3>
              <dl className="usage-dl">
                <div><dt>Active users (30d)</dt><dd>{account.usage.activeUsers30d}</dd></div>
                <div><dt>Automations</dt><dd>{account.usage.automations}</dd></div>
                <div><dt>Top board</dt><dd>{account.usage.topBoardByVolume ?? "—"}</dd></div>
                <div>
                  <dt>AI features used</dt>
                  <dd>{account.usage.aiFeaturesUsed.join(", ") || "None yet"}</dd>
                </div>
              </dl>

              {account.renewalDate && (
                <p className="renewal-note">Renewal: {account.renewalDate}</p>
              )}
            </>
          )}
        </section>

        <section className="prep-panel prep-panel--plan">
          <h2 className="prep-panel-title">Your plan for the next call</h2>

          {talkTrack && (
            <div className="rec-block rec-block--primary">
              <span className="rec-label">Talk track · {talkTrack.title}</span>
              {rec.reasons.talkTrack?.map((r) => (
                <span className="rec-why" key={r}>Because: {r}</span>
              ))}
              <div className="talk-mini">
                <p><strong>Open:</strong> {talkTrack.open}</p>
                <p><strong>Close:</strong> {talkTrack.close}</p>
              </div>
              <Link to={`/talk-tracks?account=${account.accountId}`}>Full talk track →</Link>
            </div>
          )}

          {demo && (
            <div className="rec-block">
              <span className="rec-label">Demo · {demo.scenario}</span>
              <ul>
                {demo.show.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Link to={`/messaging?account=${account.accountId}`}>Demo playbook →</Link>
            </div>
          )}

          <div className="rec-block">
            <span className="rec-label">Discovery questions</span>
            <ol className="question-ol">
              {questions.map((q) => (
                <li key={q!.id}>{q!.text}</li>
              ))}
            </ol>
            <Link to={`/discovery?account=${account.accountId}`}>Full question bank →</Link>
          </div>

          <Link to={`/account/${account.accountId}/pilot`} className="pilot-cta">
            Open pre-filled pilot plan →
          </Link>
        </section>

        <section className="prep-panel prep-panel--proof">
          <h2 className="prep-panel-title">Proof & objections</h2>

          <h3 className="prep-subtitle">Customer stories to cite</h3>
          {proofStories.map((story) => (
            <div className="proof-mini" key={story!.id}>
              <span className="proof-mini-metric">{story!.metric}</span>
              <strong>{story!.company}</strong>
              <p>"{story!.quote.slice(0, 120)}…"</p>
              {rec.reasons[story!.id]?.[0] && (
                <span className="rec-why">Because: {rec.reasons[story!.id][0]}</span>
              )}
            </div>
          ))}
          <Link to={`/proof?account=${account.accountId}`}>All proof points →</Link>

          <h3 className="prep-subtitle">Likely objections</h3>
          {objectionList.map((o) => (
            <details className="objection-mini" key={o!.id}>
              <summary>{o!.objection}</summary>
              <p><strong>Respond:</strong> {o!.response}</p>
            </details>
          ))}
          <Link to={`/objections?account=${account.accountId}`}>All objections →</Link>

          {pilotPath && (
            <>
              <h3 className="prep-subtitle">Pilot path</h3>
              <div className="path-mini">
                <strong>{pilotPath.title}</strong>
                <p>{pilotPath.bestFor}</p>
              </div>
            </>
          )}
        </section>
      </div>

      <section className="section library-link-section">
        <h2 className="section-title">Universal playbook library</h2>
        <p className="section-desc">
          The foundation is static and shared. This account view customizes which
          elements surface. Browse the full library anytime — recommendations
          persist while this account is selected.
        </p>
        <div className="library-links">
          <Link to={`/messaging?account=${account.accountId}`}>Messaging</Link>
          <Link to={`/proof?account=${account.accountId}`}>Proof</Link>
          <Link to={`/talk-tracks?account=${account.accountId}`}>Talk tracks</Link>
          <Link to={`/discovery?account=${account.accountId}`}>Discovery</Link>
          <Link to={`/objections?account=${account.accountId}`}>Objections</Link>
        </div>
      </section>
    </div>
  );
}
