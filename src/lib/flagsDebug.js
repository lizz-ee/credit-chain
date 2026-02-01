// src/lib/flagsDebug.js
//
// Optional helper to merge runtime debug overrides with env flags.
//

import { hasFlag } from "./flags";

const KEY = "credchain.debug.flags";

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function hasAnyFlag(flag) {
  const base = hasFlag(flag);
  try {
    const o = loadOverrides();
    return base || Boolean(o[flag]);
  } catch {
    return base;
  }
}
