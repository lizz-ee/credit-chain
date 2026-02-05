import { useRef, useState } from 'react'

function VideoUpload({ onVideoSelect, onVideoRemove }) {
  const inputRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [videoFile, setVideoFile] = useState(null)

  const onPickVideo = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const videoUrl = URL.createObjectURL(file)
    setVideo(videoUrl)
    setVideoFile(file)

    if (onVideoSelect) {
      onVideoSelect(file, videoUrl)
    }
  }

  const handleRemoveVideo = () => {
    if (video) {
      URL.revokeObjectURL(video)
    }
    setVideo(null)
    setVideoFile(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    if (onVideoRemove) {
      onVideoRemove()
    }
  }

  return (
    <div className="video-upload">
      {!video && (
        <div className="video-upload-picker">
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
        <div className="video-upload-preview">
          <video src={video} controls className="video-preview" />
          <button onClick={handleRemoveVideo}>
            Remove Video
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoUpload
