import { NextResponse } from 'next/server';
import { baseUrl, products, getContactEmail } from '@/lib/utils';

export async function GET() {
  const email = getContactEmail();

  const content = `# Kutra Corporation - Beyond Limits | Technology Ecosystem

Kutra is a global technology ecosystem where bright young minds from all around the world build the future together. Kutra develops secure identity products, Web3 credential infrastructure and open source software with a global community of contributors.

## Facts
- Organization: Kutra Corporation
- Tagline: Beyond Boundaries / Sınırların Ötesinde
- Community: Global contributors, remote-first
- Headquarters: Türkiye
- Contact: ${email}
- GitHub: https://github.com/KutraCorporation
- LinkedIn: https://linkedin.com/company/kutracorporation
- X: https://x.com/KutraCorporation

## Projects

${products.map((product) => `### ${product.name}
URL: ${baseUrl}en/projects/${product.id}
Categories: ${(product.categories ?? []).join(', ')}
${product.description}
${(product.links ?? []).map((l) => `Source: ${l.link}`).join('\n')}
`).join('\n')}

## Pages
- Home: ${baseUrl}en
- Projects: ${baseUrl}en/projects
- Open Source: ${baseUrl}en/projects/open-source-projects
- About: ${baseUrl}en/about
- Overview (mission & roadmap): ${baseUrl}en/about/overview
- Team: ${baseUrl}en/about/team
- Contact: ${baseUrl}en/about/contact

## Mission
At Kutra, bright young minds from around the world build the next generation of digital infrastructure together. From secure identity management to comprehensive cloud services, our platform empowers you to thrive in the digital age. Our pillars are security, user experience and decentralization.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
