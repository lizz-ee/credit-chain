export function useGovernance(endTime) {
  const now = Date.now();
  const diff = endTime - now;

  if (diff <= 0) return 'Closed';

  const hrs = Math.floor(diff / (1000 * 60 * 60));
  return '${hrs}h remaining';
}