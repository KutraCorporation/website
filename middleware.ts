import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/i18n';

const intlMiddleware = createIntlMiddleware(routing);

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimits: Map<string, { count: number; resetTime: number }> = new Map();

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000,
  maxRequests: 100,
};

const aggressiveConfig: RateLimitConfig = {
  windowMs: 60 * 1000,
  maxRequests: 10,
};

const AGGRESSIVE_ROUTES = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/checkout',
];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

function isAggressiveRoute(pathname: string): boolean {
  return AGGRESSIVE_ROUTES.some(route => pathname.startsWith(route));
}

let lastCleanTime = Date.now();
function cleanOldEntriesLazy(): void {
  const now = Date.now();
  if (now - lastCleanTime < 60 * 1000) return;
  
  for (const [key, value] of rateLimits.entries()) {
    if (now > value.resetTime) {
      rateLimits.delete(key);
    }
  }
  lastCleanTime = now;
}

function applyRateLimiting(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith('/api/')) {
    return null;
  }

  cleanOldEntriesLazy();

  const config = isAggressiveRoute(pathname) ? aggressiveConfig : defaultConfig;
  const clientIp = getClientIp(request);
  const key = `${clientIp}:${pathname}`;
  const now = Date.now();

  let entry = rateLimits.get(key);

  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  entry.count++;
  rateLimits.set(key, entry);

  if (entry.count > config.maxRequests) {
    const response = NextResponse.json(
      { error: 'Too many requests', retryAfter: Math.ceil((entry.resetTime - now) / 1000) },
      { status: 429 }
    );
    response.headers.set('Retry-After', Math.ceil((entry.resetTime - now) / 1000).toString());
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', '0');
    return response;
  }

  return null; 
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/')) {
    const rateLimitResponse = applyRateLimiting(request);
    if (rateLimitResponse) return rateLimitResponse; // 429 hatası döner
  }

  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  let response: NextResponse;
  
  if (pathname.startsWith('/api/')) {
    response = NextResponse.next();
    const clientIp = getClientIp(request);
    const key = `${clientIp}:${pathname}`;
    const entry = rateLimits.get(key);
    const config = isAggressiveRoute(pathname) ? aggressiveConfig : defaultConfig;
    if (entry) {
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (config.maxRequests - entry.count).toString());
      response.headers.set('X-RateLimit-Reset', entry.resetTime.toString());
    }
  } else {
    response = intlMiddleware(request);
  }

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const securityHeaders = [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  ];

  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  runtime: 'experimental-edge',
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\..*$).*)',
    '/api/:path*'
  ]
};