import { useEffect, useMemo, useRef, useState } from 'react'
import TradeControls from '../components/TradeControls'
import PnlShareOverlay from '../components/PnlShareOverlay'
import { calculatePnL } from '../utils/pnl'
import { formatMc } from '../utils/formatMc'

export default function HomeScreen({
  tokens,
  activeTokenId,
  setActiveTokenId,
  favorites,
  onToggleFavorite,
  onOpenChart,
}) {
  const containerRef = useRef(null)
  const [showPnl, setShowPnl] = useState(false)

  const activeToken =
    tokens.find((t) => t.id === activeTokenId) || tokens[0]

  // MOCK POSITION (simulation only)
  const creditsBought = 100
  const creditsSold = 0
  const creditPriceUsd = 1.48

  const pnlData = useMemo(() => {
    if (!activeToken) return null
    return calculatePnL({
      creditsBought,
      creditsSold,
      entryMc: activeToken.marketCap,
      currentMc: activeToken.marketCap,
      creditPriceUsd,
    })
  }, [activeToken])

  useEffect(() => {
    const el = document.getElementById(`token-${activeTokenId}`)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [activeTokenId])

  return (
    <div className="feed-screen">
      <div className="feed-scroll" ref={containerRef}>
        {tokens.map((coin) => {
          const isFav = favorites.includes(coin.id)

          return (
            <div
              key={coin.id}
              id={`token-${coin.id}`}
              className="feed-item"
              onClick={() => setActiveTokenId(coin.id)}
            >
              <video
                src={coin.videoUrl}
                className="feed-video"
                autoPlay
                loop
                muted
                playsInline
              />

              <div className="feed-overlay">
                <div className="mc-pill">
                  {formatMc(coin.marketCap)}
                </div>

                <button
                  className="fav-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(coin.id)
                  }}
                >
                  {isFav ? '★' : '☆'}
                </button>

                <div className="feed-actions">
                  <button onClick={() => onOpenChart(coin.id)}>
                    Chart
                  </button>
                  <button onClick={() => setShowPnl(true)}>
                    PnL
                  </button>
                </div>

                <div className="trade-dock">
                  <TradeControls />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {pnlData && (
        <PnlShareOverlay
          visible={showPnl}
          onClose={() => setShowPnl(false)}
          position="bottom"
          data={{
            ...pnlData,
            tokenName: activeToken.name,
          }}
        />
      )}
    </div>
  )
}