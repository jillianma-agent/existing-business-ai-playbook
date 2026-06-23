---
name: monday-minisite-manager
description: Manage, deploy, and track minisites hosted on monday-code CDN. Use when the user wants to deploy a site, list existing sites, check site status, scaffold a new site project, or manage the site registry. Triggers - deploy site, list sites, site status, new site, manage sites, CDN URL, redeploy.
argument-hint: "[deploy|list|status|new|verify]"
user-invocable: true
allowed-tools: ["Shell", "Write", "Read", "Glob", "Grep", "CallMcpTool", "StrReplace"]
compatibility: Agent products that support Agent Skills (for example Cursor or Claude Code). Requires mapps CLI (@mondaycom/apps-cli), Node.js 18+, and a monday.com developer account. The "new" command requires MCP access to the monday API.
---

# monday-minisite-manager

Manage, deploy, and track minisites hosted on monday.com's CDN via monday-code.

## When to Use

- Deploy a site to monday-code CDN
- List all registered sites and their URLs
- Check deployment status of a site
- Scaffold and register a new site project
- Verify a CDN URL is live

## When NOT to Use

- Designing or building page content - use `monday-minisite-builder` instead
- Creating board views or integrations - use `monday-code-init` instead

## Hosting Model

**Hybrid approach:** Related pages are grouped in one monday app (via React Router). Distinct, independent minisites get their own app.

**Hard limit:** 5 private apps per account on monday-code. Warn the user when approaching this limit.

**URL structure:** Each app gets a permanent CDN URL: `https://<hash>.cdn2.monday.app/`

For deployment specifics, see [references/deploy-config.md](references/deploy-config.md).

## Site Registry

All sites are tracked in `sites.json` at the project root. This is the source of truth.

**Schema:**

```json
{
  "sites": {
    "site-slug": {
      "appId": "12345678",
      "versionId": "67890",
      "featureId": "11111",
      "cdnUrl": "https://abc123.cdn2.monday.app",
      "directory": "frontend",
      "description": "Short description of the site",
      "pages": ["/", "/about", "/docs"],
      "lastDeployed": "2026-03-12T10:30:00Z"
    }
  }
}
```

**Fields:**

| Field | Required | Description |
|---|---|---|
| `appId` | Yes | monday app ID from Developer Center |
| `versionId` | No | App version ID (from `create_app` response) |
| `featureId` | No | App feature ID (from `create_app_feature` response) |
| `cdnUrl` | Yes (after first deploy) | Public CDN URL |
| `directory` | Yes | Path to the site's frontend directory |
| `description` | Yes | What this site is |
| `pages` | No | List of routes in the site |
| `lastDeployed` | No | ISO timestamp of last deployment |

## Commands

### `deploy` - Deploy a site

1. Read `sites.json` to find the site's directory and `appId`
2. If `appId` is empty, use `MONDAY_APP_ID` environment variable
3. If the user specifies a site slug, use that. If not, check if there's only one site (use it) or ask.
4. Build: `cd <directory> && npm run build`
5. Deploy: `mapps code:push -c -d dist -a <appId> --force && rm -f dist.zip`
6. Verify: `curl -s -o /dev/null -w "%{http_code}" <cdnUrl>` (expect 200)
7. Update `lastDeployed` in `sites.json`
8. Report the CDN URL to the user

### `list` - List all registered sites

1. Read `sites.json`
2. Display a table: slug, description, CDN URL, last deployed
3. If no `sites.json` exists, report "No sites registered"

### `status` - Check site status

1. Read `sites.json` for the specified site
2. Curl the CDN URL and report HTTP status
3. Report app details (appId, pages, last deployed)

### `new` - Register a new site

1. Ask for: site slug, description, and whether to create a new monday app or use an existing one
2. Check `sites.json` - warn if already at 5 apps
3. If creating a new app:
   - Use MCP `create_app` to create the monday app
   - Use MCP `create_app_feature` with type `AppFeatureBoardView` to create the CDN feature
   - Store the returned appId, versionId, featureId
4. Create the directory structure (or point to existing)
5. Register in `sites.json`
6. Suggest running `monday-minisite-builder` to create pages

### `verify` - Verify a site is live

1. Read `sites.json` for the site
2. Curl the CDN URL
3. Report: HTTP status, response time, whether content loads

## Creating a New monday App (via MCP)

When registering a new site that needs its own app:

```
1. create_app
   - name: "Site: {site-slug}" (prefix with "Site:" for clarity in Developer Center)
   - description: "{description}"

2. create_app_feature
   - app_id: {from step 1}
   - app_version_id: {from step 1}
   - type: "AppFeatureBoardView"
   - name: "{site-slug}"
```

**Naming convention:** Prefix app names with "Site:" to distinguish minisites from regular apps in the Developer Center. Example: "Site: legal-landing", "Site: partner-docs".

## Prerequisites

Before first deployment, verify:

```bash
# mapps CLI installed
mapps --version || npm install -g @mondaycom/apps-cli

# Authenticated
mapps init
```

## Redeploy Workflow (common case)

For quick redeployment after content changes:

1. Read `sites.json` to get the site's directory and appId
2. `cd <directory> && npm run build && npm run deploy`
3. Verify CDN URL returns 200
4. Update `lastDeployed`

## Rules

- Always read `sites.json` before any operation
- Never deploy without building first
- Always verify CDN URL after deployment
- Warn when the account approaches 5 private apps
- Use "Site:" prefix for app names in Developer Center
- Clean up `dist.zip` after deployment
- Update `lastDeployed` after successful deploy
