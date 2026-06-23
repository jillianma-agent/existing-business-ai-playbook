import {
  aiWorkCapabilities,
  pmmDoDont,
  pmmPositioningAnchor,
} from "../content/aiCapabilities";
import "./AiCapabilitiesSection.css";

interface AiCapabilitiesSectionProps {
  /** Capability ids to highlight for this account (from demo walkthrough) */
  highlightIds?: string[];
  compact?: boolean;
}

export default function AiCapabilitiesSection({
  highlightIds = [],
  compact = false,
}: AiCapabilitiesSectionProps) {
  const highlightSet = new Set(highlightIds);

  return (
    <section className={`ai-capabilities${compact ? " ai-capabilities--compact" : ""}`}>
      <div className="ai-capabilities-header">
        <span className="ai-capabilities-badge">PMM-approved</span>
        <h2 className="section-title">AI work capabilities</h2>
        <p className="section-desc">{pmmPositioningAnchor}</p>
      </div>

      {!compact && (
        <div className="pmm-dodont">
          <div className="pmm-dodont-col">
            <h3>Say</h3>
            <ul>
              {pmmDoDont.do.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="pmm-dodont-col">
            <h3>Avoid</h3>
            <ul>
              {pmmDoDont.dont.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="ai-cap-grid">
        {aiWorkCapabilities.map((cap) => {
          const highlighted = highlightSet.has(cap.id);
          return (
            <article
              className={`ai-cap-card${highlighted ? " ai-cap-card--highlight" : ""}`}
              key={cap.id}
              id={`cap-${cap.id}`}
            >
              {highlighted && (
                <span className="ai-cap-rec">Recommended for this account</span>
              )}
              <h3>{cap.name}</h3>
              <p className="ai-cap-headline">{cap.deckHeadline}</p>
              <p className="ai-cap-summary">{cap.valueSummary}</p>
              {!compact && (
                <ul className="ai-cap-benefits">
                  {cap.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              <div className="ai-cap-pmm">
                <p>
                  <span className="tag tag--green">Say</span> {cap.pmmSay}
                </p>
                <p>
                  <span className="tag tag--yellow">Avoid</span> {cap.pmmAvoid}
                </p>
              </div>
              <p className="ai-cap-when">
                <strong>Highlight when:</strong> {cap.highlightWhen}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
