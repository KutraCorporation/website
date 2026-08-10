import {
  b64url,
  importEd25519PrivateKey,
  exportPublicKey,
  jwkThumbprint,
} from '../../lib/web-bot-auth';

declare const process: { env: Record<string, string | undefined> };

export const runtime = 'edge';

export async function GET(): Promise<Response> {
  const encodedKey = process.env.WEB_BOT_AUTH_PRIVATE_KEY;
  if (!encodedKey) {
    return new Response(
      JSON.stringify({ error: 'WEB_BOT_AUTH_PRIVATE_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const key = await importEd25519PrivateKey(encodedKey);
  const pubJwk = await exportPublicKey(key);
  const thumbprint = await jwkThumbprint(pubJwk);

  const jwks = { keys: [{ kty: pubJwk.kty, crv: pubJwk.crv, x: pubJwk.x }] };
  const body = JSON.stringify(jwks);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oceanwebturk.com';
  const host = new URL(baseUrl).hostname;
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 60;
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(32)));

  const signatureInputValue =
    `sig1=("@authority" "signature-agent");` +
    `alg="ed25519";` +
    `keyid="${thumbprint}";` + // cSpell:ignore keyid
    `created=${created};` +
    `expires=${expires};` +
    `nonce="${nonce}";` +
    `tag="http-message-signatures-directory"`;

  const sigBase = `sig1: ("@authority" "signature-agent"): ${signatureInputValue}`;
  const sig = new Uint8Array(
    await crypto.subtle.sign('Ed25519', key, new TextEncoder().encode(sigBase)),
  );

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/http-message-signatures-directory+json',
      'Signature-Agent': `"https://${host}"`,
      'Signature-Input': signatureInputValue,
      'Signature': `sig1=:${b64url(sig)}:`,
      'Cache-Control': 'max-age=86400',
    },
  });
}
