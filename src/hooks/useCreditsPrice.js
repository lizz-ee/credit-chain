import { useMemo } from 'react';

export default function useCreditsPrice(creditsBalance, creditsPrice) {
  return useMemo(() => {
    if (!creditsPrice) return null;
    return creditsBalance * creditsPrice;
  }, [creditsBalance, creditsPrice]);
}
