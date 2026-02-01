export default function LendSection() {
  return (
    <div className="glass-card">
      <h3>Lend</h3>

      <p className="muted">
        Browse peer loan requests.
        Lending decisions are manual and transparent.
      </p>

      <div className="loan-preview">
        <p><strong>Borrower:</strong> @satoshi-n</p>
        <p><strong>Reputation:</strong> High</p>
        <p><strong>Requested:</strong> 1,000 USDC</p>
        <p><strong>Proposed Interest:</strong> 6.2%</p>
      </div>

      <button className="secondary-btn disabled">
        Review Request (Simulation)
      </button>

      <div className="tag">Read-only</div>
    </div>
  )
}