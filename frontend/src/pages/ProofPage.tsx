import { Link } from "react-router-dom";
import PersonalizationStrip from "../components/PersonalizationStrip";
import RecommendedBadge from "../components/RecommendedBadge";
import {
  CUSTOMER_STORIES_URL,
  proofPoints,
  getProofPoint,
  type ProofPoint,
} from "../content/proofPoints";
import { getTalkTrack } from "../content/talkTracks";
import { useAccount, useRecommendations } from "../context/AccountContext";
import "./ProofPage.css";

function ProofStoryCard({
  story,
  rank,
  reason,
  featured = false,
}: {
  story: ProofPoint;
  rank?: number;
  reason?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`proof-card${featured ? " proof-card--featured" : ""}`}
      id={featured ? `proof-${story.id}` : undefined}
    >
      {rank != null && (
        <span className="proof-rank">#{rank} for this call</span>
      )}
      <div className="proof-card-top">
        <span className="proof-metric">{story.metric}</span>
        <div className="proof-tags">
          {story.products.map((p) => (
            <span className="tag tag--purple" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>
      <h3>{story.company}</h3>
      <p className="proof-meta">
        {story.industry} · {story.segment}
      </p>
      <p className="proof-headline">{story.headline}</p>
      {reason && (
        <p className="proof-match-reason">
          <strong>Why this story:</strong> {reason}
        </p>
      )}
      <blockquote className="proof-quote">
        <p>"{story.quote}"</p>
        <footer>{story.attribution}</footer>
      </blockquote>
      {featured && story.storyUrl && (
        <a
          href={story.storyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="proof-story-link"
        >
          Read full customer story →
        </a>
      )}
    </article>
  );
}

export default function ProofPage() {
  const rec = useRecommendations();
  const { accountId, playbook, isPersonalized } = useAccount();

  const featuredIds = rec?.proofStoryIds ?? [];
  const featuredStories = featuredIds
    .map((id) => getProofPoint(id))
    .filter((s): s is ProofPoint => !!s);
  const featuredSet = new Set(featuredIds);
  const otherStories = proofPoints.filter((p) => !featuredSet.has(p.id));

  const talkTrack = rec ? getTalkTrack(rec.talkTrackId) : null;

  return (
    <div className="page">
      <PersonalizationStrip section="Proof" />

      <span className="page-eyebrow">Proof points</span>
      <h1 className="page-title">Customer stories for your call</h1>
      <p className="page-subtitle">
        Lead with the metric, bridge to their workflow. Full library at{" "}
        <a href={CUSTOMER_STORIES_URL} target="_blank" rel="noopener noreferrer">
          monday.com/w/customer-stories
        </a>
        .
      </p>

      {isPersonalized && featuredStories.length > 0 ? (
        <section className="section proof-featured-section">
          <div className="proof-featured-header">
            <div>
              <h2 className="section-title">
                Top 3 for {playbook!.account.accountName}
                <RecommendedBadge />
              </h2>
              <p className="section-desc">
                {talkTrack
                  ? `Anticipated conversation: ${talkTrack.title}. These stories mirror their industry, products, and call type.`
                  : "Ranked for industry, products, and signals on this account."}
              </p>
            </div>
            <Link to={`/talk-tracks?account=${accountId}`} className="proof-link-talk">
              Open talk track →
            </Link>
          </div>
          <div className="proof-featured-grid">
            {featuredStories.map((story, index) => (
              <ProofStoryCard
                key={story.id}
                story={story}
                rank={index + 1}
                reason={rec?.reasons[story.id]?.[0]}
                featured
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="section proof-empty-featured">
          <h2 className="section-title">Get your top 3 stories</h2>
          <p className="section-desc">
            Load an account on the{" "}
            <Link to="/">home page</Link> to see the three customer stories most
            likely to land on your next call — matched to talk track, industry,
            and product mix.
          </p>
        </section>
      )}

      <section className="section proof-how-section">
        <h2 className="section-title">How to use proof on the call</h2>
        <div className="proof-how-grid">
          <div className="proof-how-item">
            <span className="proof-how-step">1</span>
            <p>
              <strong>Mirror their world</strong> — same industry or workflow
              beats a bigger logo.
            </p>
          </div>
          <div className="proof-how-item">
            <span className="proof-how-step">2</span>
            <p>
              <strong>Metric first, quote second</strong> — "98% auto-triaged"
              before the narrative.
            </p>
          </div>
          <div className="proof-how-item">
            <span className="proof-how-step">3</span>
            <p>
              <strong>Bridge to their pilot</strong> — "Similar bottleneck. Let's
              find your version on a board you already run."
            </p>
          </div>
        </div>
      </section>

      <details className="proof-library">
        <summary className="proof-library-summary">
          Browse all customer stories
          <span className="proof-library-count">{proofPoints.length} stories</span>
        </summary>
        <div className="proof-grid proof-grid--compact">
          {otherStories.map((story) => (
            <ProofStoryCard key={story.id} story={story} />
          ))}
        </div>
      </details>

      <section className="dark-section">
        <h2 className="section-title">The problem frame</h2>
        <p className="section-desc">
          Use when a customer asks why AI hasn't paid off yet.
        </p>
        <div className="feature-box">
          <ul>
            <li>
              <strong>Execution still depends on people for everything</strong>{" "}
              — boards show status, humans still push every step
            </li>
            <li>
              <strong>Work lives everywhere, and nowhere</strong> — context
              scattered across tools
            </li>
            <li>
              <strong>AI helps individuals, not organizations</strong> — point
              tools don't scale across teams
            </li>
          </ul>
          <p className="problem-stat">
            95% of organizations aren't seeing AI impact at scale. monday
            closes the gap by embedding agents in workflows teams already run.
          </p>
        </div>
      </section>
    </div>
  );
}
