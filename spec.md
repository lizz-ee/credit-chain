# Task: Integrate Sentry Error Monitoring and Performance Tracking

## Overview

This task integrates Sentry into the Credit Chain React application to enable production error tracking, performance monitoring, and debugging capabilities. The implementation includes installing Sentry SDKs, configuring environment-based initialization, adding error boundaries for graceful error handling, setting up source maps for production debugging, and enabling performance transaction tracking. This provides real-time visibility into application errors and performance metrics in production environments.

## Success Criteria

- [ ] Sentry SDK installed and configured with environment-based DSN
- [ ] Error boundaries protect the application from component crashes
- [ ] Source maps configured for production debugging (hidden from public access)
- [ ] Performance monitoring enabled with browser tracing integration
- [ ] Environment variables documented in .env.example
- [ ] Error reporting verified in development environment
- [ ] No console errors in development or production builds
- [ ] Existing application functionality unaffected

## Workflow Type

**Type**: feature

## Task Scope

### In Scope
- Installation of @sentry/react and @sentry/vite-plugin packages
- Sentry initialization in src/main.jsx with environment-based configuration
- Error boundary wrapper for the root application component
- Vite plugin configuration for source map generation and upload
- Browser tracing integration for performance monitoring
- Environment variable configuration (VITE_SENTRY_DSN, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT)
- Development environment testing of error reporting
- Documentation of new environment variables

### Out of Scope
- Session replay configuration (optional enhancement for future)
- Custom fallback UI components for error boundaries
- Advanced error filtering with beforeSend callbacks
- Integration with backend error tracking
- CI/CD pipeline configuration for automated deployments
- Sentry project creation or organization setup
- React Router integration for route-based transaction grouping

### Boundaries
- Services affected: main (frontend only)
- Files touched: 4 primary files (main.jsx, vite.config.js, .env.example, package.json)
- No backend or infrastructure changes required
- Development and production environments only (no staging configuration)

---

## ⚠️ EXECUTION RULES (READ BEFORE STARTING)

**You are NOT ALLOWED to stop until ALL steps below are complete and the final promise is output.**

1. Complete each step in order
2. Output the step promise IMMEDIATELY after completing each step
3. **DO NOT** write progress summaries between steps - just continue
4. **DO NOT** ask for confirmation - execute autonomously
5. After each step promise, continue to the next step WITHOUT stopping
6. Only stop after outputting the FINAL `<promise>TASK_002_COMPLETE</promise>`

**ANTI-PATTERNS (DO NOT DO THESE):**
- ❌ "I've completed step 1. Would you like me to continue?"
- ❌ "Let me summarize what we've done so far..."
- ❌ "I'll pause here to let you review..."

**CORRECT PATTERN:**
- ✅ Complete step → Output promise → Say "NEXT: Step N" → Begin next step immediately

---

## Implementation Steps

**Total Steps: 6** (You must complete ALL steps)

### Step 1 of 6: Install Sentry Dependencies

**Files:** `package.json`

**What:** Install @sentry/react (runtime SDK) and @sentry/vite-plugin (build-time plugin for source maps) using npm.

**How:**
```bash
npm install @sentry/react
npm install --save-dev @sentry/vite-plugin
```

**Exit:** Both packages appear in package.json dependencies (react SDK in dependencies, vite plugin in devDependencies).

**After completing this step:**
1. Output: `<promise>STEP_1_COMPLETE</promise>`
2. Say: **NEXT: Step 2 - Initialize Sentry in main.jsx**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue immediately.

---

### Step 2 of 6: Initialize Sentry in main.jsx

**Files:** `src/main.jsx`

**What:** Add Sentry initialization at the top of main.jsx BEFORE ReactDOM.createRoot() call. Configure with environment-based DSN, browser tracing integration, and performance monitoring.

**How:**
- Import Sentry at the top: `import * as Sentry from "@sentry/react";`
- Add initialization block after imports but before ReactDOM.createRoot()
- Configuration must include:
  - `dsn: import.meta.env.VITE_SENTRY_DSN` (environment variable)
  - `environment: import.meta.env.MODE` (vite provides this automatically)
  - `integrations: [Sentry.browserTracingIntegration()]` (performance monitoring)
  - `tracesSampleRate: 1.0` (100% of transactions tracked in dev/staging)
  - `enabled: import.meta.env.PROD` (only enable in production builds to avoid dev noise)

**Exit:** Sentry.init() call exists in main.jsx before ReactDOM.createRoot() with all required configuration fields.

**After completing this step:**
1. Output: `<promise>STEP_2_COMPLETE</promise>`
2. Say: **NEXT: Step 3 - Add Error Boundary Wrapper**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue immediately.

---

### Step 3 of 6: Add Error Boundary Wrapper

