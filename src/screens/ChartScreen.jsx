import { useEffect } from "react";
import "./ChartScreen.css";

export default function ChartScreen({
  tokenSymbol = "CRED",
  onClose,
}) {
  useEffect(() => {
    // lock background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="chart-screen">
      {/* HEADER */}
      <div className="chart-header">
        <button className="chart-back" onClick={onClose}>
          ←
        </button>

        <div className="chart-title">
          <div className="chart-symbol">{tokenSymbol}</div>
          <div className="chart-sub">Market Cap</div>
        </div>
      </div>

      {/* CHART BODY */}
      <div className="chart-body">
        {/* Placeholder chart */}
        <div className="chart-placeholder">
          <div className="chart-line" />
          <div className="chart-glow" />
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="chart-footer">
        <div className="chart-stat">
          <span>MC</span>
          <strong>$1.42M</strong>
        </div>
        <div className="chart-stat">
          <span>24h</span>
          <strong className="up">+38%</strong>
        </div>
      </div>
    </div>
  );
}