/** BigBrain Snowflake webhook — see monday_vibe_readme.md (Guy Bandel, GTM AI) */

export const VIBE_WEBHOOK_PATH = "/api/playbook-account";

const VIBE_WEBHOOK_URL =
  "https://n8n.bigbrain.me/webhook/a3c9f17e-4b82-4d5e-bc01-9e7f3a2d0c8b";

function vibeFetchUrl(pulseAccountId: string | number): string {
  const query = `pulse_account_id=${encodeURIComponent(String(pulseAccountId))}`;
  if (import.meta.env.DEV) {
    return `${VIBE_WEBHOOK_PATH}?${query}`;
  }
  return `${VIBE_WEBHOOK_URL}?${query}`;
}

const CREDIT_PRODUCT_KEYS = [
  { label: "AI blocks (columns)", key: "AI_BLOCKS_COLUMNS" },
  { label: "AI blocks (workflows)", key: "AI_BLOCKS_WORKFLOWS" },
  { label: "Vibe", key: "VIBE" },
  { label: "CRM", key: "CRM" },
  { label: "Notetaker", key: "NOTETAKER" },
  { label: "Agents", key: "AGENTS" },
  { label: "Sidekick", key: "SIDEKICK" },
  { label: "Other", key: "OTHER" },
] as const;

export interface VibeWebhookRow {
  PULSE_ACCOUNT_ID: number;
  COMPANY_NAME: string;
  PRODUCTS: string;
  WM_SEATS: number;
  CRM_SEATS: number;
  DEV_SEATS: number;
  SERVICE_SEATS: number;
  RENEWAL_DATE: string | null;
  ARR_TO_RENEW: number;
  RENEWAL_OPPORTUNITY_STAGE: string | null;
  ATTRIBUTED_ARR: number;
  AI_CREDITS_ARR: number;
  VIBE_ARR: number;
  SIDEKICK_ARR: number;
  NOTETAKER_ARR: number;
  AI_ARR: number;
  AI_STATUS: string;
  AI_DISABLED_DATE: string | null;
  AI_CREDITS_USED_LAST_CYCLE: number;
  AI_CREDITS_LIMIT_LAST_CYCLE: number;
  AI_CREDITS_PCT_LAST_CYCLE: number;
  WORKFLOWS_USED: number;
  WORKFLOWS_LIMIT: number;
  WORKFLOWS_USAGE_PCT: number;
  VIBE_TRIAL: string;
  VIBE_TRIAL_END_DATE: string | null;
  INDUSTRY: string;
  COMPANY_SIZE: string;
  PLAN_TIER: string;
  REGION: string;
  CREDITS_TOTAL: number;
  [key: string]: string | number | null | undefined;
}

export interface VibeChampion {
  rank: number;
  name: string;
  creditsUsed: number;
  persona: string | null;
  title: string | null;
  team: string | null;
}

export interface VibeCreditProduct {
  label: string;
  key: string;
  credits: number;
  sharePct: number;
  utilPct: number;
}

export interface ParsedVibeAccount {
  pulseAccountId: number;
  companyName: string;
  planTier: string;
  products: string[];
  wmSeats: number;
  crmSeats: number;
  devSeats: number;
  serviceSeats: number;
  attributedArr: number;
  industry: string;
  companySize: string;
  region: string;
  renewalDate: string | null;
  arrToRenew: number;
  renewalStage: string | null;
  aiArr: number;
  aiCreditsArr: number;
  vibeArr: number;
  sidekickArr: number;
  aiStatus: string;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  aiCreditsPct: number;
  workflowsUsed: number;
  workflowsLimit: number;
  workflowsPct: number;
  vibeTrial: string;
  creditsTotal: number;
  creditsByProduct: VibeCreditProduct[];
  topProducts: VibeCreditProduct[];
  champions: VibeChampion[];
}

function parseChampion(row: VibeWebhookRow, rank: 1 | 2 | 3): VibeChampion | null {
  const suffix = rank === 1 ? "" : `_${rank}`;
  const name = row[`AI_CHAMPION${suffix}_NAME`] as string | null | undefined;
  if (!name) return null;
  return {
    rank,
    name,
    creditsUsed: (row[`AI_CHAMPION${suffix}_CREDITS_USED`] as number) ?? 0,
    persona: (row[`AI_CHAMPION${suffix}_PERSONA`] as string) ?? null,
    title: (row[`AI_CHAMPION${suffix}_TITLE`] as string) ?? null,
    team: (row[`AI_CHAMPION${suffix}_ESTIMATED_TEAM`] as string) ?? null,
  };
}

