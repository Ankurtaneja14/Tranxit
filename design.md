# TransitX Design System

This document outlines the core design tokens for the TransitX app, extracted from the frontend mockups. This serves as the source of truth for UI/UX styling.

## 1. Brand Colors

Our color palette is built for a dark, futuristic "Metro on Road" aesthetic, emphasizing neon accents against deep dark backgrounds.

| Role | Color | Hex | Description |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | Neon Green | `#00e676` | Main CTAs, glowing elements, and brand highlights |
| **Primary Dim** | Darker Neon | `#00e475` | Hover states and subtle highlights |
| **Secondary** | Cyan / Blue | `#00affe` | Secondary actions, links, and accents |
| **Background** | Deep Dark Green/Black | `#0d150e` | Main app background |
| **Surface** | Dark Surface | `#151e16` | Standard cards and modals |
| **Surface High** | Lighter Surface | `#19221a` | Elevated cards and inputs |
| **On-Surface** | Light Text | `#dbe5d9` | Primary text |
| **On-Surface Muted** | Muted Text | `#bacbb9` | Secondary text, placeholders |
| **Outline** | Border Color | `#3b4a3d` | Dividers and borders |
| **Error** | Bright Red/Coral | `#ffb4ab` | Error messages and destructive actions |

## 2. Typography

We use two primary fonts to balance readability with a high-tech feel.

- **Main Font**: `Inter` (Sans-serif)
- **Monospace/Labels**: `JetBrains Mono`

| Style | Font Family | Size | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Large** | Inter | 48px | 800 (Extra Bold) | 56px | -0.02em |
| **Headline Large** | Inter | 32px | 700 (Bold) | 40px | -0.01em |
| **Title Medium** | Inter | 20px | 600 (Semi-Bold) | 28px | Normal |
| **Body Large** | Inter | 16px | 400 (Regular) | 24px | Normal |
| **Body Small** | Inter | 14px | 400 (Regular) | 20px | Normal |
| **Label Caps** | JetBrains Mono | 12px | 700 (Bold) | 16px | 0.1em |

## 3. Spacing & Borders

### Spacing System (px)
- `unit`: 4
- `sm`: 8
- `md`: 16
- `gutter`: 16
- `lg`: 24
- `xl`: 32
- `margin-mobile`: 20

### Border Radius
- `sm`: 8px
- `md`: 16px (1rem)
- `lg`: 32px (2rem)
- `xl`: 48px (3rem)
- `full`: 9999px (Pill)

## 4. Visual Effects (Shadows & Gradients)

- **Button Glow**: Drop shadow `0 6px 16px rgba(0, 230, 118, 0.3)`
- **Glassmorphism**: 
  - Background: `rgba(30, 38, 56, 0.7)`
  - Backdrop Blur: `20px`
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
- **Radial Background**: `radial-gradient(circle at center, #121824 0%, #0A0D12 100%)`
- **Text Gradient**: `linear-gradient(90deg, #00E676, #00B0FF)`
