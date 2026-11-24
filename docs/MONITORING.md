# Monitoring

## Built-in signals

The existing Wrangler configuration enables Workers observability logs and invocation logs. `GET /api/healthz` checks whether the Cloudflare D1 binding can execute `SELECT 1`.

- 200: D1 dependency check succeeded.
- 503: Cloudflare context or D1 dependency unavailable.

This endpoint does not prove email delivery, x402 payments, all pages, or third-party dependencies are healthy.

## Operator checklist

- Review Worker invocation logs, exceptions, request volume, CPU, and duration in Cloudflare.
- Configure an external monitor and alert on sustained 5xx/health-check failures.
- Review Resend delivery and bounce events in Resend.
- Review x402 facilitator/network failures before declaring paid endpoints available.
- Never log contact message bodies, credentials, authorization headers, or payment secrets.

No monitoring vendor, alert destination, or uptime SLO is configured here. Select an owner/provider before adding integrations.
