import PropTypes from 'prop-types';
import styles from './NumberDisplay.module.css';

const NumberDisplay = ({ value, prefix = '', suffix = '', className = '' }) => {
  // Format the number value
  const formattedValue = typeof value === 'number'
    ? value.toLocaleString('en-US')
    : String(value);

  return (
    <div className={`${styles.container} ${className}`}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <span className={styles.value}>{formattedValue}</span>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </div>
  );
};

NumberDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
};

export default NumberDisplay;
