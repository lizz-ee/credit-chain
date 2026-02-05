export async function captureFrameAsDataUrl(videoUrl, atSeconds = 0) {
  return new Promise((resolve, reject) => {
    const v = document.createElement('video')
    v.crossOrigin = 'anonymous'
    v.src = videoUrl
    v.muted = true
    v.playsInline = true

    const cleanup = () => {
      v.removeAttribute('src')
      v.load()
    }

    v.addEventListener('error', () => {
      cleanup()
      reject(new Error('Video load failed'))
    })

    v.addEventListener('loadedmetadata', () => {
      const t = Math.min(Math.max(0, atSeconds), Math.max(0, v.duration - 0.05))
      v.currentTime = t
    })

    v.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = v.videoWidth || 640
        canvas.height = v.videoHeight || 360
        const ctx = canvas.getContext('2d')
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        cleanup()
        resolve(dataUrl)
      } catch (e) {
        cleanup()
        reject(e)
      }
    })
  })
}
