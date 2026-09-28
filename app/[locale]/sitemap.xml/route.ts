import { NextResponse } from 'next/server';
import { baseUrl, getLocalizedUrl, products } from '@/lib/utils';
import { i18n } from '@/i18n/i18n';

type PageDef = {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: Request, { params }: { params: { locale: string } }) {
  const { locale } = await params;
  const lastmod = new Date().toISOString();

  const projectUrls: PageDef[] = products.map((p) => ({
    path: `/projects/${p.id}`,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const projectContributorsUrls: PageDef[] = products.map((p) => ({
    path: `/projects/${p.id}/contributors`,
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const urls: PageDef[] = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/projects', changefreq: 'weekly', priority: '0.9' },
    { path: '/projects/open-source-projects', changefreq: 'weekly', priority: '0.8' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/about/overview', changefreq: 'monthly', priority: '0.7' },
    { path: '/about/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/about/team', changefreq: 'monthly', priority: '0.6' },
    ...projectUrls,
    ...projectContributorsUrls,
  ];

  const urlEntries = urls
    .map((u) => {
      const alternates = i18n.locales
        .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(getLocalizedUrl(lang, u.path))}"/>`)
        .join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(getLocalizedUrl('en', u.path))}"/>`;

      return `  <url>
    <loc>${escapeXml(getLocalizedUrl(locale, u.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${alternates}
${xDefault}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(getLocalizedUrl(locale, '/'))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${escapeXml(baseUrl + 'img/logo.webp')}</image:loc>
      <image:title>Kutra Corporation Logo</image:title>
    </image:image>
  </url>
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
