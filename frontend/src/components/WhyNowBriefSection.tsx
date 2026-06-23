import { Link } from "react-router-dom";
import RecommendedBadge from "./RecommendedBadge";
import { getTalkTrack } from "../content/talkTracks";
import { useAccount, useRecommendations } from "../context/AccountContext";
import type { SignalSource } from "../signals/types";
import "./WhyNowBriefSection.css";

function SourceBadge({ source }: { source: SignalSource }) {
  return <span className={`why-now-source source-badge source-badge--${source}`}>{source}</span>;
}

export default function WhyNowBriefSection() {
  const { playbook, accountId, isPersonalized } = useAccount();
  const rec = useRecommendations();

  if (!isPersonalized || !playbook || !rec?.whyNowBrief) {
    return (
      <section className="section why-now-brief why-now-brief--empty">
        <h2 className="section-title">Customer perspective</h2>
        <p className="section-desc">
          Load an account to see why AI capabilities matter for this customer
          now — built from Gong themes, usage signals, pains, and readiness,
          not generic PMM copy.
        </p>
        <Link to="/">Load an account →</Link>
      </section>
    );
  }

  const brief = rec.whyNowBrief;
  const talkTrack = getTalkTrack(brief.talkTrackId);
  const account = playbook.account;

  return (
    <section className="section why-now-brief">
      <div className="why-now-brief-header">
        <div>
          <h2 className="section-title">
            Why now for {account.accountName}
            <RecommendedBadge reason="From Gong, Snowflake, Salesforce, and rules" />
          </h2>
          <p className="why-now-headline">{brief.headline}</p>
        </div>
        <div className="why-now-brief-links">
          {talkTrack && accountId && (
            <Link to={`/talk-tracks?account=${accountId}#talk-track-${brief.talkTrackId}`}>
              {talkTrack.title} talk track →
            </Link>
          )}
          {accountId && (
            <Link to={`/messaging?account=${accountId}`}>PMM language & demo plan →</Link>
          )}
        </div>
      </div>

      <div className="why-now-lens">
        <span className="why-now-lens-label">Their situation</span>
        <p>{brief.customerLens}</p>
      </div>

      {brief.insights.length > 0 && (
        <>
          <h3 className="why-now-subhead">What we know about them</h3>
          <ul className="why-now-insights">
            {brief.insights.map((insight, i) => (
              <li key={`${insight.source}-${i}`}>
                <SourceBadge source={insight.source} />
                {insight.text}
              </li>
            ))}
          </ul>
        </>
      )}

      {brief.timingDrivers.length > 0 && (
        <>
          <h3 className="why-now-subhead">Why the timing matters</h3>
          <ul className="why-now-timing">
            {brief.timingDrivers.map((driver) => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </>
      )}

      {brief.valueAngles.length > 0 && (
        <>
          <h3 className="why-now-subhead">Their pain → value now</h3>
          <div className="why-now-value-grid">
            {brief.valueAngles.map((angle) => (
              <div className="why-now-value-card" key={angle.fromPain}>
                <p className="why-now-pain">
                  <span className="why-now-pain-label">They feel</span>
                  {angle.fromPain}
                </p>
                <p className="why-now-value">{angle.valueForThem}</p>
                <p className="why-now-capability">
                  <strong>{angle.leadCapability}</strong>
                  <span className="why-now-cap-reason">{angle.whyThisCapability}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="why-now-subhead">How to frame this conversation</h3>
      <div className="why-now-steps">
        {brief.conversationPath.map((step, i) => (
          <div className="why-now-step" key={step.title}>
            <span className="why-now-step-num">{i + 1}</span>
            <div>
              <h4>{step.title}</h4>
              <blockquote className="why-now-script">{step.script}</blockquote>
              <p className="why-now-rationale">
                <strong>Why:</strong> {step.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>

      {brief.personalizedGuardrails.length > 0 && (
        <div className="why-now-guardrails">
          <h3 className="why-now-subhead">Watch-outs for this account</h3>
          <ul>
            {brief.personalizedGuardrails.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