**Files:** `src/main.jsx`

**What:** Wrap the root App component with Sentry.ErrorBoundary to catch React component errors and report them to Sentry.

**How:**
- Wrap `<App />` with `<Sentry.ErrorBoundary fallback={<div>An error occurred</div>} showDialog={true}>`
- The fallback UI displays when an error is caught
- showDialog={true} enables the Sentry user feedback dialog

**Exit:** App component is wrapped with Sentry.ErrorBoundary in the ReactDOM.createRoot().render() call.

**After completing this step:**
1. Output: `<promise>STEP_3_COMPLETE</promise>`
2. Say: **NEXT: Step 4 - Configure Vite Plugin for Source Maps**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue immediately.

---

### Step 4 of 6: Configure Vite Plugin for Source Maps

**Files:** `vite.config.js`

**What:** Configure the Sentry Vite plugin to generate and upload source maps during production builds for debugging minified code.

**How:**
- Import plugin at top: `import { sentryVitePlugin } from "@sentry/vite-plugin";`
- Add to plugins array: `sentryVitePlugin({ org: process.env.SENTRY_ORG, project: process.env.SENTRY_PROJECT, authToken: process.env.SENTRY_AUTH_TOKEN })`
- Add build configuration: `build: { sourcemap: 'hidden' }` (generates source maps without exposing public URLs)
- NOTE: Use process.env (not import.meta.env) for build-time variables in vite.config.js

**Exit:**
- Vite config imports sentryVitePlugin
- Plugin added to plugins array with org/project/authToken configuration
- build.sourcemap set to 'hidden'

**After completing this step:**
1. Output: `<promise>STEP_4_COMPLETE</promise>`
2. Say: **NEXT: Step 5 - Document Environment Variables**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue immediately.

---

### Step 5 of 6: Document Environment Variables

**Files:** `.env.example`

**What:** Add required Sentry environment variables to .env.example with documentation comments.

**How:**
Add the following variables with comments:
```
# Sentry Configuration
# Get your DSN from https://sentry.io/settings/[org]/projects/[project]/keys/
VITE_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id

# Sentry Build Plugin (for source map upload)
# Store these in .env.sentry-build-plugin or CI/CD secrets
# SENTRY_ORG=your-org-slug
# SENTRY_PROJECT=your-project-slug
# SENTRY_AUTH_TOKEN=your-auth-token
```

**Exit:** .env.example contains all new Sentry-related environment variables with descriptive comments.

**After completing this step:**
1. Output: `<promise>STEP_5_COMPLETE</promise>`
2. Say: **NEXT: Step 6 - Verify Integration**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue immediately.

---

### Step 6 of 6: Verify Integration

**Files:** All modified files

**What:** Run the development server and verify the application starts without errors and Sentry initialization succeeds.

**How:**
- Run `npm run dev`
- Check browser console for any Sentry-related errors
- Verify application renders correctly
- Note: Sentry will be disabled in dev mode (`enabled: import.meta.env.PROD`), so no events will be sent, but initialization should succeed

**Exit:**
- Development server starts without errors
- Application renders correctly
- No console errors related to Sentry configuration

**After completing this step:**
1. Output: `<promise>STEP_6_COMPLETE</promise>`
2. Say: **NEXT: Final Verification**
3. ⚠️ DO NOT summarize. DO NOT stop. Continue to final verification.

---

## Files to Modify

| File | What to Change |
|------|---------------|
| `package.json` | Add @sentry/react to dependencies and @sentry/vite-plugin to devDependencies |
| `src/main.jsx` | Add Sentry import, initialization block, and ErrorBoundary wrapper |
| `vite.config.js` | Import and configure sentryVitePlugin, add build.sourcemap configuration |
| `.env.example` | Document VITE_SENTRY_DSN and build plugin environment variables |

## Files to Reference

| File | Pattern to Copy |
|------|----------------|
| `src/main.jsx` | Current import structure and ReactDOM.createRoot pattern |
| `vite.config.js` | Current plugin configuration pattern (react plugin) |
| `.env.example` | Current environment variable documentation style |

## Patterns to Follow

### Sentry Initialization Pattern

Based on Sentry React documentation:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
  enabled: import.meta.env.PROD,
});
```

**Critical**: Initialize BEFORE ReactDOM.createRoot() to catch all errors.

### Error Boundary Pattern

```javascript
<Sentry.ErrorBoundary
  fallback={<div>An error occurred</div>}
  showDialog={true}
>
  <App />
