import { useEffect, useRef, useState } from 'react'

function FeedScreen({
tokens = [],
onOpenChart,
onToggleFavorite,
favorites = [],
}) {
const containerRef = useRef(null)
const [mode, setMode] = useState('new') // new | senders | mc

useEffect(() => {
const el = containerRef.current
if (!el) return
el.scrollTop = 0
}, [mode])

return (
<div className="screen feed-screen">
{/* TOP TOGGLE */}
<div className="feed-toggle">
<button className={mode === 'new' ? 'active' : ''} onClick={() => setMode('new')}>
New
</button>
<button className={mode === 'senders' ? 'active' : ''} onClick={() => setMode('senders')}>
Senders
</button>
<button className={mode === 'mc' ? 'active' : ''} onClick={() => setMode('mc')}>
MC
</button>
</div>

{/* FEED */}
<div className="feed-scroll" ref={containerRef}>
{tokens.map(token => {
const isFav = favorites.includes(token.id)

return (
<div key={token.id} className="feed-item">
{/* VIDEO */}
<video
src={token.videoUrl}
muted
autoPlay
loop
playsInline
className="feed-video"
onClick={() => onOpenChart(token.id)}
/>

{/* OVERLAY */}
<div className="feed-overlay">
<div className="mc-pill">
MC {token.marketCap ? `$${token.marketCap.toLocaleString()}` : '—'}
</div>

<button
className="fav-btn"
onClick={(e) => {
e.stopPropagation()
onToggleFavorite(token.id)
}}
>
{isFav ? '★' : '☆'}
</button>
</div>
</div>
)
})}
</div>
</div>
)
}

export default FeedScreen