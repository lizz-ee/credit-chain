// src/lib/health.js
//
// Lightweight client health checks (additive).
//

export function getHealth() {
  return {
    ts: Date.now(),
    online: typeof navigator !== "undefined" ? navigator.onLine : true,
    memory: performance?.memory
      ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
        }
      : null,
  };
}
