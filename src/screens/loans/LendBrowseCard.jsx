export default function LendBrowseCard() {
  return (
    <div className="glass-card">
      <h3>Browse Loan Requests</h3>

      <div className="loan-item">
        <p><strong>Borrower:</strong> @username</p>
        <p><strong>Requested:</strong> Simulation</p>
        <p><strong>Reputation:</strong> Simulation</p>

        <button className="secondary-btn disabled">
          View Details
        </button>
      </div>

      <p className="tiny muted">
        All lending is peer-to-peer. No instant execution.
      </p>
    </div>
  )
}