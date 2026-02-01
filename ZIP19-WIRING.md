# ZIP19 Wiring (Optional)

Call once on app start (dev-only is fine):
import { assertEnv } from "../lib/env";
assertEnv();

Use logger instead of console.* where convenient:
import { logger } from "../lib/logger";
logger.log("ready");
