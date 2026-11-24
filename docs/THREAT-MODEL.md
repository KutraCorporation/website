# Threat model

## Scope verified in this repository

The application is a Next.js App Router site deployed with OpenNext on Cloudflare Workers. The verified Cloudflare D1 binding is `DB`, database name `website`. Contact submissions are persisted through the D1 provider and then sent through Resend. A premium route is optionally protected with x402.

This document is a working threat model, not a security audit or compliance claim.

## Assets

- Contact form submissions and email addresses stored in D1.
- Resend API credentials and other deployment secrets.
- x402 recipient configuration and payment-related settings.
- Application source, deployment workflow, and release credentials.
- Public project, team, and organization content.

## Trust boundaries and threats

| Boundary | Threat | Existing/required controls |
| --- | --- | --- |
| Browser → contact API | spam, oversized input, injection | Validate fields and lengths; escape HTML before email rendering; add rate limiting/abuse controls before public scale |
| Worker → D1 | unauthorized reads/writes, SQL injection | Parameterized D1 statement; least-privilege binding; backups and restore drills |
| Worker → Resend | leaked API key, email abuse | Store key as Cloudflare secret; rotate on exposure; restrict sender domain |
| Worker → GitHub API | rate limits, untrusted repo input | Validate repository slug; encode URL component; cache responses |
| Worker → x402 facilitator | payment/configuration errors | Keep secrets out of source; verify chain/network and recipient before enabling paid routes |
| GitHub Actions → repository | malicious dependency/action or workflow change | Minimal permissions, dependency review, CodeQL, secret scanning, protected release process |

## Prioritized work

1. Confirm Cloudflare production secrets are configured as secrets, never as committed vars.
2. Enable GitHub secret scanning and push protection in repository settings; CI scanning is defense in depth.
3. Add rate limiting to public POST endpoints before exposing them to significant traffic.
4. Test D1 backup restoration and document RPO/RTO targets once the operator chooses them.
5. Review CSP directives and third-party script origins; do not loosen CSP without a concrete integration requirement.

## Incident response

If a credential is exposed: revoke/rotate it at its issuer, update Cloudflare secrets, inspect recent deployments and provider activity, then document the incident. Do not merely delete the secret from the latest commit; rotate it.
