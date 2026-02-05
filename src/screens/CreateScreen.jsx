import { useState } from 'react'
import VideoUpload from '../components/VideoUpload'
import { validateVideo, uploadVideo } from '../services/videoService.js'

function CreateScreen() {
const [videoFile, setVideoFile] = useState(null)
const [videoPreview, setVideoPreview] = useState(null)
const [name, setName] = useState('')
const [ticker, setTicker] = useState('')
const [link, setLink] = useState('')
const [validationErrors, setValidationErrors] = useState([])
const [uploading, setUploading] = useState(false)
const [uploadProgress, setUploadProgress] = useState(0)
const [uploadResult, setUploadResult] = useState(null)
const [uploadError, setUploadError] = useState(null)

const handleVideoSelect = async (file, videoUrl) => {
setVideoFile(file)
setVideoPreview(videoUrl)
setValidationErrors([])
setUploadError(null)

// Validate the video
const errors = await validateVideo(file)
setValidationErrors(errors)
}

const handleVideoRemove = () => {
if (videoPreview) {
URL.revokeObjectURL(videoPreview)
}
setVideoFile(null)
setVideoPreview(null)
setValidationErrors([])
setUploadError(null)
setUploadResult(null)
}

const handleUploadVideo = async () => {
if (!videoFile || validationErrors.length > 0) return

setUploading(true)
setUploadProgress(0)
setUploadError(null)

try {
// Simulate progress (Storacha doesn't provide real-time progress)
const progressInterval = setInterval(() => {
setUploadProgress(prev => Math.min(prev + 10, 90))
}, 300)

const metadata = {
title: name || 'Untitled',
creator: 'Anonymous',
timestamp: Date.now(),
ticker: ticker || ''
}

const result = await uploadVideo(videoFile, metadata)
clearInterval(progressInterval)
setUploadProgress(100)
setUploadResult(result)
} catch (error) {
setUploadError(error.message)
} finally {
setUploading(false)
}
}

const handleRetry = () => {
setUploadError(null)
setUploadProgress(0)
handleUploadVideo()
}

return (
<div className="screen create-screen">
{!videoPreview && (
<VideoUpload
onVideoSelect={handleVideoSelect}
onVideoRemove={handleVideoRemove}
/>
)}

{videoPreview && !uploadResult && (
<>
<video src={videoPreview} controls className="create-preview" />

{validationErrors.length > 0 && (
<div className="validation-errors" style={{ color: 'red', marginBottom: '10px' }}>
{validationErrors.map((error, i) => (
<div key={i}>• {error.message}</div>
))}
</div>
)}

{uploading && (
<div className="upload-progress" style={{ marginBottom: '10px' }}>
<div style={{ marginBottom: '5px' }}>Uploading... {uploadProgress}%</div>
<div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px' }}>
<div style={{
width: `${uploadProgress}%`,
height: '100%',
background: '#4CAF50',
borderRadius: '2px',
transition: 'width 0.3s'
}} />
</div>
</div>
)}

{uploadError && (
<div className="upload-error" style={{ color: 'red', marginBottom: '10px' }}>
Error: {uploadError}
<button onClick={handleRetry} style={{ marginLeft: '10px' }}>Retry</button>
</div>
)}

{!uploadResult && (
<>
<input
placeholder="Token Name"
value={name}
onChange={(e) => setName(e.target.value)}
disabled={uploading}
/>

<input
placeholder="Ticker (MAX 6)"
maxLength={6}
value={ticker}
onChange={(e) => setTicker(e.target.value.toUpperCase())}
disabled={uploading}
/>

<input
placeholder="Website or X (optional)"
value={link}
onChange={(e) => setLink(e.target.value)}
disabled={uploading}
/>

<button
onClick={handleUploadVideo}
className="create-submit"
disabled={!name || !ticker || validationErrors.length > 0 || uploading}
>
{uploading ? 'Uploading...' : 'Upload & Launch'}
</button>

<button
onClick={handleVideoRemove}
style={{ marginTop: '10px' }}
disabled={uploading}
>
Remove Video
</button>

<div className="hint">
Creator cannot buy for 30 seconds
</div>
</>
)}
</>
)}

{uploadResult && (
<div className="upload-success">
<h3>✓ Video Uploaded Successfully!</h3>
<div style={{ marginBottom: '20px' }}>
<div><strong>Video CID:</strong> {uploadResult.cid}</div>
<div><strong>Thumbnail CID:</strong> {uploadResult.thumbnailCid}</div>
<div style={{ marginTop: '10px', wordBreak: 'break-all', fontSize: '12px' }}>
<strong>Video URL:</strong><br/>
<a href={uploadResult.url} target="_blank" rel="noopener noreferrer">
{uploadResult.url}
</a>
</div>
</div>

<img
src={uploadResult.thumbnailUrl}
alt="Video thumbnail"
style={{ width: '200px', marginBottom: '20px', borderRadius: '8px' }}
/>

<button
onClick={() => {
setUploadResult(null)
handleVideoRemove()
setName('')
setTicker('')
setLink('')
}}
className="create-submit"
>
Create Another
</button>
</div>
)}
</div>
)
}

export default CreateScreen