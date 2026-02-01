# ZIP20 Wiring (Optional)

## Feature flags
Set in env:
VITE_FLAGS="telemetry,season2"

Use:
import { hasFlag } from "../lib/flags";
if (hasFlag("season2")) { ... }

## Debounce/throttle
import { debounce, throttle } from "../lib/rateLimit";

## Clipboard
import { copyToClipboard } from "../lib/clipboard";

## IDs
import { uid } from "../lib/id";
