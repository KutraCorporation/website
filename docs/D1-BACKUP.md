# Cloudflare D1 backup and restore

## Verified configuration

- Wrangler binding: `DB`
- D1 database name: `website`
- Database ID: stored in `wrangler.jsonc`
- Migrations: `migrations/`

No R2 bucket, scheduled backup worker, or retention policy is configured in this repository. This guide describes a manual process, not an automated backup service.

## Manual export

Authenticate Wrangler and confirm the account/database before use:

```sh
mkdir -p backups
npx wrangler d1 export website --remote --output=./backups/website-$(date -u +%Y%m%dT%H%M%SZ).sql
```

Check `npx wrangler d1 export --help` against the installed Wrangler version before production use. SQL exports contain contact submissions: encrypt them before transfer to approved private storage. Never commit exports or publish them as CI artifacts.

## Restore drill

1. Create/select an isolated D1 database.
2. Inspect the export and confirm its target.
3. Import into the isolated database using the installed Wrangler `d1 execute` syntax; check `npx wrangler d1 execute --help` first.
4. Apply/verify migrations in order and compare table counts and representative records.
5. Smoke-test staging, including a contact submission.
6. Production restore requires explicit approval and a planned maintenance window.

## Policy decisions still required

Assign an owner; choose cadence, retention, encryption/key custody, off-account storage, and RPO/RTO. Until exports and restores are scheduled and tested, backups are manual and recovery is not proven.
