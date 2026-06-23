# monday site builder skills

Two agent skills for building and deploying public pages and minisites on monday.com via monday-code. Follows the [Agent Skills open standard](https://agentskills.io/).

## monday-minisite-builder

Builds pages. Takes content (markdown, briefs, URLs, or from scratch) and outputs a React 18 + TypeScript + Vite project styled with monday's design system.

- Scaffolds project structure with routing (`react-router-dom`)
- Applies brand tokens, typography, responsive layout, scroll-triggered motion
- Pages work publicly without monday login (graceful SDK fallback)
- Plain CSS with custom properties, sentence case, Google Fonts in `index.html`

**Reference files included:**

| File | What it contains |
|---|---|
| `brand-execution.md` | 2026 visual identity - Poppins, gradients, purple CTAs, motion rules |
| `design-tokens.md` | CSS custom properties for platform (Figtree) and marketing (Poppins) |
| `tone-guide.md` | Voice pillars, headline formulas, copy rules |
| `section-types.md` | Page section catalog with JSX + CSS patterns |
| `font-pairings.md` | Curated font pairings by page type |

## monday-minisite-manager

Deploys and manages sites. Pushes builds to `*.cdn2.monday.app` via `mapps code:push` and tracks everything in a `sites.json` registry.

| Command | What it does |
|---|---|
| `deploy` | Build, push, verify CDN returns 200, update registry |
| `list` | Show all registered sites with slugs, URLs, last deploy |
| `status` | Curl a site and report details |
| `new` | Create a monday app via MCP and register it |
| `verify` | Confirm a CDN URL is live |

Enforces the [5 private app limit](https://developer.monday.com/apps/docs/quotas-and-limits), cleans up `dist.zip` after deploy, prefixes app names with "Site:" in the Developer Center.

## Flow

```
builder  ->  creates pages (React + Vite)
manager  ->  deploys them, tracks CDN URLs in sites.json
```

## Installation

Unzip into your agent's skills directory:

| Agent | Path |
|---|---|
| Cursor | `~/.cursor/skills/` |
| Claude Code | `~/.claude/skills/` |

Requires `@mondaycom/apps-cli` (`mapps`) and Node.js 18+.
