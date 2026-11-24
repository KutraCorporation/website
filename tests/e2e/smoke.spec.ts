import { expect, test } from "@playwright/test";

test("English home page responds and exposes the main landmark", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page).toHaveTitle(/Kutra/i);
});

test("Turkish home page responds", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.locator("main#main-content")).toBeVisible();
});

test("robots and sitemap endpoints are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<sitemapindex");
});
