import type { AccountSignals } from "../signals/types";

const STORAGE_KEY = "playbook-mock-account-overrides";

export function getMockAccountOverrides(): Record<string, AccountSignals> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, AccountSignals>;
  } catch {
    return {};
  }
}

export function saveMockAccountOverride(accountId: string, account: AccountSignals) {
  const overrides = getMockAccountOverrides();
  overrides[accountId] = account;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides, null, 2));
}

export function clearMockAccountOverride(accountId: string) {
  const overrides = getMockAccountOverrides();
  delete overrides[accountId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides, null, 2));
}

export function clearAllMockAccountOverrides() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasMockAccountOverride(accountId: string): boolean {
  return accountId in getMockAccountOverrides();
}
