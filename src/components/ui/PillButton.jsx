import { motion } from 'framer-motion'
import styles from './PillButton.module.css'

function PillButton({
  children,
  onClick,
  active = false,
  variant = 'primary',
  className = '',
}) {
  const classes = [
    styles.button,
    styles[variant],
    active ? styles.active : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  )
}

export default PillButton