</Sentry.ErrorBoundary>
```

### Vite Plugin Configuration Pattern

```javascript
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  build: {
    sourcemap: 'hidden',
  },
});
```

**Critical**: Use `process.env` (not `import.meta.env`) in vite.config.js for build-time variables.

## Requirements

### Functional Requirements

1. **Error Tracking**
   - Description: Capture and report React component errors and unhandled exceptions
   - Acceptance: Errors in components are caught by ErrorBoundary and reported to Sentry

2. **Performance Monitoring**
   - Description: Track page loads, navigation, and web vitals
   - Acceptance: Browser tracing integration is configured with 100% sample rate

3. **Source Map Support**
   - Description: Enable debugging of minified production code
   - Acceptance: Source maps generated as 'hidden' (not publicly accessible)

4. **Environment-Based Configuration**
   - Description: Sentry only active in production builds
   - Acceptance: `enabled: import.meta.env.PROD` prevents dev environment noise

### Edge Cases

1. **Missing DSN** - If VITE_SENTRY_DSN is not set, Sentry.init() will log a warning but not crash the app
2. **Missing Build Plugin Variables** - If SENTRY_AUTH_TOKEN is missing, build will succeed but source maps won't upload (acceptable for dev)
3. **Development Mode** - Sentry disabled in dev mode to avoid polluting production data
4. **Initialization Timing** - Must initialize before React to catch early errors

## Implementation Notes

### DO
- Initialize Sentry BEFORE ReactDOM.createRoot() in main.jsx
- Use `import.meta.env` for runtime environment variables (VITE_SENTRY_DSN)
- Use `process.env` for build-time environment variables in vite.config.js
- Set `sourcemap: 'hidden'` to prevent public source map access
- Use `enabled: import.meta.env.PROD` to disable Sentry in development
- Wrap root component with ErrorBoundary for comprehensive error catching

### DON'T
- Don't use import.meta.env in vite.config.js (use process.env instead)
- Don't expose source maps publicly (use 'hidden', not 'true')
- Don't commit SENTRY_AUTH_TOKEN to version control
- Don't enable Sentry in development mode (creates noise)
- Don't add Sentry.init() after ReactDOM.createRoot() (misses early errors)
- Don't use `sourcemap: true` (causes 404 errors for public source map URLs)

### Critical Gotchas

1. **Vite Plugin Build-Only**: sentryVitePlugin only runs during production builds (`npm run build`), not in dev mode
2. **Environment Variable Prefixes**: Runtime variables need `VITE_` prefix, build-time variables in vite.config.js use `process.env` directly
3. **Source Map Timing**: Source maps must be uploaded BEFORE errors occur to apply to stack traces
4. **Auth Token Security**: Store SENTRY_AUTH_TOKEN in `.env.sentry-build-plugin` (add to .gitignore) or CI/CD secrets

## Development Environment

### How to Run
```bash
# Development server (Sentry disabled)
npm run dev

# Production build (Sentry enabled, source maps uploaded)
npm run build
npm run preview
```

### Service URLs
- Development: http://localhost:5173
- Preview (after build): http://localhost:4173

## QA Acceptance Criteria

### Tests to Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview
```

### Manual Verification

1. **Development Mode Verification**
   - Run `npm run dev`
   - Open browser console
   - Verify no Sentry-related errors
   - Verify application renders correctly
   - Check that Sentry is disabled in console (no "Sentry initialized" messages)

2. **Build Verification**
   - Run `npm run build`
   - Verify build succeeds (may warn about missing SENTRY_AUTH_TOKEN - acceptable)
   - Check dist/ directory contains source map files (.map files)

3. **Code Review**
   - Verify Sentry.init() appears BEFORE ReactDOM.createRoot() in main.jsx
   - Verify App wrapped with Sentry.ErrorBoundary
   - Verify vite.config.js has build.sourcemap: 'hidden'
   - Verify .env.example documents all Sentry environment variables

4. **Environment Variable Documentation**
   - Verify VITE_SENTRY_DSN documented in .env.example
   - Verify SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN documented (commented)

---

## Final Verification Checklist

Before outputting the completion promise, verify:

- [ ] @sentry/react and @sentry/vite-plugin installed in package.json
- [ ] Sentry.init() configured in main.jsx with all required fields
- [ ] Sentry initialization happens BEFORE ReactDOM.createRoot()
- [ ] App component wrapped with Sentry.ErrorBoundary
- [ ] sentryVitePlugin configured in vite.config.js with org/project/authToken
- [ ] build.sourcemap set to 'hidden' in vite.config.js
- [ ] VITE_SENTRY_DSN and build plugin variables documented in .env.example
- [ ] Development server starts without errors (npm run dev)
- [ ] No console errors related to Sentry
- [ ] Application functionality unchanged (Feed, Holdings, Create, Loans, Profile screens work)

## Completion Promise

**ONLY output this after ALL steps are complete and verified:**

<promise>TASK_002_COMPLETE</promise>

Replace TASK_002_COMPLETE with the actual task completion marker after all implementation steps and verifications are finished.
