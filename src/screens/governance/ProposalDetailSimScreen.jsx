import { motion, AnimatePresence } from 'framer-motion'
import { useGovernance } from '../../hooks/useGovernance'

export default function ProposalDetailSimScreen({ proposalId, onBack, onRequireUsername }) {
  const { proposals, userVotes, castVote, getTimeRemaining, getRiskColor } = useGovernance()

  const proposal = proposals.find(p => p.id === proposalId)

  if (!proposal) {
    return (
      <div className="glass-surface" style={{ padding: 24, textAlign: 'center' }}>
        <h2>Proposal not found</h2>
        <button onClick={onBack}>Back</button>
      </div>
    )
  }

  const userVote = userVotes[proposalId]

  const handleVote = (vote) => {
    if (userVote) return
    if (!onRequireUsername) return
    castVote(proposalId, vote)
  }

  return (
    <div className="proposal-detail-sim-screen">
      <button className="back-button" onClick={onBack}>← Back</button>

      <h1>{proposal.title}</h1>
      <span className="risk-badge" style={{ borderColor: getRiskColor(proposal.riskLevel) }}>
        {proposal.riskLevel.toUpperCase()}
      </span>

      <p>{proposal.description}</p>

      <h3>Voting ends</h3>
      <p>{getTimeRemaining(proposal.votingEndsAt)}</p>

      <h3>AI Consensus</h3>
      <div className="consensus-bar">
        <div
          className="consensus-fill"
          style={{ width: `${(proposal.aiConsensus.agree / proposal.aiConsensus.total) * 100}%` }}
        />
      </div>

      {userVote ? (
        <div className="vote-recorded">You voted: {userVote}</div>
      ) : (
        <div className="vote-buttons">
          <button onClick={() => handleVote('support')}>Support</button>
          <button onClick={() => handleVote('reject')}>Reject</button>
        </div>
      )}
    </div>
  )
}
