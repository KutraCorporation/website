/**
 * Web Bot Auth — Ed25519 signing utilities (dependency-free, Edge-compatible).
 *
 * Uses only the Web Crypto API. Works in Cloudflare Workers, Next.js Edge
 * Runtime, Deno, and any environment that supports `crypto.subtle`.
 */

// ── Base64url helpers ────────────────────────────────────────────────

export function b64url(input: ArrayBuffer | Uint8Array | string): string {
  const bytes =
    typeof input === 'string'
      ? new TextEncoder().encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlDecode(s: string): ArrayBuffer {
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b.length % 4) b += '=';
  const bin = atob(b);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// ── SHA-256 ──────────────────────────────────────────────────────────

export async function sha256(data: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  return b64url(hash);
}

// ── Key management ───────────────────────────────────────────────────

/**
 * Import an Ed25519 private key from a JSON-serialized JWK string.
 *
 * Cloudflare Workers does not support raw import of Ed25519 private keys,
 * so the secret must be the full JWK (including `d`, `x`, `kty`, `crv`).
 */
export async function importEd25519PrivateKey(jwkJson: string): Promise<CryptoKey> {
  const jwk = JSON.parse(jwkJson) as JsonWebKey;
  return crypto.subtle.importKey('jwk', jwk, { name: 'Ed25519' }, true, ['sign']);
}

export async function exportPublicKey(key: CryptoKey): Promise<JsonWebKey> {
  return (await crypto.subtle.exportKey('jwk', key)) as JsonWebKey;
}

export async function jwkThumbprint(pubJwk: JsonWebKey): Promise<string> {
  return sha256(JSON.stringify({ crv: pubJwk.crv, kty: pubJwk.kty, x: pubJwk.x }));
}

// ── Web Bot Auth signing ─────────────────────────────────────────────

declare const process: { env: Record<string, string | undefined> };

export interface SignOptions {
  /** The URL you are sending the request to. */
  url: string;
  /** JSON-serialized Ed25519 private JWK (full key with d, x, kty, crv). */
  privateKey: string;
  /** Your key directory URL (https://your-domain.com). Defaults to NEXT_PUBLIC_BASE_URL. */
  agentUrl?: string;
  /** Signing validity in seconds. Default 60. */
  ttl?: number;
}

export interface SignedHeaders {
  'Signature-Agent': string;
  'Signature-Input': string;
  'Signature': string;
}

/**
 * Sign an outgoing HTTP request per IETF Web Bot Auth / RFC 9421.
 *
 * Returns the three headers you must attach to the request.
 *
 * @example
 * const headers = await signWebBotAuth({
 *   url: 'https://api.example.com/data',
 *   privateKey: process.env.WEB_BOT_AUTH_PRIVATE_KEY!,
 * });
 * const res = await fetch('https://api.example.com/data', { headers });
 */
export async function signWebBotAuth(options: SignOptions): Promise<SignedHeaders> {
  const { url, privateKey: encodedKey, ttl = 60 } = options;

  const baseUrl = options.agentUrl || process.env.NEXT_PUBLIC_BASE_URL || '';
  const host = new URL(baseUrl || url).hostname;

  const key = await importEd25519PrivateKey(encodedKey);
  const pubJwk = await exportPublicKey(key);
  const thumbprint = await jwkThumbprint(pubJwk);

  const created = Math.floor(Date.now() / 1000);
  const expires = created + ttl;
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(32)));

  const signatureInputValue =
    `sig1=("@authority" "signature-agent");` +
    `alg="ed25519";` +
    `keyid="${thumbprint}";` +
    `created=${created};` +
    `expires=${expires};` +
    `nonce="${nonce}";` +
    `tag="web-bot-auth"`;

  const sigBase = `sig1: ("@authority" "signature-agent"): ${signatureInputValue}`;
  const sigBytes = new TextEncoder().encode(sigBase);
  const sig = new Uint8Array(await crypto.subtle.sign('Ed25519', key, sigBytes));

  return {
    'Signature-Agent': `"https://${host}"`,
    'Signature-Input': signatureInputValue,
    'Signature': `sig1=:${b64url(sig)}:`,
  };
}
