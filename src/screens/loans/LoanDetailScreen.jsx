export default function LoanDetailScreen({ loan, onBack }) {
  return (
    <div className="loan-detail">
      <button className="secondary-btn" onClick={onBack}>
        Back
      </button>

      <h1>Loan Request</h1>

      <div className="glass-card">
        <p><strong>Borrower:</strong> @{loan.borrower}</p>
        <p><strong>Requested:</strong> Simulation</p>
        <p><strong>Collateral:</strong> Simulation</p>
        <p><strong>Repayment:</strong> Simulation</p>
      </div>

      <div className="glass-card">
        <h3>Risk Disclosure</h3>
        <p className="muted">
          All loans are peer-to-peer. No guarantees.
          Terms are transparent and immutable once agreed.
        </p>
      </div>

      <div className="glass-card">
        <button className="primary-btn disabled">
          Approve Loan (Simulation)
        </button>
        <button className="secondary-btn disabled">
          Reject
        </button>
      </div>

      <div className="tag">Simulation</div>
    </div>
  )
}