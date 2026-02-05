# Quick Validation Testing Checklist

**URL**: http://localhost:5173
**Screen**: Create (click Create tab)

---

## Quick Test Without FFmpeg

Since ffmpeg is not available, use these simple alternatives:

### 1. Test Horizontal Video (Aspect Ratio) ❌ Expected to Fail
- Use any landscape video from your computer/phone
- Typical camera horizontal videos work
- **Expected**: "Video must be 9:16 vertical format"

### 2. Test Long Video (Duration) ❌ Expected to Fail
- Record or find a video >60 seconds
- Any longer video will work
- **Expected**: "Video must be 60 seconds or less"

### 3. Test Large Video (Size) ❌ Expected to Fail
- Find any video >100MB
- High-quality 4K videos are usually large
- **Expected**: "Video must be less than 100MB"

### 4. Test Wrong Format ❌ Expected to Fail
- Try to upload .mov, .avi, .mkv file
- iPhone videos (.mov) commonly available
- **Expected**: "Only MP4 and WebM formats are supported"

### 5. Test Valid Video ✓ Expected to Pass
- Vertical video (portrait mode) from phone
- Less than 60 seconds
- Less than 100MB
- MP4 or WebM format
- **Expected**: No errors, upload button enabled

---

## Browser Testing Steps

1. Open http://localhost:5173
2. Click "Create" tab
3. Click "Upload Video" button
4. Select test video
5. **Observe**:
   - Does error appear?
   - Is error message clear?
   - Is upload button disabled?
6. Try next test case

---

## Verification Points

✓ Error appears immediately (format/size) or after 1-2 seconds (duration/aspect ratio)
✓ Error message is red and has bullet point
✓ Upload button is disabled when error present
✓ Multiple errors can show at once
✓ Removing video clears errors
✓ No console errors in DevTools

---

## Dev Server

Already running on port 5173 ✓

```bash
# If needed to restart:
npm run dev
```

---

## Notes

- The placeholder.mp4 in /public may be horizontal - good for testing!
- Check file > 100MB by opening file properties in file manager
- Most phone videos are MP4, so need to actively find .mov/.avi to test format validation
