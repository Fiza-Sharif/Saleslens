---
name: Predictive Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434654'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0254d7'
  primary: '#0052d3'
  on-primary: '#ffffff'
  primary-container: '#326cef'
  on-primary-container: '#fefcff'
  inverse-primary: '#b3c5ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#4d5d73'
  on-tertiary: '#ffffff'
  tertiary-container: '#66768d'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00184a'
  on-primary-fixed-variant: '#003ea6'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
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
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
---

## Brand & Style

This design system targets high-growth enterprise sales teams and data analysts. The personality is **sophisticated, authoritative, and visionary**. It leverages a **Modern Corporate** aesthetic with a lean toward **Minimalism**, emphasizing clarity of data over decorative flourish.

The UI should feel like a high-end physical tool: precise, responsive, and durable. By utilizing high-contrast typography against expansive white space, the system directs focus toward predictive insights and revenue trajectories. The emotional response is one of confidence and calm amidst complex data.

## Colors

The palette is anchored by **Deep Navy (#1E293B)** for core readability and **Electric Blue (#3B73F6)** for interactive elements and data highlights. 

- **Primary**: Used for CTA buttons, active states, and primary regression lines.
- **Surface**: In light mode, use `#FFFFFF` for cards and `#F8FAFC` for page backgrounds. In dark mode, shift to `#0F172A` for backgrounds and `#1E293B` for card surfaces.
- **Accents**: Use subtle opacity variants of the primary blue (e.g., 10% alpha) for "data-line" background patterns and regression curve decorations.
- **Semantic**: Success (Emerald 500), Warning (Amber 500), and Error (Rose 600) should be used sparingly to keep the interface clean.

## Typography

The system utilizes **Inter** for all UI and editorial content to ensure maximum legibility and a contemporary feel. Headlines should be set with tight letter-spacing to feel "locked-in" and professional.

**JetBrains Mono** is introduced as a secondary label font specifically for data points, timestamps, and ML confidence scores to provide a technical, "engineered" contrast to the clean sans-serif body text. 

Maintain a strict vertical rhythm by ensuring all line-heights are multiples of 4px.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. This design system prioritizes "generous whitespace" to reduce cognitive load during data analysis.

- **Grid System**: Use 24px gutters to allow cards to breathe.
- **Section Spacing**: Large vertical gaps (80px–120px) between major dashboard modules to reinforce hierarchy.
- **In-Card Spacing**: Use a standard 32px padding for 2xl rounded cards to maintain a premium, spacious feel.
- **Mobile Reflow**: Stack all side-by-side widgets into a single vertical column, increasing margin to 16px to prevent content from touching screen edges.

## Elevation & Depth

Depth is communicated through **Tonal Layers** supplemented by **Ambient Shadows**. The goal is a flat, modern look with just enough elevation to indicate interactivity.

1.  **Level 0 (Background)**: Base surface color (`#F8FAFC`).
2.  **Level 1 (Cards)**: White surface with a 1px border in `#E2E8F0` and a very soft, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05)`.
3.  **Level 2 (Hover/Active)**: Slight increase in shadow spread and a subtle lift (transform y-2px) to indicate clickability.
4.  **Level 3 (Modals/Popovers)**: Stronger backdrop blur (8px) and a more pronounced shadow to isolate the element from the background data grid.

## Shapes

The shape language is defined by large, friendly radii that soften the technical nature of the data.

- **Cards**: Use `rounded-2xl` (1.5rem / 24px) to create a distinct, modern container.
- **Buttons & Inputs**: Use `rounded-lg` (0.5rem / 8px) for a professional yet accessible appearance.
- **Data Markers**: Circular nodes on charts should be perfectly round to contrast against the architectural squareness of the grid.

## Components

### Buttons
- **Primary**: Solid Blue (#3B73F6) with white text. High-padding (12px 24px).
- **Secondary**: Ghost style with 1px border (#E2E8F0) and Navy text.
- **State Changes**: On hover, primary buttons should darken by 10%.

### Cards
- Always use the 2xl corner radius.
- Headers within cards should have a subtle bottom border (1px, #F1F5F9) separating title from content.

### Input Fields
- Focus states must use a 2px blue ring with an offset to ensure accessibility without cluttering the internal field space.
- Labels use `label-sm` (JetBrains Mono) for a technical feel.

### Data Visualization
- **Regression Curves**: Use stroke-width of 3px with a gradient fade for the "tail" of the prediction.
- **Background Patterns**: Subtle, non-interactive SVG waves in the background of the hero or main dashboard sections to represent "the flow of data."

### Chips/Tags
- Small, `rounded-full` pills with low-saturation backgrounds (e.g., Light Blue 50) for status indicators like "Increasing" or "Stable."