import VideoCard from './VideoCard'

const MOCK_VIDEOS = [
  { id: 1, src: '/videos/demo1.mp4', ticker: '$DOGE', cap: '$1.2M' },
  { id: 2, src: '/videos/demo2.mp4', ticker: '$PEPE', cap: '$420K' },
]

export default function VideoFeed() {
  return (
    <div className="video-feed">
      {MOCK_VIDEOS.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}