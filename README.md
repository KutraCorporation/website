# Kutra Website

The website application for Kutra Corporation.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FKutraCorporation%2Fwebsite.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FKutraCorporation%2Fwebsite?ref=badge_shield)

## Technology
- Next.js App Router, React, and TypeScript
- next-intl for localization
- Cloudflare Workers through OpenNext
- Cloudflare D1 binding
- Resend integration for email delivery
- x402 integration for HTTP payment flows
- ESLint and Husky

## Requirements
- Node.js version specified in `.nvmrc`
- npm
- Cloudflare resources for workflows that use remote bindings or deployment

## Getting started
```bash
npm ci
cp .env.example .env
cp .dev.vars.example .dev.vars
npm run dev
```

Fill only local variables required for your work. These local files are excluded from Git. Never commit real secrets.

## Available commands
| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Run standard Next.js production build |
| `npm run cloudflare:build` | Build for Cloudflare using OpenNext |
| `npm run cloudflare:preview` | Preview the Cloudflare build locally |
| `npm run build:analyze` | Build with bundle analyzer enabled |

For Cloudflare hosting, follow [Deployment](docs/DEPLOYMENT.md).

## Project structure
- `app/` — App Router pages, route handlers, and application logic
- `translations/` — locale translation resources
- `migrations/` — database migration files
- `public/` — static assets
- `scripts/` — project scripts
- `docs/` — engineering and operational documentation
- `.github/` — repository automation and contribution templates

## Documentation
- [Architecture](docs/ARCHITECTURE.md)
- [Environment variables](docs/ENVIRONMENT.md)
- [API routes](docs/API.md)
- [Database and migrations](docs/DATABASE.md)
- [Localization](docs/LOCALIZATION.md)
- [Security](SECURITY.md)

## Contributing
Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Contributions are subject to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Support and security
See [SUPPORT.md](SUPPORT.md). For vulnerabilities, follow [SECURITY.md](SECURITY.md).

## License
This project is distributed under the license in [LICENSE](LICENSE).