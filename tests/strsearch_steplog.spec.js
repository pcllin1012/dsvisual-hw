const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// [id, drawer filename, cell selector within the card]
const METHODS = [
  ['search-kmp', 'search_kmp.cpp', '.strsearch-align .strsearch-cell'],
  ['search-bm', 'search_bm.cpp', '.strsearch-align .strsearch-cell'],
  ['search-rk', 'search_rk.cpp', '.strsearch-align .strsearch-cell'],
  ['search-zalgo', 'search_zalgo.cpp', '.zalgo-cell'],
  ['search-strcompare', 'search_strcompare.cpp', '.strcompare-pane'],
];

test.describe('String-search observatory (batch 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file, cellSel] of METHODS) {
    test(`${id}: input + examples + VCR + step log + drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="strsearch-text"]')).toBeVisible();
      await expect(card.locator('[data-testid="strsearch-pattern"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);

      if (id === 'search-strcompare') await expect(card.locator('.strcompare-pane')).toHaveCount(3);
      else expect(await card.locator(cellSel).count()).toBeGreaterThan(1);

      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    });
  }

  test('search-kmp: alignment cells enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-kmp');
    const card = page.locator('[data-method-section="search-kmp"]');
    const tallest = () => card.locator('.strsearch-align .strsearch-cell').first().evaluate((e) => e.getBoundingClientRect().height);
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.15);
  });
});
