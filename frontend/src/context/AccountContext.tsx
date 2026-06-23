import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { matchPath, useLocation, useSearchParams } from "react-router-dom";
import {
  fetchPersonalizedPlaybook,
  loadPersonalizedPlaybook,
  type FetchStatus,
} from "../signals/accountService";
import type { PersonalizedPlaybook } from "../signals/types";

interface AccountContextValue {
  accountId: string | null;
  playbook: PersonalizedPlaybook | null;
  isPersonalized: boolean;
  status: FetchStatus;
  error: string | null;
  retry: () => void;
}

const AccountContext = createContext<AccountContextValue>({
  accountId: null,
  playbook: null,
  isPersonalized: false,
  status: "idle",
  error: null,
  retry: () => {},
});

export function AccountProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Provider wraps the whole app (outside <Routes>), so useParams() is always empty.
  // Parse /account/:accountId from the pathname instead.
  const routeMatch = matchPath(
    { path: "/account/:accountId", end: false },
    location.pathname
  );
  const routeAccountId = routeMatch?.params.accountId;
  const queryAccountId = searchParams.get("account");

  const accountId = routeAccountId ?? queryAccountId ?? null;
  const isPulseId = accountId ? /^\d+$/.test(accountId) : false;

  const [playbook, setPlaybook] = useState<PersonalizedPlaybook | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!accountId) {
      setPlaybook(null);
      setStatus("idle");
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        if (isPulseId) {
          const result = await fetchPersonalizedPlaybook(accountId!);
          if (cancelled) return;
          if (!result) {
            setPlaybook(null);
            setStatus("not_found");
            return;
          }
          setPlaybook(result);
          setStatus("success");
        } else {
          const result = loadPersonalizedPlaybook(accountId!);
          if (cancelled) return;
          if (!result) {
            setPlaybook(null);
            setStatus("not_found");
            return;
          }
          setPlaybook(result);
          setStatus("success");
        }
      } catch (e) {
        if (cancelled) return;
        setPlaybook(null);
        setStatus("error");
        setError(e instanceof Error ? e.message : "Couldn't load data");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [accountId, isPulseId, retryCount]);

  const value = useMemo(
    () => ({
      accountId,
      playbook,
      isPersonalized: !!playbook,
      status,
      error,
      retry: () => setRetryCount((c) => c + 1),
    }),
    [accountId, playbook, status, error]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}

export function useRecommendations() {
  const { playbook } = useAccount();
  return playbook?.recommendations ?? null;
}

export function useAccountSignals() {
  const { playbook } = useAccount();
  return playbook?.account ?? null;
}
