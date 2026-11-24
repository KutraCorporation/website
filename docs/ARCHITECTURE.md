# Architecture

## Overview
This repository is a Next.js App Router application written in TypeScript. It is prepared for Cloudflare Workers deployment through the OpenNext Cloudflare adapter.

## Main areas
- `app/`: routes, layouts, route handlers, and application code.
- `app/lib/`: shared application services and integrations.
- `translations/`: locale message resources.
- `migrations/`: database schema migrations.
- `public/`: static assets.
- `wrangler.jsonc`: Worker, assets, D1 binding, compatibility, and non-secret runtime variables.
- `open-next.config.ts`: OpenNext adapter configuration.

## Runtime integrations
### Cloudflare
The Wrangler configuration declares an OpenNext-generated Worker entry point, static assets, and a D1 binding named `DB`. The storage provider obtains this binding through the OpenNext Cloudflare runtime context.
Do not assume a local Next.js server fully reproduces Cloudflare runtime behavior. Validate platform-specific changes with the Cloudflare build and preview commands.

### Storage
The storage provider currently selects D1 by default. Provider selection and implementation live under `app/lib/storage/`.

### Email
The email provider currently selects Resend by default. Provider selection and implementation live under `app/lib/email/`.

### Payments
The x402 integration is implemented in `app/lib/x402.ts`. Network, price, facilitator URL, and recipient address are configuration values. Do not put private keys or credentials in source control.

### Localization
The application uses next-intl. See [LOCALIZATION.md](LOCALIZATION.md).

## Change guidance
- Keep route handlers thin; place reusable business logic in shared modules.
- Validate untrusted input at server boundaries.
- Keep secrets server-side and never expose them through public environment variables.
- Add migrations for schema changes and document rollout and rollback implications.
- Prefer explicit provider interfaces over coupling route handlers to vendor SDKs.
- Update this document when deployment topology or major integrations change.