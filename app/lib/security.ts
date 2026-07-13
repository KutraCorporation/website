/**
 * Security utilities for Brand Web App
 */

/**
 * Validates if a string is a valid domain name format
 * Prevents common attacks like DNS rebinding
 */
export function isValidDomain(domain: string): boolean {
    if (!domain || typeof domain !== 'string' || domain.length > 253) {
        return false;
    }

    // Block localhost and private IPs to prevent SSRF
    const lowerDomain = domain.toLowerCase();
    if (
        lowerDomain === 'localhost' ||
        lowerDomain.startsWith('127.') ||
        lowerDomain.startsWith('10.') ||
        lowerDomain.startsWith('192.168.') ||
        lowerDomain.startsWith('172.16.') ||
        lowerDomain.startsWith('172.17.') ||
        lowerDomain.startsWith('172.18.') ||
        lowerDomain.startsWith('172.19.') ||
        lowerDomain.startsWith('172.2') ||
        lowerDomain.startsWith('172.30.') ||
        lowerDomain.startsWith('172.31.') ||
        lowerDomain.endsWith('.local') ||
        lowerDomain.includes('localhost')
    ) {
        return false;
    }

    // Regex for valid domain
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    
    return domainRegex.test(domain);
}

/**
 * Sanitizes a string to prevent injection attacks.
 * Uses iterative replacement to defeat nested/bypassed patterns.
 */
export function sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') {
        return '';
    }

    let result = input
        .replace(/[<>'";&]/g, '') // Remove dangerous characters
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();

    // Iteratively strip dangerous URL schemes to handle nested bypasses
    // e.g. "jajavascriptscriptcript:" → "javascript:" → ""
    const SCHEME_PATTERN = /(?:java|vb|live)script\s*:|data\s*:/gi;
    let previous: string;
    do {
        previous = result;
        result = result.replace(SCHEME_PATTERN, '');
    } while (result !== previous);

    return result;
}

const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:'];

/**
 * Validates that a URL is safe (same origin or allowed list)
 */
export function isValidRedirectUrl(url: string, allowedDomains: string[]): boolean {
    try {
        const parsedUrl = new URL(url);

        // Reject dangerous schemes (javascript:, data:, vbscript:, etc.)
        if (!SAFE_PROTOCOLS.includes(parsedUrl.protocol)) {
            return false;
        }

        // Allow same origin
        if (parsedUrl.origin === process.env.NEXT_PUBLIC_APP_URL ||
            parsedUrl.origin === 'http://localhost:3000') {
            return true;
        }

        // Check against allowed domains
        return allowedDomains.some(domain => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`));
    } catch {
        // If URL parsing fails, treat as invalid
        return false;
    }
}

/**
 * Rate limit key generator (prevents injection in rate limit keys)
 */
export function sanitizeRateLimitKey(key: string): string {
    return key.replace(/[^a-zA-Z0-9:_\-.]/g, '').substring(0, 200);
}
