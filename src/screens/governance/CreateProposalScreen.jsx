import { useState } from 'react'

export default function CreateProposalScreen({ hasUsername, onRequireUsername, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [risk, setRisk] = useState('medium')

  if (!hasUsername) {
    return (
      <div className="centered-screen">
        <h2>Username Required</h2>
        <p>You must claim a username to submit governance proposals.</p>
        <button className="primary-btn" onClick={onRequireUsername}>
          Claim Username
        </button>
      </div>
    )
  }

  return (
    <div className="create-proposal-screen">
      <h1>Create Governance Proposal</h1>

      <div className="glass-card">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short, descriptive title"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is being proposed and why?"
        />

        <label>Risk Level</label>
        <select value={risk} onChange={(e) => setRisk(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          className="primary-btn"
          disabled={!title || !description}
          onClick={() =>
            onSubmit({
              title,
              description,
              risk,
            })
          }
        >
          Submit Proposal (Simulation)
        </button>

        <p className="tiny muted">
          Submission does not enact changes. Human voting required.
        </p>
      </div>

      <div className="tag">Governance Simulation</div>
    </div>
  )
}