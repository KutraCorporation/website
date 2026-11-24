# Cloudflare D1 backup and restore

## Verified database configuration

- Wrangler binding: `DB`
- Database name: `website`
- Database ID: configured in the repository's `wrangler.jsonc`
- Migration directory: `migrations/`

Do not paste the database ID into public issue reports or logs unnecessarily. No R2 bucket, scheduled backup worker, or retention policy is currently configured in this repository; this guide does not pretend otherwise.

## Manual export

Use an authenticated Cloudflare Wrangler session and confirm the target account/database before running commands.

```sh
npx wrangler d1 export website --remote --output=./backups/website-$(date -u +%Y%m%dT%H%M%SZ).sql
```

Check the installed Wrangler version's `d1 export --help` before production use. Treat the SQL export as sensitive data: it contains contact submissions. Encrypt it before transferring it to an approved private backup location. Do not commit exports or upload them to public artifacts.

## Restore procedure

1. Create or select an isolated D1 database for recovery testing.
2. Inspect the export and confirm its target database.
3. Apply the export to the isolated database with the Wrangler D1 execute command supported by the installed CLI version.
4. Apply/verify migrations in order and compare table counts and representative records.
5. Run a staging smoke test, including a contact submission and retrieval through approved operational tooling.
6. Only after explicit approval, schedule a production restore window and repeat against the production database.

Never test restore commands against production by default.

## Backup policy still to be decided

Choose an owner, cadence, retention, encryption/key custody, off-account storage, and recovery-point/recovery-time objectives. Until these are configured and tested, backups are manual and disaster recovery is not proven.
