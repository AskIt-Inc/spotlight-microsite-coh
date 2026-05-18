# Clinic Promo Card — Design Specification
**File:** `public/clinic-promo-card.html`
**Sizes:** 4×6 inch (default) · 3×5 inch (toggle)
**Last updated:** May 2026

---

## 1. Purpose

A print-ready promotional index card for placement in clinic waiting rooms and bulletin boards. One card per disease program. Designed to drive patient subscriptions to the Spotlight Series.

---

## 2. Layout Structure (top to bottom)

### ROW 1 — Logo Bar (white background)
Three logos centred, separated by vertical dividers:
```
[Amyloidosis Foundation] | [oneAMYLOIDOSISvoice] | [SomeBodyToTalkTo]
```
- Background: `#ffffff`
- Border bottom: `1px solid #E8E8E8`
- Padding: `14px 24px`
- Logo height: `44px` (desktop) / `32px` (3×5)
- Gap between logos: `28px`
- Divider: `1px wide`, `36px tall`, colour `#DDD0D2`

**To reuse:** swap in the partner organisation's logo alongside STTT/OAV. Keep the same pill treatment.

---

### ROW 2 — Title Strip (white background)
Single line: badge + program name + separator dot + date
```
[COMING SOON]  Amyloidosis Program Spotlight Series  ·  June 2026
```
- Background: `#ffffff`
- Border bottom: `1px solid #E8E8E8`
- Padding: `10px 24px`
- **COMING SOON badge:** background `#8B1F2D`, white text, `9px`, `700` weight, letter-spacing `0.22em`, pill shape (`border-radius: 9999px`), padding `3px 11px`
- **Program name:** `15px`, `700` weight, colour `#8B1F2D`
- **Separator dot:** colour `#C0A0A4` (hidden on 3×5)
- **Date:** `13px`, `600` weight, colour `#6B7280`

**To reuse:** change program name (e.g., `Sickle Cell Disease Program Spotlight Series`) and date.

---

### ROW 3 — FEATURING Band (maroon background)
```
✦ FEATURING
[Program/Institution name large]           [Institution logo white pill]
```
- Background: `linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)`
- Border bottom: `3px solid #6E1A24`
- Padding: `16px 24px`
- **FEATURING label:** spotlight SVG icon + text `10px`, `700`, letter-spacing `0.16em`, colour `#FFE8A3`
- **Institution name:** `20px`, `700`, white `#ffffff`, line-height `1.2`
- **Logo pill:** white background `#ffffff`, border-radius `12px`, padding `1px`, logo width `14rem` (4×6) / `10rem` (3×5)

**To reuse:** change institution name and swap the logo image (base64 PNG embedded). Keep the white pill treatment.

---

### ROW 4 — Subscribe Section (white background)
```
[Tagline paragraph]

Subscribe or scan the QR code to register
[somebodytotalkto.com/subscribe]
Receive session registration links and program updates directly to your inbox.

                                    [QR code 88×88px]

* Subscribing is free and your information is never shared with third parties.
```
- Background: `#ffffff`
- Padding: `18px 24px 14px`
- **Tagline:** `15px`, weight `400`, colour `#1a1a1a`, line-height `1.55`; bold highlights in `#8B1F2D`
- **Subscribe CTA label:** `15px`, weight `700`, colour `#8B1F2D`
- **URL pill:** `13px`, monospace, background `#F0F7FF`, border `1px solid #C0D8F0`, border-radius `4px`
- **Receive text:** `13px`, colour `#4B5563`
- **QR code:** `88×88px` image (embedded base64) · "scan to subscribe" label `9px`, colour `#9CA3AF`
- **Fine print:** `11px`, italic, colour `#9CA3AF`

**To reuse:** update tagline copy, subscribe URL, and regenerate QR code for the new URL.

---

## 3. Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Brand maroon | `#8B1F2D` | FEATURING band, badge, headings, CTA |
| Dark maroon | `#6E1A24` | Gradient end, border |
| Cream gold | `#FFE8A3` | FEATURING label text |
| Near-black | `#020101` | Body text |
| Dark grey | `#363030` | Subheadings (was "AT THE FOREFRONT") |
| Mid grey | `#6B7280` | Date, muted text |
| Light grey | `#9CA3AF` | Fine print, QR label |
| Divider rose | `#DDD0D2` | Logo bar dividers |
| Link blue | `#005EB8` | Subscribe URL |
| Link bg | `#F0F7FF` | Subscribe URL pill background |

---

## 4. Typography

- **Font family:** `'Helvetica Neue', Helvetica, Arial, sans-serif`
- **COMING SOON badge:** 9px / 700 / 0.22em letter-spacing / uppercase
- **Program name:** 15px / 700
- **FEATURING label:** 10px / 700 / 0.16em / uppercase
- **Institution name:** 20px / 700
- **Tagline:** 15px / 400
- **Subscribe CTA:** 15px / 700
- **Fine print:** 11px / italic

---

## 5. Card Sizes & Print Notes

| Size | Dimensions | Use |
|---|---|---|
| 4×6 inch | 6in × 4in | Standard index card, clinic desks |
| 3×5 inch | 5in × 3in | Bulletin boards, smaller spaces |

- Print on **80–110 lb card stock** for clinic use
- Print at **actual size** (no scaling / fit-to-page off)
- Browser print: Chrome → File → Print → More settings → Scale: 100%

---

## 6. Assets Required Per Program

| Asset | Notes |
|---|---|
| Partner/institution logo | PNG with transparent background preferred. Embed as base64. |
| Subscribe/sign-up URL | Used in both the URL pill and QR code |
| QR code | Generate from subscribe URL. Use `qrcode[pil]` Python library with fill `#8B1F2D`, white background. Embed as base64. |
| Program name | Format: `[Disease] Program Spotlight Series` |
| Institution name | Displayed large in maroon band |
| Month + Year | Displayed in title strip |
| Tagline | 2–3 sentences describing what the sessions are and why to subscribe |

---

## 7. How to Create a New Card

1. **Duplicate** `public/clinic-promo-card.html`
2. **Update Row 2:** Change `program-name` text and date
3. **Update Row 3:** Change institution name text and swap the base64 logo
4. **Update Row 4:** Update tagline, subscribe URL, and regenerate QR code:
   ```python
   import qrcode, base64
   from io import BytesIO
   qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=10, border=2)
   qr.add_data('https://YOUR-SUBSCRIBE-URL')
   qr.make(fit=True)
   img = qr.make_image(fill_color="#8B1F2D", back_color="white")
   buf = BytesIO(); img.save(buf, format='PNG')
   b64 = base64.b64encode(buf.getvalue()).decode()
   # Paste b64 into the img src="data:image/png;base64,..." in the HTML
   ```
5. **Commit and push** — GitHub Actions deploys automatically

---

## 8. Known Programs (future cards)

| Program | Institution | Status |
|---|---|---|
| Amyloidosis | University of Chicago | ✅ Live |
| Sickle Cell Disease | TBD | ⏳ Pending |
| Myasthenia Gravis | TBD | ⏳ Pending |

---

## 9. File Locations

| File | Path |
|---|---|
| Promo card HTML | `public/clinic-promo-card.html` |
| UChicago shield PNG | `Shield/PNG_RGB_Digital/UChicago_Shield_2Color_Maroon_WhiteBorder_RGB.png` |
| University of Chicago wordmark | `University_Logo/PNG_RGB_Digital/University Logo_2Color_Maroon_WhiteFill_RGB.png` |
| Live URL | `https://askit-inc.github.io/spotlight-series-microsite/clinic-promo-card.html` |
