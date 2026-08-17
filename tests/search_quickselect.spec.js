const { test, expect } = require('@playwright/test');
test.setTimeout(240000);
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('Quickselect viz', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
    const indexUrl = base.replace(/\/$/, '') + '/index.html';
    // The app loads many deferred scripts which delay DOMContentLoaded.
    // Wait for full load and a visible app marker instead of relying on DOMContentLoaded.
    await page.goto(indexUrl, { waitUntil: 'load', timeout: 180000 });
    await page.waitForSelector('[data-testid="method-sections"]', { timeout: 120000 });
  });

  test('select-quickselect: input + examples + VCR + code drawer', async ({ page }) => {
    await loadMethod(page, 'select-quickselect');
    const card = page.locator('[data-method-section="select-quickselect"]');
    await expect(card.locator('[data-testid="qsel-arr"]')).toBeVisible();
    await expect(card.locator('[data-testid="qsel-k"]')).toBeVisible();
    await expect(card.locator('.ex-select')).toBeVisible();
    await expect(card.locator('.viz-workbench')).toBeVisible();
    await expect(card.locator('.stepctl')).toBeVisible();
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('quickselect.cpp');

    // scrub to final frame and check 'found' highlight exists
    const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(card.locator('.searchviz-stage .search-cell.found')).toHaveCount(1);
  });
});
