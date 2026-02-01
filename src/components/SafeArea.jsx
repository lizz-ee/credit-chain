// src/components/SafeArea.jsx
import React from "react";

/**
 * Optional wrapper to apply safe-area padding on iOS (Telegram WebApp).
 * Additive-only; use if needed around your root container.
 */
export default function SafeArea({ children, className = "", style = {} }) {
  return (
    <div className={`cc-safearea ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
