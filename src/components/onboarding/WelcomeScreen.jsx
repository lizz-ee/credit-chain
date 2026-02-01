
export default function WelcomeScreen({ onComplete }) {
  return (
    <div style={{padding:40}}>
      <h1>Welcome to Credit‑Chain</h1>
      <p>A trust‑based peer‑to‑peer lending network.</p>
      <button onClick={onComplete}>Continue</button>
    </div>
  )
}
