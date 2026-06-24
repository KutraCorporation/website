import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createBundleAnalyzer from '@next/bundle-analyzer';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const isCloudflareBuild = process.env.CF_PAGES === '1' || process.env.NODE_ENV === 'production';

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin("./app/i18n/request.tsx");

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  compress: true,
  typedRoutes: true,
  images: {
    unoptimized: isCloudflareBuild,
    ...(!isCloudflareBuild && { qualities: [70, 75, 90] })
  },
  poweredByHeader: false,
  crossOrigin: "use-credentials",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: 'Alt-Svc',
            value: 'h3=":443"; ma=86400',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Content-Security-Policy',
            value:  [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.rewardful.com https://www.gstatic.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "font-src 'self' data:;",
              "object-src 'none';"
            ].join(' ')
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|svg|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
    ];
  }
};

export default withNextIntl(withBundleAnalyzer(nextConfig));