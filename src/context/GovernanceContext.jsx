import { createContext, useState } from 'react'

export const GovernanceContext = createContext(null)

export function GovernanceSimulationProvider({ children }) {
  const [proposals, setProposals] = useState([])
  const [votes, setVotes] = useState({})

  const value = {
    proposals,
    setProposals,
    votes,
    setVotes,
  }

  return (
    <GovernanceContext.Provider value={value}>
      {children}
    </GovernanceContext.Provider>
  )
}