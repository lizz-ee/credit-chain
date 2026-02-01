// src/lib/prodGuard.js

export function prodGuard(fn) {
  if (import.meta.env.PROD) {
    try {
      return fn();
    } catch (_) {
      // swallow in prod
    }
  } else {
    return fn();
  }
}
