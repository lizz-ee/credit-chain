// src/hooks/useTelegram.js
import { useEffect, useState } from 'react'
import { initTelegram } from '../telegram/initTelegram'

export const useTelegram = () => {
  const [telegram, setTelegram] = useState({
    isTelegram: false,
    user: null,
    startParam: null
  })

  useEffect(() => {
    const tgData = initTelegram()
    setTelegram(tgData)
  }, [])

  return telegram
}