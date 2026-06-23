import type { Plugin } from "vite";

const WEBHOOK_URL =
  "https://n8n.bigbrain.me/webhook/a3c9f17e-4b82-4d5e-bc01-9e7f3a2d0c8b";

const API_PREFIX = "/api/playbook-account";

/** Dev-only proxy: browser → Vite middleware → BigBrain webhook (avoids CORS). */
export function playbookAccountApi(): Plugin {
  return {
    name: "playbook-account-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith(API_PREFIX)) {
          next();
          return;
        }

        if (req.method && req.method !== "GET" && req.method !== "HEAD") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }

        const incoming = new URL(req.url, "http://localhost");
        const pulseId = incoming.searchParams.get("pulse_account_id");
        if (!pulseId) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "pulse_account_id is required" }));
          return;
        }

        const upstreamUrl = `${WEBHOOK_URL}?pulse_account_id=${encodeURIComponent(pulseId)}`;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 45000);

        try {
          const upstream = await fetch(upstreamUrl, {
            method: "GET",
            signal: controller.signal,
          });
          const body = await upstream.text();
          res.statusCode = upstream.status;
          res.setHeader(
            "Content-Type",
            upstream.headers.get("content-type") ?? "application/json"
          );
          res.end(body);
        } catch (err) {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                err instanceof Error ? err.message : "Upstream request failed",
            })
          );
        } finally {
          clearTimeout(timer);
        }
      });
    },
  };
}
