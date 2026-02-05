# CREDIT-CHAIN UI IMPLEMENTATION

## Overview
This implementation follows the UI Design Specification as LAW.
All changes respect the existing business logic while applying visual hierarchy, navigation, spacing, and motion discipline.

## Implementation Status

### ✅ PASS 1: Foundation Complete
- Global design system (src/styles/global.css)
- Bottom navigation (src/components/BottomNav.jsx)
- UI component library (src/components/ui/)
- Entry point updates (src/main.jsx)

### 🔄 PASS 2-4: Ready for Integration
See individual screen files and component updates below.

## File Changes Summary

### New Files Created
1. `src/styles/global.css` - Global design system with CSS variables
2. `src/components/ui/` - Complete UI component library:
   - PaintDivider.jsx + .css
   - CardContainer.jsx + .css
   - PillButton.jsx + .css
   - SegmentedControl.jsx + .css
   - RiskBadge.jsx + .css
   - PaintLoader.jsx + .css
   - index.js (exports)

### Modified Files
1. `src/components/BottomNav.jsx` - Icon-first layout with paint glow
2. `src/styles/bottom-nav.css` - Spec-compliant styles
3. `src/main.jsx` - Import global.css first

## Design System Variables

All CSS variables are defined in `src/styles/global.css`:

```css
--bg-primary: #0B0C0E        (Matte black)
--bg-secondary: #0F1115
--acid-green: #6BFF4F        (Primary accent)
--toxic-yellow: #E6FF3F      (Secondary highlights)
--danger-red: #FF3B3B        (Risk, errors)
--card-bg: #15181D
--border-base: #1F232B
--text-muted: #8A8F98
--text-primary: #EDEFF2
```

## Component Usage Examples

### PaintDivider
```jsx
import { PaintDivider } from '@/components/ui'

<PaintDivider />
```

### CardContainer
```jsx
import { CardContainer } from '@/components/ui'

<CardContainer onClick={() => handleClick()}>
  <h3>Card Title</h3>
  <p>Card content...</p>
</CardContainer>
```

### PillButton
```jsx
import { PillButton } from '@/components/ui'

<PillButton active={selected === '10'} onClick={() => setSelected('10')}>
  10
</PillButton>
```

### SegmentedControl
```jsx
import { SegmentedControl } from '@/components/ui'

<SegmentedControl
  options={[
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' }
  ]}
  selected={mode}
  onChange={setMode}
/>
```

### RiskBadge
```jsx
import { RiskBadge } from '@/components/ui'

<RiskBadge level="LOW" />  // or MEDIUM, HIGH
```

### PaintLoader
```jsx
import { PaintLoader } from '@/components/ui'

<PaintLoader size="medium" />  // or small, large
```

## Integration Steps

### 1. Install/Update Dependencies (if needed)
```bash
npm install
```

### 2. Import Global Styles
Ensure `src/main.jsx` imports `global.css` FIRST:
```jsx
import './styles/global.css' // MUST BE FIRST
```

### 3. Use UI Components
Import from the ui library:
```jsx
import { PaintDivider, CardContainer, PillButton } from '@/components/ui'
```

### 4. Apply Spacing
Use CSS variables for consistent spacing:
```css
padding: var(--space-standard);  /* 16px */
margin-bottom: var(--space-section);  /* 24px */
gap: var(--space-base);  /* 8px */
```

### 5. Apply Motion
Use provided utility classes:
```jsx
<button className="pressable">  // Adds scale on press
  Click me
</button>
```

## Screen Implementation Checklist

### Feed Screen
- [ ] Header with CREDIT-CHAIN wordmark
- [ ] Search toggle (collapsible)
- [ ] Video tiles with overlays
- [ ] MC pill (top-left)
- [ ] Favorite star (top-right)
- [ ] Action dock (bottom-right)
- [ ] Vertical snap scroll

### Holdings Screen
- [ ] Credits summary card
- [ ] "Undiscovered" state for price
- [ ] Three tabs (Holdings/Favorites/Rewards)
- [ ] Holdings list with PnL colors

### Create Screen
- [ ] Upload/Record buttons
- [ ] Rules section with bullets
- [ ] Industrial aesthetic

### Loans Screen
- [ ] Borrow/Lend tabs
- [ ] Insurance pool card
- [ ] Tier ladder display

### Profile Screen
- [ ] Identity section
- [ ] Governance section
- [ ] Fees & transparency section

### Governance Screens
- [ ] Proposal list with RiskBadge
- [ ] Countdown timers
- [ ] Vote buttons

## Motion Guidelines

### Screen Transitions
```css
/* Entering screen (falls in from top) */
animation: screen-enter 350ms var(--ease-bounce);

/* Exiting screen (drips down) */
animation: screen-exit 300ms var(--ease-smooth);
```

### Button Press
```css
.pressable:active {
  transform: scale(0.94);
}
```

### Paint Drip
```css
animation: drip-fall 1.2s ease-in infinite;
```

## Testing Checklist

- [ ] Test in Telegram WebApp
- [ ] Test mobile viewport (360px-428px)
- [ ] Test desktop mirror (centered, max-width 428px)
- [ ] Verify bottom nav always visible
- [ ] Verify active tab glows acid-green
- [ ] Verify press feedback on all buttons
- [ ] Verify no horizontal slide animations
- [ ] Verify safe-area insets respected
- [ ] Verify paint drip animations smooth
- [ ] Verify no layout shifts

## Common Issues & Solutions

### Issue: Bottom nav not visible
**Solution:** Check z-index (should be 100) and position: fixed

### Issue: Colors not applying
**Solution:** Ensure global.css is imported FIRST in main.jsx

### Issue: Components not found
**Solution:** Check import path uses '@/components/ui' or relative path

### Issue: Animations choppy
**Solution:** Ensure hardware acceleration with `transform` instead of `top/left`

### Issue: Spacing inconsistent
**Solution:** Use CSS variables (--space-*) instead of hard-coded values

## Compliance Verification

Run this checklist before deploying:

- [ ] All colors from design system only
- [ ] No pastel gradients added
- [ ] No glassmorphism added
- [ ] No playful fonts added
- [ ] No horizontal slide animations
- [ ] Bottom nav implemented correctly
- [ ] Paint drip physics applied
- [ ] 8px spacing grid enforced
- [ ] Tabular numerals for all numbers
- [ ] Industrial aesthetic preserved

## Next Development Steps

1. Integrate these base components into existing screens
2. Update screen layouts to match spec
3. Add empty/error states (text-only, no illustrations)
4. Test in Telegram WebApp environment
5. Optimize performance
6. Add remaining UI polish

## Support & References

- UI Design Specification (authoritative source)
- Implementation Prompt (working method)
- This guide (integration instructions)

---

**Remember:** This is an IMPLEMENTATION of the spec, not a redesign.
All changes follow the UI specification as LAW.
