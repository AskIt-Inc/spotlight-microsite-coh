# Spotlight Series Promo Card System — Specifications

**Version:** 1.0  
**Date:** May 2026  
**Project:** SomeBodyToTalkTo Dashboard (Promo Tab)  
**Status:** Production-Ready Specification

---

## Overview

This document specifies the implementation of a **dynamic promo card system** for Spotlight Series partners. The system generates pixel-perfect 4×6 and 3×5 index cards for multiple organizations (University of Chicago, City of Hope, etc.) with consistent layout, typography, and export capabilities.

Each card can be:
- Previewed on-screen
- Downloaded as PNG (300 DPI)
- Generated as PDF (embedded PNG, no browser print-to-PDF)
- Printed to physical card stock

---

## Card Dimensions

### 4×6 Card (Landscape)

| Metric | Value |
|---|---|
| Physical size | 6 inches × 4 inches |
| Millimeters | 152.4mm × 101.6mm |
| Pixels (300 DPI) | 1800 × 1200 px |
| Aspect ratio | 3:2 |
| DPI | 300 (print standard) |

### 3×5 Card (Landscape)

| Metric | Value |
|---|---|
| Physical size | 5 inches × 3 inches |
| Millimeters | 127mm × 76.2mm |
| Pixels (300 DPI) | 1500 × 900 px |
| Aspect ratio | 5:3 |
| DPI | 300 (print standard) |

---

## Component Architecture

### Single Render Surface Model

All output modes (preview, PNG, PDF, print) use **ONE identical DOM node** as the source:

```html
<div class="print-surface" id="print-surface" data-spotlight-id="[ID]">
  <!-- Card content: fixed structure, dynamic data -->
</div>
```

**Why:** Guarantees pixel-perfect consistency across all export formats. No responsive scaling, no transform tricks on the render surface itself.

### Print Surface Structure

```
.print-surface (6in × 4in or 5in × 3in — FIXED height, not min-height)
├── .logo-bar (3 org logos + dividers)
├── .title-strip (coming-soon badge + program name + date)
├── .featuring-band (maroon gradient background + "FEATURING" text + UoC pill)
├── .subscribe-section (CSS GRID: text left | QR right)
│   ├── .subscribe-text-col (grid-column: 1)
│   │   ├── .tagline (bold tagline + description)
│   │   ├── .subscribe-cta (call-to-action text)
│   │   ├── .subscribe-url (website/link)
│   │   └── .receive-text (follow-up description)
│   └── .qr-block (grid-column: 2, pinned top-right)
│       ├── .qr-box (88×88 / 56×56 at 3×5)
│       │   └── <img src="[QR base64 or URL]">
│       └── .qr-label (scan to subscribe)
└── .fine-print (footer disclaimer)
```

---

## Data Model

### Spotlight Series Object (JSON)

```json
{
  "id": "uchicago-amyloidosis-june2026",
  "name": "Amyloidosis Program Spotlight Series",
  "organization": "University of Chicago",
  "tagline": "Free weekly online sessions with University of Chicago amyloidosis specialists — expert insights, real answers, and the latest on treatments and research, presented by your local experts at 5PM Central every week.",
  "ctaText": "Subscribe or scan the QR code to register",
  "subscribeUrl": "somebodytotalkto.com/subscribe",
  "receiveText": "Receive session registration links and program updates directly to your inbox.",
  "qrCodeData": "data:image/png;base64,[BASE64_PNG_DATA]",
  "date": "June 2026",
  "comingSoon": true,
  "logos": {
    "primary": "data:image/png;base64,[AF_LOGO]",
    "secondary": "data:image/svg+xml;base64,[OAV_LOGO]",
    "tertiary": "data:image/png;base64,[STTT_LOGO]"
  },
  "uocLogo": "data:image/png;base64,[UOC_LOGO]",
  "colors": {
    "primary": "#8B1F2D",
    "secondary": "#6E1A24",
    "accent": "#FFE8A3"
  }
}
```

---

## CSS Grid Layout

### Subscribe Section — Two-Column Grid

The subscribe section uses **CSS Grid** to ensure text stays left-aligned and QR stays pinned top-right.

```css
/* 4×6 layout */
.subscribe-section {
  display: grid;
  grid-template-columns: 1fr 90px;    /* left: flexible, right: 90px for QR */
  column-gap: 14px;
  align-content: start;               /* content aligns to top if space available */
}

/* LEFT column: all text, stacked vertically */
.subscribe-text-col {
  grid-column: 1;
  grid-row: 1 / -1;                   /* spans all rows */
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: flex-start;            /* left-align all text */
}

/* RIGHT column: QR pinned to top */
.qr-block {
  grid-column: 2;
  grid-row: 1;                        /* only first row */
  align-self: start;                  /* stick to top even if left col is taller */
  justify-self: center;               /* center horizontally in 90px column */
}

/* 3×5 override: narrower right column */
.print-surface.size-3x5 .subscribe-section {
  grid-template-columns: 1fr 66px;
}
```

**Result:** No matter what text flows, QR always appears top-right in the same position.

---

## Typography

### Fixed Font Sizes (NO rem/em units on card content)

#### 4×6 Card

| Element | Font Size | Weight |
|---|---|---|
| Tagline | 13px | 400 |
| CTA / URL / Receive | 13px / 12px / 12px | 700 / 400 / 400 |
| Fine print | 11px | 400 italic |

