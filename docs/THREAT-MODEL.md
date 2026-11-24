# Threat model

## Verified scope

Next.js App Router deployed with OpenNext on Cloudflare Workers. Cloudflare D1 binding: `DB`; database: `website`. Contact submissions are stored in D1 and sent through Resend. A premium endpoint is optionally protected with x402. This is a working threat model, not an audit or compliance claim.

## Assets

- Contact submissions and email addresses in D1.
- Resend credentials and deployment secrets.
- x402 recipient/network configuration.
- Source code, CI workflows, and release credentials.

## Threats and controls

| Boundary | Threat | Controls / work |
| --- | --- | --- |
| Browser → contact API | spam, oversized input, injection | Validate fields/lengths; HTML-escape email content; add rate limiting before public scale |
| Worker → D1 | SQL injection, unauthorized writes | Parameterized statement; least-privilege binding; backup and restore drills |
| Worker → Resend | leaked key, email abuse | Store key as Cloudflare secret; rotate on exposure; verify sender domain |
| Worker → GitHub API | untrusted repo input, rate limits | Validate slug, encode path component, cache results |
| Worker → x402 | wrong network/recipient, facilitator outage | Verify network and recipient before enabling paid route; never commit secrets |
| Actions → repository | malicious dependency/workflow change | Minimal permissions, CodeQL, secret scanning, reviewed release process |

## Priorities

1. Confirm production credentials are Cloudflare secrets, not committed vars.
2. Enable GitHub secret scanning and push protection in repository settings; CI scanning is defense in depth.
3. Rate-limit public POST endpoints before meaningful traffic.
4. Test D1 restore and define RPO/RTO with the operator.
5. Review CSP and third-party script origins before changing policy.

## Incident response

If a credential is exposed, revoke/rotate it at the issuer, update Cloudflare secrets, inspect provider activity and deployments, then record the incident. Deleting a secret from the latest commit is not remediation; rotate it.
