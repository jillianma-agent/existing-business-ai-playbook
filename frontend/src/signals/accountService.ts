import { getAccountSignals as getMockAccount, listAccounts as listMockAccounts } from "./mockAccounts";
import { buildPersonalizedPlaybook } from "./recommendations";
import { mapVibeToAccountSignals } from "./mapVibeToAccountSignals";
import { fetchVibeAccount, TEST_PULSE_ACCOUNTS } from "./vibeWebhook";
import type { PersonalizedPlaybook } from "./types";

export { TEST_PULSE_ACCOUNTS };

export function listAccounts() {
  return listMockAccounts();
}

/** Sync load for mock slug IDs (meridian-health, etc.) */
export function loadPersonalizedPlaybook(accountId: string): PersonalizedPlaybook | null {
  const mock = getMockAccount(accountId);
  if (mock) return buildPersonalizedPlaybook(mock);
  return null;
}

/** Async load: BigBrain webhook by pulse_account_id, fallback to mock slugs */
export async function fetchPersonalizedPlaybook(
  accountId: string
): Promise<PersonalizedPlaybook | null> {
  const isPulseId = /^\d+$/.test(accountId);

  if (isPulseId) {
    const vibe = await fetchVibeAccount(accountId);
    if (!vibe) return null;
    const account = mapVibeToAccountSignals(vibe);
    return buildPersonalizedPlaybook(account);
  }

  return loadPersonalizedPlaybook(accountId);
}

export type FetchStatus = "idle" | "loading" | "success" | "not_found" | "error";
