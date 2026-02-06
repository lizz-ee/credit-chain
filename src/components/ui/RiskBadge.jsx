import PropTypes from 'prop-types';
import styles from './RiskBadge.module.css';

const RiskBadge = ({ level = 'medium', className = '' }) => {
  // Normalize level to handle case variations and defaults
  const normalizedLevel = ['low', 'medium', 'high'].includes(level?.toLowerCase())
    ? level.toLowerCase()
    : 'medium';

  const colorMap = {
    low: '#6BFF4F',    // acid green
    medium: '#E6FF3F', // toxic yellow
    high: '#FF4F4F'    // red
  };

  const labelMap = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk'
  };

  return (
    <span
      className={`${styles.badge} ${styles[normalizedLevel]} ${className}`}
      style={{ backgroundColor: colorMap[normalizedLevel] }}
    >
      {labelMap[normalizedLevel]}
    </span>
  );
};

RiskBadge.propTypes = {
  level: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  className: PropTypes.string,
};

export default RiskBadge;
