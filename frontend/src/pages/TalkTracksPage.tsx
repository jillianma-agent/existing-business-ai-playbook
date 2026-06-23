import { Link } from "react-router-dom";
import { useState } from "react";
import PersonalizationStrip from "../components/PersonalizationStrip";
import RecommendedBadge from "../components/RecommendedBadge";
import { talkTracks } from "../content/talkTracks";
import { useAccount, useRecommendations } from "../context/AccountContext";
import { usePersonalizedOrder } from "../hooks/usePersonalizedOrder";
import "./TalkTracksPage.css";

const EMAIL_FOLLOW_UP = `Hi [Name],

Thanks for the time today — really helpful to walk through how your team is running [workflow/board] on monday.

From our conversation, it sounds like the main bottleneck is [e.g. manual triage and routing], and there's a clear opportunity to use [e.g. a monday agent for intake] without changing the boards your team already trusts. If we can [e.g. reduce intake-to-assignment from 4 hours to 30 minutes], that's a win worth measuring.

I'd like to propose a focused 30-day pilot on that one workflow, with [sponsor name and role] looped in on milestones. I'll send a short one-page plan by [date] so you can share it internally.

Let me know if anything from today didn't land, or if there's someone else we should include.

[Your name]`;

export default function TalkTracksPage() {
  const rec = useRecommendations();
  const { accountId } = useAccount();
  const { ordered, recommendedIds } = usePersonalizedOrder(
    talkTracks,
    rec ? [rec.talkTrackId] : undefined
  );
  const [copied, setCopied] = useState(false);

  async function copyEmailTemplate() {
    try {
      await navigator.clipboard.writeText(EMAIL_FOLLOW_UP);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page">
      <PersonalizationStrip section="Talk tracks" />

      <span className="page-eyebrow">Conversation frameworks</span>
      <h1 className="page-title">Talk tracks by scenario</h1>
      <p className="page-subtitle">
        Universal scripts below. When an account is selected, recommended tracks
        appear first. Pair with{" "}
        <Link to={accountId ? `/messaging?account=${accountId}` : "/messaging"}>
          Messaging & demos
        </Link>
        .
      </p>

      <section className="section">
        <h2 className="section-title">Conversation rhythm</h2>
        <div className="rhythm-bar">
          <div className="rhythm-step">
            <span className="rhythm-label">Open</span>
            <span className="rhythm-desc">Validate + frame the shift</span>
          </div>
          <div className="rhythm-arrow">→</div>
          <div className="rhythm-step">
            <span className="rhythm-label">Probe</span>
            <span className="rhythm-desc">Discovery questions</span>
          </div>
          <div className="rhythm-arrow">→</div>
          <div className="rhythm-step">
            <span className="rhythm-label">Close</span>
            <span className="rhythm-desc">One workflow, 30 days</span>
          </div>
          <div className="rhythm-arrow">→</div>
          <div className="rhythm-step">
            <span className="rhythm-label">Demo</span>
            <span className="rhythm-desc">Match maturity</span>
          </div>
        </div>

        <nav className="talk-track-menu" aria-label="Jump to talk track by audience">
          <p className="talk-track-menu-heading">Who&apos;s on the call?</p>
          <div className="talk-track-menu-grid">
            {talkTracks.map((track) => {
              const isRec = recommendedIds.has(track.id);
              return (
                <a
                  key={track.id}
                  href={`#talk-track-${track.id}`}
                  className={`talk-track-menu-item${isRec ? " talk-track-menu-item--recommended" : ""}`}
                >
                  <span className="talk-track-menu-title">{track.title}</span>
                  <span className="talk-track-menu-audience">{track.audience}</span>
                  {isRec && (
                    <span className="talk-track-menu-rec">Recommended for this account</span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>
      </section>

      <section className="section">
        {ordered.map((s) => {
          const isRec = recommendedIds.has(s.id);
          return (
            <div
              id={`talk-track-${s.id}`}
              className={`talk-track ${isRec ? "talk-track--recommended" : ""}`}
              key={s.id}
            >
              <h2 className="talk-track-title">
                {s.title}
                {isRec && (
                  <RecommendedBadge reason={rec?.reasons.talkTrack?.join("; ")} />
                )}
              </h2>
              <p className="talk-track-context">{s.context}</p>

              <div className="talk-block talk-block--open">
                <span className="talk-label">Open</span>
                <p>{s.open}</p>
              </div>

              <div className="talk-block talk-block--probe">
                <span className="talk-label">Probe</span>
                <ul>
                  {s.probe.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="talk-block talk-block--close">
                <span className="talk-label">Close</span>
                <p>{s.close}</p>
              </div>

              <div className="talk-block talk-block--demo">
                <span className="talk-label">Demo</span>
                <p>{s.demo}</p>
              </div>
            </div>
          );
        })}
      </section>

      {accountId && (
        <section className="section">
          <h2 className="section-title">Proof to pair with talk tracks</h2>
          <p className="section-desc">
            Cite a relevant customer story before you close. See the{" "}
            <Link to={`/proof?account=${accountId}`}>Proof</Link> page for
            AI stories matched to this account.
          </p>
        </section>
      )}

      <section className="dark-section">
        <div className="email-template-header">
          <div>
            <h2 className="section-title">Email follow-up template</h2>
            <p className="section-desc">
              Customize and send within 24 hours of your conversation.
            </p>
          </div>
          <button
            type="button"
            className="email-copy-btn"
            onClick={copyEmailTemplate}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="feature-box email-template">
          {EMAIL_FOLLOW_UP.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
