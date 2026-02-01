import { motion } from 'framer-motion'

export default function GovernanceFeedScreen({ proposals, onSelect }) {
  return (
    <div className="governance-feed">
      <div className="status-card">
        <div>
          <strong>Network:</strong> Operational
        </div>
        <div>
          <strong>Governance:</strong> Simulation Mode
        </div>
        <div className="tiny muted">
          No real funds move here.
        </div>
      </div>

      <div className="feed-list">
        {proposals.map((p, i) => (
          <motion.div
            key={p.id}
            className="glass-card proposal-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            onClick={() => onSelect(p.id)}
          >
            <div className="proposal-head">
              <h3>{p.title}</h3>
              <span className={`risk ${p.risk}`}>
                {p.risk.toUpperCase()}
              </span>
            </div>

            <p className="muted line-clamp">
              {p.description}
            </p>

            <div className="proposal-foot">
              <span className="tiny muted">
                Time remaining: {p.timeRemaining}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}