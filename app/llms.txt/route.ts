import { NextResponse } from 'next/server';
import { baseUrl, products } from '@/lib/utils';

export async function GET() {
    const braveConfigured = Boolean(process.env.BRAVE_REWARDS_VERIFICATION_TOKEN);
    const monetizationPointer = process.env.WEB_MONETIZATION_PAYMENT_POINTER;
    const x402Configured = /^0x[a-fA-F0-9]{40}$/.test(process.env.X402_PAY_TO_ADDRESS || '');

    const monetizationLines = [
      braveConfigured ? `- Brave Rewards: verified creator (/.well-known/brave-rewards-verification.txt)` : null,
      monetizationPointer ? `- Web Monetization: payment pointer via <meta name="monetization"> on all pages` : null,
      x402Configured ? `- x402: pay-per-call API over HTTP 402 at ${baseUrl}api/x402/premium` : null,
    ].filter(Boolean).join('\n');

    const robotsTxt = `# Kutra Corporation - Beyond Limits | Technology Ecosystem
# https://llmstxt.org standard

> Kutra is a technology ecosystem building modern solutions with AI, Web3 and cutting-edge technologies. Products include Authenticator (2FA app) and CertWallet (verifiable credentials on Sui Network).

## Projects
${products.map((product) => `- [${product.name}](${baseUrl}en/projects/${product.id}): ${product.description}`).join('\n')}

## Company
- [Overview](${baseUrl}en/about/overview): Learn about Kutra Corporation, our mission and roadmap
- [Team](${baseUrl}en/about/team): Meet the team
- [Contact](${baseUrl}en/about/contact): Get in touch
- [Projects](${baseUrl}en/projects): Browse all projects
- [Open Source](${baseUrl}en/projects/open-source-projects): Our open source repositories on GitHub

## Monetization
${monetizationLines || '- None configured'}

## Policy
- Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
