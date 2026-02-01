
export default function WalletReadyScreen({ onComplete }) {
  return (
    <div style={{padding:40}}>
      <h2>Wallet Ready</h2>
      <p>Your wallet is ready to receive funds.</p>
      <button onClick={onComplete}>Enter App</button>
    </div>
  )
}
