export default function VideoCard({ video }) {
  return (
    <div className="video-card">
      <video
        src={video.src}
        autoPlay
        loop
        muted
        playsInline
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