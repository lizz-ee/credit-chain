# Error Handling & Edge Case Testing Guide
## Subtask 5-3: Error Handling and Edge Cases

This document provides comprehensive testing procedures for error scenarios and edge cases in the video upload and storage system.

---

## Overview

This testing phase validates that the system gracefully handles:
- Network failures and interruptions
- Invalid data and malformed inputs
- Browser compatibility issues
- Resource management and memory leaks
- Edge cases in video processing

---

## Error Handling Implementation Summary

### CreateScreen.jsx Error Handling
✓ **Upload Error State**: `uploadError` state variable
✓ **Error Display**: Red error message with retry button
✓ **Retry Functionality**: `handleRetry()` function resets and reattempts upload
✓ **Validation Errors**: Displayed before upload attempt
✓ **Memory Cleanup**: `URL.revokeObjectURL()` in `handleVideoRemove()`
✓ **UI State Management**: Upload button disabled during upload and on errors

### VideoCard.jsx Error Handling
✓ **Loading State**: Shows thumbnail or "Loading..." message
✓ **Error State**: `onError` handler sets error state
✓ **Error Display**: "Failed to load video" message shown on error
✓ **Video Opacity**: Hidden when loading or error (opacity: 0)
✓ **Fallback Support**: Supports both CID-based and direct URL sources

### videoService.js Error Handling
✓ **Validation Error Collection**: Returns array of validation errors
✓ **Try/Catch in validateVideo()**: Catches video load failures
✓ **Try/Catch in generateThumbnail()**: Throws meaningful error message
✓ **Try/Catch in uploadVideo()**: Wraps upload failures with context
✓ **Resource Cleanup**: URL.revokeObjectURL() in finally blocks

---

## Test 1: Network Disconnect During Upload

### Purpose
Verify the system handles network interruptions gracefully with proper error messaging and retry capability.

### Prerequisites
- Valid 9:16 vertical video ready
- Development server running on http://localhost:5173
- Browser DevTools open (Network tab)

### Test Steps

#### Step 1.1: Setup Network Throttling
1. Open Chrome DevTools (Cmd+Option+I / F12)
2. Go to **Network** tab
3. Find the **Throttling** dropdown (top of Network panel)
4. Keep it on "No throttling" for now

#### Step 1.2: Start Upload Process
1. Navigate to Create screen
2. Select valid vertical video
3. Fill in Token Name: "Network Test"
4. Fill in Ticker: "NETFAIL"

#### Step 1.3: Simulate Network Failure
1. Click "Upload & Launch" button
2. **IMMEDIATELY** (within 1 second) switch Network throttling to **"Offline"**
3. Watch the upload process

#### Step 1.4: Verify Error Handling
**Expected Behavior:**
- ✓ Upload progress starts (0%, 10%, 20%...)
- ✓ Upload fails due to offline mode
- ✓ Error message appears: "Error: Upload failed: ..."
- ✓ **"Retry" button appears next to error message**
- ✓ Upload button returns to enabled state (or disabled if validation errors)
- ✓ Video preview remains visible
- ✓ Form data is preserved (name, ticker, link)
- ✓ **No console errors** (check Console tab)

**Failure Indicators:**
- ❌ Upload completes despite being offline
- ❌ No error message shown
- ❌ Page crashes or becomes unresponsive
- ❌ Form data is lost
- ❌ Console shows unhandled promise rejection

#### Step 1.5: Test Retry Functionality
1. Switch Network throttling back to **"No throttling"** (online)
2. Click the **"Retry" button**
3. Wait for upload to complete

**Expected Behavior:**
- ✓ Error message clears
- ✓ Progress bar resets to 0%
- ✓ Upload starts again
- ✓ Progress updates (10%, 20%, ... 100%)
- ✓ Success screen appears
- ✓ Video CID and Thumbnail CID displayed
- ✓ Thumbnail image loads

**Verification:**
- Check Network tab for successful upload requests
- Verify upload completes without errors
- Click video URL to confirm it's accessible on IPFS

