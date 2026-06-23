import { Link } from "react-router-dom";
import RecommendedBadge from "./RecommendedBadge";
import { getMessagingRule, getVocabTerm } from "../content/messaging";
import { pitchPillars } from "../content/proofPoints";
import { getTalkTrack } from "../content/talkTracks";
import { useAccount, useRecommendations } from "../context/AccountContext";
import "./MessagingBriefSection.css";

export default function MessagingBriefSection() {
  const { playbook, accountId, isPersonalized } = useAccount();
  const rec = useRecommendations();

  if (!isPersonalized || !playbook || !rec?.messagingBrief) {
    return (
      <section className="section messaging-brief messaging-brief--empty">
        <h2 className="section-title">Your messaging brief</h2>
        <p className="section-desc">
          Load an account to get vocabulary, pillars, and anchor lines tailored
          to Gong themes, usage, and who you're speaking with — not generic
          pitch language.
        </p>
        <Link to="/">Load an account →</Link>
      </section>
    );
  }

  const brief = rec.messagingBrief;
  const talkTrack = getTalkTrack(brief.talkTrackId);
  const leadPillars = brief.leadPillarNames
    .slice(0, 2)
    .map((name) => pitchPillars.find((p) => p.name === name))
    .filter(Boolean);
  const vocab = brief.vocabularyIds.map(getVocabTerm).filter(Boolean);
  const rules = brief.messagingRuleIds.map(getMessagingRule).filter(Boolean);

  return (
    <section className="section messaging-brief">
      <div className="messaging-brief-header">
        <div>
          <h2 className="section-title">
            Your messaging brief · {playbook.account.accountName}
            <RecommendedBadge reason="From Gong, usage, and talk track" />
          </h2>
          <p className="section-desc">{brief.positioningNote}</p>
        </div>
        <div className="messaging-brief-links">
          {talkTrack && accountId && (
            <Link to={`/talk-tracks?account=${accountId}#talk-track-${brief.talkTrackId}`}>
              {talkTrack.title} talk track →
            </Link>
          )}
          {accountId && (
            <Link to={`/proof?account=${accountId}`}>Proof for this call →</Link>
          )}
        </div>
      </div>

      <blockquote className="messaging-anchor-custom">
        <span className="messaging-anchor-label">Your anchor line</span>
        <p>{brief.anchorLine}</p>
      </blockquote>

      <h3 className="messaging-brief-subhead">Lead with these pillars</h3>
      <div className="messaging-pillar-row">
        {leadPillars.map((p) => (
          <div className="messaging-pillar-card" key={p!.name}>
            <span className="pillar-name">{p!.name}</span>
            <h4>{p!.tagline}</h4>
            <p className="messaging-pillar-csm">{p!.csmLine}</p>
            {brief.pillarReasons[p!.name] && (
              <p className="messaging-why">
                <strong>Why:</strong> {brief.pillarReasons[p!.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <h3 className="messaging-brief-subhead">Vocabulary for this call</h3>
      <div className="messaging-vocab-row">
        {vocab.map((v) => (
          <div className="messaging-vocab-card" key={v!.id}>
            <h4>{v!.term}</h4>
            <p className="vocab-say">
              <strong>Say:</strong> {v!.say}
            </p>
            {brief.vocabReasons[v!.id] && (
              <p className="messaging-why">
                <strong>Why:</strong> {brief.vocabReasons[v!.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <h3 className="messaging-brief-subhead">Do's and don'ts for this call</h3>
      <div className="messaging-rules-row">
        {rules.map((r) => (
          <div className="card messaging-card messaging-card--compact" key={r!.id}>
            <h4>{r!.headline}</h4>
            <p className="messaging-do">
              <span className="tag tag--green">Do</span> {r!.do}
            </p>
            <p className="messaging-dont">
              <span className="tag tag--yellow">Don't</span> {r!.dont}
            </p>
            {brief.ruleReasons[r!.id] && (
              <p className="messaging-why">{brief.ruleReasons[r!.id]}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
