import { Link } from "react-router-dom";
import { useState } from "react";
import PersonalizationStrip from "../components/PersonalizationStrip";
import { useAccount, useRecommendations } from "../context/AccountContext";
import { buildCustomerTeeUpContent } from "../signals/customerTeeUp";
import "./CustomerTeeUpPage.css";

export default function CustomerTeeUpPage() {
  const { playbook, accountId, isPersonalized } = useAccount();
  const rec = useRecommendations();
  const [copied, setCopied] = useState(false);

  if (!isPersonalized || !playbook || !rec) {
    return (
      <div className="page">
        <span className="page-eyebrow">Customer tee-up</span>
        <h1 className="page-title">Pre-demo landing page</h1>
        <p className="page-subtitle">
          Generate a customer-facing page from your personalized messaging to
          tee up the demo before the call.
        </p>
        <section className="section tee-up-empty">
          <p className="section-desc">
            Load an account on the <Link to="/">home page</Link> to generate a
            tee-up page with their anchor narrative, pillars, demo themes, and
            proof stories.
          </p>
        </section>
      </div>
    );
  }

  const content = buildCustomerTeeUpContent(playbook);

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(content.plainText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page">
      <PersonalizationStrip section="Customer tee-up" />

      <span className="page-eyebrow">Customer tee-up</span>
      <h1 className="page-title">Pre-demo landing page</h1>
      <p className="page-subtitle">
        Share this with {playbook.account.accountName} before the call. Built
        from your messaging brief and demo plan — customer-safe, no internal
        signals.
      </p>

      <div className="tee-up-actions">
        <button type="button" className="tee-up-copy-btn" onClick={copyPage}>
          {copied ? "Copied!" : "Copy page text"}
        </button>
        <span className="tee-up-actions-note">
          Shareable hosted link coming soon
        </span>
        {accountId && (
          <Link to={`/messaging?account=${accountId}`}>Edit messaging →</Link>
        )}
      </div>

      <article className="customer-landing-preview">
        <header className="customer-landing-header">
          <span className="customer-landing-badge">Prepared for your team</span>
          <h2>{content.headline}</h2>
          <p className="customer-landing-intro">{content.intro}</p>
        </header>

        <section className="customer-landing-section">
          <h3>What we&apos;ll cover on our call</h3>
          <ol className="customer-landing-agenda">
            {content.callAgenda.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        {content.pillars.length > 0 && (
          <section className="customer-landing-section">
            <h3>Why the monday AI work platform</h3>
            <div className="customer-landing-pillars">
              {content.pillars.map((p) => (
                <div className="customer-landing-pillar" key={p.name}>
                  <span className="customer-landing-pillar-name">{p.name}</span>
                  <strong>{p.tagline}</strong>
                  <p>{p.customerLine}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.demoSections.length > 0 && (
          <section className="customer-landing-section">
            <h3>What this can look like in practice</h3>
            {content.demoSections.map((d) => (
              <div className="customer-landing-demo" key={d.title}>
                <strong>{d.title}</strong>
                <p>{d.summary}</p>
              </div>
            ))}
          </section>
        )}

        {content.proofStories.length > 0 && (
          <section className="customer-landing-section">
            <h3>Teams getting results</h3>
            <div className="customer-landing-proof-row">
              {content.proofStories.map((p) => (
                <div className="customer-landing-proof" key={p.company}>
                  <span className="customer-landing-metric">{p.metric}</span>
                  <strong>{p.company}</strong>
                  <p>{p.headline}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="customer-landing-footer">
          <p>
            Same boards, same permissions, execution on top. We&apos;ll keep this
            focused on one workflow and one measurable outcome.
          </p>
        </footer>
      </article>
    </div>
  );
}
