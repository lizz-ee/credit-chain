export default function FeeTransparencyScreen() {
  return (
    <div className="fee-screen">
      <h1>Fees & Allocation</h1>

      <div className="glass-card">
        <h3>Conversion Fees</h3>
        <p><strong>USDC → Cred:</strong> 3%</p>
        <ul className="tiny muted">
          <li>90% → Insurance Pool (USDC)</li>
          <li>7% → Mining incentives</li>
          <li>3% → Protocol operations</li>
        </ul>

        <p><strong>Cred → USDC:</strong> 3%</p>
      </div>

      <div className="glass-card">
        <h3>Memecoin Trading Fees</h3>
        <p><strong>Total:</strong> 1% per trade</p>
        <ul className="tiny muted">
          <li>30% → Insurance Pool</li>
          <li>50% → Token creator</li>
          <li>20% → Invite attribution pool</li>
        </ul>
      </div>

      <div className="glass-card">
        <h3>Protocol Philosophy</h3>
        <p className="muted">
          Fees exist to fund safety, sustainability,
          and long-term operation — not rent extraction.
        </p>
      </div>

      <div className="tag">Read-Only</div>
    </div>
  )
}