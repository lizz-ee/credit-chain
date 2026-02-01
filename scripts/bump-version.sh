#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/bump-version.sh v1.0.1
NEW_VERSION="${1:-}"

if [ -z "$NEW_VERSION" ]; then
  echo "Usage: bump-version.sh vX.Y.Z"
  exit 1
fi

sed -i.bak "s/CREDIT_CHAIN_VERSION = \".*\"/CREDIT_CHAIN_VERSION = \"$NEW_VERSION\"/" src/version.js
rm -f src/version.js.bak

echo "Version updated to $NEW_VERSION"
