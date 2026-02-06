import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/feed.css";

// Safe fallback if your App doesn’t pass tokens yet
const FALLBACK_TOKENS = [
  {
    id: "coin1",
    name: "MEME1",
    ticker: "MEME1",
    mint: "So11111111111111111111111111111111111111112",
    marketCap: 1420000,
    videoUrl: "/mock/video1.mp4",
  },
  {
    id: "coin2",
    name: "MEME2",
    ticker: "MEME2",
    mint: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    marketCap: 480000,
    videoUrl: "/mock/video2.mp4",
  },
];

export default function Feed({
  tokens,
  activeTokenId,
  setActiveTokenId,
  favorites = [],
  onToggleFavorite,
  onOpenChart,
}) {
  const listRef = useRef(null);
  const itemRefs = useRef(new Map());
  const rafRef = useRef(null);

  const data = useMemo(() => {
    return Array.isArray(tokens) && tokens.length ? tokens : FALLBACK_TOKENS;
  }, [tokens]);

  const [activeId, setActiveId] = useState(() => {
    return activeTokenId || (data[0]?.id ?? null);
  });

  // keep external state in sync if your App is tracking active token
  useEffect(() => {
    if (activeTokenId && activeTokenId !== activeId) setActiveId(activeTokenId);
  }, [activeTokenId]); // eslint-disable-line

  useEffect(() => {
    if (typeof setActiveTokenId === "function" && activeId) setActiveTokenId(activeId);
  }, [activeId]); // eslint-disable-line

  // Autoplay ONLY the active tile video (huge polish + performance)
  const setVideoPlayback = (nextId) => {
    itemRefs.current.forEach((el, id) => {
      const video = el?.querySelector("video");
      if (!video) return;

      if (id === nextId) {
        // try to play, but don’t crash if blocked
        video.muted = true;
        const p = video.play?.();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        video.pause?.();
        video.currentTime = video.currentTime; // keeps frame for thumbnail-like freeze
      }
    });
  };

  // IntersectionObserver = “snap feels locked + correct active token”
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible item
        let best = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        const nextId = best?.target?.getAttribute("data-id");
        if (nextId && nextId !== activeId) setActiveId(nextId);
      },
      { root, threshold: [0.55, 0.75, 0.9] }
    );

    data.forEach((t) => {
      const el = itemRefs.current.get(t.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [data, activeId]);

  // When active changes, play/pause videos + hard-align snap (feels “locked”)
  useEffect(() => {
    if (!activeId) return;
    setVideoPlayback(activeId);

    const el = itemRefs.current.get(activeId);
    if (el && typeof el.scrollIntoView === "function") {
      // no smooth here — smooth can fight snap and feel “floaty”
      el.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [activeId]);

  // Scroll handler (lightweight) to reduce “in-between” jitter on trackpads/mice
  const onScroll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      // nothing heavy — observer does the real work
    });
  };

  return (
    <div className="feed-screen">
      <div className="feed-list" ref={listRef} onScroll={onScroll}>
        {data.map((coin) => {
          const isFav = favorites.includes(coin.id);
          return (
            <section
              key={coin.id}
              data-id={coin.id}
              ref={(el) => {
                if (el) itemRefs.current.set(coin.id, el);
              }}
              className="feed-item"
            >
              <video
                className="feed-video"
                src={coin.videoUrl}
                muted
                playsInline
                loop
                preload="metadata"
              />

              {/* Minimal overlay (TikTok weight) */}
              <div className="feed-overlay">
                <div className="feed-mc-pill">
                  MC: {formatMc(coin.marketCap)}
                </div>

                <button
                  className={`feed-fav ${isFav ? "on" : ""}`}
                  onClick={() => onToggleFavorite?.(coin.id)}
                  aria-label="Favorite"
                >
                  {isFav ? "★" : "☆"}
                </button>

                <div className="feed-actions">
                  <button className="feed-action" onClick={() => onOpenChart?.(coin.id)}>
                    Chart
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function formatMc(n) {
  const v = Number(n || 0);
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}