import { useState } from "react";
import "./holdings.css";

export default function Holdings() {
  const [tab, setTab] = useState("holdings"); // holdings | favorites | rewards

  // mock data (wire to real later)
  const creditsBalance = 8420.17;
  const creditsPrice = null; // undiscovered until first buy
  const creditsMC = null;

  const portfolioUSDC = 12450.32;
  const lifetimePnL = 2140.11;

  const items = [
    { id: "MEME1", mc: 1200000, pnl: 214 },
    { id: "MEME2", mc: 480000, pnl: -42 },
  ];

  return (
    <div className="holdings-screen">
      {/* SUMMARY */}
      <section className="credits-summary">
        <div className="metric">
          <div className="label">Portfolio Value (USDC)</div>
          <div className="value">${portfolioUSDC.toLocaleString()}</div>
        </div>

        <div className="row">
          <div className="metric small">
            <div className="label">USDC Balance</div>
            <div className="value">${portfolioUSDC.toLocaleString()}</div>
          </div>
          <div className="metric small">
            <div className="label">Credits Balance</div>
            <div className="value">{creditsBalance.toLocaleString()} CRED</div>
          </div>
        </div>

        <div className="row meta">
          <span>
            Credits Price:{" "}
            {creditsPrice ? $${creditsPrice} : <b className="warn">Undiscovered</b>}
          </span>
          <span>
            Credits MC:{" "}
            {creditsMC ? $${creditsMC.toLocaleString()} : "—"}
          </span>
        </div>

        <div className="pnl">
          Lifetime PnL{" "}
          <b className="pos">+${lifetimePnL.toLocaleString()}</b>
        </div>
      </section>

      {/* TABS */}
      <div className="holdings-tabs">
        {["holdings", "favorites", "rewards"].map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LIST */}
      <section className="holdings-list">
        {items.map((x) => (
          <div key={x.id} className="holding-card">
            <div className="left">
              <div className="ticker">{x.id}</div>
              <div className="sub">MC ${x.mc.toLocaleString()}</div>
            </div>
            <div className={`pnl ${x.pnl >= 0 ? "pos" : "neg"}`}>
              {x.pnl >= 0 ? "+" : ""}${Math.abs(x.pnl)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}