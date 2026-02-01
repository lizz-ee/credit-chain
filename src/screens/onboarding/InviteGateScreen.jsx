export default function InviteGateScreen({ inviteCode, onContinue }) {
  return (
    <div className="invite-gate-screen">
      <h1>Invite Access</h1>

      <div className="glass-card">
        {inviteCode ? (
          <>
            <p>
              You were invited to Credit-Chain.
            </p>
            <p className="mono tiny">
              Invite Code: {inviteCode}
            </p>
          </>
        ) : (
          <p className="muted">
            Access to Credit-Chain is invite-only.
          </p>
        )}
      </div>

      <button className="primary-btn" onClick={onContinue}>
        Continue
      </button>

      <div className="tag">Invite Gated</div>
    </div>
  )
}