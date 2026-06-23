import { Link } from "react-router-dom";
import PersonalizationStrip from "../components/PersonalizationStrip";
import WhyNowBriefSection from "../components/WhyNowBriefSection";
import { useAccount } from "../context/AccountContext";
import "./WhyNowPage.css";

export default function WhyNowPage() {
  const { isPersonalized } = useAccount();

  return (
    <div className="page">
      <span className="page-eyebrow">Value & readiness</span>
      <h1 className="page-title">Why highlight AI capabilities now</h1>
      <p className="page-subtitle">
        {isPersonalized
          ? "Customer-specific urgency and framing — built from their signals, not a repeat of PMM capability cards."
          : "Load an account to see why AI matters for this customer now. For PMM-approved capability language, use Messaging & demos."}
      </p>

      <PersonalizationStrip section="Why now" />
      <WhyNowBriefSection />

      {!isPersonalized && (
        <section className="section why-now-reference">
          <h2 className="section-title">What you'll see with an account loaded</h2>
          <div className="grid">
            <div className="card">
              <h3>Customer insights</h3>
              <p>
                Gong themes, usage signals, pains, and readiness — with source
                badges so you know where each insight came from.
              </p>
            </div>
            <div className="card">
              <h3>Pain → value mapping</h3>
              <p>
                Their stated pains mapped to the capability and outcome that
                matters now — not a generic product tour.
              </p>
            </div>
            <div className="card">
              <h3>Conversation frame</h3>
              <p>
                Three scripted steps tailored to their board, sponsor, and talk
                track — with rationale for each.
              </p>
            </div>
          </div>
          <p className="section-desc why-now-link">
            PMM capability catalog and demo plan:{" "}
            <Link to="/messaging">Messaging & demos</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
