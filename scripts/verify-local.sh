#!/usr/bin/env bash
set -euo pipefail

echo "== Credit-Chain verify-local =="
node -v
npm -v

echo "[1/3] Install deps"
npm install

echo "[2/3] Build"
npm run build

echo "[3/3] Preview (Ctrl+C to stop)"
npm run preview
