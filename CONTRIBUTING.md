# Contributing

Thank you for considering a contribution to Kutra Website.

## Before you start
1. Check existing issues and pull requests for related work.
2. For substantial changes, open an issue first to discuss the approach.
3. Keep pull requests focused and avoid unrelated refactors.
4. Never include credentials, private keys, tokens, production data, or personal information.

## Development setup
Requirements: Node.js version in `.nvmrc` and npm.

```bash
npm ci
cp .env.example .env
cp .dev.vars.example .dev.vars
npm run dev
```

Fill only the local variables needed for your work. Never commit `.env` or `.dev.vars`.

## Before opening a pull request
Run the checks relevant to your change:

```bash
npm run lint
npm run typecheck
npm run cloudflare:build
```

The Cloudflare build may require local Cloudflare configuration or bindings for platform-specific features. Never use production secrets locally or in CI.

There is no documented automated test command at present. If you add a test framework, document it and add the corresponding CI check.

## Pull requests
- Explain the problem and chosen solution.
- Include reproduction steps for bug fixes.
- Add screenshots for visible UI changes when useful.
- Update documentation and translations when behavior changes.
- Call out database migration and deployment considerations.
- Keep changes accessible and avoid unnecessary dependencies.

Passing CI does not replace code review.