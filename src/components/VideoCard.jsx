import { useState } from 'react'
import { getVideoUrl } from '../services/videoService.js'

export default function VideoCard({ video }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const videoSrc = video.cid ? getVideoUrl(video.cid) : video.src
  const thumbnailSrc = video.thumbnailUrl || video.thumbnail

  const handleLoadedData = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className="video-card">
      {loading && thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt="Video thumbnail"
          className="video-thumbnail"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}

      {loading && !thumbnailSrc && (
        <div
          className="video-loading"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '14px'
          }}
        >
          Loading...
        </div>
      )}

      {error && (
        <div
          className="video-error"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '14px',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          Failed to load video
        </div>
      )}

      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ opacity: loading || error ? 0 : 1 }}
      />

      <div className="video-overlay">
        <div className="token-pill">
          {video.ticker} · {video.cap}
        </div>

        <div className="actions">
          <button className="buy">Buy</button>
          <button className="sell">Sell</button>
          <button className="chart">Chart</button>
        </div>
      </div>
    </div>
  )
}