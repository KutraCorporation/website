# SEO and search

## Existing implementation

App Router handlers already serve `/robots.txt`, `/sitemap.xml`, localized `/{locale}/sitemap.xml`, and `/manifest.webmanifest`. Locale metadata defines canonical URLs; the home page provides language alternates and structured data.

## Added

- `/opensearch.xml`: OpenSearch description document.
- `/api/search?q={query}`: JSON suggestions over the existing in-memory `products` collection.
- `npm run seo:check`: static route/metadata contract checks.

Search only covers product name, description, and categories; it is not a full-site search index. After deployment verify `/robots.txt`, `/sitemap.xml`, `/en/sitemap.xml`, `/tr/sitemap.xml`, `/opensearch.xml`, and `/api/search?q=auth`. Ensure production `NEXT_PUBLIC_BASE_URL` is correct. Validate structured data separately.
