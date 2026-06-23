# Section Types

Page section catalog. Each section type includes structure, when to use it, and the JSX pattern.

## Hero Section

**When:** Opening section of a landing page. The first thing visitors see.

**Structure:** Badge pill (optional) -> H1 headline -> subtitle paragraph -> CTA buttons (optional) -> supporting visual (optional)

```tsx
<section className="hero">
  <div className="hero-content">
    <span className="badge">Badge text</span>
    <h1>Short, punchy headline</h1>
    <p className="subtitle">One supporting sentence that expands on the headline.</p>
    <div className="hero-cta">
      <a href="#" className="btn btn-primary">Primary action</a>
      <a href="#" className="btn btn-secondary">Secondary action</a>
    </div>
  </div>
</section>
```

**CSS pattern:**

```css
.hero {
  text-align: center;
  padding: var(--space-4xl) var(--space-xl);
  max-width: var(--max-width);
  margin: 0 auto;
}

.hero h1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-md);
}

.hero .subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-xl);
}
```

**Reference:** monday.com uses this pattern on homepage ("Outpace everyone with the best AI work platform") and legal page ("From request to done. In minutes, not hours.")

---

## Feature Card Grid

**When:** Showcasing 3-6 features, capabilities, or benefits.

**Structure:** Section heading -> grid of cards (icon + title + description)

```tsx
<section className="features">
  <h2>Section heading</h2>
  <div className="feature-grid">
    {features.map((f) => (
      <div className="feature-card" key={f.title}>
        <span className="feature-icon">{f.icon}</span>
        <h3>{f.title}</h3>
        <p>{f.description}</p>
      </div>
    ))}
  </div>
</section>
```

**CSS:** Use `.grid` from design tokens with `minmax(280px, 1fr)`.

---

## Stats/Metrics Section

**When:** Showcasing quantitative impact. Data-driven proof of value.

**Structure:** Optional heading -> row of metric cards (number + label + description)

```tsx
<section className="metrics">
  <h2>What changes</h2>
  <div className="metrics-grid">
    {metrics.map((m) => (
      <div className="metric-card" key={m.label}>
        <span className="metric-value">{m.value}</span>
        <span className="metric-label">{m.label}</span>
        <p className="metric-desc">{m.description}</p>
      </div>
    ))}
  </div>
</section>
```

**CSS pattern:** Large number (`font-size: var(--font-size-4xl)`, `color: var(--color-primary)`, `font-weight: var(--weight-bold)`), label below in secondary text.

**Reference:** monday legal page uses "80-95% faster to first draft", "50% less intake friction", "$400K+ annual savings".

---

## Problem Statement Section

**When:** Framing the problem before presenting the solution. Creates emotional resonance.

**Structure:** Bold headline stating the problem -> supporting paragraph -> optional pain-point metrics

```tsx
<section className="problem">
  <h2>It's not a talent problem.<br />It's an orchestration problem.</h2>
  <p className="problem-desc">Your most expensive professionals spend over half their time on admin.</p>
  <div className="pain-grid">
    {painPoints.map((p) => (
      <div className="pain-card" key={p.metric}>
        <span className="pain-metric">{p.metric}</span>
        <p>{p.description}</p>
      </div>
    ))}
  </div>
</section>
```

---

## Pipeline/Flow Section

**When:** Showing a sequential process, workflow, or pipeline.

**Structure:** Section heading -> numbered steps with arrows/connectors -> optional before/after comparison

```tsx
<section className="pipeline">
  <h2>Three agents. One pipeline.</h2>
  <div className="pipeline-steps">
    {steps.map((step, i) => (
      <div className="pipeline-step" key={step.name}>
        <span className="step-number">{i + 1}</span>
        <h3>{step.name}</h3>
        <p>{step.description}</p>
      </div>
    ))}
  </div>
  <div className="before-after">
    <div className="before">
      <span className="ba-label">Before</span>
      <span className="ba-value">3+ hrs</span>
    </div>
    <div className="after">
      <span className="ba-label">With agents</span>
      <span className="ba-value">~2 min</span>
    </div>
  </div>
</section>
```

