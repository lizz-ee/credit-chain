// src/components/StatusPanel.jsx
import React from "react";
import { getHealth } from "../lib/health";

export default function StatusPanel() {
  const [health, setHealth] = React.useState(getHealth());

  React.useEffect(() => {
    const t = setInterval(() => setHealth(getHealth()), 2000);
    return () => clearInterval(t);
  }, []);

  if (import.meta.env.PROD) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 8,
      right: 8,
      padding: 8,
      fontSize: 12,
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      borderRadius: 6,
      zIndex: 9999
    }}>
      <div><strong>Status</strong></div>
      <div>Online: {String(health.online)}</div>
      <div>TS: {health.ts}</div>
    </div>
  );
}
