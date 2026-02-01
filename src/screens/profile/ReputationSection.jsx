import ReputationBadge from '../../components/ReputationBadge'

export default function ReputationSection({ hasUsername }) {
  if (!hasUsername) {
    return (
      <div className="glass-card">
        <h3>Reputation</h3>
        <p className="muted">
          Claim a username to establish on-network reputation.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card">
      <h3>Reputation</h3>

      <ReputationBadge score={35} />

      <ul className="tiny muted">
        <li>Based on participation</li>
        <li>Governance activity</li>
        <li>Peer-to-peer lending history</li>
      </ul>

      <div className="tag">Read-only</div>
    </div>
  )
}