import { useEffect, useMemo, useState } from 'react'
import { readJson, writeJson } from '../utils/storage'

const DEFAULT_BUY = [1, 5, 10, 25]
const DEFAULT_SELL = [25, 50, 75, 100] // percent of position (still credits)

function TradeControls() {
  const [mode, setMode] = useState('buy') // 'buy' | 'sell'
  const [editing, setEditing] = useState(false)

  const [buyPresets, setBuyPresets] = useState(() => readJson('cc_quick_buy', DEFAULT_BUY))
  const [sellPresets, setSellPresets] = useState(() => readJson('cc_quick_sell', DEFAULT_SELL))

  const presets = useMemo(() => (mode === 'buy' ? buyPresets : sellPresets), [mode, buyPresets, sellPresets])
  const [manual, setManual] = useState('')

  useEffect(() => writeJson('cc_quick_buy', buyPresets), [buyPresets])
  useEffect(() => writeJson('cc_quick_sell', sellPresets), [sellPresets])

  const setPresetValue = (idx, value) => {
    const v = Number(value)
    if (!Number.isFinite(v) || v <= 0) return
    if (mode === 'buy') {
      setBuyPresets((p) => p.map((x, i) => (i === idx ? v : x)))
    } else {
      const capped = Math.min(100, v)
      setSellPresets((p) => p.map((x, i) => (i === idx ? capped : x)))
    }
  }

  return (
    <div className="trade-controls">
      <div className="trade-tabs">
        <button className={mode === 'buy' ? 'active' : ''} onClick={() => setMode('buy')}>
          Buy
        </button>
        <button className={mode === 'sell' ? 'active' : ''} onClick={() => setMode('sell')}>
          Sell
        </button>
        <button className="edit-btn" onClick={() => setEditing((e) => !e)}>
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="preset-row">
        {presets.map((p, idx) => (
          <div key={idx} className="preset-pill">
            {editing ? (
              <input
                type="number"
                value={p}
                onChange={(e) => setPresetValue(idx, e.target.value)}
              />
            ) : (
              <button onClick={() => setManual(String(p))}>
                {mode === 'buy' ? p : `${p}%`}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="manual-row">
        <input
          type="number"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder={mode === 'buy' ? 'Custom (Credits)' : 'Custom %'}
        />
        <button className="confirm-btn">
          {mode === 'buy' ? 'Buy (Credits)' : 'Sell (Credits)'}
        </button>
      </div>

      <div className="fee-hint muted">
        1% transactional fee applies.
      </div>
    </div>
  )
}

export default TradeControls