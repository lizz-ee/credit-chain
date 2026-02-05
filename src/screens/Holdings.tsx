import "../styles/holdings.css";

export default function Holdings() {
  return (
    <div className="holdings">
      <section className="credits-card">
        <div className="label">Credits Balance</div>
        <div className="balance">8,420.17 CRED</div>
        <div className="price">Price: Undiscovered</div>
      </section>

      <nav className="holdings-tabs">
        <button className="active">Holdings</button>
        <button>Favorites</button>
        <button>Rewards</button>
      </nav>

      <div className="holding-card">
        <div className="row">
          <strong>$MEME</strong>
          <span className="pnl positive">+$214</span>
        </div>
        <div className="meta">MC $1.2M</div>
      </div>

      <div className="holding-card">
        <div className="row">
          <strong>$DOG</strong>
          <span className="pnl negative">-$42</span>
        </div>
        <div className="meta">MC $480K</div>
      </div>
    </div>
  );
}