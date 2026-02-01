export function aggregateVotes(votes) {
  /**
   * votes: Array<{ username: string, choice: 'approve' | 'reject' }>
   */

  const total = votes.length

  if (total === 0) {
    return {
      status: 'no-votes',
      approvalPercent: 0,
      approved: false
    }
  }

  const approvals = votes.filter(v => v.choice === 'approve').length
  const approvalPercent = Math.round((approvals / total) * 100)

  return {
    status: 'complete',
    approvalPercent,
    approved: approvalPercent > 50
  }
}