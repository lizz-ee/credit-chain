import { useState } from 'react'

export default function FeedSearch({ onSearch }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="feed-search">
      {!open && (
        <button
          className="icon-btn"
          onClick={() => setOpen(true)}
          aria-label="Search"
        >
          🔍
        </button>
      )}

      {open && (
        <input
          autoFocus
          className="feed-search-input"
          placeholder="Search ticker or address"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onSearch?.(e.target.value)
          }}
          onBlur={() => {
            if (!value) setOpen(false)
          }}
        />
      )}
    </div>
  )
}