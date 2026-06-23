import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDemoScenario } from "../content/demoScenarios";
import { getDemoUseCase } from "../content/demoUseCases";
import { getDiscoveryQuestion } from "../content/discoveryQuestions";
import { getFeatureTier } from "../content/featureLadder";
import { getMigrationPath } from "../content/migrationPaths";
import { getVocabTerm } from "../content/messaging";
import { getObjection } from "../content/objections";
import { pitchPillars, getProofPoint } from "../content/proofPoints";
import { getTalkTrack } from "../content/talkTracks";
import { useAccount } from "../context/AccountContext";
import {
  BRAIN_PIPELINE,
  CONTENT_MODULES,
  RULE_MODULES,
  type ContentModule,
  type RuleModule,
} from "../editor/brainRegistry";
import {
  clearAllMockAccountOverrides,
  clearMockAccountOverride,
  getMockAccountOverrides,
  hasMockAccountOverride,
  saveMockAccountOverride,
} from "../editor/mockAccountOverrides";
import { listAccounts, loadPersonalizedPlaybook } from "../signals/accountService";
import { mockAccounts } from "../signals/mockAccounts";
import { buildPersonalizedPlaybook } from "../signals/recommendations";
import type { AccountSignals, PersonalizedPlaybook } from "../signals/types";
import { TEST_PULSE_ACCOUNTS } from "../signals/vibeWebhook";
import PersonasEditorSection from "../components/PersonasEditorSection";
import "./EditorPage.css";

type EditorTab = "overview" | "trace" | "content" | "rules" | "personas" | "mocks";

const TABS: { id: EditorTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "trace", label: "Live trace" },
  { id: "content", label: "Content library" },
  { id: "rules", label: "Rules engine" },
  { id: "personas", label: "Personas" },
  { id: "mocks", label: "Mock accounts" },
];

function copyText(text: string) {
  void navigator.clipboard.writeText(text);
}

function JsonBlock({
  data,
  label,
  collapsed,
}: {
  data: unknown;
  label?: string;
  collapsed?: boolean;
}) {
  const json = JSON.stringify(data, null, 2);

  return (
    <div className="editor-json-block">
      <div className="editor-json-header">
        {label && <span className="editor-json-label">{label}</span>}
        <button type="button" className="editor-copy-btn" onClick={() => copyText(json)}>
          Copy JSON
        </button>
      </div>
      <pre className="editor-json">
        <code>{collapsed ? `${json.slice(0, 600)}${json.length > 600 ? "\n…" : ""}` : json}</code>
      </pre>
    </div>
  );
}

