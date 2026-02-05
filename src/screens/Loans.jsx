import { useState } from "react";
import "./loans.css";

export default function Loans() {
  const [mode, setMode] = useState("borrow");

  return (
    <div className="screen loans-screen">
      <div className="loans-tabs">
        <button
          className={`loans-tab ${mode === "borrow" ? "active" : ""}`}
          onClick={() => setMode("borrow")}
        >
          Borrow
        </button>
        <button
          className={`loans-tab ${mode === "lend" ? "active" : ""}`}
          onClick={() => setMode("lend")}
        >
          Lend
        </button>
      </div>

      <div className="insurance-card">
        <div className="insurance-label">Insurance Pool</div>
        <div className="insurance-value">$7,500 USDC</div>
        <div className="insurance-note">
          Lenders are always paid. Rules are enforced, not outcomes.
        </div>
      </div>

      {mode === "borrow" ? <BorrowView /> : <LendView />}
    </div>
  );
}

function BorrowView() {
  return (
    <div className="loan-section">
      <Tier
        name="Tier 1 — Network Early"
        max="$250"
        active
      />
      <Tier
        name="Tier 2 — Network Growing"
        max="$1,000"
      />
      <Tier
        name="Tier 3 — Network Established"
        max="$3,000"
      />

      <button className="loan-cta">
        Request Loan
      </button>
    </div>
  );
}

function LendView() {
  return (
    <div className="loan-section">
      <div className="lend-info">
        Fixed 20% borrower premium.<br />
        0.5% protocol fee to Insurance Pool.<br />
        Payout guaranteed by pool lock.
      </div>

      <button className="loan-cta">
        Provide Liquidity
      </button>
    </div>
  );
}

function Tier({ name, max, active }) {
  return (
    <div className={`tier-card ${active ? "active" : ""}`}>
      <div className="tier-name">{name}</div>
      <div className="tier-max">Max: {max}</div>
    </div>
  );
}

/* ---------- Data ---------- */

const tiers = [
  { tier: 1, name: 'Network Early', mc: '$250K', max: '250' },
  { tier: 2, name: 'Network Growing', mc: '$1M', max: '1,000' },
  { tier: 3, name: 'Network Established', mc: '$10M', max: '3,000' },
  { tier: 4, name: 'Network Trusted', mc: '$25M', max: '10,000' },
  { tier: 5, name: 'Network Proven', mc: '$100M', max: '25,000' },
  { tier: 6, name: 'Network Scaled', mc: '$250M', max: '100,000' },
  { tier: 7, name: 'Network Global', mc: '$1B', max: '1,000,000' },
]

