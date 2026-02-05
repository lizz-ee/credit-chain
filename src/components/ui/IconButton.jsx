import { motion } from 'framer-motion'

function IconButton({
  icon,
  onClick,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) {
  const baseClass = 'icon-button'
  const variantClass = `icon-button--${variant}`
  const sizeClass = `icon-button--${size}`
  const classes = [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {icon}
    </motion.button>
  )
}

export default IconButton
