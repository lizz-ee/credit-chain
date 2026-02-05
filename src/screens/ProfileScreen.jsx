import { useState } from 'react'
import '../styles/profile.css'

export default function ProfileScreen() {
const [tab, setTab] = useState('about') // about | fees | governance | build
const [feedback, setFeedback] = useState('')

const submitFeedback = () => {
if (!feedback.trim()) return
// simulation only — later routed to AI governance inbox
localStorage.setItem(
'cc_governance_feedback_last',
JSON.stringify({ text: feedback.trim(), at: Date.now() })
)
setFeedback('')
alert('Submitted (simulation)')
}

return (
<div className="profile-screen">
<div className="profile-header">
<div className="profile-title">Profile</div>
<div className="profile-sub muted">Identity • Governance • Transparency</div>
</div>

<div className="profile-tabs">
<button className={tab === 'about' ? 'active' : ''} onClick={() => setTab('about')}>
About
</button>
<button className={tab === 'fees' ? 'active' : ''} onClick={() => setTab('fees')}>
Fees
</button>
<button
className={tab === 'governance' ? 'active' : ''}
onClick={() => setTab('governance')}
>
Governance
</button>
<button className={tab === 'build' ? 'active' : ''} onClick={() => setTab('build')}>
Build
</button>
</div>

{/* ABOUT */}
{tab === 'about' && (
<div className="card">
<div className="card-title">What is Credit-Chain?</div>
<p className="p">
Credit-Chain supports multiple financial activities under one system — including
trading, peer-to-peer lending & borrowing, and native memecoins.
</p>

<p className="p">
Memecoins are entertainment and growth engines for the Insurance Pool. Lending and
borrowing are the core trust primitive.
</p>

<div className="note">
Credits do not have a price until the first buy happens.
</div>

<div className="list">
<div>• Identity-first (username-based)</div>
<div>• No custody promises</div>
<div>• Protocol guarantees rules, not outcomes</div>
</div>
</div>
)}

{/* FEES */}
{tab === 'fees' && (
<div className="card">
<div className="card-title">Fee Transparency</div>

<div className="fee-block">
<div className="fee-title">USDC ⇄ Credits</div>
<div className="fee-row">
<span>Conversion Fee</span>
<strong>3%</strong>
</div>
<div className="fee-sub">
• 90% → Insurance Pool (USDC)<br />
• 7% → Mining / incentives<br />
• 3% → Protocol (MASTERCONTROL)
</div>
</div>

<div className="fee-block">
<div className="fee-title">Memecoin Trading</div>
<div className="fee-row">
<span>Buy / Sell Fee</span>
<strong>1%</strong>
</div>
<div className="fee-sub">
• 30% → Insurance Pool<br />
• 50% → Creator rewards (paid in Credits)<br />
• 20% → Invite link rewards
</div>
</div>

<div className="fee-block">
<div className="fee-title">Lending</div>
<div className="fee-row">
<span>Borrower Fee</span>
<strong>0.5%</strong>
</div>
<div className="fee-sub">
• Paid by borrower<br />
• Sent to Insurance Pool
</div>
</div>

<div className="note">
All lending interest is fixed at 20%. Duration does not change interest owed.
</div>
</div>
)}

{/* GOVERNANCE */}
{tab === 'governance' && (
<div className="card">
<div className="card-title">Governance (Simulation)</div>

<div className="list">
<div>• AI may propose improvements</div>
<div>• Humans approve or reject</div>
<div>• One username = one vote</div>
<div>• Votes are final</div>
</div>

<div className="note">
No system change happens without human consent.
</div>

<div className="divider" />

<div className="card-title">Suggest Improvements</div>
<textarea
className="feedback"
placeholder="What should improve? What feels off?"
value={feedback}
onChange={(e) => setFeedback(e.target.value)}
/>
<button className="primary-btn" onClick={submitFeedback}>
Submit to Governance
</button>
</div>
)}

{/* BUILD */}
{tab === 'build' && (
<div className="card">
<div className="card-title">Build on Credit-Chain</div>

<p className="p">
Third-party apps may be built on Credit-Chain rails and appear in the app launcher
once approved by MASTERCONTROL.
</p>

<div className="list">
<div>• No external swaps</div>
<div>• No cross-chain liquidity</div>
<div>• Credit-native execution only</div>
</div>

<div className="note">
This keeps liquidity sovereign and prevents external drain vectors.
</div>
</div>
)}
</div>
)
}