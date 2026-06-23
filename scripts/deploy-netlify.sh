#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Building..."
cd "$ROOT/frontend"
npm run build

echo "Deploying to Netlify (anonymous drop)..."
NODE_TLS_REJECT_UNAUTHORIZED=0 npx --yes netlify-cli deploy \
  --prod \
  --dir=dist \
  --no-build \
  --allow-anonymous

echo ""
echo "Use the Site URL above. Password if prompted: My-Drop-Site"
echo "Claim the site within 60 minutes to keep it permanently."
