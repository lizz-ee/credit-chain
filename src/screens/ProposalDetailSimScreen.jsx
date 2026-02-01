import { useGovernance } from '../hooks/useGovernance'

export default function ProposalDetailSimScreen({ proposalId, onBack, onRequireUsername }) {
  const { proposals, userVotes, castVote } = useGovernance()
  const proposal = proposals.find(p => p.id === proposalId)

  if (!proposal) return <button onClick={onBack}>Back</button>

  const voted = userVotes[proposalId]

  return (
    <div className="proposal-detail">
      <button onClick={onBack}>Back</button>
      <h2>{proposal.title}</h2>
      <p>{proposal.description}</p>

      <h4>Immutable Guarantees</h4>
      <ul>
        {proposal.immutableGuarantees.map((g,i) => <li key={i}>{g}</li>)}
      </ul>

      {!voted ? (
        <div>
          <button onClick={() => castVote(proposalId, 'support')}>Support</button>
          <button onClick={() => castVote(proposalId, 'reject')}>Reject</button>
        </div>
      ) : (
        <p>Vote recorded: {voted}</p>
      )}
    </div>
  )
}