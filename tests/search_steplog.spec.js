const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

const SEARCHES = [
  ['search-linear', 'search_linear.cpp'],
  ['search-binary', 'search_binary.cpp'],
  ['search-fibonacci', 'search_fibonacci.cpp'],
  ['search-interpolation', 'search_interpolation.cpp'],
];

test.describe('Search viz observatory (batch 1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file] of SEARCHES) {
    test(`${id}: input + examples + VCR + step log + drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="searchviz-arr"]')).toBeVisible();
      await expect(card.locator('[data-testid="searchviz-target"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // legacy static container still present in Task 2 (removed in Task 3) but never shown for the observatory
      await expect(page.locator('#search-container')).toBeHidden();

      const cells = card.locator('.searchviz-stage .search-cell');
      const cellCount = await cells.count();
      expect(cellCount).toBeGreaterThan(1);
      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      // scrub to the final frame
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      // default input (target present) → exactly one found cell at the end
      await expect(card.locator('.searchviz-stage .search-cell.found')).toHaveCount(1);
    });
  }

  test('search-binary: bars/cells enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-binary');
    const card = page.locator('[data-method-section="search-binary"]');
    const tallest = () => card.locator('.searchviz-stage .search-cell').evaluateAll((els) => Math.max(...els.map((e) => e.getBoundingClientRect().height)));
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.2);
  });
});
