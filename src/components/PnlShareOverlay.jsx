export default function PnlShareOverlay({
  visible,
  onClose,
  data,
  position = 'bottom',
}) {
  if (!visible) return null

  const {
    investedUsd,
    currentUsd,
    pnlUsd,
    pnlPct,
    tokenName,
  } = data

  const sign = pnlUsd >= 0 ? '+' : ''

  return (
    <div className={`pnl-share-overlay ${position}`}>
      <div className="pnl-card">
        <div className="pnl-title">{tokenName}</div>

        <div className="pnl-line">
          Invested: ${investedUsd.toFixed(2)}
        </div>

        <div className="pnl-line">
          Value: ${currentUsd.toFixed(2)}
        </div>

        <div className={`pnl-result ${pnlUsd >= 0 ? 'pos' : 'neg'}`}>
          {sign}${pnlUsd.toFixed(2)} ({sign}{pnlPct.toFixed(1)}%)
        </div>

        <div className="pnl-footer">
          via <strong>@Credit-Chain</strong>
        </div>

        <button className="pnl-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}