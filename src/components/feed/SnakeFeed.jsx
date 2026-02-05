
import React, { useEffect, useState } from "react";
import "./snakeFeed.css";

// Web-only snake animation feed
export default function SnakeFeed({ items = [] }) {
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    // Simple deterministic ordering placeholder:
    // Newest first → snake pattern
    const rows = [];
    const perRow = 4;
    let dir = 1;

    for (let i = 0; i < items.length; i += perRow) {
      let slice = items.slice(i, i + perRow);
      if (dir === -1) slice = slice.reverse();
      rows.push(slice);
      dir *= -1;
    }

    setOrdered(rows.flat());
  }, [items]);

  return (
    <div className="snake-feed">
      {ordered.map((item, i) => (
        <div key={i} className="snake-card">
          <img src={item.thumbnail} alt={item.ticker} />
          <div className="meta">
            <strong>{item.ticker}</strong>
            <span>{item.mc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
