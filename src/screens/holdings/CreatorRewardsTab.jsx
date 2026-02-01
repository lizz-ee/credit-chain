export default function CreatorRewardsTab({ hasUsername, onRequireUsername }) {
  if (!hasUsername) {
    return (
      <div className="empty-state">
        <h3>Username Required</h3>
        <p>
          Creator rewards are tied to your Credit-Chain username.
        </p>
        <button className="primary-btn" onClick={onRequireUsername}>
          Claim Username
        </button>
      </div>
    )
  }

  return (
    <div className="creator-rewards-tab">
      <div className="reward-card">
        <h3>Creator Rewards</h3>
        <p className="muted">
          Rewards are pooled from memecoin trading fees and distributed
          based on volume driven through your invite links and created coins.
        </p>

        <div className="reward-metric">
          <span>Total Earned</span>
          <strong>$1,284.32</strong>
        </div>

        <div className="reward-metric">
          <span>Unclaimed</span>
          <strong>$214.90</strong>
        </div>

        <button className="primary-btn">
          Claim Rewards
        </button>
      </div>

      <div className="info-box">
        <h4>How it works</h4>
        <ul>
          <li>1% fee on every memecoin buy & sell</li>
          <li>20% of that fee goes to creators & inviters</li>
          <li>50% of creator fees go to the coin creator</li>
          <li>Pool-based & volume-weighted distribution</li>
        </ul>
      </div>
    </div>
  )
}