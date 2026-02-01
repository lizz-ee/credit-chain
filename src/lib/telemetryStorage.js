// src/lib/telemetryStorage.js
//
// Local event buffer for opt-in telemetry.
// Stored in localStorage so it survives reloads (dev inspection).
//

const KEY = "credchain.telemetry.v1";
const MAX = 200; // keep small, non-invasive

function safeParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

function safeStringify(obj) {
  try { return JSON.stringify(obj); } catch { return null; }
}

export function getLocalEvents() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = safeParse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearLocalEvents() {
  try { localStorage.removeItem(KEY); } catch {}
}

export function pushLocalEvent(evt) {
  try {
    const list = getLocalEvents();
    list.push(evt);
    const trimmed = list.slice(-MAX);
    const raw = safeStringify(trimmed);
    if (!raw) return;
    localStorage.setItem(KEY, raw);
  } catch {
    // ignore
  }
}