---

## Quote/Testimonial Section

**When:** Social proof. Real people validating the message.

**Structure:** Quote text -> attribution (name + title + company)

```tsx
<section className="quotes">
  {quotes.map((q) => (
    <blockquote className="quote-card" key={q.name}>
      <p>"{q.text}"</p>
      <footer>
        <strong>{q.name}</strong>
        <span>{q.title}, {q.company}</span>
      </footer>
    </blockquote>
  ))}
</section>
```

---

## Data Table Section

**When:** Comparing features, capabilities, or plans in structured rows.

**Structure:** Section heading -> table wrapped in overflow container

```tsx
<section className="data-section">
  <h2>Section heading</h2>
  <div className="table-wrapper">
    <table>
      <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.name}>
            <td>{r.name}</td>
            {r.values.map((v, i) => <td key={i}>{v}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
```

**CSS:** `.table-wrapper { overflow-x: auto; }` for responsive horizontal scroll.

---

## Feature Box / Callout Section

**When:** Highlighting a single feature or concept in depth with bulleted details.

**Structure:** Box with heading + bullet list, optional border-left accent

```tsx
<div className="feature-box">
  <h3>{title}</h3>
  <ul>
    {points.map((p) => <li key={p}>{p}</li>)}
  </ul>
</div>
```

**CSS:** `border-left: 3px solid var(--color-primary)` accent, padding, light background.

---

## Comparison Cards Section

**When:** Side-by-side comparison of two approaches, plans, or options.

**Structure:** Two cards with distinct accent colors

```tsx
<section className="comparison">
  <div className="comparison-grid">
    <div className="compare-card compare-card--a">
      <h3>{optionA.title}</h3>
      <p>{optionA.description}</p>
    </div>
    <div className="compare-card compare-card--b">
      <h3>{optionB.title}</h3>
      <p>{optionB.description}</p>
    </div>
  </div>
</section>
```

---

## Links Grid Section

**When:** Categorized resource links - docs, guides, references, external resources.

**Structure:** Section heading -> multi-column grid of categorized link lists

```tsx
<section className="links-section">
  <h2>Resources</h2>
  <div className="links-grid">
    {categories.map((cat) => (
      <div className="link-category" key={cat.name}>
        <h3>{cat.name}</h3>
        <ul>
          {cat.links.map((link) => (
            <li key={link.url}><a href={link.url}>{link.label}</a></li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

---

## CTA / Footer Section

**When:** Closing section. Drive action.

**Structure:** Bold headline -> supporting text -> primary CTA button -> optional secondary links or trust badges

```tsx
<section className="cta-section">
  <h2>Ready to get started?</h2>
  <p>Supporting message that reinforces the value.</p>
  <a href="#" className="btn btn-primary btn-large">Call to action</a>
</section>
```

**CSS:** Often uses a contrasting background (`var(--color-primary-light)` or dark theme).

---

## Highlight / Coming Soon Section

**When:** Previewing upcoming features or emphasizing important announcements.

**Structure:** Gradient background + primary color left border + content

```css
.highlight {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-bg));
  border-left: 4px solid var(--color-primary);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
}
```

---

## FAQ / Accordion Section

**When:** Answering common questions. Good for trust-building and reducing friction.

**Structure:** Section heading -> list of question/answer pairs

```tsx
<section className="faq">
  <h2>Frequently asked questions</h2>
  <div className="faq-list">
    {faqs.map((faq) => (
      <details className="faq-item" key={faq.question}>
        <summary>{faq.question}</summary>
        <p>{faq.answer}</p>
      </details>
    ))}
  </div>
</section>
```

**Reference:** monday legal page uses this for security/trust questions with expandable answers.

---

## Social Proof Bar

**When:** Immediately after hero. Establishes credibility.

**Structure:** Trust line + horizontal logo strip

```tsx
<section className="social-proof">
  <p className="trust-line">Trusted by over 60% of the Fortune 500</p>
  <div className="logo-strip">
    {logos.map((logo) => (
      <img key={logo.alt} src={logo.src} alt={logo.alt} className="logo-mark" />
    ))}
  </div>
