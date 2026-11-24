# Environment Configuration

This document lists environment variables observed in the application source. Whether a variable is required depends on the feature and runtime path.

## Local files
- `.env`: Next.js/application environment variables.
- `.dev.vars`: local Wrangler secrets.
- `.env.example` and `.dev.vars.example`: safe templates only.
Copy templates locally and fill only values required for your work. Never commit the real files.

## Variables
| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Public base URL used for generated links and metadata |
| `NEXT_PUBLIC_APP_URL` | Application origin used by security/origin checks |
| `CONTACT_EMAIL` | Recipient for contact form messages |
| `EMAIL_FROM` | Sender identity for outgoing contact email |
| `EMAIL_PROVIDER` | Email provider selector; currently `resend` |
| `RESEND_KEY` | Resend API credential |
| `STORAGE_PROVIDER` | Storage provider selector; defaults to `d1` |
| `X402_NETWORK` | x402 network identifier |
| `X402_PRICE` | x402 resource price |
| `X402_FACILITATOR_URL` | x402 facilitator endpoint |
| `X402_PAY_TO_ADDRESS` | Recipient address for x402 payments |
| `WEB_BOT_AUTH_PRIVATE_KEY` | Private key used by the HTTP Message Signatures directory |
| `BRAVE_REWARDS_VERIFICATION_TOKEN` | Optional Brave Rewards verification token |
| `WEB_MONETIZATION_PAYMENT_POINTER` | Optional Web Monetization payment pointer |
| `GITHUB_TOKEN` | Optional token for authenticated GitHub API requests |

Cloudflare's D1 binding is named `DB` and configured in `wrangler.jsonc`; it is not a normal secret variable.

## Security rules
- Never commit `.env`, `.dev.vars`, production secrets, or private keys.
- Do not prefix secret values with `NEXT_PUBLIC_`.
- Use separate credentials for local, preview, and production environments.
- Rotate any credential that has been committed or exposed.
- Use GitHub Actions secrets or the hosting platform's secret manager for deployment credentials.
- CI should use harmless test values only when a build requires configuration; it must never use production credentials.

The source code is authoritative for whether a variable is required and its fallback behavior. Update this table when environment access changes.