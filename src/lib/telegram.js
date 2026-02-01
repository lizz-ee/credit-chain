/**
 * Telegram WebApp context
 * SINGLE SOURCE OF TRUTH
 * DO NOT MUTATE AFTER READ
 */

let cachedContext = null

export function getTelegramContext() {
  if (!window.Telegram || !window.Telegram.WebApp) {
    return { blocked: true }
  }

  const tg = window.Telegram.WebApp
  tg.ready()
  tg.expand()

  const user = tg.initDataUnsafe?.user

  // 🔒 HARD BLOCKS
  if (!user) {
    return { blocked: true }
  }

  // Optional: account age check placeholder
  // (real enforcement later via backend if desired)

  return {
    blocked: false,
    user,
    startParam: tg.initDataUnsafe?.start_param || null,
    firstTime: !localStorage.getItem('cc_returning'),
    screen: tg.initDataUnsafe?.screen || null,
  }
}