</section>
```

**CSS:** Logos grayscale by default. Auto-scroll marquee on narrow screens.

---

## Tabbed Content Section

**When:** Showcasing multiple categories, teams, or product variants in the same space.

**Structure:** Tab bar -> content panel that swaps on tab click

```tsx
<section className="tabbed-section">
  <div className="tab-bar">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`tab ${active === tab.id ? "tab-active" : ""}`}
        onClick={() => setActive(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
  <div className="tab-content">
    {tabs.find(t => t.id === active)?.content}
  </div>
</section>
```

**Variants:**
- Team tabs: "Operations", "Marketing", "Sales", "Engineering"
- Numbered tabs: "01 Foundations", "02 Workflows", "03 Insights"

**CSS:** Active tab gets underline or background highlight. Content crossfades.

---

## Numbered Steps Section

**When:** Walk-throughs, getting-started guides, sequential instructions.

**Structure:** Section heading -> numbered list with title + description per step

```tsx
<section className="steps-section">
  <h2>Section heading</h2>
  <div className="steps-list">
    {steps.map((step, i) => (
      <div className="step-item" key={step.title}>
        <span className="step-number">{i + 1}</span>
        <div className="step-body">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

**Reference:** agents-signup page uses this for "Frictionless signup for agents" with 5 numbered steps.

---

## Dark Trust Section

**When:** Security, compliance, enterprise credibility. Always dark background.

**Structure:** Dark bg -> section heading (white) -> certification badges -> stat cards

```tsx
<section className="trust-section dark-section">
  <h2>Your judgment. Protected.</h2>
  <div className="cert-badges">
    {certs.map((c) => (
      <div className="cert" key={c.name}>
        <span className="cert-check">&#10003;</span>
        <span>{c.name}</span>
        <span className="cert-desc">{c.description}</span>
      </div>
    ))}
  </div>
</section>
```

**CSS:** `background: #000000; color: #ffffff;`

---

## Agent Card Grid

**When:** Showcasing AI agents, bots, or autonomous capabilities.

**Structure:** Grid of agent cards: avatar + name + one-sentence description

```tsx
<section className="agents-section">
  <h2>Section heading</h2>
  <div className="agent-grid">
    {agents.map((a) => (
      <div className="agent-card" key={a.name} style={{ background: a.bgColor }}>
        <img src={a.avatar} alt={a.name} className="agent-avatar" />
        <h3>{a.name}</h3>
        <p>{a.description}</p>
      </div>
    ))}
  </div>
</section>
```

**Name format:** 2-4 words, title case
**Description format:** Verb-led sentence, under 15 words
**Background:** Soft pastels per agent (#FFE8D8, #D6E9FF, #FFF3C5)

---

## Section Selection Guide

| Content type | Recommended section |
|---|---|
| Opening / first impression | Hero |
| Credibility after hero | Social proof bar |
| 3-6 benefits or features | Feature card grid |
| Multiple categories in one space | Tabbed content |
| Quantitative proof | Stats/metrics |
| Framing the problem | Problem statement |
| Sequential process | Pipeline/flow |
| Walk-through / getting started | Numbered steps |
| Social proof (people) | Quote/testimonial |
| Social proof (agents/bots) | Agent card grid |
| Structured comparison | Data table or comparison cards |
| Single deep feature | Feature box/callout |
| Resources and links | Links grid |
| Drive action | CTA/footer |
| Trust / security / compliance | Dark trust section |
| Upcoming / emphasis | Highlight |
| Trust / objections | FAQ/accordion |

## Page-Level Rhythm

Alternate breathing sections (one message, whitespace) with dense sections (card grids):

**Standard marketing page:**
1. Hero (breathing)
2. Social proof bar (breathing)
3. Feature sections (dense) - repeat 2-4x
4. Trust section (dark, breathing)
5. FAQ (dense)
6. Final CTA (breathing)

After a dense section with many cards, give the reader a single-message section to breathe.
