export default function CreditsPriceRow({ creditsPrice }) {
  return (
    <div className="summary-row muted">
      <span className="label">Credits Price</span>
      <span className="value">
        {creditsPrice ? `$${creditsPrice.toFixed(2)} / CRED` : 'No price yet'}
      </span>
    </div>
  );
}
