import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/utils';

export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

Content-Signal: ai-train=no, search=yes, ai-input=no

Host: ${baseUrl}
Sitemap: ${baseUrl}sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}