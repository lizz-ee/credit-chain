// src/lib/telemetry.js
//
// Opt-in client telemetry (no backend required).
// - Disabled unless VITE_TELEMETRY=1
// - If VITE_TELEMETRY_ENDPOINT is set, POSTs events there
// - Otherwise stores locally via telemetryStorage
//

import { pushLocalEvent } from "./telemetryStorage";

const ENABLED = String(import.meta.env.VITE_TELEMETRY || "").trim() === "1";
const ENDPOINT = String(import.meta.env.VITE_TELEMETRY_ENDPOINT || "").trim();

function safeNow() {
  try { return Date.now(); } catch { return 0; }
}

function safeJson(obj) {
  try { return JSON.stringify(obj); } catch { return null; }
}

export function telemetryEnabled() {
  return ENABLED;
}

export async function track(eventName, payload = {}) {
  if (!ENABLED) return;

  const evt = {
    v: 1,
    name: String(eventName || "event"),
    ts: safeNow(),
    payload: payload && typeof payload === "object" ? payload : { value: payload },
  };

  // If no endpoint: local-only storage
  if (!ENDPOINT) {
    pushLocalEvent(evt);
    return;
  }

  // Best-effort network send (never throws)
  try {
    const body = safeJson(evt);
    if (!body) {
      pushLocalEvent({ ...evt, name: "telemetry_json_error" });
      return;
    }

    // Prefer sendBeacon when available
    if (navigator?.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon(ENDPOINT, blob);
      if (!ok) pushLocalEvent({ ...evt, name: "telemetry_beacon_failed" });
      return;
    }

    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch (err) {
    // Network failures fall back to local storage
    pushLocalEvent({ ...evt, name: "telemetry_send_failed", payload: { error: String(err) } });
  }
}

// Convenience helpers (optional)
export function trackScreen(screenName, extra = {}) {
  return track("screen_view", { screen: String(screenName || "unknown"), ...extra });
}

export function trackAction(actionName, extra = {}) {
  return track("action", { action: String(actionName || "unknown"), ...extra });
}
