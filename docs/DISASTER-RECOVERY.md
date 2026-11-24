# Disaster recovery

## Dependencies

- Cloudflare Workers/OpenNext runtime and assets.
- Cloudflare D1 database `website` via binding `DB`.
- Resend outbound email.
- Optional x402 facilitator and chain configuration.

## Recovery sequence

1. Declare the incident; pause risky deployments/migrations.
2. Confirm Cloudflare account, Worker deployment, D1 status, and secrets.
3. For damaged D1 data, restore a verified encrypted export into an isolated database first; follow [D1 backup guide](./D1-BACKUP.md).
4. Validate migrations and app compatibility in staging.
5. Restore production only with explicit operator approval.
6. Verify `/api/healthz`, localized home pages, contact flow, and enabled paid routes.
7. Record impact, timeline, data-loss window, and corrective actions.

## Recovery objectives and gaps

RPO/RTO are unset and require a business decision. Recovery is not proven until a restore drill is completed and measured. Choose encrypted off-account storage, retention, backup automation, failure alerts, and a quarterly restore exercise. Keep rollback instructions and migration compatibility notes current.
