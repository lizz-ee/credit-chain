type Props = {
  symbol: string;
  name: string;
  marketCap: string;
  change: string;
};

export default function FeedCard({ symbol, name, marketCap, change }: Props) {
  return (
    <div className="feed-card">
      <div className="feed-header">
        <div>
          <strong>{symbol}</strong>
          <div className="sub">{name}</div>
        </div>
        <span className={change.startsWith("+") ? "up" : "down"}>{change}</span>
      </div>

      <div className="feed-footer">
        <span className="pill">{marketCap}</span>
        <div className="actions">
          <button>Chart</button>
          <button>Buy</button>
          <button>Sell</button>
        </div>
      </div>
    </div>
  );
}
