---
name: TransitX Haryana
colors:
  surface: '#0d150e'
  surface-dim: '#0d150e'
  surface-bright: '#323c33'
  surface-container-lowest: '#081009'
  surface-container-low: '#151e16'
  surface-container: '#19221a'
  surface-container-high: '#232c24'
  surface-container-highest: '#2e372e'
  on-surface: '#dbe5d9'
  on-surface-variant: '#bacbb9'
  inverse-surface: '#dbe5d9'
  inverse-on-surface: '#29332a'
  outline: '#859585'
  outline-variant: '#3b4a3d'
  surface-tint: '#00e475'
  primary: '#75ff9e'
  on-primary: '#003918'
  primary-container: '#00e676'
  on-primary-container: '#00612e'
  inverse-primary: '#006d35'
  secondary: '#8dcdff'
  on-secondary: '#00344f'
  secondary-container: '#00affe'
  on-secondary-container: '#003f5f'
  tertiary: '#ffdec4'
  on-tertiary: '#4b2800'
  tertiary-container: '#ffba79'
  on-tertiary-container: '#794810'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#62ff96'
  primary-fixed-dim: '#00e475'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#8dcdff'
  on-secondary-fixed: '#001e30'
  on-secondary-fixed-variant: '#004b70'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#fdb878'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3c03'
  background: '#0d150e'
  on-background: '#dbe5d9'
  surface-variant: '#2e372e'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for a high-frequency, futuristic urban transit environment. It prioritizes rapid information processing, high legibility in low-light conditions, and a sense of "technological momentum."

The aesthetic is **Neo-Glassmorphism** mixed with **Cyber-Corporate** elements. It utilizes a deep, multi-layered dark mode palette to reduce eye strain while employing high-vibrancy accents to denote action and status. The personality is efficient, precise, and sophisticated, catering to daily commuters who require real-time data presented through a premium, frictionless interface.

## Colors

This design system uses a curated palette optimized for OLED displays and high-contrast environments:

*   **Primary (Electric Emerald):** Used for critical actions, active route status, and "On-Time" indicators. It represents movement and permission.
*   **Secondary (Metro Cyan):** Used for informational accents, bus icons, and secondary navigational paths.
*   **Surfaces:** The background is a radial gradient extending from the top-center to the bottom corners. Component surfaces utilize a semi-transparent dark navy to maintain depth.
*   **Status Colors:** 
    *   Success: #00E676 (Primary)
    *   Warning/Delayed: #FFD600
    *   Alert/Cancelled: #FF5252

## Typography

The system utilizes **Inter** for all primary UI elements to ensure maximum readability and a systematic, modern feel. **JetBrains Mono** (or a similar technical monospaced font) is introduced for labels, timestamps, and bus numbers to evoke a high-tech, data-driven utility.

Headlines should always use `#FFFFFF` with tight letter spacing. Body text uses `#94A3B8` to create a clear visual hierarchy. For mobile views, large display type should be scaled down while maintaining heavy weights to ensure the brand's bold presence remains intact on smaller screens.

## Layout & Spacing

The design system employs a **Fluid-Responsive Grid** based on an 8px rhythm (with 4px increments for micro-adjustments). 

*   **Mobile:** 4-column grid with 20px side margins and 16px gutters.
*   **Desktop:** 12-column centered grid with a max-width of 1280px.
*   **Vertical Rhythm:** Content blocks are separated by 32px (xl) to allow the glassmorphism effects enough breathing room to be distinct.

Layout containers should use dynamic padding to ensure elements never touch the edge of their glass backgrounds, maintaining the "floating" illusion.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Luminescent Glows** rather than traditional shadows.

1.  **Base Layer:** The Deep Charcoal radial gradient.
2.  **Surface Layer (Cards/Modals):** Background blur (20px) with a fill of `rgba(30, 38, 56, 0.7)`. Every surface must have a 1px solid border of `rgba(255, 255, 255, 0.08)` to define its edges against the dark background.
3.  **Accent Elevation:** Primary buttons and active status indicators feature a soft outer glow (drop-shadow) using their respective accent color at 30% opacity with a 15px blur.
4.  **Interaction:** Upon hover or press, the border-opacity of glass elements increases to `0.2`, and the background blur increases to `40px`.

## Shapes

The shape language is dominated by **Stadium/Pill shapes** and **Large-Radius Rectangles**. 

Buttons, tags, and input fields utilize a fully rounded (pill) treatment to feel friendly yet aerodynamic. Primary containers and cards use `rounded-xl` (1.5rem / 24px) to create a soft, premium hardware-like feel. Icons should be encased in circular or pill-shaped enclosures when used as standalone action triggers.

## Components

*   **Buttons:** Primary buttons are pill-shaped with a linear gradient (Primary to a slightly darker emerald). They feature a matching glow effect. Secondary buttons are "Ghost" style with a 1px white/0.08 border.
*   **Chips/Tags:** Used for "Route Number" or "ETA". These use the `label-caps` typography and a solid dark background with a high-contrast border.
*   **Input Fields:** Subtle glass background, pill-shaped, with the cursor and focus ring using the Secondary Cyan color.
*   **Cards (Route/Bus Details):** Large cards with 20px blur. Information is chunked using horizontal dividers (`rgba(255,255,255,0.05)`).
*   **Live Tracker:** A custom component featuring a pulsing Electric Emerald dot (using a 10px outer glow) to represent the real-time location of the bus.
*   **Bottom Sheets:** Used for quick-glance route details on mobile. These should have a heavy backdrop blur and a "handle" icon that is `rgba(255,255,255,0.2)`.