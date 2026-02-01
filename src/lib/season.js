// src/lib/season.js
//
// Additive helper for "season" / "run" identifiers.
// This does not mutate your governance architecture; it simply provides
// stable IDs you can use in storage keys, URLs, or display.
//
// Conventions:
// - seasonId: human-friendly (e.g. "S1", "S2")
// - runId: unique per start (e.g. "S1-1700000000000-abc123")
//

import { STORAGE_KEYS } from "./storageKeys";

function rand6() {
  try {
    return Math.random().toString(36).slice(2, 8);
  } catch {
    return "000000";
  }
}

export function getDefaultSeasonId() {
  return "S1";
}

export function getSeasonId() {
  try {
    const s = localStorage.getItem(STORAGE_KEYS.SEASON_ID);
    return s || getDefaultSeasonId();
  } catch {
    return getDefaultSeasonId();
  }
}

export function setSeasonId(seasonId) {
  const val = String(seasonId || "").trim() || getDefaultSeasonId();
  try {
    localStorage.setItem(STORAGE_KEYS.SEASON_ID, val);
  } catch {}
  return val;
}

export function newRunId(seasonId = getSeasonId()) {
  const sid = String(seasonId || "").trim() || getDefaultSeasonId();
  return `${sid}-${Date.now()}-${rand6()}`;
}

export function getRunId() {
  try {
    return localStorage.getItem(STORAGE_KEYS.RUN_ID) || null;
  } catch {
    return null;
  }
}

export function startNewRun(seasonId = getSeasonId()) {
  const runId = newRunId(seasonId);
  try {
    localStorage.setItem(STORAGE_KEYS.RUN_ID, runId);
  } catch {}
  return runId;
}

export function clearRun() {
  try {
    localStorage.removeItem(STORAGE_KEYS.RUN_ID);
  } catch {}
}
