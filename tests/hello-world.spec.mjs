/** Visual regression + a11y. */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EXAMPLE_URL = pathToFileURL(
  resolve(__dirname, '../examples/hello-world/index.html'),
).href;

const THEMES = ['dark', 'light'];

for (const theme of THEMES) {
  test(`hello-world ${theme}`, async ({ page }) => {
    await page.goto(EXAMPLE_URL);

    await page.evaluate((t) => {
      localStorage.setItem('jds-theme', t);
    }, theme);
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

    // Freeze any blink/cursor animations.
    await page.evaluate(() =>
      document.querySelectorAll('.caret, [class*="caret"]').forEach((el) => {
        el.style.animation = 'none';
        el.style.opacity = '1';
      }),
    );

    await expect(page).toHaveScreenshot(`${theme}.png`, {
      fullPage: true,
      animations: 'disabled',
    });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact),
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
