// src/lib/rateLimit.js

export function debounce(fn, wait = 150) {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function throttle(fn, wait = 150) {
  let last = 0;
  let t = null;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      fn(...args);
    } else if (!t) {
      t = setTimeout(() => {
        t = null;
        last = Date.now();
        fn(...args);
      }, remaining);
    }
  };
}
