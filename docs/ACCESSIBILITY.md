# Accessibility testing

Playwright + axe-core tests scan the English and Turkish home pages, About page, and Projects page for automated WCAG 2.1 A/AA rules.

Run:

```sh
npm run test:a11y
```

Automated checks cannot replace keyboard-only testing, screen-reader testing, zoom/reflow review, reduced-motion review, or manual contrast checks. Fix violations at their source; do not add broad axe exclusions to make CI green.
