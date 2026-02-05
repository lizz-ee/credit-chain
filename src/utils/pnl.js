/**
 * Pure PnL calculator
 * Used ONLY for simulation / UI display
 * Never touches real balances
 */

export function calculatePnl({
  creditsBought,
  creditsSold,
  entryMC,
  currentMC,
  creditPriceUsd,
}) {
  if (
    !creditsBought ||
    !entryMC ||
    !currentMC ||
    !creditPriceUsd
  ) {
    return {
      pnlUsd: 0,
      pnlPercent: 0,
      isPositive: true,
    }
  }

  const netCredits = creditsBought - creditsSold

  const entryValue =
    (creditsBought / entryMC) * creditPriceUsd * entryMC

  const currentValue =
    (netCredits / entryMC) * creditPriceUsd * currentMC

  const pnlUsd = currentValue - entryValue

  const pnlPercent =
    entryValue === 0 ? 0 : (pnlUsd / entryValue) * 100

  return {
    pnlUsd,
    pnlPercent,
    isPositive: pnlUsd >= 0,
  }
}

// 👇 ADD THIS
export default calculatePnl