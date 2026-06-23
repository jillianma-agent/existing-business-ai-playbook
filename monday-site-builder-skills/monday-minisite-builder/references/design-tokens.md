# Design Tokens

CSS custom properties for the monday.com design system. Two token sets: **Platform** (Figtree, in-app pages) and **Marketing** (Poppins, landing pages). Select based on audience.

For the full 2026 visual identity (typography scale, gradient rules, motion), see [brand-execution.md](brand-execution.md).

## Audience Selection

| Building for | Token set | Font | Primary accent |
|---|---|---|---|
| Platform pages (board views, dashboards) | Platform | Figtree | #6161ff |
| Marketing landing pages, minisites | Marketing | Poppins | Purple gradient |
| Developer/technical content | Either | Poppins or Figtree | Minimal color |

## Platform Token Set (default)

```css
:root {
  /* Surface */
  --color-bg: #f8f9fb;
  --color-surface: #ffffff;
  --color-surface-hover: #f5f6f8;

  /* Primary */
  --color-primary: #6161ff;
  --color-primary-hover: #4b4bdb;
  --color-primary-light: #ebebff;
  --color-primary-text: #ffffff;

  /* Text */
  --color-text: #323338;
  --color-text-secondary: #676879;
  --color-text-tertiary: #9699a6;

  /* Borders & dividers */
  --color-border: #e6e9ef;
  --color-border-light: #f0f1f3;

  /* Semantic */
  --color-success: #00ca72;
  --color-success-light: #e5faf0;
  --color-warning: #fdab3d;
  --color-warning-light: #fff4e5;
  --color-error: #e2445c;
  --color-error-light: #fce4e8;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);

  /* Spacing scale (4px base) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Typography */
  --font-family: 'Figtree', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  --font-size-4xl: 2.5rem;    /* 40px */
  --font-size-5xl: 3.5rem;    /* 56px */

  /* Line height */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  /* Font weight */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Layout */
  --max-width: 1200px;
  --nav-height: 64px;
}
```

## Global Reset (index.css)

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background: var(--color-bg);
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

## Component Patterns

### Card

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### Badge/Pill

```css
.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: var(--weight-semibold);
}
```

### Glassmorphism Navigation

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0 var(--space-xl);
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}
```

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 768px) {
  :root {
    --font-size-5xl: 2.5rem;
    --font-size-4xl: 2rem;
    --space-4xl: 64px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  :root {
    --font-size-5xl: 2rem;
    --font-size-4xl: 1.75rem;
    --space-4xl: 48px;
    --space-3xl: 40px;
  }
}
```

## Marketing Token Set (landing pages)

For marketing/landing pages, override the platform tokens:

```css
:root {
  /* Typography - Poppins replaces Figtree */
  --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-hero: 4.5rem;   /* 72px */
  --font-size-section-xl: 3.625rem; /* 58px */
  --font-size-section-l: 3.375rem; /* 54px */

  /* Weight - max is Medium (500), never Bold for marketing */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;

  /* Text colors - simpler, bolder */
  --color-text: #000000;
  --color-text-secondary: #767676;

  /* Backgrounds */
  --color-bg: #ffffff;
  --color-bg-warm: #FAF6F1;

  /* AI brand gradient (hero text) */
  --gradient-hero: linear-gradient(90deg, #FE81E4 35.5%, #FDA900 83.9%);

  /* CTA */
  --gradient-cta: linear-gradient(135deg, #A95AF7, #6C38CC);

  /* AI decorative gradient */
  --gradient-ai: linear-gradient(90deg, #FCB030 0%, #FD6E06 20%, #A95AF7 50%, #2891FC 80%, #00CA72 100%);

  /* Dark sections */
  --color-dark-bg: #000000;
  --color-dark-surface: #1A1A2E;
}
```

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Marketing gradient text

```css
.gradient-text {
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Marketing CTA button

```css
.cta-primary {
  background: var(--gradient-cta);
  color: white;
  font-weight: var(--weight-medium);
  border: none;
  border-radius: 40px;
  padding: 12px 32px;
  cursor: pointer;
}
```

### Letter spacing for marketing headlines

```css
h1 { letter-spacing: -2.16px; }  /* 72px hero */
h2 { letter-spacing: -1.5px; }   /* 48-58px section */
h3 { letter-spacing: -1px; }     /* 32-36px feature */
```

## Dark Section Variant

For trust/security sections with dark backgrounds:

```css
.dark-section {
  background: var(--color-dark-bg, #000000);
  color: #ffffff;
}

.dark-section .subtitle {
  color: rgba(255, 255, 255, 0.7);
}
```

## Per-Project Overrides

To customize for a non-monday brand:
1. Replace `--color-primary` and `--color-primary-light` with the brand's accent
2. Replace `--font-family` with the brand's chosen fonts
3. Adjust `--color-bg` and `--color-surface` for the brand's feel
4. Keep the spacing scale, radius, and shadows unless the brand requires otherwise
