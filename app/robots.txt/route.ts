import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/utils';

const aiCrawlers: Array<[string, string]> = [
  ['GPTBot', 'Disallow: /'],
  ['OAI-SearchBot', 'Allow: /'],
  ['ChatGPT-User', 'Allow: /'],
  ['ClaudeBot', 'Disallow: /'],
  ['Claude-Web', 'Disallow: /'],
  ['anthropic-ai', 'Disallow: /'],
  ['PerplexityBot', 'Allow: /'],
  ['Google-Extended', 'Disallow: /'],
  ['CCBot', 'Disallow: /'],
  ['Bytespider', 'Disallow: /'],
  ['Amazonbot', 'Disallow: /'],
  ['Applebot-Extended', 'Disallow: /'],
  ['meta-externalagent', 'Disallow: /'],
  ['Diffbot', 'Allow: /'],
  ['YouBot', 'Allow: /'],
  ['cohere-ai', 'Allow: /'],
];

export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

${aiCrawlers.map(([agent, rule]) => `User-agent: ${agent}\n${rule}`).join('\n\n')}

Content-Signal: ai-train=no, search=yes, ai-input=no

Host: ${baseUrl}
Sitemap: ${baseUrl}sitemap.xml
llms.txt: ${baseUrl}llms.txt
llms-full.txt: ${baseUrl}llms-full.txt`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
