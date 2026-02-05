import './ui-components.css'

function PaintDivider({
  orientation = 'horizontal',
  accent = false,
  className = ''
}) {
  const classes = [
    'paint-divider',
    orientation,
    accent && 'accent',
    className
  ].filter(Boolean).join(' ')

  return <div className={classes} />
}

export default PaintDivider
