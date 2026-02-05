# Quick Error Testing Checklist
## Subtask 5-3: Error Handling & Edge Cases

Use this checklist for rapid verification of error handling functionality.

---

## Quick Test Sequence (15-20 minutes)

### ✅ Test 1: Network Error + Retry (5 min)
1. Open http://localhost:5173 → Create screen
2. Select valid video, fill form
3. Click Upload, IMMEDIATELY go offline (DevTools → Network → Offline)
4. **Verify:** Error message + Retry button appear
5. Go back online, click Retry
6. **Verify:** Upload completes successfully

**PASS** ⬜ | **FAIL** ⬜

---

### ✅ Test 2: Invalid CID Error State (3 min)
1. Block w3s.link domain in DevTools Network tab
2. Navigate to Feed/Home
3. **Verify:** VideoCard shows "Failed to load video" message
4. **Verify:** No console errors
5. Unblock domain

**PASS** ⬜ | **FAIL** ⬜

---

### ✅ Test 3: Console Clean During Upload (3 min)
1. Clear console (Cmd+K)
2. Upload valid video end-to-end
3. **Verify:** Zero red errors ❌
4. **Verify:** Zero yellow warnings ⚠️
5. **Verify:** Zero CORS errors

**PASS** ⬜ | **FAIL** ⬜

---

### ✅ Test 4: Console Clean During Error (2 min)
1. Clear console
2. Trigger upload error (go offline, click upload)
3. **Verify:** Error is caught (no "Uncaught" in console)
4. **Verify:** Error shows only in UI

**PASS** ⬜ | **FAIL** ⬜

---

### ✅ Test 5: Memory Leak Check (5 min)
1. Open DevTools → Memory tab
2. Take heap snapshot (Snapshot 1)
3. Upload video → Create Another (repeat 5 times)
4. Take heap snapshot (Snapshot 2)
5. Compare snapshots
6. **Verify:** Heap growth <5MB per upload
7. **Verify:** Detached DOM nodes <10

**PASS** ⬜ | **FAIL** ⬜

---

### ✅ Test 6: Edge Cases (5 min)

#### 6a. Rapid File Changes
- Select video A → Select video B → Select video C (rapidly)
- **Verify:** Only video C shows, no errors

**PASS** ⬜ | **FAIL** ⬜

#### 6b. Remove Video Cleanup
- Select video → Click "Remove Video"
- **Verify:** Preview disappears, form resets

**PASS** ⬜ | **FAIL** ⬜

#### 6c. Upload Button Disabled
- Select video with errors (wrong aspect ratio)
- **Verify:** Upload button is disabled

**PASS** ⬜ | **FAIL** ⬜

---

## Code Verification Checklist

Review the following code to confirm error handling is implemented:

### CreateScreen.jsx
- [ ] Line 15: `uploadError` state exists
- [ ] Line 44: Error reset before upload
- [ ] Lines 63-64: Catch block sets error
- [ ] Lines 70-74: `handleRetry()` function exists
- [ ] Lines 112-117: Error UI with retry button
- [ ] Lines 29-31: `URL.revokeObjectURL()` cleanup

### VideoCard.jsx
- [ ] Line 6: `error` state exists
- [ ] Lines 16-19: `handleError()` function
- [ ] Lines 55-71: Error state UI
- [ ] Line 80: `onError={handleError}` on video element

### videoService.js
- [ ] Lines 24-43: Try/catch in validateVideo
- [ ] Lines 48-61: Try/catch in generateThumbnail
- [ ] Lines 63-81: Try/catch in uploadVideo
- [ ] Lines 42, 52, 58: URL cleanup calls

---

## Results

**Overall Status:** ⬜ ALL PASS | ⬜ SOME FAILURES

### Failures Found:
_List any issues:_

---

### Notes:
_Additional observations:_

---

**Tested by:** _______________
**Date:** _______________
**Browser:** _______________

---

## After Testing

✅ **If all tests pass:**
```bash
# Update subtask status
# Mark subtask-5-3 as "completed" in implementation_plan.json

# Commit changes
git add .
git commit -m "auto-claude: subtask-5-3 - Test error handling and edge cases"
```

❌ **If tests fail:**
- Document failures above
- Fix issues
- Re-run tests
- Then commit

---

**Quick Reference Complete** ✅
