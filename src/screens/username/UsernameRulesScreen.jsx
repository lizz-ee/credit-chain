export default function UsernameRulesScreen({ onAccept }) {
  return (
    <div className="rules-screen">
      <h1>Username Rules</h1>

      <div className="glass-card">
        <h3>What a Username Is</h3>
        <p className="muted">
          Your Credit-Chain username is a permanent identity anchor.
          It represents reputation across governance and peer-to-peer lending.
        </p>
      </div>

      <div className="glass-card">
        <h3>Rules (Immutable)</h3>
        <ul className="bullet-list">
          <li>Usernames are permanent once claimed</li>
          <li>Usernames cannot be transferred or sold</li>
          <li>Only one username per Telegram account</li>
          <li>Usernames gate governance and lending access</li>
        </ul>
      </div>

      <div className="glass-card">
        <h3>Important</h3>
        <p className="muted">
          Usernames are not financial assets.
          They cannot be revoked by governance, AI, or administrators.
        </p>
      </div>

      <button className="primary-btn" onClick={onAccept}>
        I Understand & Continue
      </button>

      <div className="tag">Simulation</div>
    </div>
  )
}