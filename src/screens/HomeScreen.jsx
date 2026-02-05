import { useEffect, useMemo, useRef, useState } from 'react'
import TradeControls from '../components/TradeControls'
import PnlShareOverlay from '../components/PnlShareOverlay'
import calculatePnl from '../utils/pnl'
import { formatMc } from '../utils/formatMc'
import FeedSearch from '../components/FeedSearch'

export default function HomeScreen({
  tokens = [],
  activeTokenId,
  setActiveTokenId,
  favorites = [],
  onToggleFavorite,
  onOpenChart,
}) {
  const containerRef = useRef(null)
  const [showPnl, setShowPnl] = useState(false)
  const [search, setSearch] = useState('')

  const activeToken =
    tokens.find(t => t.id === activeTokenId) || tokens[0]

  // --- MOCK POSITION (simulation only) ---
  const creditsBought = 100
  const creditsSold = 0
  const creditPriceUsd = 1.48

  const pnlData = useMemo(() => {
    if (!activeToken) return null
    return calculatePnl({
      creditsBought,
      creditsSold,
      entryMc: activeToken.marketCap,
      currentMc: activeToken.marketCap,
      creditPriceUsd,
    })
  }, [activeToken])

  useEffect(() => {
    if (!activeTokenId) return
    const el = document.getElementById(`token-${activeTokenId}`)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [activeTokenId])

  const filteredTokens = useMemo(() => {
    if (!search) return tokens
    const q = search.toLowerCase()
    return tokens.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.ticker?.toLowerCase().includes(q) ||
      t.address?.toLowerCase().includes(q)
    )
  }, [tokens, search])

  return (
    <div className="feed-screen">
      {/* SEARCH HEADER */}
      <FeedSearch value={search} onChange={setSearch} />

      {/* FEED */}
      <div className="feed-scroll" ref={containerRef}>
        {filteredTokens.map((coin) => {
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
                loop
                muted
                playsInline
                preload="metadata"
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
              </div>

              <div className="trade-dock">
                <TradeControls />
              </div>
            </div>
          )
        })}
      </div>

      {/* PNL OVERLAY */}
      {pnlData && (
        <PnlShareOverlay
          visible={showPnl}
          onClose={() => setShowPnl(false)}
          position="bottom"
          data={{
            ...pnlData,
            tokenName: activeToken?.name,
          }}
        />
      )}
    </div>
  )
}