---
name: Sarıçam Melek
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4e4632'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#80765f'
  outline-variant: '#d2c5ab'
  surface-tint: '#745b00'
  primary: '#745b00'
  on-primary: '#ffffff'
  primary-container: '#ffcc00'
  on-primary-container: '#6f5700'
  inverse-primary: '#f1c100'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#005bc1'
  on-tertiary: '#ffffff'
  tertiary-container: '#bfd2ff'
  on-tertiary-container: '#0056b8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe08b'
  primary-fixed-dim: '#f1c100'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#584400'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#004493'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style
The design system is engineered to evoke immediate trust, professional efficiency, and a premium "executive" feel for an urban taxi service. By blending the high-visibility heritage of taxi yellow with a sophisticated, SaaS-inspired aesthetic, the system balances urgency with calm reliability.

The visual style is **Corporate Modern with a Minimalist lean**. It prioritizes high-impact clarity, utilizing significant white space to reduce cognitive load during high-intent actions (like booking a ride). The emotional response should be one of "effortless speed"—the user feels that the service is organized, high-tech, and ready to serve.

## Colors
The palette is rooted in the iconic taxi identity but elevated for a premium digital experience.

- **Primary (Taxi Yellow):** Reserved strictly for primary call-to-action buttons, active status indicators, and key brand moments. It provides maximum contrast against dark backgrounds.
- **Secondary (Deep Black):** Used for primary backgrounds in hero sections and main headers to establish a sophisticated, urban "night-mode" feel even within a light-mode system.
- **Neutral (Soft White & Grays):** The base of the application. Soft White (#F9F9F9) differentiates content cards from the true white page background, while subtle grays (#E5E5E5) handle borders and secondary text.
- **Utility (Blue):** A secondary action color used for maps, links, and informational hints to avoid "yellow fatigue."

## Typography
The typography strategy employs a dual-font system to separate brand personality from functional utility.

- **Headlines (Montserrat):** Geometric and bold. Use Montserrat for all H1-H3 levels to convey strength and architectural stability.
- **Body & Interface (Inter):** Highly legible and neutral. Inter is used for all functional data, descriptions, and input labels to ensure clarity at small sizes, especially for ride details and pricing.
- **Hierarchy:** Maintain strict vertical rhythm. Use `display-lg` for hero value propositions and `label-bold` (all caps) for small eyebrow text above headlines.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous internal padding to create an airy, premium feel. 

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile. 
- **Spacing Rhythm:** All spacing is derived from an 8px base unit. 
- **Content Density:** Maintain high whitespace ratios. Elements should never feel cramped; the distance between distinct functional blocks (e.g., "From/To" inputs vs. "Select Car Type") should be at least 32px to prevent accidental taps and improve focus.
- **Safe Areas:** On mobile, ensure all primary booking actions are within the "thumb zone" (bottom 40% of the screen).

## Elevation & Depth
This design system utilizes **Ambient Shadows** to create a sense of organized layers without the clutter of heavy borders.

- **Level 1 (Base):** Flat Soft White background.
- **Level 2 (Cards/Inputs):** White surfaces with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)). This is used for ride-option cards and floating input bars.
- **Level 3 (Modals/Overlays):** High-elevation shadows (0px 12px 40px rgba(0,0,0,0.08)) to pull focus for critical interactions like "Confirm Booking" or "Driver Details."
- **Tonal Depth:** Use the Deep Black (#1A1A1A) for footer sections or navigation bars to "ground" the layout and provide a premium contrast to the light content area.

## Shapes
The shape language is friendly yet structured. A consistent 16px (1rem) corner radius is applied to most UI containers to mirror the modern, approachable feel of high-end consumer apps.

- **Standard Elements:** Buttons, input fields, and small cards use 16px radius.
- **Large Containers:** Content sections and main booking modules use 24px (1.5rem) to emphasize a soft, "contained" look.
- **Icons:** Use "Linear" icons with slightly rounded caps to match the typography's geometric nature.

## Components
- **Buttons:** Primary buttons use the Taxi Yellow background with Deep Black text (Montserrat Bold). They must have a minimum height of 56px for mobile accessibility. Secondary buttons are Deep Black with white text.
- **Input Fields:** Large, 16px rounded fields with Soft White backgrounds. Labels stay outside the field in Inter Bold (14px). Use high-contrast focus states (2px Yellow border).
- **Ride Selection Cards:** Horizontal cards with a clear image of the vehicle, the name of the service (e.g., "Melek VIP"), and the price in Montserrat Bold. Active selection is indicated by a 2px Yellow border.
- **Status Chips:** Small, pill-shaped indicators for status like "Arriving" or "Completed." Use a light gray background with bold black text.
- **Progress Trackers:** A minimal vertical or horizontal line with circular nodes to show "Requested > Matched > En Route > Arrived."