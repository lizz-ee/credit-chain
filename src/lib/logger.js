// src/lib/logger.js
//
// Minimal logger: silent in prod by default.
//

const silent = Boolean(import.meta.env.PROD);

export const logger = {
  log: (...a) => { if (!silent) console.log(...a); },
  warn: (...a) => { if (!silent) console.warn(...a); },
  error: (...a) => { if (!silent) console.error(...a); },
};
