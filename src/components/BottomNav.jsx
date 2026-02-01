import { motion } from 'framer-motion'

const tabs = [
  { id: 'feed', label: 'Feed' },
  { id: 'holdings', label: 'Holdings' },
  { id: 'create', label: 'Create' },
  { id: 'loans', label: 'Loans' },
  { id: 'profile', label: 'Profile' },
]

export default function BottomNav({ current, onChange }) {
  const haptic = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <div className="bottom-nav">
      {tabs.map(t => (
        <motion.button
          key={t.id}
          className={`nav-btn ${current === t.id ? 'active' : ''}`}
          onClick={() => {
            haptic()
            onChange(t.id)
          }}
          whileTap={{ scale: 0.95 }}
        >
          {current === t.id && (
            <motion.div
              layoutId="nav-pill"
              className="nav-pill"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span>{t.label}</span>
        </motion.button>
      ))}
    </div>
  )
}