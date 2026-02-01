#!/usr/bin/env bash
set -euo pipefail

echo "== Credit-Chain build-prod =="
rm -rf dist
npm run build
echo "Build complete. Output: dist/"
