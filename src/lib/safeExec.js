// src/lib/safeExec.js
export function safeExec(fn, fallback = null) {
  try {
    return fn();
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn("safeExec caught:", e);
    }
    return fallback;
  }
}
