# Application Security Notes

For vulnerability disclosure instructions, see the repository-root [SECURITY.md](../SECURITY.md).

## Secrets
- Keep API keys, private keys, and credentials in secret stores or ignored local files.
- Never expose server secrets through `NEXT_PUBLIC_*` variables.
- Rotate credentials if exposed.
- Use least-privilege credentials per environment.

## HTTP and input handling
- Validate all request data on the server.
- Escape or safely render user-controlled content.
- Use secure cookie settings and appropriate CSRF/origin protections for state-changing requests.
- Review CORS, CSP, redirects, and response headers when adding third-party integrations.
- Do not weaken Content Security Policy directives without documenting the requirement and risk.

## Cloudflare and data
- Keep preview and production resources separate.
- Verify the D1 target before applying migrations.
- Minimize stored personal data and define retention requirements for new data categories.
- Avoid logging message bodies, credentials, tokens, and payment-sensitive information.

## Dependencies and CI
- Review dependency changes and security advisories.
- Keep GitHub Actions permissions minimal.
- Do not execute untrusted pull request code with privileged secrets.
- Treat CI success as a quality gate, not proof that the application is secure.

Review security controls as the application and its threat model evolve.