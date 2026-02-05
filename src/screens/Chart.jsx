import "./chart.css";

export default function Chart({ onClose }) {
  return (
    <div className="chart-screen">
      {/* HEADER */}
      <div className="chart-header">
        <button className="chart-back" onClick={onClose}>←</button>
        <div className="chart-title">
          <div className="ticker">TICKER</div>
          <div className="name">Token Name</div>
        </div>
      </div>

      {/* CHART BODY */}
      <div className="chart-body">
        <div className="curve">
          {/* placeholder curve */}
          <svg viewBox="0 0 300 120" preserveAspectRatio="none">
            <path
              d="M0,90 C40,60 80,65 120,45 160,25 200,30 240,15 270,8 290,6 300,4"
              fill="none"
              stroke="#6BFF4F"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="chart-stats">
          <div className="stat">
            <div className="label">Market Cap</div>
            <div className="value">$1.42M</div>
          </div>
          <div className="stat">
            <div className="label">Volume</div>
            <div className="value">$214K</div>
          </div>
        </div>
      </div>
    </div>
  );
}