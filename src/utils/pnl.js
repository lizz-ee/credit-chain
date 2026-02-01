export function calculatePnL({
  creditsBought,
  creditsSold,
  entryMc,
  currentMc,
  creditPriceUsd,
}) {
  const investedUsd = creditsBought * creditPriceUsd
  const currentUsd = creditsSold
    ? creditsSold * creditPriceUsd
    : creditsBought * creditPriceUsd * (currentMc / entryMc)

  const pnlUsd = currentUsd - investedUsd

  return {
    investedUsd,
    currentUsd,
    pnlUsd,
    pnlPct: investedUsd > 0 ? (pnlUsd / investedUsd) * 100 : 0,
  }
}