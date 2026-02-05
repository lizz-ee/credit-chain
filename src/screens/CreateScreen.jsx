import { useRef, useState } from 'react'

function CreateScreen() {
const inputRef = useRef(null)
const [video, setVideo] = useState(null)
const [name, setName] = useState('')
const [ticker, setTicker] = useState('')
const [link, setLink] = useState('')

const onPickVideo = (e) => {
const file = e.target.files?.[0]
if (!file) return
setVideo(URL.createObjectURL(file))
}

return (
<div className="screen create-screen">
{!video && (
<div className="create-video-pick">
<input
ref={inputRef}
type="file"
accept="video/*"
hidden
onChange={onPickVideo}
/>
<button onClick={() => inputRef.current.click()}>
Upload / Record Video
</button>
<div className="hint">3–15 seconds • Video only</div>
</div>
)}

{video && (
<>
<video src={video} controls className="create-preview" />

<input
placeholder="Token Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>

<input
placeholder="Ticker (MAX 6)"
maxLength={6}
value={ticker}
onChange={(e) => setTicker(e.target.value.toUpperCase())}
/>

<input
placeholder="Website or X (optional)"
value={link}
onChange={(e) => setLink(e.target.value)}
/>

<button
className="create-submit"
disabled={!name || !ticker}
>
Launch Memecoin
</button>

<div className="hint">
Creator cannot buy for 30 seconds
</div>
</>
)}
</div>
)
}

export default CreateScreen