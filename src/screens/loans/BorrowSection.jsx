export default function BorrowSection() {
  return (
    <div className="glass-card">
      <h3>Borrow</h3>

      <p className="muted">
        Request a loan using your username as reputation.
        Terms are proposed by AI and shown for review.
      </p>

      <div className="loan-preview">
        <p><strong>Requested Amount:</strong> 1,000 USDC</p>
        <p><strong>Collateral Required:</strong> Username Reputation</p>
        <p><strong>Interest:</strong> AI Proposed</p>
        <p><strong>Duration:</strong> 90 Days</p>
      </div>

      <button className="primary-btn disabled">
        Request Loan (Simulation)
      </button>

      <div className="tag">No execution occurs</div>
    </div>
  )
}