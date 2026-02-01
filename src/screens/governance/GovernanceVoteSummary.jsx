import { aggregateVotes } from '../../governance/useGovernanceAggregation'

export default function GovernanceVoteSummary({ votes }) {
  const result = aggregateVotes(votes)

  return (
    <div className="glass-card">
      <h3>Vote Summary</h3>

      <p>
        Approval: <strong>{result.approvalPercent}%</strong>
      </p>

      <p className="muted">
        Requires more than 50% approval to pass.
      </p>

      {result.approved ? (
        <div className="tag success">Proposal Approved (Simulation)</div>
      ) : (
        <div className="tag">Not Approved</div>
      )}
    </div>
  )
}