import { Link } from "react-router-dom";
import AiCapabilitiesSection from "../components/AiCapabilitiesSection";
import DemoWalkthroughSection from "../components/DemoWalkthroughSection";
import MessagingBriefSection from "../components/MessagingBriefSection";
import PersonalizationStrip from "../components/PersonalizationStrip";
import { demoCapabilityToAiId } from "../content/aiCapabilities";
import { demoScenarios } from "../content/demoScenarios";
import { featureLadder } from "../content/featureLadder";
import { comparisons, messagingRules, vocabulary } from "../content/messaging";
import { pitchPillars } from "../content/proofPoints";
import { useAccount, useRecommendations } from "../context/AccountContext";
import "./MessagingPage.css";

const CAPABILITY_COLUMNS = [
  { key: "automations" as const, label: "Automations" },
  { key: "aiBlocks" as const, label: "AI blocks" },
  { key: "sidekick" as const, label: "monday sidekick" },
  { key: "agents" as const, label: "monday agents" },
];

function ReferenceLibrary({ highlightCaps }: { highlightCaps?: string[] }) {
  return (
    <details className="reference-library">
      <summary className="reference-library-summary">
        Reference library
        <span className="reference-library-note">
          Full vocabulary, pillars, ladder, and playbooks
        </span>
      </summary>
      <div className="reference-library-inner">
        <section className="section">
          <h2 className="section-title">Value framing reference</h2>
          <p className="section-desc messaging-anchor">
            Default anchor:{" "}
            <em>
              "Same boards and permissions. Here's the AI capability that removes
              the manual work on this workflow."
            </em>
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Four product pillars</h2>
          <p className="section-desc">
            For proof points, visit the <Link to="/proof">Proof</Link> page.
          </p>
          <div className="pillar-grid">
            {pitchPillars.map((p) => (
              <div className="pillar-card" key={p.name}>
                <span className="pillar-name">{p.name}</span>
                <h3>{p.tagline}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Full vocabulary cheat sheet</h2>
          <div className="vocab-grid">
            {vocabulary.map((v) => (
              <div className="card vocab-card" key={v.id}>
                <h3>{v.term}</h3>
                <p className="vocab-say">
                  <strong>Say:</strong> {v.say}
                </p>
                <p className="vocab-avoid">
                  <strong>Avoid:</strong> {v.avoid}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Feature ladder: what to introduce when</h2>
          <div className="ladder">
            {featureLadder.map((tier) => (
              <div className="ladder-rung" key={tier.tier}>
                <div className="ladder-marker">{tier.tier}</div>
                <div className="ladder-content">
                  <div className="ladder-header">
                    <h3>{tier.title}</h3>
                    <span className="ladder-subtitle">{tier.subtitle}</span>
                  </div>
                  <ul>
                    {tier.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p className="ladder-when">
                    <strong>Show when:</strong> {tier.showWhen}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            Agents vs AI blocks vs sidekick vs automations
          </h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  {CAPABILITY_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={
                        highlightCaps?.includes(col.key) ? "col-highlight" : undefined
                      }
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.dimension}>
                    <td className="row-label">{row.dimension}</td>
                    {CAPABILITY_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={
                          highlightCaps?.includes(col.key) ? "col-highlight" : undefined
                        }
                      >
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Demo playbook by scenario</h2>
          <div className="demo-list">
            {demoScenarios.map((d) => (
              <div className="demo-card" key={d.id}>
                <div className="demo-header">
                  <h3>{d.scenario}</h3>
                  <span className="demo-duration">{d.duration}</span>
                </div>
                <div className="demo-columns">
                  <div className="demo-col">
                    <span className="demo-label demo-label--show">Show</span>
                    <ul>
                      {d.show.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="demo-col">
                    <span className="demo-label demo-label--say">Say</span>
                    <p>{d.say}</p>
                  </div>
                  <div className="demo-col">
                    <span className="demo-label demo-label--hide">Don't show</span>
                    <p>{d.dontShow}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">All messaging do's and don'ts</h2>
          <div className="grid">
            {messagingRules.map((r) => (
              <div className="card messaging-card" key={r.id}>
                <h3>{r.headline}</h3>
                <p className="messaging-do">
                  <span className="tag tag--green">Do</span> {r.do}
                </p>
                <p className="messaging-dont">
                  <span className="tag tag--yellow">Don't</span> {r.dont}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </details>
  );
}

export default function MessagingPage() {
  const { isPersonalized } = useAccount();
  const rec = useRecommendations();
  const activeTier = rec?.featureLadderTier;
  const highlightCaps = rec?.messagingBrief?.highlightCapabilities;

  return (
    <div className="page">
      <PersonalizationStrip section="Messaging & demos" />
      <span className="page-eyebrow">Messaging & demos</span>
      <h1 className="page-title">How to talk about AI capabilities and what to show</h1>
      <p className="page-subtitle">
        {isPersonalized
          ? "PMM-approved capability language below, plus a brief and demo plan customized for this account."
          : "Lead with value and PMM-approved names — not a platform migration pitch. Match depth to AI readiness."}
      </p>

      <AiCapabilitiesSection
        highlightIds={[
          ...new Set([
            ...(rec?.demoWalkthrough?.showCapabilities.map((c) =>
              demoCapabilityToAiId(c.capability)
            ) ?? []),
            ...(rec?.talkTrackId === "it-security" ? ["governance"] : []),
          ]),
        ]}
      />

      <MessagingBriefSection />

      {isPersonalized && activeTier != null && (
        <section className="section messaging-tier-spotlight">
          <h2 className="section-title">AI readiness for this call</h2>
          <p className="section-desc">
            Stay at readiness level {activeTier} unless discovery opens the door
            to go deeper.
          </p>
          <div className="ladder">
            {featureLadder.map((tier) => (
              <div
                className={`ladder-rung${activeTier === tier.tier ? " ladder-rung--active" : " ladder-rung--dimmed"}`}
                key={tier.tier}
              >
                <div className="ladder-marker">{tier.tier}</div>
                <div className="ladder-content">
                  <div className="ladder-header">
                    <h3>{tier.title}</h3>
                    <span className="ladder-subtitle">{tier.subtitle}</span>
                  </div>
                  {activeTier === tier.tier && (
                    <>
                      <ul>
                        {tier.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <p className="ladder-when">
                        <strong>Show when:</strong> {tier.showWhen}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <DemoWalkthroughSection />

      {isPersonalized ? (
        <ReferenceLibrary highlightCaps={highlightCaps} />
      ) : (
        <>
          <section className="section">
            <h2 className="section-title">Value framing (not a migration pitch)</h2>
            <p className="section-desc messaging-anchor">
              Anchor for existing customers:{" "}
              <em>
                "Same boards and permissions. Here's the AI capability that
                removes the manual work on this workflow."
              </em>
            </p>
            <div className="feature-box">
              <ul>
                <li>
                  <strong>Do</strong> — Name the outcome, then the capability
                  (sidekick, agents, AI workflows, vibe)
                </li>
                <li>
                  <strong>Don't</strong> — "Switch to the AI work platform" or
                  "new product rollout"
                </li>
              </ul>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Four product pillars</h2>
            <p className="section-desc">
              Frame every conversation around these four messages, not a feature
              tour. For proof points, visit the{" "}
              <Link to="/proof">Proof</Link> page.
            </p>
            <div className="pillar-grid">
              {pitchPillars.map((p) => (
                <div className="pillar-card" key={p.name}>
                  <span className="pillar-name">{p.name}</span>
                  <h3>{p.tagline}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          <ReferenceLibrary />
        </>
      )}

      <section className="dark-section">
        <h2 className="section-title">AI credits and pricing</h2>
        <div className="placeholder-box">
          <span className="placeholder-label">Placeholder</span>
          <p>
            Credit and pricing guidance for existing business accounts is still
            being finalized. Do not quote pricing, credit buckets, or migration
            terms on customer calls until this section is updated.
          </p>
          <p>
            For now: lead with value and pilot outcomes. If the customer asks
            about cost, acknowledge the question and commit to following up with
            confirmed commercial guidance.
          </p>
        </div>
      </section>
    </div>
  );
}
