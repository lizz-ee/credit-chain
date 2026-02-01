export default function GovernanceProposalDetail() {
  return (
    <div className="governance-detail">
      <h1>Governance Proposal</h1>

      <div className="glass-card">
        <h3>Proposal Summary</h3>

        <p><strong>Proposed By:</strong> AI System</p>
        <p><strong>Risk Level:</strong> Medium</p>
        <p><strong>Time Remaining:</strong> 48 hours</p>
      </div>

      <div className="glass-card">
        <h3>Proposed Changes</h3>

        <ul className="bullet-list">
          <li>Modify peer-to-peer lending parameters</li>
          <li>No immediate execution</li>
          <li>Subject to human approval</li>
        </ul>
      </div>

      <div className="glass-card">
        <h3>Voting Rules</h3>

        <p>
          Proposals require more than <strong>50% approval</strong>
          from participating users to be enacted.
        </p>

        <p className="tiny muted">
          AI cannot execute changes independently.
        </p>
      </div>

      <div className="glass-card">
        <button className="primary-btn disabled">
          Vote Approve (Simulation)
        </button>
        <button className="secondary-btn disabled">
          Vote Reject (Simulation)
        </button>
      </div>

      <div className="tag">Governance Simulation</div>
    </div>
  )
}