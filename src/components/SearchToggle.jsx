import { useEffect, useRef, useState } from 'react'
import './searchToggle.css'

export default function SearchToggle({ items = [], onResults }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setQ('')
        onResults?.(items)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [items, onResults])

  useEffect(() => {
    if (!q) return onResults?.(items)
    const s = q.toLowerCase().trim()
    const res = items.filter(t =>
      (t.ticker || t.name || '').toLowerCase().includes(s) ||
      (t.address || '').toLowerCase().includes(s)
    )
    onResults?.(res)
  }, [q, items, onResults])

  return (
    <div className="cc-search" ref={ref}>
      {!open && (
        <button className="cc-search-btn" onClick={() => setOpen(true)}>
          🔍
        </button>
      )}
      {open && (
        <input
          autoFocus
          className="cc-search-input"
          placeholder="Search ticker or address"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              setOpen(false); setQ(''); onResults?.(items)
            }
          }}
        />
      )}
    </div>
  )
}
