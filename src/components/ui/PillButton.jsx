/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
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

PillButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
}

export default PillButton
