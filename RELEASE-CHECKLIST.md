# Credit-Chain Release Checklist (v1)

## 1) Local clean install
- rm -rf node_modules
- npm install
- npm run dev

## 2) Core flow
- Username gate resolves
- Onboarding completes
- Governance simulation loads
- Proposal -> detail works
- Off-World Contract view works

## 3) Reload safety
- Hard refresh once
- No blank screen / infinite loader

## 4) Telegram WebApp pass
- Launch via @credchainbot
- WebApp opens clean
- Username available
- Safe area looks correct (iOS)
- Back button behavior acceptable
- Full flow passes

## 5) Production build
- npm run build
- npm run preview
- Repeat Core flow

## 6) Artifacts to save
- Commit/tag name (e.g., v1.0.0)
- Deployment URL
- Telegram bot username and WebApp URL
