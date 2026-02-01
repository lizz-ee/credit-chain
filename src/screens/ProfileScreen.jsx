import ReputationSection from './profile/ReputationSection'
import '../styles/profile.css'

export default function ProfileScreen({
  telegramUsername,
  creditUsername,
  onClaimUsername,
  onOpenGovernance,
  onOpenContract,
}) {
  return (
    <div className="screen profile-screen">
      <h2>Profile</h2>

      {/* IDENTITY */}
      <section className="card">
        <h3>Identity</h3>
        <p><strong>Telegram:</strong> @{telegramUsername || 'unknown'}</p>
        <p>
          <strong>Credit-Chain Username:</strong>{' '}
          {creditUsername || 'Unclaimed'}
        </p>

        {!creditUsername && (
          <button className="primary-btn" onClick={onClaimUsername}>
            Claim Username
          </button>
        )}
      </section>

      {/* GOVERNANCE */}
      <section className="card">
        <h3>Governance (Simulation)</h3>
        <ul>
          <li>AI may propose improvements</li>
          <li>Humans approve or reject</li>
          <li>One username = one vote</li>
          <li>Votes are final</li>
        </ul>

        <button className="secondary-btn" onClick={onOpenGovernance}>
          Open Governance
        </button>

        <textarea
          placeholder="Drop feedback for AI governance (ideas, concerns, bugs)"
          rows={4}
        />
        <p className="muted">
          Feedback is anonymous and used for proposal analysis only.
        </p>
      </section>

      {/* FEES */}
      <section className="card">
        <h3>Fees & Economics</h3>

        <h4>Conversions</h4>
        <p>
          USDC → Credits: <strong>3%</strong>
        </p>
        <ul>
          <li>90% → Insurance Pool (USDC)</li>
          <li>7% → Mining</li>
          <li>3% → Protocol (MASTERCONTROL)</li>
        </ul>

        <p>
          Credits → USDC: <strong>3%</strong>
        </p>

        <h4>Memecoin Trading</h4>
        <p><strong>1% transaction fee</strong></p>
        <ul>
          <li>30% → Insurance Pool</li>
          <li>50% → Creator</li>
          <li>20% → Invite rewards</li>
        </ul>

        <h4>Lending</h4>
        <ul>
          <li>Borrowers pay fixed 20% premium</li>
          <li>0.5% → Insurance Pool</li>
          <li>Lenders are paid on due date or early repayment</li>
        </ul>
      </section>

      {/* BUILD */}
      <section className="card">
        <h3>Build on Credit-Chain</h3>
        <p>
          Credit-Chain supports third-party apps built on its rails.
        </p>
        <ul>
          <li>Apps must be approved by MASTERCONTROL</li>
          <li>No cross-chain swaps</li>
          <li>No external liquidity drains</li>
          <li>Credits are the execution unit</li>
        </ul>
        <p className="muted">
          Contact protocol team to apply.
        </p>
      </section>

      {/* SAFETY */}
      <section className="card">
        <h3>Off-World Contract</h3>
        <ul>
          <li>Fund sovereignty guaranteed</li>
          <li>Usernames permanent</li>
          <li>AI has no execution rights</li>
          <li>Right to exit & fork</li>
        </ul>

        <button className="secondary-btn" onClick={onOpenContract}>
          View Contract
        </button>
      </section>

      {/* RESET */}
      <section className="card danger">
        <h3>Local Simulation</h3>
        <button
          className="danger-btn"
          onClick={() => localStorage.clear()}
        >
          Reset Local Data
        </button>
        <p className="muted">
          This only clears simulation state.
        </p>
      </section>
    </div>
  )
}