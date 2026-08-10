#!/usr/bin/env node

/**
 * Generate Ed25519 key pair for Web Bot Auth.
 *
 * Usage:
 *   node scripts/generate-web-bot-auth-keys.mjs
 *
 * Outputs a full JWK (JSON) for the WEB_BOT_AUTH_PRIVATE_KEY secret.
 */

import { generateKeyPair, createHash } from 'node:crypto';

function bufToB64Url(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

generateKeyPair('ed25519', (err, publicKey, privateKey) => {
  if (err) throw err;

  const pubJwk = publicKey.export({ format: 'jwk' });
  const privJwk = privateKey.export({ format: 'jwk' });

  const thumbprintInput = JSON.stringify({
    crv: pubJwk.crv,
    kty: pubJwk.kty,
    x: pubJwk.x,
  });
  const thumbprint = bufToB64Url(
    createHash('sha256').update(thumbprintInput).digest()
  );

  console.log('\n=== Web Bot Auth Key Pair ===\n');
  console.log('Set this as the WEB_BOT_AUTH_PRIVATE_KEY secret (full JWK):\n');
  console.log(`  wrangler secret put WEB_BOT_AUTH_PRIVATE_KEY`);
  console.log(`  > ${JSON.stringify(privJwk)}\n`);
  console.log('Public JWK (for the JWKS response):\n');
  console.log(JSON.stringify(pubJwk, null, 2));
  console.log('\nJWK Thumbprint:\n');
  console.log(`  ${thumbprint}\n`);
});
