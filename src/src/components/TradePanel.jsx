import React, { useRef, useState } from "react";
import "./TradePanel.css";

export default function TradePanel({ open, onClose, item }) {
  const startY = useRef(0);
  const [dragY, setDragY] = useState(0);

  if (!open) return null;

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) setDragY(delta);
  };

  const onTouchEnd = () => {
    if (dragY > 120) onClose();
    setDragY(0);
  };

  return (
    <div className="trade-backdrop" onClick={onClose}>
      <div
        className="trade-panel"
        style={{ transform: `translateY(${dragY}px)` }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="trade-grabber" />
        <h3>Buy Credits</h3>
        {item && <div className="trade-meta">MC {item.mc}</div>}
        <button className="trade-cta">Confirm Buy</button>
      </div>
    </div>
  );
}