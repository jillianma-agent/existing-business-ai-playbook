import "./RecommendedBadge.css";

export default function RecommendedBadge({ reason }: { reason?: string }) {
  return (
    <span className="recommended-badge" title={reason}>
      Recommended
    </span>
  );
}
