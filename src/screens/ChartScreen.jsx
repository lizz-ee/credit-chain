
import { useMemo } from 'react'

export default function ChartScreen({ coin, onBack }) {
  const intensity = Math.min(1, (coin.marketCap || 0) / 10000000)

  const curveStyle = useMemo(() => ({
    strokeWidth: 2 + intensity * 2,
    filter: `drop-shadow(0 0 ${6 + intensity * 8}px rgba(0,229,255,${0.25 + intensity * 0.35}))`
  }), [intensity])

  return (
    <div className="chart-screen">
      <div className="chart-header">
        <button onClick={onBack}>Back</button>
        <div className="chart-title">{coin.name}</div>
      </div>

      <svg className="chart-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,80 C20,70 40,50 60,40 80,30 100,10"
          className="chart-curve"
          style={curveStyle}
        />
      </svg>

      <div className="chart-footer">
        <div className="mc-pill">MC ${(coin.marketCap || 0).toLocaleString()}</div>
      </div>
    </div>
  )
}
