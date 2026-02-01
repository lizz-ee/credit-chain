export default function UsernameGateModal({ onClose, onClaim }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Claim Username</h2>

        <p className="muted">
          Your username is your on-chain identity
          and reputation anchor.
        </p>

        <input placeholder="@username" />

        <button className="primary-btn" onClick={onClaim}>
          Claim (Simulation)
        </button>

        <button className="secondary-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}