import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/en", "/tr", "/en/about", "/en/projects"]) {
  test(`has no automatically detectable serious accessibility violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main#main-content")).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags([
      "wcag2a", "wcag2aa", "wcag21a", "wcag21aa",
    ]).analyze();
    expect(results.violations).toEqual([]);
  });
}
