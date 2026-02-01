// src/lib/flags.js
//
// Lightweight feature flags (additive).
// Enable flags via VITE_FLAGS="flagA,flagB"
//

function parseFlags(raw) {
  if (!raw) return new Set();
  return new Set(
    String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

const FLAGS = parseFlags(import.meta.env.VITE_FLAGS);

export function hasFlag(flag) {
  return FLAGS.has(String(flag || "").trim());
}

export function listFlags() {
  return Array.from(FLAGS);
}
