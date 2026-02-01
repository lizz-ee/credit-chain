import { useState } from 'react'
import '../styles/trimmer.css'

export default function VideoTrimmer({ videoSrc }) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(15)

  return (
    <div className="trimmer">
      <video src={videoSrc} controls />

      <div className="range">
        <label>Start</label>
        <input type="range" min="0" max="30" value={start} onChange={e => setStart(e.target.value)} />

        <label>End</label>
        <input type="range" min="1" max="30" value={end} onChange={e => setEnd(e.target.value)} />
      </div>

      <button className="primary-btn">Continue</button>
    </div>
  )
}