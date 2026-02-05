import * as Client from '@storacha/client'
import { captureFrameAsDataUrl } from '../utils/video.js'

const MAX_SIZE = 100 * 1024 * 1024
const MAX_DURATION = 60
const TARGET_ASPECT_RATIO = 9 / 16
const ASPECT_RATIO_TOLERANCE = 0.1
const ALLOWED_TYPES = ['video/mp4', 'video/webm']

export async function validateVideo(file) {
  const errors = []

  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.push({ field: 'format', message: 'Only MP4 and WebM formats are supported' })
  }

  if (file.size > MAX_SIZE) {
    errors.push({ field: 'size', message: 'Video must be less than 100MB' })
  }

  const video = document.createElement('video')
  const url = URL.createObjectURL(file)

  try {
    await new Promise((resolve, reject) => {
      video.addEventListener('error', () => reject(new Error('Video load failed')))
      video.addEventListener('loadedmetadata', resolve)
      video.src = url
    })

    if (video.duration > MAX_DURATION) {
      errors.push({ field: 'duration', message: 'Video must be 60 seconds or less' })
    }

    const aspectRatio = video.videoWidth / video.videoHeight
    if (Math.abs(aspectRatio - TARGET_ASPECT_RATIO) > ASPECT_RATIO_TOLERANCE) {
      errors.push({ field: 'aspectRatio', message: 'Video must be 9:16 vertical format' })
    }
  } catch (e) {
    errors.push({ field: 'file', message: 'Failed to read video file' })
  } finally {
    URL.revokeObjectURL(url)
  }

  return errors
}

export async function generateThumbnail(videoFile) {
  const url = URL.createObjectURL(videoFile)
  try {
    const dataUrl = await captureFrameAsDataUrl(url, 1)
    URL.revokeObjectURL(url)

    const res = await fetch(dataUrl)
    const blob = await res.blob()
    return new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' })
  } catch (e) {
    URL.revokeObjectURL(url)
    throw new Error('Thumbnail generation failed')
  }
}

export async function uploadVideo(file, metadata = {}) {
  try {
    const client = await Client.create()
    const cid = await client.uploadFile(file)

    const thumbnailFile = await generateThumbnail(file)
    const thumbnailCid = await client.uploadFile(thumbnailFile)

    return {
      cid: cid.toString(),
      url: getVideoUrl(cid.toString()),
      thumbnailCid: thumbnailCid.toString(),
      thumbnailUrl: getVideoUrl(thumbnailCid.toString()),
      metadata
    }
  } catch (e) {
    throw new Error('Upload failed: ' + e.message)
  }
}

export function getVideoUrl(cid) {
  return `https://w3s.link/ipfs/${cid}`
}
