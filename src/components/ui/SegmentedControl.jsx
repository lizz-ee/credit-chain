import PropTypes from 'prop-types';
import styles from './SegmentedControl.module.css';

export default function SegmentedControl({ options, value, onChange, className }) {
  if (!options || options.length === 0) {
    return null;
  }

  const handleClick = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.segment} ${value === option.value ? styles.active : ''}`}
          onClick={() => handleClick(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

SegmentedControl.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
