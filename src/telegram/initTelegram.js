// src/telegram/initTelegram.js
// Stateless Telegram WebApp init with double-init guards.

const FLAG = '__CREDCHAIN_TG_INIT__';

export function initTelegram() {
  if (typeof window === 'undefined') {
    return { isTelegram: false, user: null, startParam: null };
  }

  const tg = window.Telegram?.WebApp;
  if (!tg) {
    return { isTelegram: false, user: null, startParam: null };
  }

  // Guard against double init (React strict mode / remounts)
  if (!window[FLAG]) {
    window[FLAG] = true;

    try {
      tg.ready();
      tg.expand();
      // Lock gestures for mobile
      if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
    } catch (e) {
      console.warn('Telegram init failed:', e);
    }

    // Apply safe-area CSS vars (best-effort)
    try {
      const docEl = document.documentElement;
      // Telegram exposes safeAreaInset (newer clients); fall back to CSS env() in styles.
      const inset = tg.safeAreaInset || tg.safe_area_inset || null;
      if (inset && typeof inset === 'object') {
        if (inset.top != null) docEl.style.setProperty('--tg-safe-top', `${inset.top}px`);
        if (inset.bottom != null) docEl.style.setProperty('--tg-safe-bottom', `${inset.bottom}px`);
        if (inset.left != null) docEl.style.setProperty('--tg-safe-left', `${inset.left}px`);
        if (inset.right != null) docEl.style.setProperty('--tg-safe-right', `${inset.right}px`);
      }
    } catch (_) {}
  }

  return {
    isTelegram: true,
    user: tg.initDataUnsafe?.user || null,
    startParam: tg.initDataUnsafe?.start_param || null
  };
}
