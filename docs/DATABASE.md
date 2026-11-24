# Database

## Current configuration
The Wrangler configuration declares a Cloudflare D1 binding named `DB`. The application storage provider defaults to D1 and obtains the binding through the OpenNext Cloudflare runtime context.
Migration files are stored in `migrations/`.

## Migration practices
1. Inspect the existing migration sequence before creating a migration.
2. Follow the naming convention already established in the directory.
3. Keep each migration focused and reviewable.
4. Consider compatibility with the currently deployed application.
5. Test against a local or non-production D1 database first.
6. Verify the target account and database before applying a remote migration.
7. Document backfills, operational steps, and rollback limitations in the pull request.

## Wrangler
Use the Wrangler version installed by the project. Consult current Cloudflare D1 documentation for command syntax: https://developers.cloudflare.com/d1/
Do not paste production credentials, customer records, or private data into issues or pull requests.

Update this document when database topology, binding name, migration tooling, or operational process changes. SQL files in `migrations/` remain the source of truth for schema history.