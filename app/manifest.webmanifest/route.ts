import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/utils';

export async function GET() {
  const manifest = {
    name: 'Kutra Corporation',
    short_name: 'Kutra',
    description:
      'Kutra, modern teknolojiler ve yapay zeka ile uçtan uca dijital çözümler sunan teknoloji ekosistemi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0EB1D4',
    lang: 'tr',
    dir: 'ltr',
    categories: ['technology', 'productivity', 'business'],
    icons: [
      {
        src: `${baseUrl}img/logo.webp`,
        sizes: '48x48',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: `${baseUrl}img/logo.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}img/logo.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
