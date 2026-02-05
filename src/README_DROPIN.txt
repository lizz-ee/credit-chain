DROP-IN INSTRUCTIONS

1. Copy src/components/TradePanel.jsx
2. Copy src/components/TradePanel.css

In App.jsx:
- add state for tradeOpen + tradeItem
- pass onBuy into <Feed />
- render <TradePanel open={tradeOpen} onClose={closeTrade} item={tradeItem} />

No other files required.