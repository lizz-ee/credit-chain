export default function CreateProposalCard({
  hasUsername,
  onRequireUsername
}) {
  return (
    <div className="glass-card">
      <h3>Create Governance Proposal</h3>

      <p className="muted">
        Proposals shape protocol behavior.
        AI assists. Humans approve.
      </p>

      {!hasUsername ? (
        <button className="primary-btn" onClick={onRequireUsername}>
          Claim Username to Continue
        </button>
      ) : (
        <button className="primary-btn">
          Start Proposal (Simulation)
        </button>
      )}

      <div className="tag">Simulation Only</div>
    </div>
  )
}