# Monitoring and operational signals

## Built-in signals

The current `wrangler.jsonc` enables Cloudflare Workers observability logs and invocation logs. The application adds `GET /api/healthz`, which checks whether the Cloudflare D1 binding can execute `SELECT 1`.

- HTTP 200: D1 dependency check succeeded.
- HTTP 503: Cloudflare context or D1 dependency unavailable.
- Response intentionally omits exception details and returns `Cache-Control: no-store`.

This endpoint does not prove that email delivery, x402 payments, every page, or all third-party APIs are healthy.

## Operator checklist

- Review Worker invocation logs, exceptions, request volume, and CPU/duration metrics in Cloudflare.
- Alert on sustained 5xx rates and failed health checks using an external monitor configured by the operator.
- Review Resend delivery/bounce events in the Resend dashboard.
- Review x402 facilitator/network failures before treating paid endpoints as available.
- Never log contact message bodies, email credentials, authorization headers, or payment secrets.

No external monitoring vendor, webhook, alert destination, or uptime SLO is configured in this repository. Add those only after selecting an owner and provider.
