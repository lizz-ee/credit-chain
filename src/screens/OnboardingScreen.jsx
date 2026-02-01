import { useEffect } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import { useMemo, useState } from 'react'

export default function OnboardingScreen({ onComplete }) {
  const slides = useMemo(
    () => [
      {
        title: 'Welcome to Credit-Chain',
        body: [
          'Invite-only access.',
          'Telegram login + phone number.',
          'Account must be 30+ days old.',
          'Wallet is always attached to that phone identity.',
        ],
        footer: 'Trust-first. Identity-first.',
      },
      {
        title: 'Fees — upfront',
        body: [
          'USDC → Credits conversion fee: 3%',
          'Credits → USDC conversion fee: 3%',
          'Memecoin trades: 1% (paid in Credits)',
          'Loans use USDC only.',
        ],
        footer: 'You should know this before funding your wallet.',
      },
      {
        title: 'Governance (Simulation Phase)',
        body: [
          'AI may propose improvements.',
          'Humans approve or reject.',
          'One username = one vote.',
          'Votes are final.',
          'Username holders can submit feedback for AI review.',
        ],
        footer: 'No changes happen without human consent.',
      },
    ],
    []
  )

  const [i, setI] = useState(0)
  const last = i === slides.length - 1

  const next = () => {
    if (last) onComplete?.()
    else setI((x) => Math.min(slides.length - 1, x + 1))
  }

  const back = () => setI((x) => Math.max(0, x - 1))

  return (
    <div className="onboard">
      <div className="onboard-card">
        <div className="dots">
          {slides.map((_, idx) => (
            <span key={idx} className={idx === i ? 'dot active' : 'dot'} />
          ))}
        </div>

        <h2>{slides[i].title}</h2>

        <div className="bullets">
          {slides[i].body.map((t, idx) => (
            <div key={idx} className="bullet">
              <span className="bullet-dot">•</span>
              <span>{t}</span>
            </div>
          ))}
        </div>

        <div className="footer">{slides[i].footer}</div>

        <div className="btns">
          <button className="ghost" onClick={back} disabled={i === 0}>
            Back
          </button>

          <button className="primary" onClick={next}>
            {last ? 'Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}