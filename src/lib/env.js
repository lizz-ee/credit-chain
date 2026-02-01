// src/lib/env.js
//
// Environment guardrails (additive).
//

function str(v, def = "") {
  return typeof v === "string" && v.length ? v : def;
}

export const ENV = {
  MODE: str(import.meta.env.MODE, "development"),
  PROD: Boolean(import.meta.env.PROD),
  DEV: Boolean(import.meta.env.DEV),
  TELEMETRY: str(import.meta.env.VITE_TELEMETRY, "0") === "1",
  TELEMETRY_ENDPOINT: str(import.meta.env.VITE_TELEMETRY_ENDPOINT, ""),
};

export function assertEnv() {
  if (ENV.PROD && ENV.TELEMETRY && !ENV.TELEMETRY_ENDPOINT) {
    // allowed: local-only telemetry
  }
}
