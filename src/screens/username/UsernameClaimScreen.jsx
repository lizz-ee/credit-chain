import { useState } from 'react'

export default function UsernameClaimScreen({ onClaim }) {
  const [value, setValue] = useState('')

  return (
    <div className="claim-screen">
      <h1>Claim Username</h1>

      <div className="glass-card">
        <input
          placeholder="@username"
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
        />

        <p className="muted tiny">
          Letters, numbers, underscores only.
        </p>

        <button
          className="primary-btn"
          disabled={!value || value.length < 3}
          onClick={() => onClaim(value)}
        >
          Claim (Simulation)
        </button>
      </div>

      <div className="tag">Permanent Identity</div>
    </div>
  )
}