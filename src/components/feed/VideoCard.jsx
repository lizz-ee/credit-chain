export default function VideoCard({ coin }) {
  return (
    <div className="video-card">
      <video
        src={coin.video}
        autoPlay
        muted
        loop
        playsInline
        className="video"
      />

      <div className="video-overlay">
        <div className="coin-pill">{coin.symbol}</div>
        <div className="mc-pill">{coin.marketCap}</div>

        <div className="actions">
          <button className="buy">Buy</button>
          <button className="sell">Sell</button>
          <button className="chart">Chart</button>
        </div>
      </div>
    </div>
  )
}