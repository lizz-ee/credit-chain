export default function LoanListItem({ loan, onOpen }) {
  return (
    <div className="glass-card loan-item" onClick={onOpen}>
      <p><strong>@{loan.borrower}</strong></p>
      <p className="tiny muted">Requested: Simulation</p>
      <p className="tiny muted">Reputation: Simulation</p>
    </div>
  )
} 