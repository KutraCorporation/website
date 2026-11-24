# Localization

## Implementation
The application uses next-intl and keeps translation resources in `translations/`. The Next.js internationalization request configuration is referenced by `next.config.ts`.

## Adding or changing text
1. Identify translation keys used by the affected page or component.
2. Update every supported locale resource for the same key.
3. Preserve the existing JSON structure and naming conventions.
4. Avoid hard-coded user-facing strings when a translation key is appropriate.
5. Check longer translations for layout overflow and accessibility.
6. Verify locale navigation and metadata for the affected route.

## Review
Translation files should remain structurally consistent. Missing keys or malformed JSON can cause runtime or build issues. If automated translation parity checks are introduced, add them to CI and document the command here.