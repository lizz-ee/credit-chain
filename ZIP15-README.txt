Credit-Chain — ZIP 15 (Opt-in Client Telemetry, No Backend)
Generated: 2026-01-28 00:50 UTC

Adds client-only telemetry helpers (opt-in).
No architecture changes. No context/provider changes.

Enable:
- Set VITE_TELEMETRY=1 in your environment (e.g. .env.local)
- Optionally set VITE_TELEMETRY_ENDPOINT=https://your-endpoint.example/collect

If no endpoint is set, events are stored locally (localStorage) for inspection.

Unzip over project root.
