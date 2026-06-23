#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GH="${GH:-gh}"

echo "Building for GitHub Pages..."
cd "$ROOT/frontend"
GITHUB_PAGES=true npm run build

cd dist
cp index.html 404.html
touch .nojekyll

if [[ ! -d .git ]]; then
  git init -b gh-pages
  git config user.email "jillianma-agent@users.noreply.github.com"
  git config user.name "jillianma-agent"
  git remote add origin https://github.com/jillianma-agent/existing-business-ai-playbook.git
fi

git add -A
git commit -m "Deploy playbook site" || true
$GH auth setup-git 2>/dev/null || true
git push -f origin gh-pages

echo ""
echo "Live: https://jillianma-agent.github.io/existing-business-ai-playbook/"
