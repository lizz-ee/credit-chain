import { motion } from "framer-motion";
import useGovernance from '../hooks/useGovernance';

export default function GovernanceSimulationScreen({ onNavigate }) {
  const { proposals, vote } = useGovernance();

  return (
    <div style={{ padding: 24 }}>
      <h2>AI Governance Simulation</h2>
      <p>AI proposes. Humans decide.</p>

      <div style={{ marginTop: 24 }}>
        {proposals.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.02 }}
            style={{
              padding: 16,
              marginBottom: 12,
              borderRadius: 12,
              background: "#111",
              cursor: "pointer",
            }}
            onClick={() => onNavigate("proposal_sim", p)}
          >
            <h4>{p.title}</h4>
            <p style={{ opacity: 0.7 }}>{p.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}