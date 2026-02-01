export function formatMc(n) {
  if (!Number.isFinite(n)) return '--'

  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`

  return `${Math.round(n)}`
}
