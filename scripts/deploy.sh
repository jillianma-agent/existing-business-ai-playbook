#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITES_JSON="$ROOT/sites.json"
SITE_SLUG="${SITE_SLUG:-cco-ai-playbook}"

if ! command -v mapps >/dev/null 2>&1; then
  echo "mapps CLI not found. Run: npm install -g @mondaycom/apps-cli"
  exit 1
fi

if [[ ! -f "$ROOT/.mappsrc" && ! -f "$HOME/.mappsrc" ]]; then
  echo "Not authenticated. Run from project root:"
  echo "  mapps init -l -t YOUR_MONDAY_API_TOKEN"
  echo "Get a token: https://developer.monday.com/api-reference/docs/authentication"
  exit 1
fi

echo "Building frontend..."
cd "$ROOT/frontend"
npm run build

APP_ID="$(node -e "
  const fs = require('fs');
  const sites = JSON.parse(fs.readFileSync('$SITES_JSON', 'utf8'));
  const id = sites.sites['$SITE_SLUG']?.appId;
  if (id) process.stdout.write(String(id));
")"

if [[ -z "$APP_ID" ]]; then
  echo "No appId in sites.json — deploying manifest to create app..."
  cd "$ROOT"
  mapps app:deploy -d "$ROOT" -f
  echo "Check Developer Center for the new app ID, add it to sites.json, then re-run this script."
  echo "Or run: mapps app:list"
  exit 0
fi

echo "Pushing dist to monday-code CDN (app $APP_ID)..."
cd "$ROOT/frontend"
mapps code:push -c -d dist -a "$APP_ID" --force
rm -f dist.zip

CDN_URL="$(node -e "
  const fs = require('fs');
  const sites = JSON.parse(fs.readFileSync('$SITES_JSON', 'utf8'));
  const url = sites.sites['$SITE_SLUG']?.cdnUrl;
  if (url) process.stdout.write(url);
")"

if [[ -n "$CDN_URL" ]]; then
  STATUS="$(curl -s -o /dev/null -w "%{http_code}" "$CDN_URL" || true)"
  echo "CDN: $CDN_URL (HTTP $STATUS)"
else
  echo "Deploy complete. Find your CDN URL in Developer Center → app $APP_ID → Board view feature."
fi

node -e "
const fs = require('fs');
const path = '$SITES_JSON';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
if (data.sites['$SITE_SLUG']) {
  data.sites['$SITE_SLUG'].lastDeployed = new Date().toISOString();
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
"

echo "Done."
