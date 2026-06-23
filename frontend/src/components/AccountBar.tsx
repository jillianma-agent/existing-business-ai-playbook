import { Link, useNavigate } from "react-router-dom";
import { listAccounts } from "../signals/accountService";
import { useAccount } from "../context/AccountContext";
import "./AccountBar.css";

const readinessClass: Record<string, string> = {
  high: "readiness--high",
  medium: "readiness--medium",
  not_yet: "readiness--low",
};

export default function AccountBar() {
  const { accountId, playbook } = useAccount();
  const navigate = useNavigate();
  const accounts = listAccounts();

  if (!playbook) return null;

  const { account } = playbook;
  const rec = playbook.recommendations;

  return (
    <div className="account-bar">
      <div className="account-bar-inner">
        <div className="account-bar-main">
          <span className="account-bar-label">Personalized for</span>
          <strong className="account-bar-name">{account.accountName}</strong>
          <span className="account-bar-meta">
            {account.segment} · {account.industry}
          </span>
          <span className={`readiness-badge ${readinessClass[account.readiness]}`}>
            {account.readiness.replace("_", " ")} · {account.readinessScore}
          </span>
        </div>

        <div className="account-bar-actions">
          <Link to={`/account/${account.accountId}`} className="account-bar-link">
            Account prep
          </Link>
          <Link
            to={`/tee-up?account=${account.accountId}`}
            className="account-bar-link"
          >
            Landing page
          </Link>
          <Link to={`/account/${account.accountId}/pilot`} className="account-bar-link">
            Pilot plan
          </Link>
          <select
            className="account-switcher"
            value={accountId ?? ""}
            onChange={(e) => {
              const id = e.target.value;
              if (id) navigate(`/account/${id}`);
              else navigate("/");
            }}
            aria-label="Switch account"
          >
            <option value="">Switch account…</option>
            {accounts.map((a) => (
              <option key={a.accountId} value={a.accountId}>
                {a.accountName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="account-bar-rec">
        <span className="account-bar-rec-label">Recommended:</span>
        <span>{rec.talkTrackId.replace(/-/g, " ")}</span>
        <span className="account-bar-rec-dot">·</span>
        <span>{rec.demoScenarioId.replace(/-/g, " ")}</span>
        <span className="account-bar-rec-dot">·</span>
        <span>{rec.pilotPathId.replace(/-/g, " ")}</span>
      </div>
    </div>
  );
}
