import React from 'react';
export default function SnakeFeed({ items = [] }) {
  return (
    <div className="snake-feed">
      {items.map((it, i) => (
        <div key={i} className="snake-item">{it}</div>
      ))}
    </div>
  );
}
