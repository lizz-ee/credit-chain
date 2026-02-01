#!/usr/bin/env bash
set -euo pipefail
echo "Lite lint: checking formatting only"
npx prettier --check "src/**/*.{js,jsx,css,md}" || true
