import { NextResponse } from 'next/server';
import { baseUrl, getLocalizedUrl, products } from '@/lib/utils';

export async function GET(request: Request, { params }: { params: { locale: string } }) {
  const { locale } = await params;
  const lastmod = new Date().toISOString();

  const projectUrls = products.map((p) => ({
    loc: getLocalizedUrl(locale, `/projects/${p.id}`),
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const projectContributorsUrls = products.map((p) => ({
    loc: getLocalizedUrl(locale, `/projects/${p.id}/contributors`),
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const urls = [
    { loc: getLocalizedUrl(locale, '/about'), changefreq: 'monthly', priority: '0.8' },
    { loc: getLocalizedUrl(locale, '/about/overview'), changefreq: 'monthly', priority: '0.8' },
    { loc: getLocalizedUrl(locale, '/about/team'), changefreq: 'monthly', priority: '0.8' },
    ...projectUrls,
    ...projectContributorsUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${getLocalizedUrl(locale, '/')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}img/logo.png</image:loc>
      <image:title>Kutra Corporation Logo</image:title>
    </image:image>
  </url>${urls.map((u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
