export default function InviteOverviewScreen({ hasUsername, onRequireUsername }) {
  if (!hasUsername) {
    return (
      <div className="centered-screen">
        <h2>Username Required</h2>
        <p>Claim a username to access invite attribution.</p>
        <button className="primary-btn" onClick={onRequireUsername}>
          Claim Username
        </button>
      </div>
    )
  }

  return (
    <div className="invite-overview">
      <h1>Invites</h1>

      <div className="glass-card">
        <h3>Your Invite Link</h3>
        <p className="mono">https://t.me/credchainbot?start=YOUR_CODE</p>
        <p className="tiny muted">
          Attribution is pool-based and volume-weighted.
        </p>
        <button className="secondary-btn">Copy Link</button>
      </div>

      <div className="glass-card">
        <h3>Attribution Summary</h3>
        <p><strong>Invited Users:</strong> Simulation</p>
        <p><strong>Attributed Volume:</strong> Simulation</p>
        <p className="tiny muted">
          Creator rewards accrue from memecoin transaction fees.
        </p>
      </div>

      <div className="tag">Simulation</div>
    </div>
  )
}