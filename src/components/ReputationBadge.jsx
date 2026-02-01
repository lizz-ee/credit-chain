export default function ReputationBadge({ score = 0 }) {
  let label = 'New'
  if (score > 80) label = 'Excellent'
  else if (score > 50) label = 'Established'
  else if (score > 20) label = 'Emerging'

  return (
    <div className="reputation-badge">
      <strong>{label}</strong>
      <span className="tiny muted">Reputation</span>
    </div>
  )
}