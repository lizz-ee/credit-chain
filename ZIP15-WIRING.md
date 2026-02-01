# ZIP 15 Wiring (Optional)

This ZIP does NOT modify your app automatically.

If you want to wire it in, add calls like:

import { trackScreen, trackAction } from "../lib/telemetry";

trackScreen("GovernanceSimulation");
trackAction("submit_proposal", { proposalId });

Enable telemetry by setting:
VITE_TELEMETRY=1

Optionally set:
VITE_TELEMETRY_ENDPOINT=https://your-endpoint.example/collect

If endpoint is not set, events are saved to localStorage under:
credchain.telemetry.v1
