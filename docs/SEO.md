# SEO and search

## Existing implementation

The repository already serves `/robots.txt`, `/sitemap.xml`, localized `/{locale}/sitemap.xml`, and `/manifest.webmanifest` through App Router handlers. Locale metadata defines canonical URLs and the home page declares language alternates and structured data.

## Added

- `/opensearch.xml`: OpenSearch description document.
- `/api/search?q={query}`: JSON suggestions over the repository's existing in-memory `products` collection.
- `npm run seo:check`: static contract checks for required routes and metadata markers.

The suggestion endpoint only searches product name, description, and categories; it is not a general site search index.

## Manual verification

After deployment, check status/content types for `/robots.txt`, `/sitemap.xml`, `/en/sitemap.xml`, `/tr/sitemap.xml`, `/opensearch.xml`, and `/api/search?q=auth`. Confirm canonical and hreflang targets use the production `NEXT_PUBLIC_BASE_URL`. Run Lighthouse and validate structured data separately.
