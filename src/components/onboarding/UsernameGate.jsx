
export default function UsernameGate({ onSuccess }) {
  return (
    <div style={{padding:40}}>
      <h2>Claim Username</h2>
      <button onClick={onSuccess}>Continue</button>
    </div>
  )
}
