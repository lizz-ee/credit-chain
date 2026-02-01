import { useRef, useState } from 'react'

export default function CreateScreen() {
  const [video, setVideo] = useState(null)
  const [name, setName] = useState('')
  const [ticker, setTicker] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [cooldown, setCooldown] = useState(false)

  const canSubmit =
    video &&
    name.length > 1 &&
    ticker.length >= 2 &&
    !cooldown

  const handleSubmit = () => {
    if (!canSubmit) return

    // SIMULATION ONLY
    setCooldown(true)

    alert('Memecoin created (simulation). Creator buy locked for 30s.')

    setTimeout(() => {
      setCooldown(false)
    }, 5 * 60 * 1000)
  }

  return (
    <div className="create-screen">
      <h2>Create Memecoin</h2>
      <p className="muted">
        Video-first. Free. Rate-limited.
      </p>

      {/* VIDEO INPUT */}
      <label className="upload-box">
        {video ? (
          <video
            src={URL.createObjectURL(video)}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <span>Tap to record or upload video</span>
        )}
        <input
          type="file"
          accept="video/*"
          capture="environment"
          hidden
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </label>

      {/* TEXT INPUTS */}
      <input
        placeholder="Token Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Ticker (MAX 6)"
        value={ticker}
        maxLength={6}
        onChange={(e) =>
          setTicker(e.target.value.toUpperCase())
        }
      />

      <input
        placeholder="Website (optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <input
        placeholder="X / Twitter (optional)"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />

      <button
        className="primary-btn"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        {cooldown ? 'Cooldown Active' : 'Create'}
      </button>

      <p className="fine-print">
        Creator buy disabled for 30 seconds.
      </p>
    </div>
  )
}