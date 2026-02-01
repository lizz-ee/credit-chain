import { useState } from 'react'

export default function UsernameClaimScreen({ onClaim }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    localStorage.setItem('credit_chain_username', username)
    onClaim(username)
  }

  return (
    <div className="screen username-screen">
      <div className="glass-surface card">
        <h2>Claim your username</h2>
        <p>This unlocks governance and lending access.</p>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourname"
          className="text-input"
        />

        {error && <p className="error-text">{error}</p>}

        <button className="primary-button" onClick={handleSubmit}>
          Claim Username
        </button>
      </div>
    </div>
  )
}