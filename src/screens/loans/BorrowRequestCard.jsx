export default function BorrowRequestCard() {
  return (
    <div className="glass-card">
      <h3>Request a Loan</h3>

      <p className="muted">
        Terms are proposed by the system and shown for review.
      </p>

      <p><strong>Collateral Required:</strong> Simulation</p>
      <p><strong>Repayment Window:</strong> Simulation</p>

      <button className="primary-btn disabled">
        Submit Request (Simulation)
      </button>
    </div>
  )
}