import { NextResponse } from 'next/server';
import { baseUrl, products } from '@/lib/utils';

export async function GET(request: Request, { params }: { params: { locale: string } }) {
  const { locale } = await params;
  const lastmod = new Date().toISOString();

  const productUrls = products.map((p) => ({
    loc: `${baseUrl}/${locale}/products/${p.id}`,
    changefreq: 'weekly',
  }));

  const urls = [
    { loc: `${baseUrl}/${locale}`, changefreq: 'daily' },
    ...productUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.map((u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
