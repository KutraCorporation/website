import { readFileSync, existsSync } from "node:fs";

const required = [
  "app/robots.txt/route.ts",
  "app/sitemap.xml/route.ts",
  "app/[locale]/sitemap.xml/route.ts",
  "app/[locale]/layout.tsx",
  "app/[locale]/page.tsx",
  "app/opensearch.xml/route.ts",
  "app/api/search/route.ts",
];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error("Missing SEO/search route files:", missing.join(", "));
  process.exit(1);
}
const layout = readFileSync("app/[locale]/layout.tsx", "utf8");
const home = readFileSync("app/[locale]/page.tsx", "utf8");
const robots = readFileSync("app/robots.txt/route.ts", "utf8");
const sitemap = readFileSync("app/[locale]/sitemap.xml/route.ts", "utf8");
const checks = [
  ["metadataBase", layout.includes("metadataBase")],
  ["canonical metadata", layout.includes("canonical") && home.includes("alternates")],
  ["language alternates", home.includes("languages")],
  ["robots sitemap reference", robots.includes("Sitemap:")],
  ["localized sitemap alternates", sitemap.includes("hreflang")],
];
const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
if (failed.length) process.exit(1);
