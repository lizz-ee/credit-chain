# Video Validation Testing Guide

## Purpose
This document provides instructions for testing video validation with invalid videos to ensure all validation constraints are properly enforced.

## Validation Constraints (from videoService.js)

1. **Format**: Only MP4 and WebM formats are supported
2. **Size**: Maximum 100MB (104,857,600 bytes)
3. **Duration**: Maximum 60 seconds
4. **Aspect Ratio**: 9:16 vertical format (0.5625 ± 0.1 tolerance)

## Test Cases

### Test Case 1: Horizontal Video (Aspect Ratio Validation)
**Expected Error**: "Video must be 9:16 vertical format"

**How to Create Test Video:**
```bash
# Using ffmpeg to create a horizontal test video (16:9)
ffmpeg -f lavfi -i testsrc=duration=10:size=1920x1080:rate=30 -pix_fmt yuv420p horizontal_test.mp4
```

**Manual Test Alternative:**
- Use any horizontal video (landscape) from your camera roll or downloads
- Typical horizontal aspect ratios: 16:9, 4:3, 2:1

**Expected Behavior:**
- ✅ Error message displays: "Video must be 9:16 vertical format"
- ✅ Error appears immediately after video selection
- ✅ Upload button is disabled
- ✅ Error is displayed in red text in the validation-errors div

---

### Test Case 2: Video Over 60 Seconds (Duration Validation)
**Expected Error**: "Video must be 60 seconds or less"

**How to Create Test Video:**
```bash
# Using ffmpeg to create a 65-second vertical test video
ffmpeg -f lavfi -i testsrc=duration=65:size=1080x1920:rate=30 -pix_fmt yuv420p long_test.mp4
```

**Manual Test Alternative:**
- Record a video longer than 60 seconds with your phone in vertical mode
- Or concatenate multiple vertical videos to exceed 60 seconds

**Expected Behavior:**
- ✅ Error message displays: "Video must be 60 seconds or less"
- ✅ Error appears after video metadata loads
- ✅ Upload button is disabled
- ✅ Error is displayed in red text

---

### Test Case 3: Video Over 100MB (Size Validation)
**Expected Error**: "Video must be less than 100MB"

**How to Create Test Video:**
```bash
# Using ffmpeg to create a large vertical test video
ffmpeg -f lavfi -i testsrc=duration=120:size=1080x1920:rate=30 -b:v 10M -pix_fmt yuv420p large_test.mp4
```

**Manual Test Alternative:**
- Record a very long high-quality 4K video in vertical mode
- Check file size in file manager (should be > 104,857,600 bytes)

**Expected Behavior:**
- ✅ Error message displays: "Video must be less than 100MB"
- ✅ Error appears immediately after video selection (before metadata loads)
- ✅ Upload button is disabled
- ✅ Error is displayed in red text

---

### Test Case 4: Non-MP4/WebM Format (Format Validation)
**Expected Error**: "Only MP4 and WebM formats are supported"

**How to Create Test Videos:**
```bash
# Convert MP4 to various unsupported formats
ffmpeg -i vertical_test.mp4 -c copy test.avi
ffmpeg -i vertical_test.mp4 -c copy test.mov
ffmpeg -i vertical_test.mp4 -c copy test.mkv
```

**Manual Test Alternative:**
- Try to upload .avi, .mov, .mkv, .flv, .wmv files
- Download videos in these formats from the internet

**Expected Behavior:**
- ✅ Error message displays: "Only MP4 and WebM formats are supported"
- ✅ Error appears immediately after video selection
- ✅ Upload button is disabled
- ✅ Error is displayed in red text

---

### Test Case 5: Multiple Validation Errors
**Scenario**: Upload a horizontal video that is also over 60 seconds and over 100MB

**Expected Behavior:**
- ✅ Multiple error messages display simultaneously
- ✅ Each error is shown as a separate line with bullet point
- ✅ All errors are clear and actionable
- ✅ Upload button remains disabled until all errors are resolved

---

### Test Case 6: Valid Video After Invalid
**Scenario**: Upload an invalid video, see errors, then upload a valid video

**Expected Behavior:**
- ✅ Validation errors clear when new video is selected
- ✅ If new video is valid, no errors show
- ✅ Upload button becomes enabled (when name/ticker filled)
- ✅ Previous error state is completely cleared

---

## Quick Test Video Creation Commands

### Valid Vertical Video (9:16, <60s, <100MB, MP4)
```bash
ffmpeg -f lavfi -i testsrc=duration=10:size=1080x1920:rate=30 -pix_fmt yuv420p valid_vertical.mp4
```

### Invalid: Horizontal
```bash
ffmpeg -f lavfi -i testsrc=duration=10:size=1920x1080:rate=30 -pix_fmt yuv420p invalid_horizontal.mp4
```

### Invalid: Too Long
```bash
ffmpeg -f lavfi -i testsrc=duration=70:size=1080x1920:rate=30 -pix_fmt yuv420p invalid_long.mp4
```

### Invalid: Wrong Format
```bash
ffmpeg -f lavfi -i testsrc=duration=10:size=1080x1920:rate=30 -pix_fmt yuv420p invalid_format.avi
```

### Invalid: Too Large (requires high bitrate)
```bash
ffmpeg -f lavfi -i testsrc=duration=120:size=1080x1920:rate=30 -b:v 15M -pix_fmt yuv420p invalid_large.mp4
```

---

## Testing Procedure

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Create Screen**
   - Open http://localhost:5173
   - Click on Create tab/screen

3. **Test Each Invalid Video Type**
   - Click "Upload Video" button
   - Select test video file
   - Observe validation error message(s)
   - Verify upload button is disabled
   - Verify error message is clear and actionable

4. **Test Upload Button State**
   - With validation errors present, verify button is disabled
   - With no validation errors but empty name/ticker, verify button is disabled
   - With valid video and filled name/ticker, verify button is enabled

5. **Check Browser Console**
   - Open DevTools Console (F12)
   - Verify no JavaScript errors during validation
   - Verify no console.log debugging statements

6. **Test Error Clearing**
   - Upload invalid video (see error)
   - Click "Remove Video" button
   - Verify error clears
   - Upload valid video
   - Verify no errors show

---

## Acceptance Criteria Checklist

- [ ] Horizontal video shows aspect ratio error
- [ ] >60s video shows duration error
- [ ] >100MB video shows size error
- [ ] Non-MP4/WebM format shows format error
- [ ] Each error message is clear and actionable
- [ ] Upload button is disabled when validation fails
- [ ] Multiple errors display simultaneously when applicable
- [ ] Errors clear when video is removed
- [ ] Errors clear when valid video is selected
- [ ] No console errors during validation
- [ ] No console.log debugging statements in code
- [ ] Validation is instant (format/size) or fast (duration/aspect ratio)

---

## Expected Error Messages Summary

| Validation Rule | Error Message |
|----------------|---------------|
| Format | "Only MP4 and WebM formats are supported" |
| Size | "Video must be less than 100MB" |
| Duration | "Video must be 60 seconds or less" |
| Aspect Ratio | "Video must be 9:16 vertical format" |

---

## Notes

- Format and size validation happen synchronously (instant)
- Duration and aspect ratio validation require loading video metadata (1-2 seconds)
- Validation runs automatically on file selection (handleVideoSelect in CreateScreen.jsx)
- Upload button disabled when `validationErrors.length > 0` (line 146 in CreateScreen.jsx)
- Errors displayed in red with bullet points (lines 89-95 in CreateScreen.jsx)
