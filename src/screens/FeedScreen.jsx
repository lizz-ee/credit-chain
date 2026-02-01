import { useState } from 'react'
import VideoCard from '../components/feed/VideoCard'

const MOCK_FEED = [
  {
    id: 1,
    symbol: '$DOGE',
    marketCap: '$4.2M',
    video: '/videos/sample1.mp4'
  },
  {
    id: 2,
    symbol: '$PEPE',
    marketCap: '$1.1M',
    video: '/videos/sample2.mp4'
  }
]

export default function FeedScreen() {
  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < MOCK_FEED.length - 1) setIndex(index + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <div className="feed-screen">
      <VideoCard coin={MOCK_FEED[index]} />

      <div className="feed-nav">
        <button onClick={prev}>↑</button>
        <button onClick={next}>↓</button>
      </div>
    </div>
  )
}