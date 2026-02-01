export default function VoteHistoryScreen({ username, votes }) {
  if (!username) {
    return (
      <div className="glass-card">
        <h3>Voting History</h3>
        <p className="muted">Claim a username to participate in governance.</p>
      </div>
    )
  }

  if (!votes || votes.length === 0) {
    return (
      <div className="glass-card">
        <h3>Voting History</h3>
        <p className="muted">No votes cast yet.</p>
      </div>
    )
  }

  return (
    <div className="vote-history-screen">
      <h1>Voting History</h1>

      {votes.map((vote, i) => (
        <div className="glass-card" key={i}>
          <p><strong>Proposal:</strong> {vote.proposalTitle}</p>
          <p><strong>Vote:</strong> {vote.choice}</p>
          <p className="tiny muted">
            Votes are permanent once cast.
          </p>
        </div>
      ))}
    </div>
  )
}