import { motion } from 'framer-motion'

export default function OnboardingScreen({ onContinue }) {
  return (
    <motion.div
      className="onboarding-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Welcome to Credit-Chain</h1>

      <p className="muted">
        A trust-native peer-to-peer lending network.
      </p>

      <div className="glass-card">
        <ul className="bullet-list">
          <li>Identity first</li>
          <li>AI proposes, humans decide</li>
          <li>No custodial balances</li>
          <li>Immutable guarantees</li>
        </ul>
      </div>

      <button className="primary-btn" onClick={onContinue}>
        Continue
      </button>
    </motion.div>
  )
}