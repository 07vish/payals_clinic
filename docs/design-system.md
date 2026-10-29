# Design System: Payal's Dental Clinic

## 1. Principles (Apple Marketing Site Standards)
- **Clarity**: One clear thought per viewport section. No cognitive overload.
- **Deference**: Content, real clinic photography, and patient words lead; UI provides quiet, elegant structure.
- **Depth**: Subtle 1px borders (`rgba(15, 23, 42, 0.08)`), refined backdrop blur (`blur(16px)`), micro-shadows.
- **Restraint**: Exactly one accent color (`#0D9488`). No neon, no gratuitous purple gradients, no extraneous decoration.

---

## 2. Design Tokens & CSS Variables

### Colors
```css
:root {
  /* Surface & Background */
  --bg-primary: #FAFAF9;        /* Warm Stone Alabaster */
  --bg-surface: #FFFFFF;        /* Pure Clean White */
  --bg-surface-subtle: #F1F5F9; /* Crisp Neutral Card Tint */
  --bg-dark: #090D14;           /* Deep Midnight Hero/Footer */
  --bg-dark-surface: #131A26;    /* Dark Elevation */

  /* Typography */
  --text-primary: #0F172A;      /* Slate Obsidian 900 */
  --text-secondary: #64748B;    /* Neutral Slate 500 */
  --text-muted: #94A3B8;        /* Light Slate 400 */
  --text-inverse: #FFFFFF;      /* High Contrast White */
  --text-inverse-muted: #94A3B8;

  /* Accent (Single curated brand color) */
  --accent: #0D9488;            /* Restorative Teal 600 */
  --accent-hover: #0F766E;      /* Restorative Teal 700 */
  --accent-light: rgba(13, 148, 136, 0.1);
  --accent-ring: rgba(13, 148, 136, 0.35);

  /* Borders & Dividers */
  --border-subtle: rgba(15, 23, 42, 0.08);
  --border-strong: rgba(15, 23, 42, 0.16);
  --border-inverse: rgba(255, 255, 255, 0.12);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 20px 35px -8px rgba(15, 23, 42, 0.08), 0 8px 16px -4px rgba(15, 23, 42, 0.03);

  /* Radius (Consistent Apple aesthetic) */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
}
```

---

## 3. Typography Scale (Inter / Apple System Font)
- **Family**: `Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif`
- **Weights Used**: 400 (Regular for body), 500 (Medium for UI labels), 600 (Semibold for headlines & emphasis).
- **Hero Title**: `clamp(2.75rem, 5.5vw, 4.75rem)` (44px – 76px) | line-height: 1.02 | letter-spacing: `-0.035em` | Under 8 words.
- **Section Title**: `clamp(2rem, 3.5vw, 3rem)` (32px – 48px) | line-height: 1.1 | letter-spacing: `-0.025em`.
- **Subsection / Card Title**: `1.25rem` – `1.5rem` (20px – 24px) | line-height: 1.3 | letter-spacing: `-0.015em`.
- **Body Regular**: `1.0625rem` (17px) | line-height: 1.65 | max-width: 62ch.
- **Micro / Badge Label**: `0.8125rem` (13px) | weight: 500 | letter-spacing: `0.04em` | uppercase.

---

## 4. Spacing System (Strict 8px Grid)
- `space-1`: 8px
- `space-2`: 16px
- `space-3`: 24px
- `space-4`: 32px
- `space-5`: 40px
- `space-6`: 48px
- `space-8`: 64px
- `space-10`: 80px
- `space-12`: 96px
- `space-16`: 128px
- `space-20`: 160px
- Section vertical padding: `120px` to `160px` on desktop, `72px` on mobile.
- Max container width: `1200px` (with gutter padding `24px` on mobile, `48px` on desktop).

---

## 5. Component Patterns
1. **Header Navigation**:
   - Sticky with `backdrop-filter: blur(16px)` and subtle border bottom.
   - Minimalist clinic monogram + brandmark left, anchor links center, one single high-priority accent CTA ("Book Consultation") right.
2. **Hero Stage**:
   - Under 8-word bold headline: *"Modern, genuinely painless dental care."*
   - Concrete subtext highlighting Dr. Payal Chaudhari's gentle practice in Nanpura, Surat.
   - Live Google review badge (`5.0 ★ (29 Verified Reviews)`).
   - High-fidelity visual showcase of the clean, modern clinic reception.
3. **Bento Services Grid**:
   - Asymmetric 4-panel bento showcasing core treatments: Preventive & Checkups, Painless Endodontics (Root Canal), Aesthetic & Alignment, and Restorative Implants.
4. **The Doctor & Philosophy**:
   - Honest, Apple-style clarity on the unhurried consultation standard.
5. **Real Google Reviews Carousel / Grid**:
   - 100% verified real patient reviews from Google Maps. Star badges and direct link to listing.
6. **Live Operating Hours & Interactive Visit Section**:
   - Dynamic "Open Now / Closed" real-time status calculated based on clinic local time (IST).
   - Embedded interactive Google Map and 1-click directions.
7. **Accessible Quick Booking / Contact Drawer**:
   - Clear click-to-call, WhatsApp direct connect, and appointment request form.
