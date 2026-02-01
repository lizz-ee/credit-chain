import { useState } from 'react'
import { formatMc } from '../utils/formatMc'

export default function HoldingsScreen({
  holdings = {},
  favorites = [],
  tokens = [],
  creditsPrice = 1.48,
  creditsSupply = 1_000_000,
}) {
  const [tab, setTab] = useState('holdings')

  const usdcBalance = holdings.usdc ?? 12450.32
  const creditsBalance = holdings.credits ?? 8420.17
  const lifetimePnl = holdings.pnl ?? 2140.11

  const portfolioValue =
    usdcBalance + creditsBalance * creditsPrice

  const creditsMc = creditsSupply * creditsPrice

  return (
    <div className="holdings-screen">
      {/* PORTFOLIO SUMMARY */}
      <div className="portfolio-card">
        <div className="label">Portfolio Value</div>
        <div className="value">
          ${portfolioValue.toLocaleString()}
        </div>

        <div className="pnl">
          Lifetime PnL{' '}
          <span className="green">
            +${lifetimePnl.toLocaleString()}
          </span>
        </div>
      </div>

      {/* BALANCES */}
      <div className="balances">
        <div>
          <span>USDC</span>
          <strong>${usdcBalance.toLocaleString()}</strong>
        </div>

        <div>
          <span>Credits</span>
          <strong>{creditsBalance.toLocaleString()} CRED</strong>
        </div>

        <div>
          <span>Credit Price</span>
          <strong>${creditsPrice} / CRED</strong>
        </div>

        <div>
          <span>Credit Market Cap</span>
          <strong>${formatMc(creditsMc)}</strong>
        </div>
      </div>

      {/* TOGGLES */}
      <div className="holdings-tabs">
        <button
          className={tab === 'holdings' ? 'active' : ''}
          onClick={() => setTab('holdings')}
        >
          Holdings
        </button>
        <button
          className={tab === 'favorites' ? 'active' : ''}
          onClick={() => setTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={tab === 'rewards' ? 'active' : ''}
          onClick={() => setTab('rewards')}
        >
          Creator Rewards
        </button>
      </div>

      {/* CONTENT */}
      {tab === 'holdings' && (
        <div className="list">
          {tokens.map((t) => (
            <div key={t.id} className="row">
              <span>{t.name}</span>
              <span>
                MC Entry → {formatMc(t.marketCap)}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === 'favorites' && (
        <div className="list">
          {favorites.length === 0 && (
            <p className="muted">No favorites yet</p>
          )}
          {favorites.map((id) => {
            const t = tokens.find((x) => x.id === id)
            if (!t) return null
            return (
              <div key={id} className="row">
                <span>{t.name}</span>
                <span>{formatMc(t.marketCap)}</span>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'rewards' && (
        <div className="rewards-box">
          <h3>Creator Rewards</h3>
          <p>
            Rewards are paid in <strong>Credits</strong>.
          </p>
          <p className="muted">
            Includes memecoin creator fees and invite-link volume
            rewards.
          </p>

          <div className="claim">
            <div>
              Available: <strong>1,420 CRED</strong>
            </div>
            <button className="claim-btn">
              Claim Rewards
            </button>
          </div>
        </div>
      )}
    </div>
  )
}