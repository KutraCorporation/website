# Disaster recovery

## Current dependencies

- Cloudflare Workers / OpenNext runtime and static assets.
- Cloudflare D1 database `website` via binding `DB`.
- Resend for outbound contact email.
- Optional x402 facilitator and chain configuration.

## Recovery order

1. Declare incident and stop risky deployments or migrations.
2. Confirm Cloudflare account, Worker deployment, D1 database, and secrets status.
3. If D1 data is damaged, restore a verified encrypted export into an isolated database first; follow [D1 backup guide](./D1-BACKUP.md).
4. Validate schema migrations and application compatibility in staging.
5. Restore production only with explicit operator approval.
6. Verify `/api/healthz`, localized home pages, contact flow, and any enabled paid endpoint.
7. Communicate impact and record timeline, data-loss window, and corrective actions.

## Recovery objectives

RPO and RTO are intentionally unset. They require a business decision based on backup frequency, acceptable data loss, staffing, and Cloudflare recovery options. Do not claim disaster recovery readiness until a restore drill is completed and measured.

## Required follow-up

- Select encrypted off-account backup storage and retention.
- Automate exports only after credentials, storage binding, schedule, and failure alerts are configured.
- Perform and record a restore drill at least quarterly or after material schema changes.
- Keep deployment rollback instructions and migration compatibility notes current.
