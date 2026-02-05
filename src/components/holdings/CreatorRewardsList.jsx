export default function CreatorRewardsList({ rewards }) {
  if (!rewards.length) return <div className="empty-state">No creator rewards yet</div>;
  return rewards.map((r, idx) => (
    <div key={idx} className="reward-row">
      <div className="reward-left">
        <div className="ticker">{r.source}</div>
        <div className="sub muted">Credits earned</div>
      </div>
      <div className="reward-right">{r.amount.toLocaleString()} CRED</div>
    </div>
  ));
}
