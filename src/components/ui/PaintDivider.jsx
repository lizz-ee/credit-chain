/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './PaintDivider.module.css'

const PaintDivider = ({ className = '' }) => {
  return (
    <motion.div
      className={`${styles.divider} ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className={styles.drip}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '100%', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

PaintDivider.propTypes = {
  className: PropTypes.string,
}

export default PaintDivider
