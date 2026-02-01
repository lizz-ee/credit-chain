import { useState } from 'react'
import './AppLauncher.css'

export default function AppLauncher({ apps = [], onSelect }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating blue button */}
      <button
        className="cc-launcher-button"
        onClick={() => setOpen(true)}
      >
        ●
      </button>

      {/* Overlay */}
      {open && (
        <div className="cc-launcher-overlay" onClick={() => setOpen(false)}>
          <div
            className="cc-launcher-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cc-launcher-title">Apps</div>

            {/* App list */}
            {apps.map((app) => (
              <button
                key={app.id}
                className="cc-launcher-item"
                onClick={() => {
                  setOpen(false)
                  onSelect(app.id)
                }}
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}