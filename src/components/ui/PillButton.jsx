import { motion } from 'framer-motion'

function PillButton({
  children,
  onClick,
  active = false,
  variant = 'primary',
  className = '',
}) {
  const baseClass = 'pill-button'
  const variantClass = `pill-button--${variant}`
  const activeClass = active ? 'pill-button--active' : ''
  const classes = [baseClass, variantClass, activeClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  )
}

export default PillButton
