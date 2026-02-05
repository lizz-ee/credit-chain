function Slider({
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  onChange,
  className = '',
  ...props
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(Number(e.target.value))
    }
  }

  const containerClasses = ['slider-container', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleChange}
        className="slider"
        {...props}
      />
    </div>
  )
}

export default Slider
