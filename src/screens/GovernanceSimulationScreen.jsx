import { motion } from 'framer-motion';
import useGovernance from '../hooks/useGovernance';

export default function GovernanceSimulationScreen({ onNavigate }) {
  const { proposals, userVotes, getTimeRemaining, getRiskColor } = useGovernance()

  const active = proposals.filter(p => p.status === 'active')
  const pending = proposals.filter(p => p.status === 'pending')

  return (
    <div className="governance-simulation-screen">
      <motion.div className="simulation-badge glass-surface">
        Governance Simulation — No real network changes occur
      </motion.div>

      {active.map(p => (
        <div key={p.id} className="proposal-card glass-surface" onClick={() => onNavigate('proposal_sim', p)}>
          <h3>{p.title}</h3>
          <span style={{ color: getRiskColor(p.riskLevel) }}>{p.riskLevel}</span>
          <p>{p.description}</p>
          <small>{getTimeRemaining(p.votingEndsAt)}</small>
          {userVotes[p.id] && <small>You voted</small>}
        </div>
      ))}

      {pending.length > 0 && (
        <>
          <h4>Upcoming</h4>
          {pending.map(p => (
            <div key={p.id} className="proposal-card pending glass-surface">
              <h4>{p.title}</h4>
            </div>
          ))}
        </>
      )}
    </div>
  )
}