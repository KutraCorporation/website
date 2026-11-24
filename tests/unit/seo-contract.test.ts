import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("SEO route contracts", () => {
  it("keeps robots.txt backed by the existing App Router handler", () => {
    const source = read("app/robots.txt/route.ts");
    expect(source).toContain("Sitemap:");
    expect(source).toContain("baseUrl");
  });

  it("keeps the localized sitemap backed by the existing route", () => {
    const source = read("app/[locale]/sitemap.xml/route.ts");
    expect(source).toContain("getLocalizedUrl");
    expect(source).toContain("i18n.locales");
  });

  it("keeps canonical and language alternates in page metadata", () => {
    const source = read("app/[locale]/page.tsx");
    expect(source).toContain("alternates");
    expect(source).toContain("languages");
  });
});
