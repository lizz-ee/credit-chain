
export default function FirstActionTutorial({ onComplete }) {
  return (
    <div style={{padding:40}}>
      <h3>First Action</h3>
      <p>Try receiving USDC or browsing governance.</p>
      <button onClick={onComplete}>Got it</button>
    </div>
  )
}
