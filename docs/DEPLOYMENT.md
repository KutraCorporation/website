# Deployment

## Target
The repository is configured for Cloudflare Workers using the OpenNext Cloudflare adapter.
Relevant files: `wrangler.jsonc`, `open-next.config.ts`, and `next.config.ts`.

## Build and preview
```bash
npm ci
npm run cloudflare:build
npm run cloudflare:preview
```
Review the preview and exercise routes and integrations affected by your change.

## Cloudflare resources
The Wrangler configuration declares Worker name `website`, OpenNext Worker entry `.open-next/worker.js`, static assets directory `.open-next/assets`, and D1 binding `DB`.
Confirm the D1 database exists in the target Cloudflare account and that deployment uses the intended environment. Do not reuse production resources in development.

## Database migrations
Review [DATABASE.md](DATABASE.md) before changing schema. Apply migrations to the intended D1 database using the project's established Wrangler workflow. Confirm the target account and database before running remote mutations.

## Secrets and environment
Configure production secrets in Cloudflare's secret management facilities. Do not store secrets in `wrangler.jsonc`, workflow files, or the repository.

## Release checklist
- [ ] CI passes on the exact commit being released.
- [ ] Cloudflare build and preview succeed.
- [ ] Required runtime variables and secrets are configured.
- [ ] D1 migrations have been reviewed and applied to the intended environment.
- [ ] Contact/email and payment integrations are configured and tested safely.
- [ ] Rollback considerations are understood.
- [ ] Post-deployment logs and critical routes are checked.

A production deployment workflow is not defined here. Follow the actual repository and Cloudflare deployment configuration; do not assume a push automatically deploys.