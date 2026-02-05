import { motion } from 'framer-motion'

function ProgressBar({
  value = 0,
  label = '',
  size = 'medium',
  className = '',
}) {
  const normalizedValue = Math.min(Math.max(value, 0), 100)

  const containerClasses = ['progress-bar', `progress-bar--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {label && <span className="progress-bar__label">{label}</span>}
      <div className="progress-bar__track">
        <motion.div
          className="progress-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${normalizedValue}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
