// src/lib/id.js

export function uid(prefix = "id") {
  const p = String(prefix || "id");
  const r = Math.random().toString(36).slice(2, 10);
  return `${p}_${Date.now()}_${r}`;
}
