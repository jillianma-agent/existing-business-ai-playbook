import { Link } from "react-router-dom";
import RecommendedBadge from "./RecommendedBadge";
import { getDemoUseCase, getCapabilityLabel } from "../content/demoUseCases";
import { getFeatureTier } from "../content/featureLadder";
import { getDemoScenario } from "../content/demoScenarios";
import { useAccount, useRecommendations } from "../context/AccountContext";
import "./DemoWalkthroughSection.css";

export default function DemoWalkthroughSection() {
  const { playbook, accountId, isPersonalized } = useAccount();
  const rec = useRecommendations();

  if (!isPersonalized || !playbook || !rec?.demoWalkthrough) {
    return (
      <section className="section demo-walkthrough demo-walkthrough--empty">
        <h2 className="section-title">Your demo plan</h2>
        <p className="section-desc">
          Load an account to get a Gong-informed walkthrough: which agents, Vibe
          apps, sidekick, and workflows to feature based on usage, call themes,
          and what to skip on this conversation.
        </p>
        <Link to="/">Load an account →</Link>
      </section>
    );
  }

  const walk = rec.demoWalkthrough;
  const tier = getFeatureTier(walk.featureTier);
  const scenario = getDemoScenario(walk.scenarioId);
  const useCases = walk.useCaseIds
    .map((id) => getDemoUseCase(id))
    .filter(Boolean);

  return (
    <section className="section demo-walkthrough">
      <div className="demo-walkthrough-header">
        <div>
          <h2 className="section-title">
            Your demo plan · {playbook.account.accountName}
            <RecommendedBadge reason="From Gong, Snowflake, and talk track signals" />
          </h2>
          <p className="section-desc">
            Walk the AI work platform on one workflow they already run. Feature
            only what matches their maturity — not the full catalog.
          </p>
        </div>
        {accountId && (
          <Link to={`/account/${accountId}`} className="demo-walkthrough-back">
            Account prep →
          </Link>
        )}
      </div>

      {walk.gongAnchor && (
        <div className="demo-gong-anchor">
          <span className="demo-gong-label">Gong insight</span>
          <p>{walk.gongAnchor}</p>
        </div>
      )}

      <div className="demo-walkthrough-meta">
        <div className="demo-meta-card">
          <span className="demo-meta-label">AI readiness for this call</span>
          <strong>
            {walk.featureTier}. {walk.featureTierTitle}
          </strong>
          {tier && <p>{tier.subtitle}</p>}
        </div>
        {scenario && (
          <div className="demo-meta-card">
            <span className="demo-meta-label">Demo scenario</span>
            <strong>{scenario.scenario}</strong>
            <p>{scenario.duration}</p>
          </div>
        )}
      </div>

      <div className="demo-capability-row">
        <div className="demo-capability-col demo-capability-col--show">
          <h3>Feature on the call</h3>
          <ul>
            {walk.showCapabilities.map((c) => (
              <li key={c.capability}>
                <strong>{c.label}</strong>
                <span>{c.reason}</span>
              </li>
            ))}
          </ul>
        </div>
        {walk.skipCapabilities.length > 0 && (
          <div className="demo-capability-col demo-capability-col--skip">
            <h3>Skip for now</h3>
            <ul>
              {walk.skipCapabilities.map((s) => (
                <li key={s.label}>
                  <strong>{s.label}</strong>
                  <span>{s.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h3 className="demo-subheading">Top use cases for this customer</h3>
      <p className="section-desc demo-use-case-note">
        Marketing examples below — map the pattern to their board and industry
        (e.g. brief intake → clinical ops intake, vendor onboarding, or service
        triage).
      </p>
      <div className="demo-use-case-grid">
        {useCases.map((uc, index) => (
          <article className="demo-use-case-card" key={uc!.id}>
            <span className="demo-use-case-rank">#{index + 1}</span>
            <h4>{uc!.title}</h4>
            <p className="demo-use-case-real">{uc!.realLife}</p>
            {rec.reasons[uc!.id]?.[0] && (
              <p className="demo-use-case-why">
                <strong>Why:</strong> {rec.reasons[uc!.id][0]}
              </p>
            )}
            <div className="demo-use-case-caps">
              {[...new Set(uc!.highlights.map((h) => h.capability))].map((cap) => (
                <span className="tag tag--purple" key={cap}>
                  {getCapabilityLabel(cap)}
                </span>
              ))}
            </div>
            <ul className="demo-use-case-highlights">
              {uc!.highlights.map((h, i) => (
                <li key={i}>
                  <strong>{getCapabilityLabel(h.capability)}:</strong> {h.text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="demo-steps-block">
        <h3 className="demo-subheading">Suggested walkthrough</h3>
        <ol className="demo-steps-list">
          {walk.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
