// src/components/DebugMenu.jsx
import React from "react";
import { listFlags } from "../lib/flags";

const KEY = "credchain.debug.flags";

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function saveOverrides(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {}
}

export function hasDebugFlag(flag) {
  try {
    const o = loadOverrides();
    return Boolean(o[flag]);
  } catch {
    return false;
  }
}

export default function DebugMenu() {
  if (import.meta.env.PROD) return null;

  const baseFlags = listFlags();
  const [overrides, setOverrides] = React.useState(loadOverrides());

  const toggle = (f) => {
    const next = { ...overrides, [f]: !overrides[f] };
    setOverrides(next);
    saveOverrides(next);
  };

  return (
    <div style={{
      position: "fixed",
      top: 8,
      left: 8,
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      fontSize: 12,
      padding: 8,
      borderRadius: 6,
      zIndex: 9999
    }}>
      <div><strong>Debug</strong></div>
      {baseFlags.length === 0 && <div>No flags</div>}
      {baseFlags.map((f) => (
        <label key={f} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={Boolean(overrides[f])}
            onChange={() => toggle(f)}
          />{" "}
          {f}
        </label>
      ))}
    </div>
  );
}
