/**
 * Visual regression + a11y matrix.
 * 14 combos: 2 themes × 7 accents.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EXAMPLE_URL = pathToFileURL(
  resolve(__dirname, '../examples/multi-accent/index.html'),
).href;

const HUES = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'orange'];
const THEMES = ['dark', 'light'];

for (const theme of THEMES) {
  for (const hue of HUES) {
    test(`multi-accent ${theme} × ${hue}`, async ({ page }) => {
      await page.goto(EXAMPLE_URL);

      // Override localStorage + attributes BEFORE first paint.
      await page.evaluate(
        ([t, h]) => {
          localStorage.setItem('jds-multi-theme', t);
          localStorage.setItem('jds-multi-accent', h);
        },
        [theme, hue],
      );
      await page.reload();

      // Confirm attributes applied (the page's inline script reads localStorage).
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('html')).toHaveAttribute('data-accent', hue);

      // Wait for the caret blink to stabilize at opacity 1 (first 65% of cycle).
      await page.evaluate(() =>
        document.querySelectorAll('.caret').forEach((el) => {
          el.style.animation = 'none';
          el.style.opacity = '1';
        }),
      );

      // Visual snapshot.
      await expect(page).toHaveScreenshot(`${theme}-${hue}.png`, {
        fullPage: true,
        animations: 'disabled',
      });

      // a11y scan; fail on serious + critical only (skip moderate/minor noise).
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const blocking = results.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact),
      );
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }
}