#### 3×5 Card (Tighter)

| Element | Font Size |
|---|---|
| Tagline | 11px |
| CTA / URL / Receive | 11px / 10px / 10px |
| Fine print | 10px |

**Rule:** Every font size is in `px`. No scaling via `rem`, `vw`, or responsive breakpoints.

---

## Export System

### 1. PNG Export (300 DPI)

**Library:** `dom-to-image-more`

**Output:** PNG file, 1800×1200 or 1500×900 pixels, 300 DPI equivalent.

### 2. PDF Export

**Library:** `jsPDF`

**Output:** PDF with embedded PNG, exact physical dimensions, no scaling.

### 3. Browser Print

Injects `@page` rule dynamically before `window.print()` ensuring correct page dimensions per card size.

---

## Print CSS

### @page Rule (Must be Dynamic)

```css
@page {
  size: 6in 4in landscape;  /* 4×6 default */
  margin: 0;
}

/* For 3×5, inject at runtime: */
/* @page { size: 5in 3in landscape; margin: 0; } */
```

### Media Query

```css
@media print {
  body {
    background: none !important;
    padding: 0 !important;
    margin: 0 !important;
    display: block !important;
  }
  
  .controls, .card-label { display: none !important; }
  
  .print-surface {
    box-shadow: none !important;
    border-radius: 0 !important;
    width: var(--card-width) !important;
    height: var(--card-height) !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    overflow: hidden !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
    /* Preserve colors exactly */
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  .print-surface.size-3x5 {
    width: 5in !important;
    height: 3in !important;
  }
}
```

**Key Rules:**
- `position: fixed` pins card at page origin (prevents margin reflow)
- `print-color-adjust: exact` preserves gradients and colors
- `page-break-*: avoid` prevents multi-page splits
- `overflow: hidden` prevents content escape

---

## Dynamic Configuration

### CARD_CONFIG Object

```javascript
const CARD_CONFIG = {
  '4x6': {
    widthIn: 6,
    heightIn: 4,
    pxWidth: 1800,
    pxHeight: 1200,
    label: '4 × 6 inch index card'
  },
  '3x5': {
    widthIn: 5,
    heightIn: 3,
    pxWidth: 1500,
    pxHeight: 900,
    label: '3 × 5 inch index card'
  }
};
```

### CSS Custom Properties

```css
:root {
  --card-width: 6in;
  --card-height: 4in;
}

.print-surface {
  width: var(--card-width);
  height: var(--card-height);
}

.print-surface.size-3x5 {
  --card-width: 5in;
  --card-height: 3in;
}
```

**Update at runtime:**
```javascript
function setSize(size) {
  const config = CARD_CONFIG[size];
  document.documentElement.style.setProperty('--card-width', config.widthIn + 'in');
  document.documentElement.style.setProperty('--card-height', config.heightIn + 'in');
}
```

---

## Color Palette

### Default (University of Chicago)

| Element | Color | Hex |
|---|---|---|
| Primary (badge, text) | Maroon | #8B1F2D |
| Secondary (gradient dark) | Dark maroon | #6E1A24 |
| Accent (label text) | Gold | #FFE8A3 |

### Customizable Per Partner

Each partner object can override colors via CSS custom properties or inline `style` attribute.

---

## Layout Constraints

### Vertical Budget (4×6 @ 96 DPI screen rendering)

| Section | Height |
|---|---|
| Logo bar | ~64px |
| Title strip | ~30px |
| Featuring band | ~68px |
| Subscribe section | ~130px |
| Fine print | ~27px |
| **Total** | **~319px** |
| **Available** | **384px (4in @ 96dpi)** |
| **Fit Status** | **✓ Fits** |

### Vertical Budget (3×5 @ 96 DPI screen rendering)

| Section | Height |
|---|---|
| Logo bar | ~40px |
| Title strip | ~26px |
| Featuring band | ~56px |
| Subscribe section | ~103px |
| Fine print | ~24px |
| **Total** | **~249px** |
| **Available** | **288px (3in @ 96dpi)** |

**Critical:** No section uses `min-height`. All heights are FIXED or flex:1 (fills remaining).

---

## Implementation Checklist

- [ ] Copy HTML structure from SPOTLIGHT_IMPLEMENTATION_GUIDE.md
- [ ] Add all CSS rules from this specification
- [ ] Add JavaScript export functions
- [ ] Add CDN libraries (dom-to-image-more, jsPDF)
- [ ] Fetch spotlight data from API
- [ ] Render card with dynamic data
- [ ] Support multiple spotlights on same page
- [ ] Implement size switching (4×6 ↔ 3×5)
- [ ] Test PNG export dimensions
- [ ] Test PDF export dimensions
- [ ] Test browser print
- [ ] Physical print test on card stock
- [ ] Cross-browser testing

---

## Success Criteria

✅ Promo tab displays working card generator  
✅ PNG export produces exact pixel dimensions (1800×1200 or 1500×900)  
✅ PDF export produces exact page size (6×4in or 5×3in)  
✅ Print output matches on-screen preview  
✅ Size toggle works (4×6 ↔ 3×5)  
✅ Physical print test passes on card stock  
✅ No console errors  
✅ Cross-browser compatible (Chrome, Safari, Firefox)  

---

**Document prepared for:** SomeBodyToTalkTo Dashboard (Promo Tab)  
**Status:** Ready for implementation
