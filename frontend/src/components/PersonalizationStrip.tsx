import { Link } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import "./PersonalizationStrip.css";

interface PersonalizationStripProps {
  section: string;
}

/** Shown on library pages when an account is selected */
export default function PersonalizationStrip({ section }: PersonalizationStripProps) {
  const { playbook, accountId } = useAccount();
  if (!playbook || !accountId) return null;

  return (
    <div className="personalization-strip">
      <p>
        Viewing <strong>{section}</strong> for{" "}
        <strong>{playbook.account.accountName}</strong>. Content below is
        ranked and highlighted for this account.
      </p>
      <Link to={`/account/${accountId}`}>Back to account prep →</Link>
    </div>
  );
}
