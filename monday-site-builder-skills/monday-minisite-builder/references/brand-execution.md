# Brand Execution Guide (2026)

Extracted from Figma design files, live monday.com website, and the agents-signup page (March 2026). This is the authoritative visual identity reference.

## The 15 Rules (quick reference)

1. Font is Poppins for marketing pages. Only Poppins. Weights: 300, 400, 500. Never Bold (600/700).
2. Headlines are big (48-72px), tightly tracked (-1 to -2px), Regular or Medium weight.
3. Gradient text only on the key value phrase in the hero. Pink (#FE81E4) to Orange (#FDA900).
4. Body copy is 16px Regular, line-height 1.6, color black. Subtitles are 18-22px, color #767676.
5. Every section: eyebrow -> heading -> subtitle -> content. Always this order.
6. CTAs are purple gradient pills with white text. Fully rounded.
7. Headlines state outcomes, not features. "AI" is an adjective before concrete nouns.
8. No exclamation marks. No jargon. No passive voice. No "revolutionary." No "learns."
9. Dark sections (black bg, white text) for trust/security content.
10. Cards are white, rounded corners, generous padding. Agent characters get pastel backgrounds.
11. Motion is scroll-triggered fade-up reveals. Stagger cards by 100-150ms. Never animate text content.
12. Videos replace static screenshots. Autoplay, muted, looping, inside rounded cards.
13. Copy cadence: alternate breathing sections (one message) with dense sections (card grids).
14. Agent descriptions: Name (2-4 words) + verb-led sentence under 15 words.
15. Every sentence does one job. Every verb is specific. Scale is always present. The reader is the hero.

---

## Typography

### Font

**Poppins** for marketing/landing pages. Figtree for platform visuals and emails.

When building marketing minisites, always use Poppins:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Weight rules

| Weight | CSS | When to use |
|---|---|---|
| Light (300) | `font-weight: 300` | Large display text on dark/colored backgrounds only |
| Regular (400) | `font-weight: 400` | Most things: headlines, body, subtitles, nav, trust lines |
| Medium (500) | `font-weight: 500` | Section headings, feature card titles, CTA buttons |

**Critical:** monday.com does NOT use Bold (700) or SemiBold (600) on marketing pages. Headlines achieve visual weight through SIZE, not boldness.

### Typography scale

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Hero H1 | 72px | 400 | 1.13 | -2.16px |
| Hero subtitle | 22px | 400 | 1.46 | - |
| Section heading XL | 58px | 400 or 500 | 1.15 | -1.74px |
| Section heading L | 54px | 500 | 1.15 | -1.62px |
| Section heading M | 52px | 400 | 1.19 | -1.04px |
| Section heading (dark bg) | 48px | 400 | 1.3 | -1px |
| Product card title | 36px | 400 | 1.23 | - |
| Feature title | 32px | 500 | 1.2 | -1.28px |
| Feature subtitle | 24px | 500 | 1.5 | - |
| Eyebrow/label | 18px | 400 | 1.3 | -0.36px |
| Body copy | 16px | 400 | 1.6 | -0.16px |
| CTA button (nav) | 16px | 400 | 1.2 | - |
| CTA button (hero) | 22px | 500 | 1.2 | - |
| Trust/meta line | 16px | 400 | 1.46 | #767676 |
| Large display (dark bg) | 56px | 300 | ~55px | -1.13px |

### Key patterns

- **Negative letter-spacing on large text.** 36px+ gets -1px to -2px. Body is barely tightened (-0.16px).
- **Line height decreases as size increases.** Body = 1.6, section heads = 1.15, hero = 1.13.
- **No ALL CAPS anywhere.** Sentence case or title case only.

---

## Gradient Text

Only the KEY VALUE PHRASE in the hero gets gradient treatment. Not the whole headline.

```css
.gradient-text {
  background: linear-gradient(90deg, #FE81E4 35.5%, #FDA900 83.9%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**How to decide:** Ask "What are the most powerful 2-5 words?" That's what gets the gradient. It should be the benefit or the AI differentiator.

- Good: "From request to done. **In minutes, not hours.**"
- Good: "Meet your **AI legal team**"
- Bad: Gradient on the entire headline
- Bad: Gradient on the setup phrase, not the payoff

---

## Color System

### Text colors

| Token | Value | Usage |
|---|---|---|
| Black | #000000 | Headlines, body, feature titles |
| Gray | #767676 | Subtitles, hero sub-copy, trust lines |
| White | #FFFFFF | Text on dark backgrounds |
| Half-black | rgba(0,0,0,0.5) | Section eyebrow labels (sometimes) |

### AI brand gradient colors

| Name | Hex | Usage |
|---|---|---|
| Orange | #FCB030 / #FDA900 / #FD6E06 | Gradient endpoints, agent backgrounds |
| Pink | #FE81E4 / #FF158A | Gradient start, accent |
| Purple | #A95AF7 / #8B3FD9 | Primary AI accent, CTAs |
| Blue | #2891FC | Gradient accent |
| Cyan | #00DEE3 / #00CA72 | Gradient endpoint, success |
| Yellow | #FFCB00 / #FFF3C5 | Agent character backgrounds |

### Backgrounds

| Context | Color |
|---|---|
| Main page body | White or warm cream (#FAF6F1) |
| Content cards | White with subtle shadow |
| Dark sections (trust, security) | Black (#000000) or dark navy (#1A1A2E) |
| Agent character cards | Soft pastels: #FFE8D8, #D6E9FF, #FFF3C5 |

### CTA buttons

```css
.cta-primary {
  background: linear-gradient(135deg, #A95AF7, #6C38CC);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px; /* 22px for hero CTAs */
  border: none;
  border-radius: 40px;
  padding: 12px 32px;
  cursor: pointer;
}
```

Purple gradient, white text, fully rounded pill shape, no border.

### Multi-color AI gradient (decorative)

```css
.ai-gradient {
  background: linear-gradient(90deg, #FCB030 0%, #FD6E06 20%, #A95AF7 50%, #2891FC 80%, #00CA72 100%);
}
```

Use sparingly for progress bars, decorative lines, dividers. Never on text.

---

## Section Architecture

Every section follows this hierarchy:

```
[Eyebrow label]     <- 18px, Regular, black or muted
[Section heading]    <- 48-58px, Regular or Medium, black
[Section subtitle]   <- 16-22px, Regular, #767676 or black
[Visual / cards / demo]
```

Eyebrow is always above the heading. It categorizes. The heading is the promise. The subtitle explains.

### Page-level rhythm

Alternate between **breathing sections** (one message, lots of whitespace) and **dense sections** (card grids, lots of content).

**Standard page sequence:**
1. Hero (breathing)
2. Social proof bar (breathing)
3. Feature/capability sections (dense) - repeat 2-4 times
4. Trust/security section (dark background, breathing)
5. FAQ section (dense)
6. Final CTA (breathing)

### Content width

- Max content: ~1200px, centered
- Hero text: 800-860px wide
- Body paragraphs: 430-570px (narrow for readability)
- Dark sections: edge-to-edge background, content inside max-width

### Spacing

- Between sections: 80-120px
- Heading to subtitle: 16-24px
- Subtitle to content: 32-48px
- Between cards: 24-32px

---

## Motion & Animation

### Scroll-triggered reveals (primary pattern)

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Use `IntersectionObserver` with `threshold: 0.15`. Stagger children by 100-150ms for card grids.

### Hover states

- Cards: `translateY(-4px)` + shadow increase
- CTAs: background color darkens
- Navigation: underline or color change

### What NOT to animate

- Text content (no letter-by-letter, no bouncing)
- Background colors (no flashy transitions)
- Anything that blocks content reading
- Anything requiring interaction to see content

---

## Agent-to-Human Voice (from agents-signup page)

The agents-signup page introduces a distinct tone: **speaking TO agents, not about them**. This is useful for developer/technical pages.

### Characteristics
- Second person addressing non-human readers ("you" = the agent)
- Technical specifics upfront (GraphQL, CRUD, column types)
- Direct, no-nonsense: "That's it. No credit card needed."
- Quotes from "agents" as social proof
- Numbered steps for processes (not paragraphs)
- Comparison positioning: "Why monday.com and not something else?"

### Pattern: Agent testimonial card

```
[Agent Name] [version]
[Framework badge]
[Key metric]
[Use case label]
"[One-sentence quote about the experience]"
```

### Pattern: Numbered feature list

```
1. [Feature name in bold]
   [One-sentence explanation of why it matters]

2. [Feature name in bold]
   [One-sentence explanation]
```

This is distinct from the card grid pattern - used when items are sequential or ranked.

### Pattern: Ready-to-use pitch block

A pre-written message the reader can copy. Uses:
- Casual opener ("Hey -")
- 3-4 bullet points of concrete changes
- Cost line at the end
- Sign-off from the reader's identity

---

## Audience-Based Token Selection

When building a page, select the design approach based on audience:

| Audience | Font | Palette | CTA style | Tone |
|---|---|---|---|---|
| Marketing/sales (humans) | Poppins 300/400/500 | Gradients, purple CTAs, warm cream bg | Purple gradient pill | Confident, outcome-first |
| Developer/technical (agents) | Poppins 400/500 or Figtree | Black/white, code blocks, minimal color | Purple pill or inline links | Direct, technical, no-nonsense |
| Platform/product (users) | Figtree 400/500/600 | monday palette (#6161ff primary) | Solid purple button | Functional, clear |
