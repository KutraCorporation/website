# API

## Route handlers
The application exposes HTTP endpoints through Next.js App Router route handlers under `app/api/` and other route-specific directories.
Known API areas include contact submission, contributor information, email verification, and x402-related functionality. Exact methods, request schemas, response formats, and authentication behavior must be read from each route handler.

## Adding or changing an endpoint
- Validate method, content type, body size, and all input fields.
- Treat client input and third-party responses as untrusted.
- Return consistent status codes and avoid leaking internal errors.
- Apply rate limiting and abuse controls where publicly reachable.
- Keep credentials and privileged operations on the server.
- Avoid logging secrets, payment credentials, or unnecessary personal data.
- Document breaking changes and update clients/translations where needed.

## Source of truth
Inspect the route handler under `app/api/` for its current contract. When an endpoint becomes a stable public API, document method, path, authentication, request schema, response schema, errors, and rate limits here.