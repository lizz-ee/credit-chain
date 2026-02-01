
export default function InviteBanner({ invitedBy, onDismiss }) {
  return (
    <div style={{padding:16, background:'#222'}}>
      <p>Invited by @{invitedBy}</p>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  )
}
