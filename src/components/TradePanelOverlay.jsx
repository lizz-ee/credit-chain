import { useState, useRef } from "react";
import "./TradePanelOverlay.css";

export default function TradePanelOverlay({ onClose }) {
  const panelRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0) {
      panelRef.current.style.transform = translateY(${diff}px);
    }
  };

  const onTouchEnd = () => {
    const diff = currentY.current - startY.current;

    if (diff > 120) {
      onClose();
    } else {
      panelRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <div className="trade-overlay">
      <div className="trade-backdrop" onClick={onClose} />

      <div
        ref={panelRef}
        className="trade-panel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="trade-handle" />

        <div className="trade-content">
          <div className="trade-mode">
            <button className="active">BUY</button>
            <button>SELL</button>
          </div>

          <div className="trade-amounts">
            <button>1</button>
            <button>5</button>
            <button>10</button>
            <button>25</button>
            <button>CUSTOM</button>
          </div>

          <button className="trade-cta">BUY CREDITS</button>

          <div className="trade-footnote">
            Credits price undiscovered • 1% fee
          </div>
        </div>
      </div>
    </div>
  );
}