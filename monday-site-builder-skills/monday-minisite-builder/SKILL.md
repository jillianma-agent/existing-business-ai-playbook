---
name: monday-minisite-builder
description: Build public pages, landing pages, and multi-page minisites on monday.com's CDN via monday-code. Use when the user wants to create, design, or update a webpage, minisite, landing page, documentation site, or product page hosted on monday-code CDN. Triggers - page, minisite, landing page, static site, public page, website, build site, create page.
argument-hint: "[page-type or content-source]"
user-invocable: true
allowed-tools: ["Shell", "Write", "Read", "Glob", "Grep", "CallMcpTool", "StrReplace", "WebFetch"]
compatibility: Agent products that support Agent Skills (for example Cursor or Claude Code). Requires Node.js 18+, npm, and a monday.com developer account.
---

# monday-minisite-builder

Build publicly accessible pages and multi-page minisites deployed to monday.com's CDN infrastructure via monday-code.

## When to Use

- User wants to create a public webpage or minisite
- User wants to convert content (markdown, brief, outline) into a styled React page
- User wants to add pages to an existing minisite
- User wants to redesign or restyle an existing page

## When NOT to Use

- Building monday board views that require auth - use `monday-code-init` instead
- Deploying or managing existing sites - use `monday-minisite-manager` instead
- Building backend APIs - use `monday-code-init` with backend type

## Input Gathering

Before building, establish:
1. **What pages?** Single page or multi-page site? What are the pages?
2. **Content source?** Markdown file, text brief, URL to reference, or from scratch?
3. **Brand direction?** monday.com default, custom brand, or match a reference site?
4. **Existing scaffold?** Is there already a `frontend/` directory with a build setup?

If the user provides an argument (e.g., `/monday-minisite-builder landing page for AI agents`), infer answers and proceed.

## Architecture

**Stack (fixed):**
- React 18 + TypeScript + Vite
- react-router-dom for multi-page routing
- Plain CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- monday-sdk-js (optional, dynamic import with graceful fallback)
- Deployed to `*.cdn2.monday.app` via `mapps code:push`

**CDN hosting:** monday-code CDN via `AppFeatureBoardView` makes static content publicly accessible - no monday.com login required.

**Hosting model:** Related pages are grouped in one app (via React Router). Distinct, independent minisites get their own app. Max 5 private apps per account.

## Project Structure

```
project-root/
├── .mondaycoderc              # {"runtime": "nodejs22.x"}
├── manifest.json
├── sites.json                 # Site registry (managed by monday-minisite-manager)
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts          # Must include: define: { global: "globalThis" }
    ├── index.html              # HTML entry with Google Fonts link
    ├── index.js                # CDN entry point (required, can be comment-only)
    └── src/
        ├── main.tsx
        ├── index.css           # Global reset + CSS variables in :root
        ├── App.tsx             # BrowserRouter + Routes
        ├── components/
        │   ├── Layout.tsx      # Sticky nav + children wrapper
        │   └── Layout.css
        └── pages/
            ├── HomePage.tsx
            ├── HomePage.css
            └── [PageName].tsx + .css
```

## Build Workflow

### Step 1: Check for Existing Scaffold

Look for `.mondaycoderc`, `manifest.json`, `frontend/package.json`. If missing, use the `monday-code-init` skill (frontend type) to scaffold first.

### Step 2: Determine Design Direction

**For marketing landing pages:** Read [references/brand-execution.md](references/brand-execution.md) for the 2026 visual identity (Poppins, gradients, purple CTAs, motion).
**For platform pages:** Read [references/design-tokens.md](references/design-tokens.md) for the platform token set (Figtree, #6161ff primary).
**For tone and copy:** Read [references/tone-guide.md](references/tone-guide.md) for headline formulas, copy rules, and don'ts.

If the user specifies a custom brand, adapt the tokens. If they reference a specific site or aesthetic, analyze it and derive tokens.

### Step 3: Plan Page Sections

Read [references/section-types.md](references/section-types.md) to select appropriate sections for each page.

Map content to section types:
- Headlines and value props -> Hero section
- Feature lists -> Feature card grid
- Data comparisons -> Data table or comparison cards
- Testimonials or quotes -> Quote section
- Resource links -> Links grid
- Call-to-action -> CTA section

### Step 4: Build Pages

For each page, create a paired `.tsx` + `.css` file in `src/pages/`.

**Routing:** Add routes to `App.tsx` via `react-router-dom` `BrowserRouter`.

**Layout:** Wrap all routes in a shared `Layout` component with sticky glassmorphism navigation.

**SDK integration:** Use the graceful SDK pattern for pages that should work both publicly and inside monday.com:

```typescript
function useMondayContext() {
  const [user, setUser] = useState({ name: "Visitor", isAuthenticated: false });
  useEffect(() => {
    async function tryMondaySdk() {
      try {
        const mondaySdk = await import("monday-sdk-js");
        const monday = mondaySdk.default();
        const res = await Promise.race([
          monday.get("context"),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 3000)
          ),
        ]);
        if (res?.data?.user?.name) {
          setUser({ name: res.data.user.name, isAuthenticated: true });
        }
      } catch {
        /* silent fallback for public visitors */
      }
    }
    tryMondaySdk();
  }, []);
  return user;
}
```

### Step 5: Apply Styling

- Define CSS variables in `:root` of `index.css` (see [references/design-tokens.md](references/design-tokens.md))
- Import Google Fonts in `index.html`, not via CSS `@import`
- Use responsive grids: `repeat(auto-fit, minmax(240px, 1fr))`
- Add hover effects: `translateY(-2px)` + box-shadow transitions
- Mobile breakpoints at 600px and 768px
- Use sentence case for all headings (monday brand convention)

### Step 6: Build & Verify Locally

```bash
cd frontend && npm install && npm run build
```

### Step 7: Hand Off to Deployment

Tell the user to run `/monday-minisite-manager deploy` or use the `monday-minisite-manager` skill for deployment, site registration, and CDN verification.

## Content Conversion Workflow

When given markdown, text, or a content brief:
1. Analyze content structure (headings, lists, tables, links, quotes)
2. Map each section to the appropriate section type (see [references/section-types.md](references/section-types.md))
3. Generate React components with semantic JSX
4. Style with the design system
5. Add responsive breakpoints and hover effects
6. Use sentence case for all headings

## Design Quality Checklist

Before finishing, verify:
- [ ] CSS variables defined in `:root` of `index.css`
- [ ] Google Fonts loaded in `index.html`
- [ ] All pages responsive at 600px and 768px breakpoints
- [ ] Hover states on interactive elements
- [ ] Sentence case on all headings (no Title Case, no ALL CAPS)
- [ ] Pages work without monday SDK (graceful fallback)
- [ ] `vite.config.ts` includes `define: { global: "globalThis" }`
- [ ] `index.js` exists at frontend root

## Rules

- Pages must work WITHOUT monday.com context (public access)
- Never use `MondayProvider` for public pages - use the graceful SDK hook
- CSS variables in `:root` of `index.css`, never scoped to components only
- Each page gets its own `.tsx` + `.css` pair
- Content is static in components, not fetched from monday boards at runtime
- Use `react-router-dom` `BrowserRouter` for multi-page routing
- Sentence case everywhere (monday brand standard)
- No jargon, no buzzwords, no ALL CAPS emphasis
