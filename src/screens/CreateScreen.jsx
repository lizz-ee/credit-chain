import { useState } from 'react'
import VideoUpload from '../components/VideoUpload'

function CreateScreen() {
const [video, setVideo] = useState(null)
const [name, setName] = useState('')
const [ticker, setTicker] = useState('')
const [link, setLink] = useState('')

const handleVideoSelect = (file, videoUrl) => {
setVideo(videoUrl)
}

const handleVideoRemove = () => {
setVideo(null)
}

return (
<div className="screen create-screen">
{!video && (
<VideoUpload
onVideoSelect={handleVideoSelect}
onVideoRemove={handleVideoRemove}
/>
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