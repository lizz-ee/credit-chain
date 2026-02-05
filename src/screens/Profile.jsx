import "./profile.css";

export default function Profile() {
  return (
    <div className="screen profile-screen">
      {/* IDENTITY */}
      <Section title="Identity">
        <Row label="Telegram" value="@username" />
        <Row label="Credit-Chain Username" value="Unclaimed" warning />
        <button className="profile-action">
          Claim Username
        </button>
      </Section>

      {/* GOVERNANCE */}
      <Section title="Governance">
        <Row
          label="Status"
          value="Simulation Phase"
          subtle
        />
        <Row
          label="Voting"
          value="1 Username = 1 Vote"
          subtle
        />
        <button className="profile-action secondary">
          Open Governance
        </button>
      </Section>

      {/* FEES */}
      <Section title="Fees & Transparency">
        <Fee label="USDC → Credits Conversion" value="3%" />
        <Fee label="Memecoin Trades" value="1%" />
        <Fee label="Loan Protocol Fee" value="0.5%" />
        <Fee label="Lender Premium" value="20%" />
      </Section>

      {/* META */}
      <Section title="System">
        <Row label="App Version" value="v1.0" subtle />
        <Row label="Network" value="Credit-Chain" subtle />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="profile-section">
      <div className="profile-title">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, warning, subtle }) {
  return (
    <div className="profile-row">
      <span className={`row-label ${subtle ? "subtle" : ""}`}>
        {label}
      </span>
      <span
        className={`row-value ${
          warning ? "warning" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Fee({ label, value }) {
  return (
    <div className="profile-fee">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