function parseCreditsByProduct(row: VibeWebhookRow): VibeCreditProduct[] {
  return CREDIT_PRODUCT_KEYS.map(({ label, key }) => ({
    label,
    key,
    credits: (row[`CREDITS_${key}`] as number) ?? 0,
    sharePct: (row[`CREDITS_${key}_SHARE_PCT`] as number) ?? 0,
    utilPct: (row[`CREDITS_${key}_UTIL_PCT`] as number) ?? 0,
  }))
    .filter((p) => p.credits > 0)
    .sort((a, b) => b.credits - a.credits);
}

export function parseVibeRow(row: VibeWebhookRow): ParsedVibeAccount {
  const creditsByProduct = parseCreditsByProduct(row);
  return {
    pulseAccountId: row.PULSE_ACCOUNT_ID,
    companyName: row.COMPANY_NAME,
    planTier: row.PLAN_TIER,
    products: row.PRODUCTS.split(",").map((p) => p.trim()).filter(Boolean),
    wmSeats: row.WM_SEATS ?? 0,
    crmSeats: row.CRM_SEATS ?? 0,
    devSeats: row.DEV_SEATS ?? 0,
    serviceSeats: row.SERVICE_SEATS ?? 0,
    attributedArr: row.ATTRIBUTED_ARR ?? 0,
    industry: row.INDUSTRY ?? "Unknown",
    companySize: row.COMPANY_SIZE ?? "Unknown",
    region: row.REGION ?? "Unknown",
    renewalDate: row.RENEWAL_DATE ?? null,
    arrToRenew: row.ARR_TO_RENEW ?? 0,
    renewalStage: row.RENEWAL_OPPORTUNITY_STAGE ?? null,
    aiArr: row.AI_ARR ?? 0,
    aiCreditsArr: row.AI_CREDITS_ARR ?? 0,
    vibeArr: row.VIBE_ARR ?? 0,
    sidekickArr: row.SIDEKICK_ARR ?? 0,
    aiStatus: row.AI_STATUS ?? "Unknown",
    aiCreditsUsed: row.AI_CREDITS_USED_LAST_CYCLE ?? 0,
    aiCreditsLimit: row.AI_CREDITS_LIMIT_LAST_CYCLE ?? 0,
    aiCreditsPct: row.AI_CREDITS_PCT_LAST_CYCLE ?? 0,
    workflowsUsed: row.WORKFLOWS_USED ?? 0,
    workflowsLimit: row.WORKFLOWS_LIMIT ?? 0,
    workflowsPct: row.WORKFLOWS_USAGE_PCT ?? 0,
    vibeTrial: row.VIBE_TRIAL ?? "No trial",
    creditsTotal: row.CREDITS_TOTAL ?? 0,
    creditsByProduct,
    topProducts: creditsByProduct.slice(0, 3),
    champions: ([1, 2, 3] as const)
      .map((r) => parseChampion(row, r))
      .filter((c): c is VibeChampion => c !== null),
  };
}

export async function fetchVibeAccount(
  pulseAccountId: number | string
): Promise<ParsedVibeAccount | null> {
  const url = vibeFetchUrl(pulseAccountId);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(url, { method: "GET", signal: controller.signal });
    const text = await res.text();

    if (!res.ok) {
      let detail = text.trim().slice(0, 120);
      if (detail.startsWith("{")) {
        try {
          const parsed = JSON.parse(detail) as { error?: string };
          if (parsed.error) detail = parsed.error;
        } catch {
          /* use raw text */
        }
      }
      throw new Error(
        detail
          ? `Couldn't load account data (${res.status}): ${detail}`
          : `Couldn't load account data (HTTP ${res.status})`
      );
    }

    if (!text.trim()) return null;

    const rows = JSON.parse(text) as VibeWebhookRow[];
    if (!Array.isArray(rows) || rows.length === 0) return null;

    return parseVibeRow(rows[0]);
  } finally {
    clearTimeout(timeout);
  }
}

/** Sample pulse IDs from readme for quick testing */
export const TEST_PULSE_ACCOUNTS = [
  { id: 15393079, label: "WorkPac-anz — Enterprise, renewal, 3 champions" },
  { id: 13364075, label: "Dev + Vibe + renewal" },
  { id: 2685506, label: "AI disabled, enterprise WM" },
  { id: 11162909, label: "SMB with AI Credits" },
];
