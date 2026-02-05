import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * TradeContext
 * Owns global trade state:
 * - which item is being traded
 * - opening / closing the slide-up trade panel
 *
 * NOTHING visual lives here.
 * This is pure state + intent.
 */

const TradeContext = createContext(null);

export function TradeProvider({ children }) {
  const [tradeItem, setTradeItem] = useState(null);

  /**
   * Open trade panel with a feed item
   * item shape expected:
   * {
   *   symbol: string,
   *   mc: string,
   *   ...anything else you want later
   * }
   */
  const openTrade = useCallback((item) => {
    setTradeItem(item);
  }, []);

  /**
   * Close trade panel
   */
  const closeTrade = useCallback(() => {
    setTradeItem(null);
  }, []);

  return (
    <TradeContext.Provider
      value={{
        tradeItem,
        openTrade,
        closeTrade,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

/**
 * Hook helper
 */
export function useTrade() {
  const ctx = useContext(TradeContext);
  if (!ctx) {
    throw new Error("useTrade must be used inside TradeProvider");
  }
  return ctx;
}