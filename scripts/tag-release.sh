#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -e "console.log(require('./package.json').version || 'vX.Y.Z')")
git tag -a "$VERSION" -m "Release $VERSION"
echo "Tagged $VERSION"
