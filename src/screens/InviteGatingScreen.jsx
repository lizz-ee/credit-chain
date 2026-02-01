export default function InviteGatingScreen({ inviteCode, onAccept }) {
  return (
    <div className="screen invite-screen">
      <div className="glass-surface card">
        <h2>You were invited</h2>
        <p>
          Invite code:
          <strong style={{ marginLeft: 6 }}>{inviteCode}</strong>
        </p>

        <p>Accept to claim your username and join the network.</p>

        <button
          className="primary-button"
          onClick={onAccept}
        >
          Accept Invite
        </button>
      </div>
    </div>
  )
}