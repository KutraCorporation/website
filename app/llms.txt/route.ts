import { NextResponse } from 'next/server';
import { baseUrl, products } from '@/lib/utils';

export async function GET() {
    const robotsTxt = `# Kutra Corporation - Beyon Limits | Technology Ecosystem

Kutra is a technology ecosystem building modern solutions with AI and cutting-edge technologies.

## Projects
${products.map((product) => `- [${product.name}](${baseUrl}en/projects/${product.id}): ${product.description}`).join('\n')}

## Company
- [Overview](${baseUrl}en/about/overview): Learn about Kutra Corporation
- [Team](${baseUrl}en/about/team): Meet the team
- [Contact](${baseUrl}en/about/contact): Get in touch
- [Products](${baseUrl}en/projects): Browse all projects
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}