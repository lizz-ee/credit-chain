export default function InviteRewardsScreen({ hasUsername, onRequireUsername }) {
  if (!hasUsername) {
    return (
      <div className="glass-card">
        <h3>Invite Rewards</h3>
        <p className="muted">Claim a username to view rewards.</p>
        <button className="primary-btn" onClick={onRequireUsername}>
          Claim Username
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card">
      <h3>Invite Rewards</h3>

      <p>
        Rewards are drawn from a shared pool and distributed by
        attributed volume.
      </p>

      <p><strong>Available:</strong> Simulation</p>

      <button className="primary-btn disabled">
        Claim Rewards (Simulation)
      </button>

      <div className="tag">Pool-based</div>
    </div>
  )
}