function ContentModulePanel({ module }: { module: ContentModule }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <details className="editor-module">
      <summary className="editor-module-summary">
        <span className="editor-module-title">{module.title}</span>
        <span className="editor-module-meta">
          {module.items.length} items · {module.sourceFile}
        </span>
      </summary>
      <div className="editor-module-body">
        <p className="editor-module-desc">{module.description}</p>
        <p className="editor-source">
          Edit in <code>{module.sourceFile}</code> → export <code>{module.exportName}</code>
        </p>
        <ul className="editor-item-list">
          {module.items.map((item, i) => {
            const record = item as Record<string, unknown>;
            const id = String(record.id ?? record.name ?? i);
            const title = String(record.title ?? record.name ?? record.term ?? id);
            return (
              <li key={`${module.id}-${id}-${i}`}>
                <button
                  type="button"
                  className="editor-item-btn"
                  onClick={() => setExpandedId(expandedId === id ? null : id)}
                >
                  <span className="editor-item-id">{id}</span>
                  <span className="editor-item-title">{title}</span>
                </button>
                {expandedId === id && <JsonBlock data={item} />}
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}

function RuleModulePanel({ rule }: { rule: RuleModule }) {
  return (
    <details className="editor-module">
      <summary className="editor-module-summary">
        <span className="editor-module-title">{rule.title}</span>
        <span className="editor-module-meta">{rule.functionName}()</span>
      </summary>
      <div className="editor-module-body">
        <p className="editor-module-desc">{rule.description}</p>
        <p className="editor-source">
          Edit in <code>{rule.sourceFile}</code>
        </p>
        <h4 className="editor-subhead">Logic</h4>
        <ol className="editor-logic-list">
          {rule.logic.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
        {rule.maps && (
          <>
            <h4 className="editor-subhead">Lookup maps</h4>
            <JsonBlock data={rule.maps} />
          </>
        )}
      </div>
    </details>
  );
}

function ResolvedOutput({ playbook }: { playbook: PersonalizedPlaybook }) {
  const rec = playbook.recommendations;
  const talk = getTalkTrack(rec.talkTrackId);
  const demo = getDemoScenario(rec.demoScenarioId);
  const pilot = getMigrationPath(rec.pilotPathId);
  const tier = getFeatureTier(rec.featureLadderTier);

  return (
    <div className="editor-resolved">
      <h3 className="editor-subhead">Resolved picks</h3>
      <dl className="editor-dl">
        <div>
          <dt>Talk track</dt>
          <dd>
            {rec.talkTrackId} — {talk?.title}
            {rec.reasons.talkTrack && (
              <ul className="editor-reasons">
                {rec.reasons.talkTrack.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div>
          <dt>Demo scenario</dt>
          <dd>
            {rec.demoScenarioId} — {demo?.scenario}
          </dd>
        </div>
        <div>
          <dt>Pilot path</dt>
          <dd>
            {rec.pilotPathId} — {pilot?.title}
          </dd>
        </div>
        <div>
          <dt>AI readiness</dt>
          <dd>
            Tier {rec.featureLadderTier} — {tier?.title}
          </dd>
        </div>
        <div>
          <dt>Proof stories</dt>
          <dd>
            <ul>
              {rec.proofStoryIds.map((id) => {
                const story = getProofPoint(id);
                return (
                  <li key={id}>
                    {id}: {story?.company ?? id}
                    {rec.reasons[id]?.map((r) => (
                      <span key={r} className="editor-reason-tag">
                        {r}
                      </span>
                    ))}
                  </li>
                );
              })}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Demo use cases</dt>
          <dd>
            <ul>
              {rec.demoUseCaseIds.map((id) => (
                <li key={id}>
                  {getDemoUseCase(id)?.title ?? id}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Messaging anchor</dt>
          <dd>{rec.messagingBrief.anchorLine}</dd>
        </div>
        <div>
          <dt>Pillars (lead order)</dt>
          <dd>
            {rec.messagingBrief.leadPillarNames.slice(0, 2).map((name) => {
              const pillar = pitchPillars.find((p) => p.name === name);
              return (
                <span key={name} className="editor-reason-tag">
                  {name}: {pillar?.tagline}
                </span>
              );
            })}
          </dd>
        </div>
        <div>
          <dt>Vocabulary</dt>
          <dd>
            {rec.messagingBrief.vocabularyIds.map((id) => (
              <span key={id} className="editor-reason-tag">
                {getVocabTerm(id)?.term ?? id}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Why now headline</dt>
          <dd>{rec.whyNowBrief.headline}</dd>
        </div>
        <div>
          <dt>Why now insights</dt>
          <dd>
            {rec.whyNowBrief.insights.slice(0, 4).map((i, idx) => (
              <span key={idx} className="editor-reason-tag">
                [{i.source}] {i.text}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Objections</dt>
          <dd>
            {rec.objectionIds.map((id) => getObjection(id)?.objection ?? id).join(" · ")}
          </dd>
        </div>
        <div>
          <dt>Discovery</dt>
          <dd>
            {rec.discoveryQuestionIds
              .map((id) => getDiscoveryQuestion(id)?.text ?? id)
              .join(" · ")}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function MockAccountEditor() {
  const accountIds = Object.keys(mockAccounts);
  const [selectedId, setSelectedId] = useState(accountIds[0] ?? "");
  const [draft, setDraft] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const loadDraft = useCallback((accountId: string) => {
    const override = getMockAccountOverrides()[accountId];
    const base = override ?? mockAccounts[accountId];
    setDraft(JSON.stringify(base, null, 2));
    setParseError(null);
    setSaved(false);
  }, []);

  useEffect(() => {
    if (selectedId) loadDraft(selectedId);
  }, [selectedId, loadDraft]);

  function handleSave() {
    try {
      const parsed = JSON.parse(draft) as AccountSignals;
      if (!parsed.accountId) {
        setParseError("JSON must include accountId");
        return;
      }
      saveMockAccountOverride(parsed.accountId, parsed);
      setParseError(null);
      setSaved(true);
    } catch (e) {
      setParseError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  function handleReset() {
    clearMockAccountOverride(selectedId);
    loadDraft(selectedId);
  }

  function handleResetAll() {
    clearAllMockAccountOverrides();
    loadDraft(selectedId);
  }

  const preview = useMemo(() => {
    try {
      const parsed = JSON.parse(draft) as AccountSignals;
      return buildPersonalizedPlaybook(parsed);
    } catch {
      return null;
    }
  }, [draft]);

  return (
    <div className="editor-mocks">
      <p className="editor-intro">
        Edit mock account signals as JSON. Saves to browser localStorage for preview only.
        Commit permanent changes in <code>src/signals/mockAccounts.ts</code>.
      </p>
      <div className="editor-mock-toolbar">
        <label className="editor-select-label">
          Account
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="editor-select"
          >
            {accountIds.map((id) => (
              <option key={id} value={id}>
                {id}
                {hasMockAccountOverride(id) ? " (edited)" : ""}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="editor-btn editor-btn--primary" onClick={handleSave}>
          Save preview override
        </button>
        <button type="button" className="editor-btn" onClick={handleReset}>
          Reset account
        </button>
        <button type="button" className="editor-btn" onClick={handleResetAll}>
          Clear all overrides
        </button>
      </div>
      {parseError && <p className="editor-error">{parseError}</p>}
      {saved && <p className="editor-success">Saved. Reload account on site to see changes.</p>}
      <textarea
        className="editor-textarea"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          setSaved(false);
          setParseError(null);
        }}
        spellCheck={false}
      />
      {preview && (
        <>
          <h3 className="editor-subhead">Preview output</h3>
          <ResolvedOutput playbook={preview} />
        </>
      )}
    </div>
  );
}

function LiveTracePanel() {
  const { accountId: contextAccountId } = useAccount();
  const mockList = listAccounts();
  const [selectedId, setSelectedId] = useState(contextAccountId ?? mockList[0]?.accountId ?? "");

  const playbook = useMemo(() => {
    if (!selectedId) return null;
    if (/^\d+$/.test(selectedId)) return null;
    return loadPersonalizedPlaybook(selectedId);
  }, [selectedId]);

  return (
    <div className="editor-trace">
      <p className="editor-intro">
        Pick a mock account to see signals → rules → resolved content. Live pulse IDs load on
        Account prep; use slug mocks here for full trace.
      </p>
      <div className="editor-mock-toolbar">
        <label className="editor-select-label">
          Account
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="editor-select"
          >
            {mockList.map((a) => (
              <option key={a.accountId} value={a.accountId}>
                {a.accountName} ({a.accountId})
              </option>
            ))}
            {TEST_PULSE_ACCOUNTS.map((p) => (
              <option key={p.id} value={String(p.id)} disabled>
                {p.id} — {p.label} (load via Account prep)
              </option>
            ))}
          </select>
        </label>
        {selectedId && (
          <Link to={`/account/${selectedId}`} className="editor-btn">
            Open account prep
          </Link>
        )}
      </div>

      {!playbook && (
        <p className="editor-muted">
          Select a mock slug account, or load a pulse ID from the home page first.
        </p>
      )}

      {playbook && (
        <>
          <section className="editor-section">
            <h3 className="editor-subhead">1. Account signals</h3>
            <p className="editor-muted">
              Readiness {playbook.account.readiness} ({playbook.account.readinessScore}) — recomputed
              by rules, not stored mock value.
            </p>
            <JsonBlock data={playbook.account} />
          </section>

          <section className="editor-section">
            <h3 className="editor-subhead">2. Resolved picks</h3>
            <ResolvedOutput playbook={playbook} />
          </section>

          <section className="editor-section">
            <h3 className="editor-subhead">3. Messaging brief</h3>
            <JsonBlock data={playbook.recommendations.messagingBrief} />
          </section>

          <section className="editor-section">
            <h3 className="editor-subhead">4. Why now brief</h3>
            <JsonBlock data={playbook.recommendations.whyNowBrief} />
          </section>

          <section className="editor-section">
            <h3 className="editor-subhead">5. Demo walkthrough</h3>
            <JsonBlock data={playbook.recommendations.demoWalkthrough} />
          </section>

          <section className="editor-section">
            <h3 className="editor-subhead">6. Full recommendations object</h3>
            <JsonBlock data={playbook.recommendations} />
          </section>
        </>
      )}
    </div>
  );
}

export default function EditorPage() {
  const [tab, setTab] = useState<EditorTab>("overview");

  return (
    <div className="editor-page">
      <header className="editor-header">
        <div>
          <span className="editor-badge">Editor mode</span>
          <h1 className="editor-title">Playbook brain</h1>
          <p className="editor-lead">
            See what powers personalization: content library, rules engine, and live output per
            account. Edit source files in the repo; use mock account overrides to preview signal
            changes.
          </p>
        </div>
      </header>

      <nav className="editor-tabs" aria-label="Editor sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`editor-tab${tab === t.id ? " editor-tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="editor-panel">
        {tab === "overview" && (
          <div className="editor-overview">
            <p className="editor-intro">
              Two layers: <strong>static content</strong> (talk tracks, proof, messaging) and a{" "}
              <strong>rules engine</strong> that maps account signals to IDs and generated briefs.
            </p>
            <ol className="editor-pipeline">
              {BRAIN_PIPELINE.map((step) => (
                <li key={step.step} className="editor-pipeline-step">
                  <span className="editor-pipeline-num">{step.step}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                    <p className="editor-source">
                      {step.files.map((f) => (
                        <code key={f}>{f}</code>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="editor-overview-grid">
              <div className="editor-overview-card">
                <h3>Content modules</h3>
                <p>{CONTENT_MODULES.length} libraries in src/content/</p>
                <button type="button" className="editor-btn" onClick={() => setTab("content")}>
                  Browse content
                </button>
              </div>
              <div className="editor-overview-card">
                <h3>Rule functions</h3>
                <p>{RULE_MODULES.length} documented rule groups</p>
                <button type="button" className="editor-btn" onClick={() => setTab("rules")}>
                  Browse rules
                </button>
              </div>
              <div className="editor-overview-card">
                <h3>Live trace</h3>
                <p>Signals in → playbook out, with reasons</p>
                <button type="button" className="editor-btn" onClick={() => setTab("trace")}>
                  Run trace
                </button>
              </div>
              <div className="editor-overview-card">
                <h3>Personas</h3>
                <p>Department exports in frontend/personas/</p>
                <button type="button" className="editor-btn" onClick={() => setTab("personas")}>
                  Browse personas
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "trace" && <LiveTracePanel />}
        {tab === "content" && CONTENT_MODULES.map((m) => <ContentModulePanel key={m.id} module={m} />)}
        {tab === "rules" && RULE_MODULES.map((r) => <RuleModulePanel key={r.id} rule={r} />)}
        {tab === "personas" && <PersonasEditorSection />}
        {tab === "mocks" && <MockAccountEditor />}
      </div>
    </div>
  );
}
