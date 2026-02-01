# ZIP27 Wiring (Optional)

Mount menu in dev:
import DebugMenu from "./components/DebugMenu";
<DebugMenu />

Use merged flags:
import { hasAnyFlag } from "../lib/flagsDebug";
if (hasAnyFlag("season2")) { ... }

Everything auto-disables in production.
