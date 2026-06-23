#!/usr/bin/env bash
# Temporary public URL without monday API token.
# Requires your machine to stay on; URL expires when this script stops.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-4173}"

echo "Building..."
cd "$ROOT/frontend"
npm run build

echo "Starting static server on port $PORT..."
npx --yes serve dist --listen "$PORT" --single &
SERVE_PID=$!

cleanup() {
  kill "$SERVE_PID" 2>/dev/null || true
  pkill -P $$ cloudflared 2>/dev/null || true
}
trap cleanup EXIT

sleep 2
echo ""
echo "Opening public tunnel (no login required)..."
echo "Share the https://*.trycloudflare.com URL printed below."
echo ""
npx --yes cloudflared tunnel --url "http://localhost:$PORT"
