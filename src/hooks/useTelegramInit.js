import { useEffect } from 'react'

export function useTelegramInit({
  setTelegramUser,
  setInviteCode,
  setInitialScreen
}) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const userId = params.get('userId')
    const username = params.get('username')
    const inviteCode = params.get('inviteCode')
    const firstTime = params.get('firstTime') === 'true'
    const screen = params.get('screen')

    if (userId) {
      setTelegramUser({ id: userId, username })
    }

    if (inviteCode) {
      setInviteCode(inviteCode)
      setInitialScreen('invite_gating')
      return
    }

    if (screen) {
      setInitialScreen(screen)
      return
    }

    if (firstTime) {
      setInitialScreen('onboarding')
    }
  }, [])
}