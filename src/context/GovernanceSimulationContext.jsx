import React, { createContext, useContext, useEffect, useState } from 'react';

const GovernanceContext = createContext(null);
const STORAGE_KEY = 'governance_simulation_state';

const DEFAULT_PROPOSALS = [
  {
    id: 'prop_001',
    title: 'Liquidity Matching Optimization',
    description: 'Improve how lenders are matched to borrowers.',
    risk: 'low',
    status: 'active',
    deadline: Date.now() + 48 * 60 * 60 * 1000,
    votesFor: 0,
    votesAgainst: 0,
    immutable: [
      'User funds cannot be seized',
      'Interest rules unchanged',
      'Withdrawal rights preserved',
      'Username ownership protected'
    ]
  }
];

export function GovernanceSimulationProvider({ children }) {
  const [proposals, setProposals] = useState(DEFAULT_PROPOSALS);
  const [userVotes, setUserVotes] = useState({});
  const [contractAcknowledged, setContractAcknowledged] = useState(false);

  // Load persisted state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setProposals(parsed.proposals || DEFAULT_PROPOSALS);
      setUserVotes(parsed.userVotes || {});
      setContractAcknowledged(!!parsed.contractAcknowledged);
    } catch {
      console.warn('Governance state corrupted, resetting');
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ proposals, userVotes, contractAcknowledged })
    );
  }, [proposals, userVotes, contractAcknowledged]);

  const castVote = (proposalId, vote) => {
    if (userVotes[proposalId]) return;

    setProposals(prev =>
      prev.map(p => {
        if (p.id !== proposalId) return p;
        return {
          ...p,
          votesFor: vote === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: vote === 'against' ? p.votesAgainst + 1 : p.votesAgainst
        };
      })
    );

    setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
  };

  return (
    <GovernanceContext.Provider
      value={{
        proposals,
        userVotes,
        castVote,
        contractAcknowledged,
        acknowledgeContract: () => setContractAcknowledged(true)
      }}
    >
      {children}
    </GovernanceContext.Provider>
  );
}

export const useGovernance = () => {
  const ctx = useContext(GovernanceContext);
  if (!ctx) throw new Error('useGovernance must be used inside provider');
  return ctx;
};