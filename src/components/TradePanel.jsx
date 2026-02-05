import React, { useRef, useState, useEffect } from "react";
import "./TradePanel.css";

export default function TradePanel({ open, onClose }) {
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const onStart = (y) => {
    setDragging(true);
    startY.current = y;
    currentY.current = 0;
    sheetRef.current.style.transition = "none";
  };

  const onMove = (y) => {
    if (!dragging) return;
    const delta = y - startY.current;
    if (delta < 0) return;
    currentY.current = delta;
    sheetRef.current.style.transform = translateY(${delta}px);
  };

  const onEnd = () => {
    setDragging(false);
    sheetRef.current.style.transition = "transform 220ms ease";
    if (currentY.current > 120) {
      onClose();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  if (!open) return null;

  return (
    <div className="trade-backdrop" onClick={onClose}>
      <div
        className="trade-sheet"
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => onStart(e.clientY)}
        onMouseMove={(e) => onMove(e.clientY)}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={(e) => onStart(e.touches[0].clientY)}
        onTouchMove={(e) => onMove(e.touches[0].clientY)}
        onTouchEnd={onEnd}
      >
        <div className="trade-grabber" />

        <div className="trade-mode">
          <button className="active">Buy</button>
          <button>Sell</button>
        </div>

        <div className="trade-amounts">
          <button>$1</button>
          <button>$5</button>
          <button className="active">$10</button>
          <button>$25</button>
          <button>Custom</button>
        </div>

        <button className="trade-cta">Buy Credits</button>
        <div className="trade-footnote">20% borrower premium • 0.5% protocol fee</div>
      </div>
    </div>
  );
}