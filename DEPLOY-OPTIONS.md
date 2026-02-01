# Deploy Options (Static)

Your Vite build outputs to `dist/`.

## Option A: Vercel
- Framework: Vite
- Build Command: npm run build
- Output: dist

## Option B: Netlify
- Build Command: npm run build
- Publish directory: dist

## Option C: Cloudflare Pages
- Build Command: npm run build
- Output directory: dist

## Telegram notes
- WebApp URL must be HTTPS
- Ensure the exact URL is configured in BotFather for the WebApp button/launcher
- If you use SPA routing, prefer hash routing or configure host rewrites to /index.html