### Test 1.6: Partial Upload Interruption
1. Upload a larger video file (~20-50MB)
2. Click "Upload & Launch"
3. Wait until progress shows ~50%
4. Switch to Offline mode
5. Wait for error
6. Switch back online
7. Click "Retry"

**Expected:** Retry works correctly, upload completes successfully

### Test 1.7: Multiple Retry Attempts
1. Start upload
2. Go offline → Error → Online → Retry
3. Go offline again → Error
4. Go offline third time → Error
5. Finally go online → Retry

**Expected:** System handles multiple retry cycles without breaking

---

## Test 2: Invalid CID in VideoCard

### Purpose
Verify VideoCard component handles malformed or non-existent CIDs gracefully without crashing.

### Test 2.1: Malformed CID
Currently, VideoCard is used in the feed. To test with invalid CID, we'll need to simulate it:

#### Manual Test via Browser Console:
1. Navigate to the home/feed screen
2. Open Browser Console (Cmd+Option+J / F12)
3. Find a VideoCard component in the React DevTools or inspect the DOM

#### Simulated Invalid CID Test:
Since we can't easily inject invalid CIDs into the feed without backend changes, we'll verify the error handling code:

**Code Review Verification:**
```javascript
// From VideoCard.jsx lines 16-18
const handleError = () => {
  setLoading(false)
  setError(true)
}
```

**What to Verify:**
1. Open `src/components/VideoCard.jsx` in code editor
2. Confirm `onError` handler exists (line 80)
3. Confirm error state renders "Failed to load video" message (lines 55-71)
4. Confirm video element has `onError={handleError}` (line 80)

#### Alternative Test: Use Network Block
1. Navigate to feed/home
2. Open DevTools → Network tab
3. Right-click on any w3s.link request
4. Select "Block request domain"
5. Refresh page

**Expected Behavior:**
- ✓ VideoCard shows loading state initially
- ✓ Video fails to load (blocked)
- ✓ Error message appears: "Failed to load video"
- ✓ Error message is white text, centered
- ✓ No console errors (error is caught)
- ✓ Page doesn't crash
- ✓ Other VideoCards continue working

**Failure Indicators:**
- ❌ Console shows unhandled error
- ❌ Component crashes or shows blank
- ❌ Error boundary not triggered
- ❌ Infinite loading state

### Test 2.2: Empty/Null CID
**Code Review:**
```javascript
// From VideoCard.jsx line 8
const videoSrc = video.cid ? getVideoUrl(video.cid) : video.src
```

**Verification:**
- ✓ Component handles missing CID by falling back to `video.src`
- ✓ If both are missing, video element gets `undefined` src
- ✓ This triggers `onError` handler → "Failed to load video"

