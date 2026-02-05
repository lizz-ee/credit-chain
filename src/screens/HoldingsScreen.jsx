import { useMemo, useState } from 'react'

function HoldingsScreen({
tokens = [],
holdings = {},
favorites = [],
creditsBalance = 0,
usdcBalance = 0,
creditsPrice = null, // IMPORTANT: may be null if no buys yet
lifetimePnl = 0,
creatorRewards = [],
onOpenToken,
}) {
const [tab, setTab] = useState('holdings') // holdings | favorites | rewards

// ---- Derived Values ----
const creditsValueUsdc = useMemo(() => {
if (!creditsPrice) return 0
return creditsBalance * creditsPrice
}, [creditsBalance, creditsPrice])

const portfolioValue = useMemo(() => {
return usdcBalance + creditsValueUsdc
}, [usdcBalance, creditsValueUsdc])

const heldTokens = useMemo(() => {
return tokens.filter(t => holdings[t.id])
}, [tokens, holdings])

const favoritedTokens = useMemo(() => {
return tokens.filter(t => favorites.includes(t.id))
}, [tokens, favorites])

// ---- UI ----
return (
<div className="screen holdings-screen">
{/* TOP SUMMARY */}
<div className="holdings-summary">
<div className="summary-row">
<span className="label">Portfolio Value</span>
<span className="value">
${portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
</span>
</div>

<div className="summary-row">
<span className="label">Lifetime PnL</span>
<span className={`value ${lifetimePnl >= 0 ? 'positive' : 'negative'}`}>
{lifetimePnl >= 0 ? '+' : '-'}$
{Math.abs(lifetimePnl).toLocaleString(undefined, { maximumFractionDigits: 2 })}
</span>
</div>

<div className="divider" />

<div className="summary-row">
<span className="label">USDC Balance</span>
<span className="value">
${usdcBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
</span>
</div>

<div className="summary-row">
<span className="label">Credits Balance</span>
<span className="value">
{creditsBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} CRED
</span>
</div>

<div className="summary-row muted">
<span className="label">Credits Price</span>
<span className="value">
{creditsPrice
? `$${creditsPrice.toFixed(2)} / CRED`
: '— No price yet'}
</span>
</div>
</div>

{/* TAB TOGGLES */}
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

{/* TAB CONTENT */}
<div className="holdings-content">
{tab === 'holdings' && (
<>
{heldTokens.length === 0 && (
<div className="empty-state">No token holdings yet</div>
)}

{heldTokens.map(token => {
const position = holdings[token.id]
return (
<div
key={token.id}
className="token-row"
onClick={() => onOpenToken?.(token.id)}
>
<div className="token-left">
<div className="token-thumb" />
<div className="token-meta">
<div className="ticker">{token.name}</div>
<div className="sub">
Entry MC → Current MC
</div>
</div>
</div>

<div className="token-right">
<div className="value">
{position.amount.toLocaleString()} CRED
</div>
<div className="sub muted">
{creditsPrice
? `$${(position.amount * creditsPrice).toFixed(2)}`
: '—'}
</div>
</div>
</div>
)
})}
</>
)}

{tab === 'favorites' && (
<>
{favoritedTokens.length === 0 && (
<div className="empty-state">No favorited tokens</div>
)}

{favoritedTokens.map(token => (
<div
key={token.id}
className="token-row"
onClick={() => onOpenToken?.(token.id)}
>
<div className="token-left">
<div className="token-thumb" />
<div className="token-meta">
<div className="ticker">{token.name}</div>
<div className="sub muted">Favorited</div>
</div>
</div>
</div>
))}
</>
)}

{tab === 'rewards' && (
<>
{creatorRewards.length === 0 && (
<div className="empty-state">
No creator rewards yet
</div>
)}

{creatorRewards.map((r, idx) => (
<div key={idx} className="reward-row">
<div className="reward-left">
<div className="ticker">{r.source}</div>
<div className="sub muted">Credits earned</div>
</div>
<div className="reward-right">
{r.amount.toLocaleString()} CRED
</div>
</div>
))}
</>
)}
</div>
</div>
)
}

export default HoldingsScreen