# ZIP16 Wiring (Optional)

This ZIP does not change your app automatically.

## Typical usage
- On "Start Simulation" button:
  - startNewRun()
- When storing sim state:
  - namespace keys with seasonId/runId

Example:

import { getSeasonId, startNewRun, getRunId } from "../lib/season";

const seasonId = getSeasonId();
const runId = getRunId() || startNewRun();

const key = `credchain.sim.${seasonId}.${runId}`;

## Reset
- clearRun() to end a session/run.
- setSeasonId("S2") to begin a new season.