### Test 2.3: Non-Existent CID (Valid Format, No Content)
1. Create a fake but properly formatted CID
2. Paste in browser: `https://w3s.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
3. Expected: 404 or Gateway timeout

**In VideoCard:**
- ✓ Loading state shown
- ✓ Eventually triggers `onError` after timeout
- ✓ "Failed to load video" appears
- ✓ No crash

---

## Test 3: Browser Console Error Monitoring

### Purpose
Ensure the application runs cleanly without JavaScript errors, warnings, or CORS issues during normal and error scenarios.

### Test 3.1: Clean Upload Flow Console Check
1. Open browser with **clean console** (no old errors)
2. Start dev server: `npm run dev`
3. Navigate to http://localhost:5173
4. Open DevTools → Console tab
5. Clear console (🚫 icon or Cmd+K)

#### Upload Flow:
1. Navigate to Create screen
2. Select valid video
3. Fill form
4. Click Upload & Launch
5. Wait for success

**Expected Console Output:**
- ✓ **Zero errors** (red ❌)
- ✓ **Zero warnings** (yellow ⚠️)
- ✓ **Zero CORS errors**
- ✓ Informational logs are OK (blue ℹ️)
- ✓ No "Uncaught" or "Unhandled Promise Rejection"

**Common Acceptable Logs:**
- React DevTools extension messages
- HMR (Hot Module Replacement) updates from Vite
- Service worker registration (if applicable)

**Unacceptable Errors:**
- ❌ TypeError: Cannot read property...
- ❌ ReferenceError: X is not defined
- ❌ CORS policy blocked...
- ❌ 404 errors for missing resources
- ❌ Failed to load resource
- ❌ Uncaught (in promise)

### Test 3.2: Error Scenario Console Check
1. Clear console
2. Simulate network failure during upload
3. Check console

**Expected:**
- ✓ Error is **caught and handled** (not "Uncaught")
- ✓ No stack traces in console
- ✓ Error shown in UI only

### Test 3.3: Invalid Video Console Check
1. Clear console
2. Try uploading horizontal video
3. Check console

**Expected:**
- ✓ Validation runs without errors
- ✓ Error messages appear in UI
- ✓ No console errors

### Test 3.4: VideoCard Playback Console Check
1. Clear console
2. Navigate to feed with IPFS video
3. Let video load and play

**Expected:**
- ✓ No CORS warnings
- ✓ No 404 errors
- ✓ No video codec errors
- ✓ Clean console

### Test 3.5: Console Filter Test
Use Console filters to check specific error types:
- **Filter: "error"** → Should show 0 results
- **Filter: "CORS"** → Should show 0 results
- **Filter: "failed"** → Should show 0 results (or only expected UI error messages)
- **Filter: "uncaught"** → Should show 0 results

---

## Test 4: Memory Leak Verification

### Purpose
Ensure the application properly cleans up resources (video URLs, canvas contexts, event listeners) to prevent memory leaks during repeated uploads.

### Test 4.1: DevTools Memory Tab Setup
1. Open Chrome DevTools
2. Go to **Memory** tab
3. Click **"Take heap snapshot"** button (camera icon)
4. This creates a baseline snapshot

### Test 4.2: Multiple Upload Cycle Test

#### Cycle 1:
1. Navigate to Create screen
2. Select video → Upload → Success
3. Click "Create Another"
4. **Take heap snapshot** (name it "After Upload 1")

#### Cycle 2:
5. Select video → Upload → Success
6. Click "Create Another"
7. **Take heap snapshot** (name it "After Upload 2")

#### Cycle 3:
8. Select video → Upload → Success
9. Click "Create Another"
10. **Take heap snapshot** (name it "After Upload 3")

#### Cycle 4-5:
11. Repeat 2 more times
12. Take final snapshot: "After Upload 5"

### Test 4.3: Analyze Heap Snapshots

#### Compare Snapshots:
1. In Memory tab, select "After Upload 5"
2. Change view from "Summary" to **"Comparison"**
3. Compare against "Snapshot 1" (baseline)

#### What to Look For:

**Healthy (No Leak):**
- ✓ Heap size increase is minimal (<5MB per upload)
- ✓ "Detached DOM nodes" count stays low (<10)
- ✓ No growing arrays of video elements
- ✓ Blob objects are released
- ✓ Object URLs are revoked

**Memory Leak Indicators:**
- ❌ Heap size grows by >10MB per upload
- ❌ "Detached DOM nodes" count increases with each upload
- ❌ Large number of HTMLVideoElement objects retained
- ❌ Blob objects accumulating
- ❌ "CreateObjectURL" calls not matched by "RevokeObjectURL"

### Test 4.4: Check Object URL Cleanup

**Code Verification:**
Verify URL cleanup is happening:

```javascript
// From CreateScreen.jsx line 30-31
if (videoPreview) {
  URL.revokeObjectURL(videoPreview)
}
```

```javascript
// From videoService.js line 42
URL.revokeObjectURL(url)
```

**Manual Test:**
1. Open DevTools → Console
2. Before uploading, run:
   ```javascript
   console.log(performance.memory.usedJSHeapSize)
   ```
3. Upload 5 videos
4. Run again:
   ```javascript
   console.log(performance.memory.usedJSHeapSize)
   ```
5. Heap size should not increase dramatically (allow for ~10-20MB variance)

### Test 4.5: Video Element Cleanup Test

1. Open React DevTools
2. Navigate to Create screen
3. Select video (preview appears)
4. Check React component tree
5. Click "Remove Video"
6. **Expected:** Video preview component is unmounted
7. Check DOM: Video element should be removed from DOM

### Test 4.6: Long Session Test

**Stress Test:**
1. Upload 10 videos in succession
2. Monitor Performance tab
3. Check for:
   - ✓ Memory usage stays stable
   - ✓ No memory warnings in DevTools
   - ✓ Page remains responsive
   - ✓ No slowdown after multiple uploads

**Performance Metrics:**
- Time to upload video 1: ___ seconds
- Time to upload video 10: ___ seconds
- Expected: Times should be similar (±20% variance OK)

---

## Test 5: Additional Edge Cases

### Test 5.1: Rapid File Selection Changes
1. Click "Upload / Record Video"
2. Select video A
3. **Immediately** click "Upload / Record Video" again
4. Select video B
5. Repeat 3-4 times quickly

**Expected:**
- ✓ Only latest video shows in preview
- ✓ Previous video URLs are revoked
- ✓ No console errors
- ✓ No memory leak

### Test 5.2: Upload During Validation
1. Select very large video (triggers validation)
2. **Immediately** try clicking upload button

**Expected:**
- ✓ Upload button is disabled during validation
- ✓ Can't upload until validation completes
- ✓ Validation errors appear after check

### Test 5.3: Browser Refresh During Upload
1. Start video upload
2. Wait until 50% progress
3. Refresh browser (Cmd+R / F5)

**Expected:**
- ✓ Upload is cancelled
- ✓ Page reloads cleanly
- ✓ No corrupted state
- ✓ Can start fresh upload

### Test 5.4: Navigate Away During Upload
1. Start video upload
2. Wait until 50% progress
3. Click different navigation tab (Feed/Wallet/etc)

**Expected:**
- ✓ Upload continues or is cancelled gracefully
- ✓ No errors on navigation
- ✓ Returning to Create shows clean state

### Test 5.5: Very Slow Network (Timeout Test)
1. Open DevTools → Network
2. Set throttling to **"Slow 3G"**
3. Try uploading video
4. Wait to see if it completes or times out

**Expected:**
- ✓ Upload takes longer but completes
- ✓ OR shows timeout error with retry option
- ✓ Progress bar continues updating
- ✓ No infinite loading state

### Test 5.6: Multiple Browser Tabs
1. Open app in Tab 1
2. Start upload
3. Open app in Tab 2 (same URL)
4. Try uploading in Tab 2

**Expected:**
- ✓ Both tabs work independently
- ✓ No conflicts or errors
- ✓ Storacha client works in both tabs

### Test 5.7: Browser DevTools Closed vs Open
1. Upload with DevTools **closed**
2. Note upload time
3. Upload same video with DevTools **open**
4. Compare times

**Expected:**
- ✓ DevTools presence doesn't break functionality
- ✓ Upload might be slightly slower with DevTools (acceptable)
- ✓ No errors specific to DevTools being open

---

## Test 6: VideoCard Edge Cases

### Test 6.1: Very Slow IPFS Gateway
1. Upload video successfully
2. Navigate to feed
3. Simulate slow gateway by throttling network

**Expected:**
- ✓ Loading state shown for extended period
- ✓ Eventually video loads
- ✓ OR error state after reasonable timeout
- ✓ Thumbnail shows during loading (if available)

### Test 6.2: Missing Thumbnail
Test VideoCard with video that has no thumbnail:
```javascript
const videoWithoutThumbnail = {
  cid: 'valid_cid_here',
  thumbnailUrl: null, // or undefined
  ticker: 'TEST',
  cap: '$1k'
}
```

**Expected:**
- ✓ Shows "Loading..." text instead of thumbnail
- ✓ Video still loads correctly
- ✓ No errors

### Test 6.3: Thumbnail Loads, Video Fails
1. Mock scenario where thumbnail is valid but video CID is invalid
2. Check behavior

**Expected:**
- ✓ Thumbnail displays
- ✓ Video error state eventually shown
- ✓ "Failed to load video" appears

---

## Browser Compatibility Testing

### Test 7.1: Chrome/Chromium
- ✓ Test all scenarios above in Chrome
- ✓ Check DevTools console
- ✓ Verify Canvas API works
- ✓ Verify video preview works

### Test 7.2: Firefox
- ✓ Repeat core tests in Firefox
- ✓ Video validation works
- ✓ Upload works
- ✓ Playback works

### Test 7.3: Safari (if available)
- ✓ Repeat core tests in Safari
- ✓ Check for Safari-specific issues
- ✓ Verify Canvas API support

### Test 7.4: Mobile Browser (Optional)
- Test on mobile device browser
- Check responsive layout
- Verify file picker works on mobile

---

## Acceptance Criteria Checklist

Before marking subtask-5-3 as complete, verify:

### Network Error Handling
- [ ] Network disconnect during upload shows error message
- [ ] Retry button appears after network error
- [ ] Retry functionality works correctly
- [ ] Form data is preserved after error
- [ ] No unhandled promise rejections in console

### Invalid CID Handling
- [ ] VideoCard shows error state for invalid CID
- [ ] "Failed to load video" message appears
- [ ] Component doesn't crash on malformed CID
- [ ] Fallback to src prop works if CID missing
- [ ] Error is caught and handled gracefully

### Console Cleanliness
- [ ] No JavaScript errors in console during normal flow
- [ ] No errors during error scenarios (caught properly)
- [ ] No CORS warnings
- [ ] No 404 errors for resources
- [ ] No unhandled rejections

### Memory Management
- [ ] URL.revokeObjectURL called in cleanup
- [ ] Multiple uploads don't cause memory leak
- [ ] Heap size remains stable
- [ ] Detached DOM nodes don't accumulate
- [ ] Video elements properly removed from DOM

### Edge Cases
- [ ] Rapid file selection changes handled
- [ ] Browser refresh during upload handled
- [ ] Navigation during upload handled
- [ ] Very slow network doesn't break UI
- [ ] Missing thumbnail handled in VideoCard

---

## Test Results Documentation

### Environment
- **Date:** _______________
- **Tester:** _______________
- **Browser:** _______________
- **OS:** _______________
- **Dev Server:** http://localhost:5173

### Test Results Summary

| Test | Status | Notes |
|------|--------|-------|
| Network Disconnect | ⬜ PASS / FAIL | |
| Invalid CID | ⬜ PASS / FAIL | |
| Console Errors | ⬜ PASS / FAIL | |
| Memory Leaks | ⬜ PASS / FAIL | |
| Retry Functionality | ⬜ PASS / FAIL | |
| Edge Cases | ⬜ PASS / FAIL | |

### Issues Found
_Document any failures or unexpected behavior:_

---

### Blockers
_List any issues that prevent testing:_

---

## Code Implementation Summary

### Error Handling Locations

**CreateScreen.jsx:**
- Line 15: `uploadError` state
- Line 44: `setUploadError(null)` before upload
- Lines 63-64: Catch block sets upload error
- Lines 70-74: `handleRetry()` function
- Lines 112-117: Error display UI with retry button

**VideoCard.jsx:**
- Line 6: `error` state
- Lines 16-19: `handleError()` handler
- Lines 55-71: Error state UI
- Line 80: `onError={handleError}` on video element
- Line 81: `style={{ opacity: loading || error ? 0 : 1 }}`

**videoService.js:**
- Lines 24-43: Try/catch in `validateVideo()`
- Lines 48-61: Try/catch in `generateThumbnail()`
- Lines 63-81: Try/catch in `uploadVideo()`
- Lines 42, 52, 58: `URL.revokeObjectURL()` cleanup

---

## Next Steps After Testing

**If All Tests PASS:**
1. Mark subtask-5-3 as "completed" in implementation_plan.json
2. Commit changes: `git commit -m "auto-claude: subtask-5-3 - Test error handling and edge cases"`
3. Update build-progress.txt
4. Phase 5 (Testing & Verification) is complete
5. Ready for final QA sign-off

**If Tests FAIL:**
1. Document failures in this file
2. Create issues for each failure
3. Fix the issues
4. Re-run tests
5. Update implementation_plan.json only after all tests pass

---

**Testing Guide Complete** ✅

This document provides comprehensive coverage of error handling and edge case testing for the video upload and storage system.
