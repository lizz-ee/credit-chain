// src/components/TelemetryViewer.jsx
import React from "react";
import { getLocalEvents, clearLocalEvents } from "../lib/telemetryStorage";

export default function TelemetryViewer() {
  if (import.meta.env.PROD) return null;

  const [events, setEvents] = React.useState([]);

  const refresh = () => {
    setEvents(getLocalEvents());
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 8,
      left: 8,
      maxWidth: 360,
      maxHeight: 240,
      overflow: "auto",
      background: "rgba(20,20,20,0.85)",
      color: "#0f0",
      fontSize: 11,
      padding: 8,
      borderRadius: 6,
      zIndex: 9999
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Telemetry</strong>
        <button onClick={() => { clearLocalEvents(); refresh(); }}>
          clear
        </button>
      </div>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(events.slice(-20), null, 2)}
      </pre>
    </div>
  );
}
