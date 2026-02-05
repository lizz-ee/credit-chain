export default function HoldingsTabs({ tab, setTab }) {
  return (
    <div className="holdings-tabs">
      {['holdings','favorites','rewards'].map(t => (
        <button
          key={t}
          className={tab === t ? 'active' : ''}
          onClick={() => setTab(t)}
        >
          {t === 'holdings' ? 'Holdings' : t === 'favorites' ? 'Favorites' : 'Creator Rewards'}
        </button>
      ))}
    </div>
  );
}
