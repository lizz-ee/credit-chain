import PropTypes from 'prop-types'
import styles from './CardContainer.module.css'

const CardContainer = ({ children, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default CardContainer
