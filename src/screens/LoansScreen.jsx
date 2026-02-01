import BorrowRequestCard from './loans/BorrowRequestCard'
import LendBrowseCard from './loans/LendBrowseCard'
import { formatMc } from '../utils/formatMc'

export default function LoansScreen({
  hasUsername,
  creditChainMC,
  insurancePool,
  onClaimUsername,
}) {
  if (!hasUsername) {
    return (
      <div className="screen loans-screen">
        <h2>Loans</h2>
        <p>
          Peer-to-peer lending requires a Credit-Chain username.
        </p>
        <button className="primary-btn" onClick={onClaimUsername}>
          Claim Username
        </button>
      </div>
    )
  }

  return (
    <div className="screen loans-screen">
      <h2>Loans</h2>

      {/* INTRO */}
      <section className="card">
        <h3>How It Works</h3>
        <ul>
          <li>Fixed 20% borrower premium</li>
          <li>0.5% protocol fee → Insurance Pool</li>
          <li>Lenders are paid on due date or early repayment</li>
          <li>Loans may default — rules are enforced, not outcomes</li>
        </ul>
      </section>

      {/* BORROW */}
      <section className="card">
        <h3>Borrow</h3>

        <label>Amount Requested (USDC)</label>
        <input type="number" placeholder="e.g. 1,000" />

        <label>Repayment Period</label>
        <select>
          <option>30 days</option>
          <option>90 days</option>
          <option>180 days</option>
          <option>360 days</option>
        </select>

        <p className="muted">
          Interest is always 20% regardless of duration.
        </p>

        <button className="primary-btn">
          Request Loan (Simulation)
        </button>
      </section>

      {/* LEND */}
      <section className="card">
        <h3>Lend</h3>

        <label>Amount to Lend (USDC)</label>
        <input type="number" placeholder="e.g. 50,000" />

        <label>Borrower Tier Preference</label>
        <select>
          <option>Any Tier</option>
          <option>Tier 2+</option>
          <option>Tier 4+</option>
          <option>Tier 6+</option>
        </select>

        <label>Accepted Durations</label>
        <select>
          <option>30–90 days</option>
          <option>30–180 days</option>
          <option>Any duration</option>
        </select>

        <p className="muted">
          Funds are locked for up to 24 hours to find matches.
        </p>

        <button className="primary-btn">
          Provide Liquidity (Simulation)
        </button>
      </section>

      {/* TIERS */}
      <section className="card">
        <h3>Borrowing Tiers</h3>

        <p>
          Tiers unlock based on Credit-Chain market cap and reputation.
        </p>

        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Network MC</th>
              <th>Max Borrow</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>$250K</td><td>$250</td></tr>
            <tr><td>2</td><td>$1M</td><td>$1,000</td></tr>
            <tr><td>3</td><td>$10M</td><td>$3,000</td></tr>
            <tr><td>4</td><td>$25M</td><td>$10,000</td></tr>
            <tr><td>5</td><td>$100M</td><td>$25,000</td></tr>
            <tr><td>6</td><td>$250M</td><td>$100,000</td></tr>
            <tr><td>7</td><td>$1B</td><td>$1,000,000</td></tr>
          </tbody>
        </table>

        <p className="muted">
          Tier completion improves reputation but is not mandatory.
        </p>
      </section>

      {/* INSURANCE POOL */}
      <section className="card">
        <h3>Insurance Pool</h3>
        <p>
          Pool Balance: <strong>${insurancePool.toLocaleString()}</strong>
        </p>
        <p>
          Max single loan: <strong>20%</strong> of pool
        </p>
        <p className="muted">
          Pool locks lender payouts before loans execute.
        </p>
      </section>
    </div>
  )
}